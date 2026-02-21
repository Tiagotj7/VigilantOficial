vigilant/
├── .env
├── app/
│   ├── config/
│   │   └── config.php
│   ├── core/
│   │   ├── Env.php
│   │   ├── Database.php
│   │   ├── Auth.php
│   │   └── Helpers.php  (opcional/vazio por enquanto)
│   ├── models/
│   │   ├── User.php
│   │   ├── Target.php
│   │   └── Metric.php
│   └── services/
│       └── MonitorService.php
├── database/
│   └── schema.sql
└── public/
    ├── index.php
    ├── login.php
    ├── logout.php
    ├── dashboard.php
    ├── cron_check.php
    ├── api/
    │   ├── metrics.php
    │   └── auth_check.php
    └── assets/
        ├── css/
        │   ├── auth.css
        │   └── style.css
        ├── js/
        │   └── charts.js
        └── img/
            ├── logo-vigilant.svg
            └── favicon.png