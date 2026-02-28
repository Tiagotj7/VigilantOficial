<?php
require_once __DIR__ . '/../app/core/Auth.php';

Auth::requireLogin();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Adicionar Alvo – Vigilant</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="layout" style="padding:40px;max-width:640px;margin:0 auto;">
    <h1>Adicionar primeiro alvo</h1>
    <p>Cadastre um site, API ou link para começar o monitoramento.</p>

    <form action="target_create.php" method="POST" class="card" style="padding:24px;">
        <div style="margin-bottom:12px;">
            <label>Nome do site</label>
            <input type="text" name="name" placeholder="Meu site" required>
        </div>

        <div style="margin-bottom:12px;">
            <label>URL</label>
            <input type="url" name="url" placeholder="https://exemplo.com" required>
        </div>

        <button type="submit" class="btn-primary">Salvar</button>
        <a href="dashboard.php" class="btn-secondary-outline">Cancelar</a>
    </form>
</div>
</body>
</html>