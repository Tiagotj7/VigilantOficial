<?php
require_once __DIR__ . '/../core/Database.php';

class MonitorService
{
    public static function checkTarget(int $targetId, string $url): void
    {
        $start = microtime(true);

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER         => true,
            CURLOPT_NOBODY         => true,
            CURLOPT_TIMEOUT        => 10,
        ]);
        $result = curl_exec($ch);
        $info   = curl_getinfo($ch);
        $errno  = curl_errno($ch);
        curl_close($ch);

        $httpCode  = isset($info['http_code']) ? (int)$info['http_code'] : 0;
        $isUp      = ($errno === 0 && $httpCode >= 200 && $httpCode < 500) ? 1 : 0;
        $respTime  = (microtime(true) - $start) * 1000; // ms

        $sslValid = null;
        $sslExpiry = null;

        $parsed = parse_url($url);
        if (isset($parsed['scheme']) && $parsed['scheme'] === 'https' && isset($parsed['host'])) {
            $host = $parsed['host'];
            $ctx = stream_context_create(["ssl" => ["capture_peer_cert" => true]]);
            $client = @stream_socket_client("ssl://{$host}:443", $errno, $errstr, 10,
                        STREAM_CLIENT_CONNECT, $ctx);
            if ($client) {
                $params = stream_context_get_params($client);
                if (isset($params['options']['ssl']['peer_certificate'])) {
                    $cert   = openssl_x509_parse($params['options']['ssl']['peer_certificate']);
                    if ($cert && isset($cert['validTo_time_t'])) {
                        $expiryTs  = $cert['validTo_time_t'];
                        $sslExpiry = date('Y-m-d', $expiryTs);
                        $sslValid  = $expiryTs > time() ? 1 : 0;
                    }
                }
                fclose($client);
            }
        }

        $db = Database::getConnection();
        $stmt = $db->prepare('
            INSERT INTO metrics (target_id, checked_at, ping_ms, http_status,
                                 ssl_valid, ssl_expiry_date, is_up, response_time_ms)
            VALUES (:tid, NOW(), :ping, :status, :ssl_valid, :ssl_expiry, :is_up, :rt)
        ');
        $stmt->execute([
            'tid'       => $targetId,
            'ping'      => $respTime,
            'status'    => $httpCode ?: null,
            'ssl_valid' => $sslValid,
            'ssl_expiry'=> $sslExpiry,
            'is_up'     => $isUp,
            'rt'        => $respTime,
        ]);
    }
}