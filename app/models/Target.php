<?php

// app/models/Target.php

require_once __DIR__ . '/../core/Database.php';

class Target
{
    /**
     * Criar um novo alvo (site/API) para o usuário
     */
    public static function create(array $data)
    {
        $db = Database::getConnection();

        $stmt = $db->prepare("
            INSERT INTO targets (user_id, name, url, is_active, created_at)
            VALUES (:user_id, :name, :url, 1, NOW())
        ");

        return $stmt->execute([
            'user_id' => (int)$data['user_id'],
            'name'    => trim($data['name']),
            'url'     => trim($data['url']),
        ]);
    }

    /**
     * Listar todos os alvos ativos do usuário
     */
    public static function allByUser(int $userId): array
    {
        $db = Database::getConnection();

        $stmt = $db->prepare("
            SELECT id, name, url, is_active, created_at
            FROM targets
            WHERE user_id = :user_id
              AND is_active = 1
            ORDER BY id DESC
        ");

        $stmt->execute(['user_id' => $userId]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    /**
     * Buscar um alvo específico por ID (do usuário)
     */
    public static function findById(int $id, int $userId): ?array
    {
        $db = Database::getConnection();

        $stmt = $db->prepare("
            SELECT id, name, url, is_active, created_at
            FROM targets
            WHERE id = :id
              AND user_id = :user_id
            LIMIT 1
        ");

        $stmt->execute([
            'id' => $id,
            'user_id' => $userId
        ]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row ?: null;
    }

    /**
     * Atualizar nome e URL do alvo
     */
    public static function update(int $id, int $userId, array $data): bool
    {
        $db = Database::getConnection();

        $stmt = $db->prepare("
            UPDATE targets
            SET name = :name,
                url  = :url
            WHERE id = :id
              AND user_id = :user_id
        ");

        return $stmt->execute([
            'id' => $id,
            'user_id' => $userId,
            'name' => trim($data['name']),
            'url'  => trim($data['url']),
        ]);
    }

    /**
     * Desativar (soft delete)
     */
    public static function deactivate(int $id, int $userId): bool
    {
        $db = Database::getConnection();

        $stmt = $db->prepare("
            UPDATE targets
            SET is_active = 0
            WHERE id = :id
              AND user_id = :user_id
        ");

        return $stmt->execute([
            'id' => $id,
            'user_id' => $userId
        ]);
    }

    /**
     * Deletar permanentemente (opcional)
     */
    public static function delete(int $id, int $userId): bool
    {
        $db = Database::getConnection();

        $stmt = $db->prepare("
            DELETE FROM targets
            WHERE id = :id
              AND user_id = :user_id
        ");

        return $stmt->execute([
            'id' => $id,
            'user_id' => $userId
        ]);
    }

    /**
     * Contar quantos alvos o usuário tem
     */
    public static function countByUser(int $userId): int
    {
        $db = Database::getConnection();

        $stmt = $db->prepare("
            SELECT COUNT(*) as total
            FROM targets
            WHERE user_id = :user_id
              AND is_active = 1
        ");

        $stmt->execute(['user_id' => $userId]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return (int)($row['total'] ?? 0);
    }
}