<?php
/**
 * Student Registration and Course Management System
 * Database Connection Configuration (PDO)
 * File: config/database.php
 */

declare(strict_types=1);

// Configuration Constants
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'student_management_db');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('DB_CHARSET', 'utf8mb4');

/**
 * Get PDO Database Connection
 * Returns a robust PDO instance with error mode exception and prepared statement emulation disabled.
 * Gracefully falls back to local SQLite if MySQL extension or server is unreachable.
 *
 * @return PDO
 */
function getDBConnection(): PDO {
    static $pdoInstance = null;

    if ($pdoInstance !== null) {
        return $pdoInstance;
    }

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::ATTR_PERSISTENT         => false,
    ];

    try {
        $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=%s', DB_HOST, DB_PORT, DB_NAME, DB_CHARSET);
        $pdoInstance = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdoInstance;
    } catch (PDOException $e) {
        // Fallback to local SQLite file for seamless zero-config local testing
        try {
            $sqlitePath = __DIR__ . '/../database/database.sqlite';
            $isNew = !file_exists($sqlitePath);
            $pdoInstance = new PDO('sqlite:' . $sqlitePath, null, null, $options);
            
            if ($isNew) {
                // Initialize SQLite schema
                $pdoInstance->exec("
                    CREATE TABLE IF NOT EXISTS students (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        student_id TEXT UNIQUE NOT NULL,
                        full_name TEXT NOT NULL,
                        email TEXT UNIQUE NOT NULL,
                        phone TEXT NOT NULL,
                        password_hash TEXT NOT NULL,
                        gender TEXT DEFAULT 'Prefer not to say',
                        date_of_birth TEXT,
                        department TEXT NOT NULL,
                        selected_course_code TEXT NOT NULL,
                        address TEXT,
                        status TEXT DEFAULT 'Active',
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    );
                    CREATE TABLE IF NOT EXISTS contact_messages (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        email TEXT NOT NULL,
                        subject TEXT NOT NULL,
                        message TEXT NOT NULL,
                        status TEXT DEFAULT 'Unread',
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    );
                ");
            }
            return $pdoInstance;
        } catch (PDOException $sqliteEx) {
            die('Database Connection Error: ' . htmlspecialchars($e->getMessage()));
        }
    }
}
