<?php
require_once __DIR__ . '/../app/core/Auth.php';
require_once __DIR__ . '/../app/models/Target.php';
require_once __DIR__ . '/../app/models/Metric.php';

Auth::requireLogin();
$userId  = Auth::userId();
$targets = Target::allByUser($userId);
$summary = Metric::latestSummary($userId);

// KPIs básicos calculados a partir do resumo
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

$uptimeMedio   = $uptimeCount ? $uptimeSum / $uptimeCount : 99.44;
$latenciaMedia = $latCount   ? $latSum   / $latCount   : 182;
$sslValidade   = $sslTotal   ? ($sslOk / $sslTotal) * 100 : 100;

$displayName = $_SESSION['user_name']  ?? 'Usuário';
$displayMail = $_SESSION['user_email'] ?? '';
?>
<!DOCTYPE html>
<html lang="pt-br" data-theme="light">
<head>
    <meta charset="UTF-8">
    <title>Vigilant – Monitoramento Inteligente de Sites</title>
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
            <img src="assets/img//LogoVigilant.png" alt="Vigilant" height="80">
            <span class="app-name">Vigilant</span>
        </div>
        <nav class="sidebar-nav">
            <p class="nav-section">Principal</p>
            <a href="#" class="nav-item active" data-section="dashboard">Dashboard</a>
            <a href="#" class="nav-item" data-section="meus-sites">Meus Sites</a>
            <a href="#" class="nav-item" data-section="relatorios">Relatórios</a>
            <a href="#" class="nav-item" data-section="atividade">Atividade</a>
            <a href="#" class="nav-item" data-section="documentacao">Documentação</a>

            <p class="nav-section">Geral</p>
            <a href="profile.php" class="nav-item">Meu Perfil</a>
            <a href="logout.php" class="nav-item">Sair</a>
        </nav>
        <div class="sidebar-upgrade">
            <h4>Upgrade para Pro</h4>
            <p>Monitoramento avançado, múltiplas regiões e suporte 24/7.</p>
            <button class="btn-primary full">Upgrade agora</button>
        </div>
    </aside>

    <!-- Main -->
    <main class="main">
        <!-- ================= DASHBOARD (VISÃO GERAL) ================= -->
        <section id="section-main-dashboard" class="main-section">
            <!-- HERO -->
            <header class="topbar hero-bar">
                <div>
                    <h1>Vigilant – Monitoramento Inteligente de Sites</h1>
                    <p>Visualize uptime, latência, SSL e atividade ao vivo em um único painel.</p>
                </div>
                <div class="topbar-right">
                    <!-- Botão de tema -->
                    <button class="theme-toggle" id="themeToggle" type="button">
                        <span class="theme-icon theme-icon-sun">☀</span>
                        <span class="theme-icon theme-icon-moon">🌙</span>
                    </button>
                    <!-- Bloco do usuário -->
                    <a href="profile.php" class="user-pill user-pill-link">
                        <span class="avatar-circle">
                            <?= strtoupper(mb_substr($displayName, 0, 1, 'UTF-8')); ?>
                        </span>
                        <div>
                            <div class="user-name"><?= htmlspecialchars($displayName); ?></div>
                            <div class="user-email"><?= htmlspecialchars($displayMail); ?></div>
                        </div>
                    </a>
                </div>
            </header>

            <!-- HERO CARDS -->
            <section class="hero-stats-grid">
                <div class="hero-stat-card">
                    <p>Regiões Monitoradas</p>
                    <h2>12</h2>
                    <span>América, Europa, Ásia &amp; Oceania</span>
                </div>
                <div class="hero-stat-card">
                    <p>Latência Média Global</p>
                    <h2><?= number_format($latenciaMedia, 0); ?> ms</h2>
                    <span>Últimas 24 horas</span>
                </div>
                <div class="hero-stat-card">
                    <p>Suporte</p>
                    <h2>24/7</h2>
                    <span>Equipe dedicada</span>
                </div>
            </section>

            <!-- KPIs -->
            <section class="kpi-grid">
                <div class="kpi-card">
                    <p>Uptime Médio</p>
                    <h2 id="kpi-uptime"><?= number_format($uptimeMedio, 2); ?>%</h2>
                    <span class="kpi-sub">Baseado nos últimos checks</span>
                </div>
                <div class="kpi-card">
                    <p>Latência Média</p>
                    <h2 id="kpi-response"><?= number_format($latenciaMedia, 1); ?> ms</h2>
                    <span class="kpi-sub">Respostas HTTP</span>
                </div>
                <div class="kpi-card">
                    <p>Certificados SSL Válidos</p>
                    <h2 id="kpi-ssl"><?= number_format($sslValidade, 0); ?>%</h2>
                    <span class="kpi-sub">Entre os seus sites</span>
                </div>
                <div class="kpi-card">
                    <p>Sites Monitorados</p>
                    <h2><?= count($targets); ?></h2>
                    <span class="kpi-sub">Ativos na conta</span>
                </div>
            </section>

            <!-- GRID PRINCIPAL -->
            <section class="content-grid">
                <!-- Gráfico de latência -->
                <div class="card large">
                    <div class="card-header">
                        <h3>Gráfico de Latência (exemplo)</h3>
                    </div>
                    <canvas id="latencyChart" height="120"></canvas>
                </div>

                <!-- Terminal / Atividade ao vivo -->
                <div class="card">
                    <div class="card-header">
                        <h3>Atividade ao Vivo</h3>
                        <span class="badge badge-success">Ao vivo</span>
                    </div>
                    <p style="font-size:12px;color:var(--text-sub);margin-bottom:6px;">
                        Log de últimas verificações: uptime, ping, requisições e SSL.
                    </p>
                    <pre class="terminal" id="terminalLogs"></pre>
                    <div style="display:flex;gap:8px;margin-top:8px;">
                        <button class="btn-primary full" id="btnCopyLogs" style="padding:6px 0;font-size:13px;">
                            Copiar Logs
                        </button>
                        <button class="btn-secondary-outline" id="btnClearLogs" style="padding:6px 0;font-size:13px;">
                            Limpar
                        </button>
                    </div>
                </div>

                <!-- Status atual dos sites -->
                <div class="card">
                    <div class="card-header">
                        <h3>Status Atual dos Sites</h3>
                    </div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Site</th>
                            <th>URL</th>
                            <th>Status</th>
                            <th>HTTP</th>
                            <th>Ping (ms)</th>
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

                <!-- Funcionalidades -->
                <div class="card">
                    <div class="card-header">
                        <h3>Funcionalidades do Vigilant</h3>
                    </div>
                    <ul class="feature-list">
                        <li>
                            <strong>Monitoramento em tempo real</strong>
                            <span>Verificações contínuas de uptime e performance.</span>
                        </li>
                        <li>
                            <strong>Alertas inteligentes</strong>
                            <span>Notificações por e-mail, SMS ou webhooks quando algo sair do ar.</span>
                        </li>
                        <li>
                            <strong>Analytics avançados</strong>
                            <span>Gráficos de latência, disponibilidade e erros HTTP.</span>
                        </li>
                        <li>
                            <strong>API REST</strong>
                            <span>Integre o Vigilant ao seu stack com endpoints seguros.</span>
                        </li>
                        <li>
                            <strong>Monitoramento SSL</strong>
                            <span>Acompanhe validade, erros de certificado e renovações.</span>
                        </li>
                        <li>
                            <strong>Regiões distribuídas</strong>
                            <span>Simule usuários de diferentes regiões do mundo.</span>
                        </li>
                    </ul>
                </div>
            </section>
        </section>

        <!-- ================= MEUS SITES ================= -->
        <section id="section-main-meus-sites" class="main-section" style="display:none;">
            <div class="section-block-header">
                <h2>Meus Sites</h2>
                <button class="btn-primary-sm" type="button">+ Adicionar Site</button>
            </div>
            <p class="section-block-sub">
                Lista dos sites monitorados com uptime, ping e validade do SSL.
            </p>

            <div class="card">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>URL</th>
                        <th>Uptime</th>
                        <th>Ping</th>
                        <th>SSL</th>
                        <th>Último check</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($summary as $row): ?>
                        <tr>
                            <td><?= htmlspecialchars($row['name']); ?></td>
                            <td><?= htmlspecialchars($row['url']); ?></td>
                            <td><?= $row['is_up'] ? '99.9%' : '98.4%'; ?></td>
                            <td><?= $row['response_time_ms'] ? number_format($row['response_time_ms'], 0).' ms' : '—'; ?></td>
                            <td>
                                <?php if ($row['ssl_valid'] === null): ?>
                                    <span class="badge badge-muted">N/A</span>
                                <?php elseif ($row['ssl_valid']): ?>
                                    <span class="badge badge-success">Válido</span>
                                <?php else: ?>
                                    <span class="badge badge-danger">Inválido</span>
                                <?php endif; ?>
                            </td>
                            <td><?= $row['checked_at'] ?: '—'; ?></td>
                        </tr>
                    <?php endforeach; ?>
                    <?php if (empty($summary)): ?>
                        <tr><td colspan="6">Nenhum site cadastrado ainda.</td></tr>
                    <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- ================= RELATÓRIOS ================= -->
        <section id="section-main-relatorios" class="main-section" style="display:none;">
            <div class="section-block-header">
                <h2>Relatórios</h2>
                <button class="btn-outline-sm" type="button">Exportar CSV</button>
            </div>
            <p class="section-block-sub">
                Resumo de uptime, latência e erros HTTP por período.
            </p>

            <div class="card reports-grid">
                <div class="report-card">
                    <h3>Últimas 24 horas</h3>
                    <p>Uptime médio: <?= number_format($uptimeMedio, 2); ?>%</p>
                    <p>Latência média: <?= number_format($latenciaMedia, 1); ?> ms</p>
                    <p>Erros HTTP 5xx: 2</p>
                </div>
                <div class="report-card">
                    <h3>Últimos 7 dias</h3>
                    <p>Uptime médio: 99.85%</p>
                    <p>Latência média: 196 ms</p>
                    <p>Erros HTTP 5xx: 12</p>
                </div>
                <div class="report-card">
                    <h3>Últimos 30 dias</h3>
                    <p>Uptime médio: 99.92%</p>
                    <p>Latência média: 205 ms</p>
                    <p>Erros HTTP 5xx: 34</p>
                </div>
            </div>
        </section>

        <!-- ================= ATIVIDADE ================= -->
        <section id="section-main-atividade" class="main-section" style="display:none;">
            <div class="section-block-header">
                <h2>Atividade</h2>
            </div>
            <p class="section-block-sub">
                Histórico de eventos e verificações recentes.
            </p>

            <div class="card">
                <ul class="activity-list">
                    <li>
                        <span class="activity-badge ok">OK</span>
                        <div>
                            <p>Verificação bem sucedida em <strong>api.exemplo.com</strong></p>
                            <span>há 2 min • HTTP 200 • 145 ms</span>
                        </div>
                    </li>
                    <li>
                        <span class="activity-badge warn">ALERTA</span>
                        <div>
                            <p>Intermitência detectada em <strong>loja.exemplo.com</strong></p>
                            <span>há 8 min • HTTP 503 • 3 tentativas</span>
                        </div>
                    </li>
                    <li>
                        <span class="activity-badge info">INFO</span>
                        <div>
                            <p>Certificado renovado para <strong>dashboard.exemplo.com</strong></p>
                            <span>há 1 hora • Válido até 2026-12-31</span>
                        </div>
                    </li>
                    <li>
                        <span class="activity-badge ok">OK</span>
                        <div>
                            <p>Verificação global concluída</p>
                            <span>há 3 horas • 12 regiões • 99.95% uptime</span>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <!-- ================= DOCUMENTAÇÃO ================= -->
        <section id="section-main-documentacao" class="main-section" style="display:none;">
            <div class="section-block-header">
                <h2>Documentação</h2>
            </div>
            <p class="section-block-sub">
                Guia rápido de integração e uso da API REST do Vigilant.
            </p>

            <div class="card">
                <h3 style="font-size:15px;margin-bottom:6px;">API REST</h3>
                <p style="font-size:13px;color:var(--text-sub);margin-bottom:10px;">
                    Use a nossa API para integrar o Vigilant ao seu backend, dashboards internos
                    ou ferramentas de automação.
                </p>

                <div class="doc-block">
                    <p class="doc-label">Endpoint base</p>
                    <code class="doc-code">https://api.vigilant.com/v1</code>
                </div>

                <div class="doc-block">
                    <p class="doc-label">Autenticação</p>
                    <p class="doc-text">Autenticação via header <code>Authorization: Bearer SEU_TOKEN</code>.</p>
                </div>

                <div class="doc-block">
                    <p class="doc-label">Exemplo: listar sites monitorados</p>
                    <code class="doc-code">
