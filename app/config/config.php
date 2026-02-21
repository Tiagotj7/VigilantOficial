<?php
require_once __DIR__ . '/../core/Env.php';

// Carregar .env (um nível acima de app/)
Env::load(__DIR__ . '/../../.env');

define('DB_HOST',    Env::get('DB_HOST', 'localhost'));
define('DB_NAME',    Env::get('DB_NAME', 'vigilant'));
define('DB_USER',    Env::get('DB_USER', 'root'));
define('DB_PASS',    Env::get('DB_PASS', ''));
define('DB_CHARSET', Env::get('DB_CHARSET', 'utf8mb4'));

define('BASE_URL',   Env::get('BASE_URL', '/vigilant/public'));

define('APP_ENV',    Env::get('APP_ENV', 'local'));
define('APP_DEBUG',  Env::get('APP_DEBUG', 'true') === 'true');

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}