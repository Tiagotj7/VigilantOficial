<?php
require_once __DIR__ . '/../core/Database.php';

class User
{
    public static function findById(int $id)
    {
        $db = Database::getConnection();
        $stmt = $db->prepare('SELECT * FROM users WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }
}