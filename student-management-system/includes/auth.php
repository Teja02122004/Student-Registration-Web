<?php
/**
 * Student Registration and Course Management System
 * Authentication & Access Control
 * File: includes/auth.php
 */

declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Check if a student is currently logged in
 */
function isLoggedIn(): bool {
    return !empty($_SESSION['logged_in']) && !empty($_SESSION['student_id']);
}

/**
 * Get current logged in student session data
 */
function getCurrentStudent(): ?array {
    if (!isLoggedIn()) {
        return null;
    }
    return [
        'id'           => $_SESSION['user_db_id'] ?? null,
        'student_id'   => $_SESSION['student_id'] ?? '',
        'full_name'    => $_SESSION['student_name'] ?? '',
        'email'        => $_SESSION['student_email'] ?? '',
        'department'   => $_SESSION['student_department'] ?? '',
        'course_code'  => $_SESSION['student_course_code'] ?? '',
        'login_time'   => $_SESSION['login_time'] ?? '',
    ];
}

/**
 * Require authentication for protected pages (e.g. dashboard)
 */
function requireAuth(): void {
    if (!isLoggedIn()) {
        if (function_exists('setFlash')) {
            setFlash('warning', 'Please log in to access your student dashboard.');
        }
        header('Location: login.php');
        exit;
    }
}

/**
 * Redirect already logged-in users away from login/register pages
 */
function redirectIfLoggedIn(): void {
    if (isLoggedIn()) {
        header('Location: dashboard.php');
        exit;
    }
}

/**
 * Establish a secure session after successful credential verification
 */
function loginStudent(array $student): void {
    // Regenerate session ID to prevent session fixation attacks
    session_regenerate_id(true);

    $_SESSION['logged_in'] = true;
    $_SESSION['user_db_id'] = $student['id'];
    $_SESSION['student_id'] = $student['student_id'];
    $_SESSION['student_name'] = $student['full_name'];
    $_SESSION['student_email'] = $student['email'];
    $_SESSION['student_department'] = $student['department'];
    $_SESSION['student_course_code'] = $student['selected_course_code'];
    $_SESSION['login_time'] = time();
}

/**
 * Securely destroy session upon logout
 */
function logoutStudent(): void {
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }

    session_destroy();
}
