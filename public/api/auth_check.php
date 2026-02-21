<?php
require_once __DIR__ . '/../../app/core/Auth.php';

header('Content-Type: application/json; charset=utf-8');

echo json_encode([
    'authenticated' => Auth::check(),
    'user_id'       => Auth::userId(),
]);