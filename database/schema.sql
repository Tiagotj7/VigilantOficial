CREATE DATABASE IF NOT EXISTS vigilant
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE vigilant;

-- Usuários
CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1, -- 1 = ativo, 0 = inativo/bloqueado
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Alvos monitorados (sites/aplicações)
CREATE TABLE targets (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    name VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1, -- 1 = ativo, 0 = inativo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Métricas coletadas
CREATE TABLE metrics (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    target_id INT UNSIGNED NOT NULL,
    checked_at DATETIME NOT NULL,
    ping_ms DECIMAL(8,3) NULL,         -- tempo de resposta
    http_status INT NULL,
    ssl_valid TINYINT(1) NULL,
    ssl_expiry_date DATE NULL,
    is_up TINYINT(1) NOT NULL DEFAULT 0, -- 1 = alvo estava online no momento da coleta
    response_time_ms DECIMAL(8,3) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (target_id) REFERENCES targets(id) ON DELETE CASCADE,
    INDEX idx_target_checked (target_id, checked_at)
) ENGINE=InnoDB;

-- Sessões de login (opcional)
CREATE TABLE user_tokens (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    token VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY (token)
) ENGINE=InnoDB;

-- Usuário de teste
INSERT INTO users (name, email, password_hash, status)
VALUES ('Admin', 'admin@vigilant.local', SHA2('admin123', 256), 1);

ALTER TABLE users
ADD COLUMN profile_image VARCHAR(255) NULL AFTER status;

ALTER TABLE metrics 
ADD INDEX idx_checked_at (checked_at);

ALTER TABLE targets 
ADD INDEX idx_user_status (user_id, status);

CREATE TABLE targets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);