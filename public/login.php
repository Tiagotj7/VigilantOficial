<?php
require_once __DIR__ . '/../app/core/Auth.php';

$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $pass  = trim($_POST['password'] ?? '');

    if (Auth::login($email, $pass)) {
        header('Location: dashboard.php');
        exit;
    } else {
        $error = 'Credenciais inválidas.';
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Login - Vigilant</title>
    <link rel="stylesheet" href="assets/css/auth.css">

<!-- Favicons -->
<link rel="apple-touch-icon" sizes="180x180" href="assets/img/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon-16x16.png">
<link rel="icon" href="assets/img/favicon.ico" type="image/x-icon">

<!-- PWA / Android -->
<link rel="manifest" href="assets/img/site.webmanifest">
<meta name="theme-color" content="#0f172a">

</head>
<body class="hero-bg">
<div class="auth-card">
    <h2>Entrar no Vigilant</h2>
    <?php if ($error): ?>
        <div class="alert-error"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <form method="post">
        <label>E-mail</label>
        <input type="email" name="email" required value="admin@vigilant.local">
        <label>Senha</label>
        <input type="password" name="password" required value="admin123">
        <button type="submit" class="btn-primary full">Entrar</button>
    </form>
</div>

<script src="assets/js/main.js"></script>

</body>
</html>