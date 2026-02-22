<?php
require_once __DIR__ . '/../app/core/Auth.php';
require_once __DIR__ . '/../app/models/User.php';
require_once __DIR__ . '/../app/core/Database.php';

Auth::requireLogin();
$userId = Auth::userId();

$db = Database::getConnection();
$stmt = $db->prepare('SELECT * FROM users WHERE id = :id LIMIT 1');
$stmt->execute(['id' => $userId]);
$user = $stmt->fetch();

if (!$user) {
    // Se algo der muito errado
    header('Location: logout.php');
    exit;
}

$error = null;
$success = null;

// Atualizar dados básicos (nome, email)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_profile') {
    $name  = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');

    if ($name === '' || $email === '') {
        $error = 'Nome e e-mail são obrigatórios.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Informe um e-mail válido.';
    } else {
        try {
            // Verifica se já existe outro usuário com esse e-mail
            $stmtCheck = $db->prepare('SELECT id FROM users WHERE email = :email AND id <> :id LIMIT 1');
            $stmtCheck->execute(['email' => $email, 'id' => $userId]);
            if ($stmtCheck->fetch()) {
                $error = 'Já existe outro usuário com esse e-mail.';
            } else {
                $stmtUpdate = $db->prepare('UPDATE users SET name = :name, email = :email WHERE id = :id');
                $stmtUpdate->execute([
                    'name' => $name,
                    'email' => $email,
                    'id' => $userId,
                ]);

                $_SESSION['user_name']  = $name;
                $_SESSION['user_email'] = $email;

                $success = 'Perfil atualizado com sucesso.';
                $user['name']  = $name;
                $user['email'] = $email;
            }
        } catch (Exception $e) {
            $error = APP_DEBUG ? 'Erro ao atualizar perfil: ' . $e->getMessage() : 'Erro ao atualizar perfil.';
        }
    }
}

// Trocar senha
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'change_password') {
    $current = trim($_POST['current_password'] ?? '');
    $new     = trim($_POST['new_password'] ?? '');
    $confirm = trim($_POST['confirm_password'] ?? '');

    if ($current === '' || $new === '' || $confirm === '') {
        $error = 'Preencha todos os campos de senha.';
    } elseif (hash('sha256', $current) !== $user['password_hash']) {
        $error = 'Senha atual incorreta.';
    } elseif (strlen($new) < 6) {
        $error = 'A nova senha deve ter pelo menos 6 caracteres.';
    } elseif ($new !== $confirm) {
        $error = 'A confirmação de senha não confere.';
    } else {
        try {
            $stmtPass = $db->prepare('UPDATE users SET password_hash = SHA2(:password, 256) WHERE id = :id');
            $stmtPass->execute([
                'password' => $new,
                'id'       => $userId,
            ]);
            $success = 'Senha alterada com sucesso.';
        } catch (Exception $e) {
            $error = APP_DEBUG ? 'Erro ao alterar senha: ' . $e->getMessage() : 'Erro ao alterar senha.';
        }
    }
}

// Upload de foto de perfil
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'upload_avatar') {
    if (!isset($_FILES['avatar']) || $_FILES['avatar']['error'] !== UPLOAD_ERR_OK) {
        $error = 'Erro ao enviar a imagem.';
    } else {
        $file = $_FILES['avatar'];

        // Validar tipo mime básico (png/jpg/jpeg)
        $allowed = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!in_array($file['type'], $allowed, true)) {
            $error = 'A imagem deve ser PNG ou JPG.';
        } else {
            // Criar pasta uploads se não existir
            $uploadDir = __DIR__ . '/assets/uploads/profile';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0775, true);
            }

            $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
            $ext = strtolower($ext);
            if (!in_array($ext, ['png', 'jpg', 'jpeg'], true)) {
                $ext = 'png';
            }

            $fileName = 'user_' . $userId . '.' . $ext;
            $destPath = $uploadDir . '/' . $fileName;

            if (move_uploaded_file($file['tmp_name'], $destPath)) {
                // Salvar nome do arquivo no banco
                $stmtAvatar = $db->prepare('UPDATE users SET profile_image = :img WHERE id = :id');
                $stmtAvatar->execute([
                    'img' => $fileName,
                    'id'  => $userId,
                ]);

                $user['profile_image'] = $fileName;
                $success = 'Foto de perfil atualizada.';
            } else {
                $error = 'Não foi possível salvar a imagem enviada.';
            }
        }
    }
}

