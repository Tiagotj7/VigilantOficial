async function fetchMetrics() {
    try {
        const res = await fetch('api/metrics.php');
        if (!res.ok) return null;
        return await res.json();
    } catch (e) {
        console.error(e);
        return null;
    }
}

function buildCharts(payload) {
    if (!payload || !payload.series || payload.series.length === 0) {
        return;
    }

    const colors = ['#2563eb', '#22c55e', '#f97316', '#a855f7', '#e11d48'];
    const ctxUptime = document.getElementById('chart-uptime').getContext('2d');
    const ctxPerf   = document.getElementById('chart-performance').getContext('2d');
    const ctxStatus = document.getElementById('chart-status').getContext('2d');

    const labels = payload.series[0].points.map(p => p.checked_at);

    const uptimeDatasets = payload.series.map((s, i) => ({
        label: s.target,
        data: s.points.map(p => (p.is_up === 1 || p.is_up === "1") ? 100 : 0),
        borderColor: colors[i % colors.length],
        backgroundColor: 'transparent',
        tension: 0.3,
    }));

    new Chart(ctxUptime, {
        type: 'line',
        data: { labels, datasets: uptimeDatasets },
        options: {
            plugins: { legend: { display: true } },
            scales: {
                y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } }
            }
        }
    });

    const perfDatasets = payload.series.map((s, i) => ({
        label: s.target,
        data: s.points.map(p => p.response_time_ms),
        borderColor: colors[i % colors.length],
        backgroundColor: 'transparent',
        tension: 0.3,
    }));

    new Chart(ctxPerf, {
        type: 'line',
        data: { labels, datasets: perfDatasets },
        options: { plugins: { legend: { display: true } } }
    });

    // KPIs + status pie
    let upCount = 0, downCount = 0;
    let allRespTimes = [];

    payload.series.forEach(s => {
        const pts = s.points;
        if (!pts.length) return;
        const last = pts[pts.length - 1];
        if (last.is_up === 1 || last.is_up === "1") upCount++; else downCount++;

        pts.forEach(p => {
            if (p.response_time_ms != null) {
                allRespTimes.push(parseFloat(p.response_time_ms));
            }
        });
    });

    const total = upCount + downCount || 1;
    document.getElementById('kpi-uptime').innerText =
        ((upCount / total) * 100).toFixed(0) + '%';

    if (allRespTimes.length > 0) {
        const avg = allRespTimes.reduce((a,b) => a + b, 0) / allRespTimes.length;
        document.getElementById('kpi-response').innerText = avg.toFixed(1) + ' ms';
    }

    new Chart(ctxStatus, {
        type: 'doughnut',
        data: {
            labels: ['Online', 'Offline'],
            datasets: [{
                data: [upCount, downCount],
                backgroundColor: ['#22c55e', '#ef4444']
            }]
        }
    });

    // SSL KPI (simples: conta quantos pontos recentes têm ssl_valid=1)
    let sslOk = 0, sslTotal = 0;
    payload.series.forEach(s => {
        const pts = s.points;
        pts.forEach(p => {
            if (p.ssl_valid === 1 || p.ssl_valid === "1") {
                sslOk++;
                sslTotal++;
            } else if (p.ssl_valid === 0 || p.ssl_valid === "0") {
                sslTotal++;
            }
        });
    });
    if (sslTotal > 0) {
        const percSsl = (sslOk / sslTotal) * 100;
        const el = document.getElementById('kpi-ssl');
        if (el) el.innerText = percSsl.toFixed(0) + '%';
    }
}

(async () => {
    const payload = await fetchMetrics();
    buildCharts(payload || { series: [] });
})();