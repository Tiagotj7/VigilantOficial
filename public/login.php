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