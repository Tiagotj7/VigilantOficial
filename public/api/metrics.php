<?php
require_once __DIR__ . '/../../app/core/Auth.php';
require_once __DIR__ . '/../../app/models/Metric.php';
require_once __DIR__ . '/../../app/models/Target.php';

header('Content-Type: application/json; charset=utf-8');

if (!Auth::check()) {
    http_response_code(401);
    echo json_encode(['error' => 'unauthorized']);
    exit;
}

date_default_timezone_set(APP_TIMEZONE ?? 'America/Sao_Paulo');

$userId = (int) Auth::userId();
$targets = Target::allByUser($userId);

$now = new DateTime('now');
$from = (clone $now)->modify('-7 days');

$data = [];

foreach ($targets as $t) {
    $rows = Metric::timeSeriesForTarget(
        (int)$t['id'],
        $from->format('Y-m-d H:i:s'),
        $now->format('Y-m-d H:i:s')
    );

    $data[] = [
        'target' => $t['name'],
        'id'     => (int)$t['id'],
        'points' => $rows,
    ];
}

echo json_encode(['series' => $data], JSON_UNESCAPED_UNICODE);