GET /sites
Host: api.vigilant.com
Authorization: Bearer SEU_TOKEN
                    </code>
                </div>

                <div class="doc-block">
                    <p class="doc-label">Exemplo: métricas de latência por site</p>
                    <code class="doc-code">
GET /sites/{id}/metrics?from=2026-02-01&amp;to=2026-02-22
Host: api.vigilant.com
Authorization: Bearer SEU_TOKEN
                    </code>
                </div>

                <div class="doc-block">
                    <p class="doc-label">Webhooks</p>
                    <p class="doc-text">
                        Configure webhooks para receber eventos quando um site ficar offline,
                        quando o SSL estiver para expirar ou quando a latência ultrapassar um limite.
                    </p>
                </div>

                <div class="doc-block">
                    <p class="doc-label">Mais detalhes</p>
                    <p class="doc-text">
                        Para documentação completa, exemplos de código e SDKs em várias linguagens,
                        acesse: <a href="#" class="doc-link">docs.vigilant.com</a>
                    </p>
                </div>
            </div>
        </section>
    </main>
</div>

<script src="assets/js/main.js"></script>
<script>
// ===== Terminal / Atividade ao vivo no DASHBOARD =====
const logs = [
    "[14:32:15] GET https://api.exemplo.com → 200 OK (145ms) [São Paulo]",
    "[14:32:45] SSL Check: exemplo.com - Válido até 2025-12-31",
    "[14:33:15] GET https://dashboard.exemplo.com → 200 OK (234ms) [Virgínia]",
    "[14:33:45] Ping exemplo.com (Europa) → 182ms",
    "[14:34:15] GET https://loja.exemplo.com → 503 Service Unavailable",
    "[14:34:45] ALERTA: loja.exemplo.com offline - HTTP 503",
    "[14:35:15] Tentativa de reconexão (1/3) para loja.exemplo.com",
    "[14:35:45] GET https://loja.exemplo.com → 200 OK (567ms) [São Paulo]",
    "[14:36:15] SSL Check: api.exemplo.com - Válido"
];
const term = document.getElementById('terminalLogs');
const btnCopy = document.getElementById('btnCopyLogs');
const btnClear = document.getElementById('btnClearLogs');

