<?php
// public/cron_check.php
require_once __DIR__ . '/../app/config/config.php';
require_once __DIR__ . '/../app/models/Target.php';
require_once __DIR__ . '/../app/services/MonitorService.php';

// 🔐 Proteção por chave vinda do ENV
$expectedKey = CRON_KEY ?? null;

// Aceita key por CLI (--key=xxx) ou por GET (?key=xxx)
$key = null;

// Via CLI (cron real)
if (php_sapi_name() === 'cli') {
    foreach ($argv as $arg) {
        if (str_starts_with($arg, '--key=')) {
            $key = substr($arg, 6);
        }
    }
}

// Via navegador (debug)
if (!$key && isset($_GET['key'])) {
    $key = $_GET['key'];
}

if (!$expectedKey || $key !== $expectedKey) {
    http_response_code(403);
    echo 'Forbidden';
    exit;
}

date_default_timezone_set(APP_TIMEZONE ?? 'America/Sao_Paulo');

$targets = Target::allActive();

foreach ($targets as $t) {
    MonitorService::checkTarget((int)$t['id'], $t['url']);
}

echo 'OK';