// Caminho da imagem de perfil atual (ou inicial)
$avatarUrl = 'assets/img/avatar-default.png'; // coloque um default nessa pasta
if (!empty($user['profile_image'])) {
    $avatarUrlCandidate = 'assets/uploads/profile/' . $user['profile_image'];
    if (file_exists(__DIR__ . '/' . $avatarUrlCandidate)) {
        $avatarUrl = $avatarUrlCandidate;
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br" data-theme="light">
<head>
    <meta charset="UTF-8">
    <title>Meu Perfil - Vigilant</title>
    <link rel="stylesheet" href="assets/css/style.css">

    <!-- Favicons (se quiser) -->
    <link rel="apple-touch-icon" sizes="180x180" href="assets/img/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon-16x16.png">
    <link rel="icon" href="assets/img/favicon.ico" type="image/x-icon">
    <link rel="manifest" href="assets/img/site.webmanifest">
    <meta name="theme-color" content="#0f172a">

    <style>
        .profile-page{
            max-width:720px;
            margin:0 auto;
            padding-top:20px;
        }
        .profile-header{
            display:flex;
            align-items:center;
            gap:16px;
            margin-bottom:20px;
        }
        .profile-avatar{
            width:72px;
            height:72px;
            border-radius:999px;
            overflow:hidden;
            border:2px solid var(--border-soft);
        }
        .profile-avatar img{
            width:100%;
            height:100%;
            object-fit:cover;
        }
        .profile-name{
            font-size:20px;
            font-weight:600;
        }
        .profile-email{
            font-size:13px;
            color:var(--text-sub);
        }
        .profile-grid{
            display:grid;
            grid-template-columns:1.2fr 1fr;
            gap:16px;
        }
        .profile-card{
            background:var(--bg-card);
            border-radius:18px;
            padding:14px 16px;
            box-shadow:var(--shadow-soft);
            border:1px solid var(--border-soft);
            margin-bottom:16px;
        }
        .profile-card h3{
            font-size:15px;
            margin-bottom:10px;
        }
        .profile-card label{
            display:block;
            font-size:13px;
            color:var(--text-sub);
            margin-bottom:4px;
        }
        .profile-card input{
            width:100%;
            padding:8px 10px;
            border-radius:8px;
            border:1px solid var(--border-soft);
            font-size:14px;
            margin-bottom:10px;
            background:transparent;
            color:var(--text-main);
        }
        .btn-primary-sm{
            padding:7px 16px;
            border-radius:999px;
            border:none;
            cursor:pointer;
            font-size:13px;
            font-weight:500;
            background:linear-gradient(135deg,#06b6d4,#3b82f6);
            color:white;
        }
        .alert-inline{
            font-size:13px;
            margin-bottom:8px;
        }
        .alert-inline.error{
            color:#b91c1c;
        }
        .alert-inline.success{
            color:#15803d;
        }
    </style>
</head>
<body>
<div class="layout">
    <aside class="sidebar">
        <div class="sidebar-header">
            <img src="assets/img/LogoVigilant.png" alt="Vigilant" height="80">
            <span class="app-name">Vigilant</span>
        </div>
        <nav class="sidebar-nav">
            <p class="nav-section">Menu</p>
            <a href="dashboard.php" class="nav-item">Dashboard</a>
            <a href="#" class="nav-item">Alvos</a>
            <a href="#" class="nav-item">Relatórios</a>
            <a href="#" class="nav-item">Alertas</a>
            <p class="nav-section">Geral</p>
            <a href="profile.php" class="nav-item active">Meu Perfil</a>
            <a href="logout.php" class="nav-item">Sair</a>
        </nav>
        <div class="sidebar-upgrade">
            <h4>Upgrade para Pro</h4>
            <p>Desbloqueie alertas avançados, múltiplos projetos e retenção estendida.</p>
            <button class="btn-primary full">Upgrade agora</button>
        </div>
    </aside>

    <main class="main">
        <div class="profile-page">
            <div class="profile-header">
                <div class="profile-avatar">
                    <img src="<?= htmlspecialchars($avatarUrl); ?>" alt="Foto de perfil">
                </div>
                <div>
                    <div class="profile-name"><?= htmlspecialchars($user['name']); ?></div>
                    <div class="profile-email"><?= htmlspecialchars($user['email']); ?></div>
                </div>
            </div>

            <?php if ($error): ?>
                <div class="alert-inline error"><?= htmlspecialchars($error); ?></div>
            <?php endif; ?>
            <?php if ($success): ?>
                <div class="alert-inline success"><?= htmlspecialchars($success); ?></div>
            <?php endif; ?>

            <div class="profile-grid">
                <!-- Dados básicos -->
                <div>
                    <div class="profile-card">
                        <h3>Dados do perfil</h3>
                        <form method="post">
                            <input type="hidden" name="action" value="update_profile">
                            <label>Nome</label>
                            <input type="text" name="name" value="<?= htmlspecialchars($user['name']); ?>" required>

                            <label>E-mail</label>
                            <input type="email" name="email" value="<?= htmlspecialchars($user['email']); ?>" required>

                            <button type="submit" class="btn-primary-sm">Salvar alterações</button>
                        </form>
                    </div>

                    <div class="profile-card">
                        <h3>Alterar senha</h3>
                        <form method="post">
                            <input type="hidden" name="action" value="change_password">
                            <label>Senha atual</label>
                            <input type="password" name="current_password" required>

                            <label>Nova senha</label>
                            <input type="password" name="new_password" required>

                            <label>Confirmar nova senha</label>
                            <input type="password" name="confirm_password" required>

                            <button type="submit" class="btn-primary-sm">Alterar senha</button>
                        </form>
                    </div>
                </div>

                <!-- Foto de perfil -->
                <div>
                    <div class="profile-card">
                        <h3>Foto de perfil</h3>
                        <form method="post" enctype="multipart/form-data">
                            <input type="hidden" name="action" value="upload_avatar">
                            <label>Selecionar imagem (PNG ou JPG)</label>
                            <input type="file" name="avatar" accept="image/png, image/jpeg" required>
                            <button type="submit" class="btn-primary-sm" style="margin-top:6px;">Atualizar foto</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>

<script src="assets/js/main.js"></script>
</body>
</html>