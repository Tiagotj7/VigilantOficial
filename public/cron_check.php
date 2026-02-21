<?php
require_once __DIR__ . '/../app/config/config.php';
require_once __DIR__ . '/../app/models/Target.php';
require_once __DIR__ . '/../app/services/MonitorService.php';

// Se quiser proteger com chave simples (?key=123)
$expectedKey = 'minha_chave_secreta'; // altere se quiser
if (isset($_GET['key']) && $_GET['key'] !== $expectedKey) {
    http_response_code(403);
    echo 'Forbidden';
    exit;
}

$targets = Target::all();
foreach ($targets as $t) {
    MonitorService::checkTarget((int)$t['id'], $t['url']);
}

echo 'OK';