<?php
require_once __DIR__ . '/../core/Database.php';

class Metric
{
    public static function latestSummary(int $userId): array
    {
        $db = Database::getConnection();
        $sql = "
          SELECT t.id, t.name, t.url,
                 m.is_up, m.ping_ms, m.response_time_ms, m.http_status,
                 m.ssl_valid, m.ssl_expiry_date, m.checked_at
          FROM targets t
          JOIN (
            SELECT target_id, MAX(checked_at) AS last_check
            FROM metrics
            GROUP BY target_id
          ) x ON x.target_id = t.id
          JOIN metrics m ON m.target_id = t.id AND m.checked_at = x.last_check
          WHERE t.user_id = :uid and t.status = 1
          ORDER BY t.name
        ";
        $stmt = $db->prepare($sql);
        $stmt->execute(['uid' => $userId]);
        return $stmt->fetchAll();
    }

    public static function timeSeriesForTarget(int $targetId, string $from, string $to): array
    {
        $db = Database::getConnection();
        $stmt = $db->prepare(
            'SELECT checked_at, ping_ms, response_time_ms, is_up
             FROM metrics
             WHERE target_id = :tid AND checked_at BETWEEN :f AND :t
             ORDER BY checked_at'
        );
        $stmt->execute([
            'tid' => $targetId,
            'f'   => $from,
            't'   => $to
        ]);
        return $stmt->fetchAll();
    }
}