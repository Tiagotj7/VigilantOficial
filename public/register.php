<?php
require_once __DIR__ . '/../app/core/Database.php';
require_once __DIR__ . '/../app/config/config.php';

// Inicializa variáveis
$error = null;
$success = null;
$name = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name  = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $pass  = trim($_POST['password'] ?? '');
    $pass2 = trim($_POST['password_confirmation'] ?? '');

    // Validações simples
    if ($name === '' || $email === '' || $pass === '' || $pass2 === '') {
        $error = 'Preencha todos os campos.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Informe um e-mail válido.';
    } elseif (strlen($pass) < 6) {
        $error = 'A senha deve ter pelo menos 6 caracteres.';
    } elseif ($pass !== $pass2) {
        $error = 'As senhas não conferem.';
    } else {
        try {
            $db = Database::getConnection();

            // Verifica se e-mail já existe
            $stmt = $db->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
            $stmt->execute(['email' => $email]);
            if ($stmt->fetch()) {
                $error = 'Já existe um usuário com esse e-mail.';
            } else {
                // Cria novo usuário (usando SHA2 igual ao usuário admin inicial)
                $stmt = $db->prepare('
                    INSERT INTO users (name, email, password_hash)
                    VALUES (:name, :email, SHA2(:password, 256))
                ');
                $stmt->execute([
                    'name'     => $name,
                    'email'    => $email,
                    'password' => $pass,
                ]);

                $success = 'Conta criada com sucesso! Você já pode fazer login.';
                // Limpa campos
                $name = '';
                $email = '';
            }
        } catch (Exception $e) {
            if (APP_DEBUG) {
                $error = 'Erro ao registrar: ' . $e->getMessage();
            } else {
                $error = 'Erro ao registrar. Tente novamente mais tarde.';
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Registrar - Vigilant</title>
    <link rel="stylesheet" href="assets/css/auth.css">
    <!-- Favicons (opcional, se já tiver) -->
    <link rel="apple-touch-icon" sizes="180x180" href="assets/img/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon-16x16.png">
    <link rel="icon" href="assets/img/favicon.ico" type="image/x-icon">
    <link rel="manifest" href="assets/img/site.webmanifest">
    <meta name="theme-color" content="#0f172a">
</head>
<body class="hero-bg">
<div class="auth-card">
    <h2>Criar conta no Vigilant</h2>

    <?php if ($error): ?>
        <div class="alert-error"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>

    <?php if ($success): ?>
        <div class="alert-success"><?= htmlspecialchars($success) ?></div>
    <?php endif; ?>

    <form method="post" action="register.php">
        <label>Nome</label>
        <input type="text" name="name" required value="<?= htmlspecialchars($name) ?>">

        <label>E-mail</label>
        <input type="email" name="email" required value="<?= htmlspecialchars($email) ?>">

        <label>Senha</label>
        <input type="password" name="password" required>

        <label>Confirmar senha</label>
        <input type="password" name="password_confirmation" required>

        <button type="submit" class="btn-primary full">Registrar</button>
    </form>

    <p class="auth-switch">
        Já tem conta?
        <a href="login.php">Entrar</a>
    </p>
</div>
</body>
</html>