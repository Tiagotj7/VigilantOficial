<?php
require_once __DIR__ . '/../config/config.php';

class Database
{
    private static $instance = null; // ?PDO no PHP 8; usando genérico para compatibilidade

    public static function getConnection()
    {
        if (self::$instance === null) {
            $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
            try {
                self::$instance = new PDO($dsn, DB_USER, DB_PASS, [
                    PDO::ATTR_ERRMODE            => APP_DEBUG ? PDO::ERRMODE_EXCEPTION : PDO::ERRMODE_SILENT,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]);
            } catch (PDOException $e) {
                if (APP_DEBUG) {
                    die('Erro de conexão: ' . $e->getMessage());
                }
                die('Erro de conexão com o banco de dados.');
            }
        }
        return self::$instance;
    }
}