<?php
require_once __DIR__ . '/../core/Database.php';

class Target
{
    public static function allByUser(int $userId): array
    {
        $db = Database::getConnection();
        $stmt = $db->prepare('SELECT * FROM targets WHERE user_id = :uid AND status = 1');
        $stmt->execute(['uid' => $userId]);
        return $stmt->fetchAll();
    }

    public static function create(int $userId, string $name, string $url): bool
    {
        $db = Database::getConnection();
        $stmt = $db->prepare('
            INSERT INTO targets (user_id, name, url, status)
            VALUES (:uid, :name, :url, 1)
        ');
        return $stmt->execute([
            'uid'  => $userId,
            'name' => $name,
            'url'  => $url
        ]);
    }

    public static function all(): array
    {
        $db = Database::getConnection();
        $stmt = $db->query('SELECT * FROM targets WHERE status = 1');
        return $stmt->fetchAll();
    }

    // ✅ NOVO MÉTODO PARA O CRON
    public static function allActive(): array
    {
        $db = Database::getConnection();
        $stmt = $db->query('SELECT * FROM targets WHERE status = 1');
        return $stmt->fetchAll();
    }
}