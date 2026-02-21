<?php
require_once __DIR__ . '/../app/core/Auth.php';
require_once __DIR__ . '/../app/models/Target.php';
require_once __DIR__ . '/../app/models/Metric.php';

Auth::requireLogin();
$userId  = Auth::userId();
$targets = Target::allByUser($userId);
$summary = Metric::latestSummary($userId);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Vigilant - Dashboard</title>
    <link rel="stylesheet" href="assets/css/style.css">

<!-- Favicons -->
<link rel="apple-touch-icon" sizes="180x180" href="assets/img/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon-16x16.png">
<link rel="icon" href="assets/img/favicon.ico" type="image/x-icon">

<!-- PWA / Android -->
<link rel="manifest" href="assets/img/site.webmanifest">
<meta name="theme-color" content="#0f172a">

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
<div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <img src="assets/img/LogoVigilant.png" alt="Vigilant" height="50">
            <span class="app-name">Vigilant</span>
        </div>
        <nav class="sidebar-nav">
            <p class="nav-section">Menu</p>
            <a href="#" class="nav-item active">Dashboard</a>
            <a href="#" class="nav-item">Alvos</a>
            <a href="#" class="nav-item">Relatórios</a>
            <a href="#" class="nav-item">Alertas</a>
            <p class="nav-section">Geral</p>
            <a href="#" class="nav-item">Configurações</a>
            <a href="logout.php" class="nav-item">Sair</a>
        </nav>
        <div class="sidebar-upgrade">
            <h4>Upgrade para Pro</h4>
            <p>Desbloqueie alertas avançados, múltiplos projetos e retenção estendida.</p>
            <button class="btn-primary full">Upgrade agora</button>
        </div>
    </aside>

    <!-- Main -->
    <main class="main">
        <header class="topbar">
            <div>
                <h1>Analytics &amp; Reports</h1>
                <p>Insights em tempo real sobre suas aplicações monitoradas</p>
            </div>
            <div class="topbar-right">
                <input type="search" class="search" placeholder="Pesquisar...">
                <div class="user-pill">
                    <span class="avatar-circle">
                        <?= strtoupper(substr($_SESSION['user_name'] ?? 'A', 0, 1)); ?>
                    </span>
                    <div>
                        <div class="user-name"><?= htmlspecialchars($_SESSION['user_name'] ?? 'Admin'); ?></div>
                        <div class="user-email"><?= htmlspecialchars($_SESSION['user_email'] ?? 'admin@vigilant.local'); ?></div>
                    </div>
                </div>
            </div>
        </header>

        <!-- KPIs -->
        <section class="kpi-grid">
            <div class="kpi-card">
                <p>Taxa de Uptime</p>
                <h2 id="kpi-uptime">--%</h2>
                <span class="kpi-sub">Últimas 24h</span>
            </div>
            <div class="kpi-card">
                <p>Tempo médio de resposta</p>
                <h2 id="kpi-response">-- ms</h2>
                <span class="kpi-sub">Últimas 24h</span>
            </div>
            <div class="kpi-card">
                <p>Alvos monitorados</p>
                <h2><?= count($targets); ?></h2>
                <span class="kpi-sub">Ativos</span>
            </div>
            <div class="kpi-card">
                <p>Certificados SSL OK</p>
                <h2 id="kpi-ssl">--%</h2>
                <span class="kpi-sub">Válidos</span>
            </div>
        </section>

        <!-- Charts / grids -->
        <section class="content-grid">
            <div class="card large">
                <div class="card-header">
                    <h3>Uptime por alvo (últimos 7 dias)</h3>
                </div>
                <canvas id="chart-uptime"></canvas>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>Tendência de performance</h3>
                </div>
                <canvas id="chart-performance"></canvas>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>Status atual dos alvos</h3>
                </div>
                <table class="table">
                    <thead>
                    <tr>
                        <th>Alvo</th>
                        <th>URL</th>
                        <th>Status</th>
                        <th>HTTP</th>
                        <th>Resposta (ms)</th>
                        <th>SSL</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($summary as $row): ?>
                        <tr>
                            <td><?= htmlspecialchars($row['name']); ?></td>
                            <td><?= htmlspecialchars($row['url']); ?></td>
                            <td>
                                <span class="badge <?= $row['is_up'] ? 'badge-success' : 'badge-danger'; ?>">
                                    <?= $row['is_up'] ? 'Online' : 'Offline'; ?>
                                </span>
                            </td>
                            <td><?= $row['http_status'] ?: '-'; ?></td>
                            <td><?= $row['response_time_ms'] ? number_format($row['response_time_ms'], 1) : '-'; ?></td>
                            <td>
                                <?php if ($row['ssl_valid'] === null): ?>
                                    <span class="badge badge-muted">N/A</span>
                                <?php elseif ($row['ssl_valid']): ?>
                                    <span class="badge badge-success">Válido</span>
                                <?php else: ?>
                                    <span class="badge badge-danger">Inválido</span>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    <?php if (empty($summary)): ?>
                        <tr><td colspan="6">Nenhum dado coletado ainda.</td></tr>
                    <?php endif; ?>
                    </tbody>
                </table>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>Distribuição de status</h3>
                </div>
                <canvas id="chart-status"></canvas>
            </div>
        </section>
    </main>
</div>

<script>
    const BASE_URL = '<?= BASE_URL ?>';
</script>
<script src="assets/js/charts.js"></script>
<script src="assets/js/main.js"></script>

</body>
</html>