<?php
require_once __DIR__ . '/../core/Database.php';

class Target
{
    public static function allByUser(int $userId): array
    {
        $db = Database::getConnection();
        $stmt = $db->prepare('SELECT * FROM targets WHERE user_id = :uid AND is_active = 1');
        $stmt->execute(['uid' => $userId]);
        return $stmt->fetchAll();
    }

    public static function create(int $userId, string $name, string $url): bool
    {
        $db = Database::getConnection();
        $stmt = $db->prepare('INSERT INTO targets (user_id, name, url) VALUES (:uid, :name, :url)');
        return $stmt->execute([
            'uid'  => $userId,
            'name' => $name,
            'url'  => $url
        ]);
    }

    public static function all(): array
    {
        $db = Database::getConnection();
        $stmt = $db->query('SELECT * FROM targets WHERE is_active = 1');
        return $stmt->fetchAll();
    }
}