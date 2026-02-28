<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/Database.php';

class Auth
{
    private static function ensureSession(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public static function login(string $email, string $password): bool
    {
        self::ensureSession();

        $db = Database::getConnection();
        $stmt = $db->prepare('SELECT * FROM users WHERE email = :email AND status = 1 LIMIT 1');
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();

        if (!$user) {
            return false;
        }

        // senha salva como SHA2 no schema.sql
        if (hash('sha256', $password) !== $user['password_hash']) {
            return false;
        }

        $_SESSION['user_id']    = (int)$user['id'];
        $_SESSION['user_name']  = $user['name'];
        $_SESSION['user_email'] = $user['email'];

        return true;
    }

    public static function check(): bool
    {
        self::ensureSession();
        return isset($_SESSION['user_id']);
    }

    public static function userId(): ?int
    {
        self::ensureSession();
        return $_SESSION['user_id'] ?? null;
    }

    public static function logout(): void
    {
        self::ensureSession();
        session_unset();
        session_destroy();
    }

    public static function requireLogin(): void
    {
        self::ensureSession();

        if (!self::check()) {
            header('Location: login.php');
            exit;
        }
    }
}