<?php
require_once __DIR__ . '/../app/core/Auth.php';
require_once __DIR__ . '/../app/models/Target.php';

// Garante sessão + login
Auth::requireLogin();

$userId = Auth::userId();

// Defesa extra (InfinityFree às vezes perde sessão se não iniciar antes do output)
if (!$userId && session_status() === PHP_SESSION_NONE) {
    session_start();
    $userId = $_SESSION['user_id'] ?? null;
}

if (!$userId) {
    http_response_code(401);
    exit('Erro: usuário não autenticado.');
}

// Só aceita POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Método não permitido');
}

// Inputs
$name = trim($_POST['name'] ?? '');
$url  = trim($_POST['url'] ?? '');

if ($name === '' || $url === '') {
    header('Location: dashboard.php?err=campos');
    exit;
}

if (!filter_var($url, FILTER_VALIDATE_URL)) {
    header('Location: dashboard.php?err=url');
    exit;
}

try {
    Target::create($userId, $name, $url);
    header('Location: dashboard.php?ok=1');
    exit;
} catch (Throwable $e) {
    // Debug temporário (se quiser ver o erro real)
    // die($e->getMessage());

    http_response_code(500);
    exit('Erro ao criar site.');
}