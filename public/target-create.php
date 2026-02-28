// public/target-create.php
<?php
require_once __DIR__ . '/../app/core/Auth.php';
require_once __DIR__ . '/../app/models/Target.php';

Auth::requireLogin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $url  = trim($_POST['url'] ?? '');

    if ($name && $url) {
        Target::create([
            'user_id' => Auth::userId(),
            'name' => 'Vigilant',
            'url'  => 'https://httpstat.us/200'
        ]);
        header('Location: dashboard.php');
        exit;
    }

    $error = 'Preencha nome e URL.';
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Novo Site</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="auth-page">
    <form method="post" class="card auth-card">
        <h2>Adicionar Site</h2>

        <?php if (!empty($error)): ?>
            <p style="color:red"><?= $error ?></p>
        <?php endif; ?>

        <input type="text" name="name" placeholder="Nome do site" required>
        <input type="url" name="url" placeholder="https://exemplo.com" required>

        <button class="btn-primary full">Salvar</button>
        <a href="dashboard.php" class="btn-secondary-outline full">Cancelar</a>
    </form>
</body>
</html>