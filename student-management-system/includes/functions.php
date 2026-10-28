<?php
/**
 * Student Registration and Course Management System
 * Helper Utilities & XML Parser Functions
 * File: includes/functions.php
 */

declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Sanitize user input string
 */
function sanitize(string $data): string {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

/**
 * Generate CSRF Token
 */
function generateCsrfToken(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF Token
 */
function verifyCsrfToken(?string $token): bool {
    if (empty($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Set Flash Message
 */
function setFlash(string $type, string $message): void {
    $_SESSION['flash'] = [
        'type' => $type, // 'success', 'danger', 'warning', 'info'
        'message' => $message,
    ];
}

/**
 * Get Flash Message (and clear it)
 */
function getFlash(): ?array {
    if (isset($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}

/**
 * Validate Indian 10-digit mobile number
 */
function isValidIndianPhone(string $phone): bool {
    // Standard Indian mobile number: 10 digits starting with 6, 7, 8, or 9
    return (bool) preg_match('/^[6-9]\d{9}$/', trim($phone));
}

/**
 * Generate unique Student ID
 * Format: STU-YEAR-XXXX
 */
function generateStudentId(PDO $pdo): string {
    $year = date('Y');
    $prefix = "STU-{$year}-";
    
    $stmt = $pdo->query("SELECT COUNT(*) AS total FROM students");
    $count = (int) ($stmt->fetch()['total'] ?? 0) + 1001;
    
    return $prefix . str_pad((string)$count, 4, '0', STR_PAD_LEFT);
}

/**
 * Load and Parse Courses from XML File
 * Uses PHP SimpleXML for fast, reliable XML parsing
 *
 * @return array<int, array<string, mixed>>
 */
function getCoursesFromXML(): array {
    $xmlPath = __DIR__ . '/../data/courses.xml';
    
    if (!file_exists($xmlPath)) {
        return [];
    }

    $xml = simplexml_load_file($xmlPath, 'SimpleXMLElement', LIBXML_NOCDATA);
    if ($xml === false) {
        return [];
    }

    $courses = [];
    foreach ($xml->course as $c) {
        $syllabus = [];
        if (isset($c->syllabus->topic)) {
            foreach ($c->syllabus->topic as $topic) {
                $syllabus[] = (string) $topic;
            }
        }

        $courses[] = [
            'code'                => (string) $c->code,
            'name'                => (string) $c->name,
            'department'          => (string) $c->department,
            'category'            => (string) $c->category,
            'duration'            => (string) $c->duration,
            'fee'                 => (int) $c->fee,
            'feeFormatted'        => (string) $c->feeFormatted,
            'eligibility'         => (string) $c->eligibility,
            'description'         => (string) $c->description,
            'seats'               => (int) ($c->seats ?? 60),
            'rating'              => (float) ($c->rating ?? 4.8),
            'icon'                => (string) ($c->icon ?? 'BookOpen'),
            'badge'               => (string) ($c->badge ?? ''),
            'syllabus'            => $syllabus,
            'careerOpportunities' => (string) ($c->careerOpportunities ?? ''),
        ];
    }

    return $courses;
}

/**
 * Find single course by course code from XML
 */
function getCourseByCode(string $code): ?array {
    $courses = getCoursesFromXML();
    foreach ($courses as $course) {
        if (strcasecmp($course['code'], trim($code)) === 0) {
            return $course;
        }
    }
    return null;
}
