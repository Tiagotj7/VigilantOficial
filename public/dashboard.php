<?php
require_once __DIR__ . '/../app/core/Auth.php';
require_once __DIR__ . '/../app/models/Target.php';
require_once __DIR__ . '/../app/models/Metric.php';
require_once __DIR__ . '/../app/core/Database.php';

Auth::requireLogin();

$userId = Auth::userId();

// Defesa extra
if (!$userId && session_status() === PHP_SESSION_NONE) {
    session_start();
    $userId = $_SESSION['user_id'] ?? null;
}

if (!$userId) {
    header('Location: login.php');
    exit;
}

$targets = Target::allByUser((int)$userId);
$summary = Metric::latestSummary((int)$userId) ?? [];

// Dados do usuário
$db = Database::getConnection();
$stmtUser = $db->prepare('SELECT name, email, profile_image FROM users WHERE id = :id LIMIT 1');
$stmtUser->execute(['id' => $userId]);
$user = $stmtUser->fetch() ?: [];

// Fallback
$displayName = $user['name']  ?? ($_SESSION['user_name']  ?? 'Usuário');
$displayMail = $user['email'] ?? ($_SESSION['user_email'] ?? '');

// Avatar
$avatarUrl = 'assets/img/avatar-default.png';
if (!empty($user['profile_image'])) {
    $candidate = 'assets/uploads/profile/' . $user['profile_image'];
    if (file_exists(__DIR__ . '/' . $candidate)) {
        $avatarUrl = $candidate;
    }
}

// Flags
$hasTargets = !empty($targets);
$hasMetrics = !empty($summary);

// KPIs
$uptimeSum = 0;
$uptimeCount = 0;
$latSum = 0;
$latCount = 0;
$sslOk = 0;
$sslTotal = 0;

foreach ($summary as $row) {
    if (isset($row['is_up'])) {
        $uptimeSum += $row['is_up'] ? 100 : 0;
        $uptimeCount++;
    }
    if (!empty($row['response_time_ms'])) {
        $latSum += (float)$row['response_time_ms'];
        $latCount++;
    }
    if ($row['ssl_valid'] !== null) {
        $sslTotal++;
        if ((int)$row['ssl_valid'] === 1) {
            $sslOk++;
        }
    }
}

$uptimeMedio   = $uptimeCount ? ($uptimeSum / $uptimeCount) : null;
$latenciaMedia = $latCount   ? ($latSum   / $latCount)   : null;
$sslValidade   = $sslTotal   ? (($sslOk / $sslTotal) * 100) : null;
?>
<!DOCTYPE html>
<html lang="pt-br" data-theme="light">
<head>
    <meta charset="UTF-8">
    <title>Vigilant – Monitoramento Inteligente de Sites</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
<div class="layout">
    <main class="main">
        <section id="section-main-dashboard" class="main-section">

            <header class="topbar hero-bar">
                <div>
                    <h1>Vigilant – Monitoramento Inteligente de Sites</h1>
                    <p>Visualize uptime, latência, SSL e atividade ao vivo em um único painel.</p>
                </div>
                <a href="profile.php" class="user-pill user-pill-link">
                    <span class="avatar-circle avatar-circle-img">
                        <img src="<?= htmlspecialchars($avatarUrl); ?>" alt="Avatar" class="avatar-img">
                    </span>
                    <div>
                        <div class="user-name"><?= htmlspecialchars($displayName); ?></div>
                        <div class="user-email"><?= htmlspecialchars($displayMail); ?></div>
                    </div>
                </a>
            </header>

            <!-- KPIs -->
            <section class="kpi-grid">
                <div class="kpi-card">
                    <p>Uptime Médio</p>
                    <h2><?= $uptimeMedio === null ? '--' : number_format($uptimeMedio, 2) . '%' ?></h2>
                </div>
                <div class="kpi-card">
                    <p>Latência Média</p>
                    <h2><?= $latenciaMedia === null ? '--' : number_format($latenciaMedia, 1) . ' ms' ?></h2>
                </div>
                <div class="kpi-card">
                    <p>SSL Válido</p>
                    <h2><?= $sslValidade === null ? '--' : number_format($sslValidade, 0) . '%' ?></h2>
                </div>
                <div class="kpi-card">
                    <p>Sites Monitorados</p>
                    <h2><?= count($targets); ?></h2>
                </div>
            </section>

            <!-- Estados -->
            <?php if (!$hasTargets): ?>
                <div class="card" style="text-align:center;padding:40px;">
                    <h3>📡 Nenhum site cadastrado ainda</h3>
                    <p>Adicione um site, API ou link para começar o monitoramento.</p>
                    <a href="add_target.php" class="btn-primary">Adicionar primeiro alvo</a>
                </div>

            <?php elseif (!$hasMetrics): ?>
                <div class="card" style="text-align:center;padding:40px;">
                    <h3>⏳ Aguardando primeira coleta</h3>
                    <p>Seu site foi cadastrado. Em alguns minutos o monitor irá coletar os primeiros dados.</p>
                </div>

            <?php else: ?>
                <section class="content-grid">
                    <div class="card large">
                        <div class="card-header">
                            <h3>Gráfico de Latência</h3>
                        </div>
                        <canvas id="latencyChart" height="120"></canvas>
                    </div>
                </section>
            <?php endif; ?>

        </section>
    </main>
</div>
</body>
</html>