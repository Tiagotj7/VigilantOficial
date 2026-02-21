<?php

class Env
{
    private static $loaded = false;

    private static function startsWith($haystack, $needle) {
        return substr($haystack, 0, strlen($needle)) === $needle;
    }

    private static function endsWith($haystack, $needle) {
        if ($needle === '') return true;
        return substr($haystack, -strlen($needle)) === $needle;
    }

    public static function load(string $path): void
    {
        if (self::$loaded) {
            return;
        }

        if (!file_exists($path)) {
            return;
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);

            // Ignorar comentários
            if ($line === '' || self::startsWith($line, '#')) {
                continue;
            }

            $parts = explode('=', $line, 2);
            if (count($parts) !== 2) {
                continue;
            }

            $name  = trim($parts[0]);
            $value = trim($parts[1]);

            // remover aspas se existirem
            if ((self::startsWith($value, '"') && self::endsWith($value, '"')) ||
                (self::startsWith($value, "'") && self::endsWith($value, "'"))) {
                $value = substr($value, 1, -1);
            }

            if (!array_key_exists($name, $_ENV) && getenv($name) === false) {
                putenv("$name=$value");
                $_ENV[$name]    = $value;
                $_SERVER[$name] = $value;
            }
        }

        self::$loaded = true;
    }

    public static function get(string $key, ?string $default = null): ?string
    {
        $value = $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key);
        if ($value === false || $value === null) {
            return $default;
        }
        return $value;
    }
}