if (term) {
    logs.forEach(line => {
        const span = document.createElement('span');
        span.className = (line.includes("503") || line.includes("ALERTA")) ? 'log-error' : 'log-ok';
        span.textContent = line + "\n";
        term.appendChild(span);
    });
    term.scrollTop = term.scrollHeight;

    let idx = logs.length;
    setInterval(() => {
        const line = logs[idx % logs.length];
        const span = document.createElement('span');
        span.className = (line.includes("503") || line.includes("ALERTA")) ? 'log-error' : 'log-ok';
        span.textContent = line + "\n";
        term.appendChild(span);
        term.scrollTop = term.scrollHeight;
        idx++;
    }, 4000);
}

if (btnCopy && term) {
    btnCopy.addEventListener('click', async () => {
        try {
            const text = term.innerText;
            await navigator.clipboard.writeText(text);
            btnCopy.textContent = 'Copiado!';
            setTimeout(() => btnCopy.textContent = 'Copiar Logs', 1500);
        } catch (e) {}
    });
}
if (btnClear && term) {
    btnClear.addEventListener('click', () => {
        term.innerHTML = '';
    });
}

// ===== Gráfico de latência (exemplo) =====
const ctxLat = document.getElementById('latencyChart')?.getContext('2d');
if (ctxLat) {
    const labels = [];
    const data = [];
    for (let i = 0; i < 24; i++) {
        labels.push(i + 'h');
        data.push(150 + Math.round(Math.random() * 80 - 40));
    }
    new Chart(ctxLat, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Latência Média (ms)',
                data,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37,99,235,0.12)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            animation: { duration: 800 },
            plugins:{ legend:{ display:false } },
            scales:{
                x:{ display:true, ticks:{ font:{ size:10 } } },
                y:{ beginAtZero:false }
            }
        }
    });
}
</script>
</body>
</html>