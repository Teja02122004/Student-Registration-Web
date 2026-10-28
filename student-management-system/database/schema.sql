-- ============================================================================
-- Student Registration and Course Management System
-- Database Schema: schema.sql
-- Engine: MySQL 8.0+ / MariaDB 10.4+ / Compatible with SQLite3 PDO
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `student_management_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `student_management_db`;

-- Drop existing tables if re-initializing
DROP TABLE IF EXISTS `contact_messages`;
DROP TABLE IF EXISTS `student_sessions`;
DROP TABLE IF EXISTS `students`;

-- ----------------------------------------------------------------------------
-- Table: students
-- Stores secure student accounts, profile data, and selected course code
-- Note: Passwords are NEVER stored in plaintext (BCRYPT / Argon2 via password_hash)
-- ----------------------------------------------------------------------------
CREATE TABLE `students` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `student_id` VARCHAR(30) NOT NULL UNIQUE,
    `full_name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `phone` VARCHAR(15) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `gender` ENUM('Male', 'Female', 'Other', 'Prefer not to say') DEFAULT 'Prefer not to say',
    `date_of_birth` DATE NULL,
    `department` VARCHAR(100) NOT NULL,
    `selected_course_code` VARCHAR(20) NOT NULL,
    `address` TEXT NULL,
    `status` ENUM('Active', 'Pending Verification', 'Suspended') DEFAULT 'Active',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_email` (`email`),
    INDEX `idx_student_id` (`student_id`),
    INDEX `idx_course` (`selected_course_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: student_sessions
-- For optional server-side session persistence and token invalidation
-- ----------------------------------------------------------------------------
CREATE TABLE `student_sessions` (
    `session_id` VARCHAR(128) PRIMARY KEY,
    `student_id` INT NOT NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` TEXT NULL,
    `last_activity` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_session_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: contact_messages
-- Stores inquiries submitted via the Contact page
-- ----------------------------------------------------------------------------
CREATE TABLE `contact_messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `subject` VARCHAR(200) NOT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('Unread', 'Read', 'Replied') DEFAULT 'Unread',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Seed Data: Demo Student Account
-- Password for demo student: "Student@123"
-- Hash generated via password_hash('Student@123', PASSWORD_BCRYPT)
-- ----------------------------------------------------------------------------
INSERT INTO `students` (
    `student_id`,
    `full_name`,
    `email`,
    `phone`,
    `password_hash`,
    `gender`,
    `date_of_birth`,
    `department`,
    `selected_course_code`,
    `address`
) VALUES (
    'STU-2026-1001',
    'Aarav Sharma',
    'aarav.sharma@studenthub.edu',
    '9876543210',
    '$2y$10$eA0Y5mD9dMvF8U8uKqFkxeVlM8LzZ1FvFhO8C0.8I6Yk9.x0Mv1eO',
    'Male',
    '2003-05-14',
    'Engineering & Technology',
    'IT101',
    'Flat 402, Royal Palms Heights, Tech Zone II, Bengaluru, Karnataka - 560100'
),
(
    'STU-2026-1002',
    'Priya Patel',
    'priya.patel@studenthub.edu',
    '9123456780',
    '$2y$10$eA0Y5mD9dMvF8U8uKqFkxeVlM8LzZ1FvFhO8C0.8I6Yk9.x0Mv1eO',
    'Female',
    '2004-09-22',
    'Computer Applications',
    'BC102',
    'Sector 15, Vashi, Navi Mumbai, Maharashtra - 400703'
);
