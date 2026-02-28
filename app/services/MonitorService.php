<?php
require_once __DIR__ . '/../core/Database.php';

class MonitorService
{
    public static function checkTarget(int $targetId, string $url): void
    {
        $start = microtime(true);

        $httpStatus = null;
        $isUp = 0;
        $sslValid = null;
        $sslExpiry = null;

        try {
            $ch = curl_init($url);

            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_NOBODY         => true,
                CURLOPT_TIMEOUT        => 10,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_SSL_VERIFYPEER => true,
                CURLOPT_SSL_VERIFYHOST => 2,
            ]);

            curl_exec($ch);

            $httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $isUp = ($httpStatus >= 200 && $httpStatus < 500) ? 1 : 0;

            $err = curl_error($ch);
            curl_close($ch);

            if ($err) {
                throw new Exception($err);
            }

            // SSL info (se for HTTPS)
            if (str_starts_with($url, 'https://')) {
                $ctx = stream_context_create(["ssl" => ["capture_peer_cert" => true]]);
                $client = @stream_socket_client(
                    "ssl://" . parse_url($url, PHP_URL_HOST) . ":443",
                    $errno,
                    $errstr,
                    5,
                    STREAM_CLIENT_CONNECT,
                    $ctx
                );

                if ($client) {
                    $params = stream_context_get_params($client);
                    if (!empty($params["options"]["ssl"]["peer_certificate"])) {
                        $cert = openssl_x509_parse($params["options"]["ssl"]["peer_certificate"]);
                        $sslValid = 1;
                        $sslExpiry = date('Y-m-d', $cert['validTo_time_t']);
                    }
                }
            }
        } catch (Throwable $e) {
            $isUp = 0;
        }

        $responseTimeMs = round((microtime(true) - $start) * 1000, 3);

        $db = Database::getConnection();
        $stmt = $db->prepare("
            INSERT INTO metrics 
                (target_id, checked_at, ping_ms, http_status, ssl_valid, ssl_expiry_date, is_up, response_time_ms)
            VALUES 
                (:target_id, NOW(), :ping_ms, :http_status, :ssl_valid, :ssl_expiry, :is_up, :response_time)
        ");

        $stmt->execute([
            'target_id'    => $targetId,
            'ping_ms'      => $responseTimeMs,
            'http_status'  => $httpStatus,
            'ssl_valid'    => $sslValid,
            'ssl_expiry'   => $sslExpiry,
            'is_up'        => $isUp,
            'response_time'=> $responseTimeMs
        ]);
    }
}