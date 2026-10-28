/**
 * Complete PHP Project Source Code Store
 * Allows interactive browsing, inspection, and 1-click ZIP downloading
 */

export const PHP_FILES_STORE: Record<string, string> = {
  'index.php': `<?php
/**
 * Student Registration and Course Management System
 * Page 1: Home Page
 */
$pageTitle = "Welcome to StudentHub | Student Registration & Course Portal";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/functions.php';

$allCourses = getCoursesFromXML();
$featuredCourses = array_slice($allCourses, 0, 4);
?>
<!-- Hero & Portal Content -->
<section class="hero-section py-5">
    <div class="container py-lg-4">
        <div class="row align-items-center g-5">
            <div class="col-lg-7">
                <h1 class="display-4 fw-extrabold text-slate-900 mb-3">Welcome to <span class="text-primary">StudentHub</span></h1>
                <p class="fs-4 text-purple fw-semibold mb-3">Learn More. Achieve More.</p>
                <p class="lead text-secondary mb-4">A seamless, unified academic portal empowering students to register securely, browse our XML-driven course catalog, enroll in programs, and track milestones on a personalized dashboard.</p>
                <div class="d-flex flex-wrap gap-3">
                    <a href="register.php" class="btn btn-gradient btn-lg px-4 shadow">Student Registration</a>
                    <a href="courses.php" class="btn btn-outline-primary btn-lg px-4">Explore Courses</a>
                </div>
            </div>
        </div>
    </div>
</section>
<?php require_once __DIR__ . '/includes/footer.php'; ?>`,

  'register.php': `<?php
/**
 * Student Registration and Course Management System
 * Page 2: Student Registration Form & Duplicate Check
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/auth.php';

redirectIfLoggedIn();
$courses = getCoursesFromXML();
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csrfToken = $_POST['csrf_token'] ?? '';
    if (!verifyCsrfToken($csrfToken)) {
        $errors[] = 'Invalid or expired CSRF token.';
    }

    $fullName = sanitize($_POST['full_name'] ?? '');
    $email = strtolower(trim($_POST['email'] ?? ''));
    $phone = trim($_POST['phone'] ?? '');
    $department = sanitize($_POST['department'] ?? '');
    $courseCode = sanitize($_POST['course_code'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';
    $terms = isset($_POST['terms_agreed']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email address.';
    if (!isValidIndianPhone($phone)) $errors[] = 'Invalid 10-digit Indian phone number.';
    if (strlen($password) < 8) $errors[] = 'Password must be at least 8 characters.';
    if ($password !== $confirmPassword) $errors[] = 'Passwords do not match.';
    if (!$terms) $errors[] = 'You must accept the terms.';

    if (empty($errors)) {
        $pdo = getDBConnection();
        $check = $pdo->prepare('SELECT id FROM students WHERE email = :email LIMIT 1');
        $check->execute([':email' => $email]);
        if ($check->fetch()) {
            $errors[] = 'Email already registered. Please login.';
        } else {
            $studentId = generateStudentId($pdo);
            $hash = password_hash($password, PASSWORD_BCRYPT);
            $stmt = $pdo->prepare('INSERT INTO students (student_id, full_name, email, phone, password_hash, department, selected_course_code) VALUES (?, ?, ?, ?, ?, ?, ?)');
            $stmt->execute([$studentId, $fullName, $email, $phone, $hash, $department, $courseCode]);
            setFlash('success', "Registered successfully! Your ID is {$studentId}. Please login.");
            header('Location: login.php');
            exit;
        }
    }
}
$pageTitle = "Student Registration";
require_once __DIR__ . '/includes/header.php';
?>
<!-- Registration UI Form -->
<?php require_once __DIR__ . '/includes/footer.php'; ?>`,

  'login.php': `<?php
/**
 * Student Registration and Course Management System
 * Page 3: Student Login & Session Establishment
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/auth.php';

redirectIfLoggedIn();
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = strtolower(trim($_POST['email'] ?? ''));
    $password = $_POST['password'] ?? '';

    $pdo = getDBConnection();
    $stmt = $pdo->prepare('SELECT * FROM students WHERE email = :email LIMIT 1');
    $stmt->execute([':email' => $email]);
    $student = $stmt->fetch();

    if ($student && password_verify($password, $student['password_hash'])) {
        loginStudent($student);
        setFlash('success', "Welcome back, " . htmlspecialchars($student['full_name']));
        header('Location: dashboard.php');
        exit;
    } else {
        $errors[] = 'Invalid email or password.';
    }
}
$pageTitle = "Student Login";
require_once __DIR__ . '/includes/header.php';
?>
<!-- Login Form UI with Show/Hide Password -->
<?php require_once __DIR__ . '/includes/footer.php'; ?>`,

  'logout.php': `<?php
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/auth.php';
logoutStudent();
setFlash('info', 'You have been safely logged out.');
header('Location: login.php');
exit;`,

  'courses.php': `<?php
/**
 * Student Registration and Course Management System
 * Page 4: Course Management with XML Retrieval
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/auth.php';

$courses = getCoursesFromXML();
$student = getCurrentStudent();
$pageTitle = "Course Catalog";
require_once __DIR__ . '/includes/header.php';
?>
<!-- Displays courses in Cards Grid and HTML Table from SimpleXML -->
<?php require_once __DIR__ . '/includes/footer.php'; ?>`,

  'course-details.php': `<?php
require_once __DIR__ . '/includes/functions.php';
$code = $_GET['code'] ?? 'IT101';
$course = getCourseByCode($code);
require_once __DIR__ . '/includes/header.php';
?>
<!-- Detailed Syllabus, Eligibility, and Fee breakdown -->
<?php require_once __DIR__ . '/includes/footer.php'; ?>`,

  'dashboard.php': `<?php
/**
 * Student Registration and Course Management System
 * Page 5: Protected Student Dashboard
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/auth.php';

requireAuth();
$pdo = getDBConnection();
$stmt = $pdo->prepare('SELECT * FROM students WHERE id = ?');
$stmt->execute([$_SESSION['user_db_id']]);
$student = $stmt->fetch();
$enrolledCourse = getCourseByCode($student['selected_course_code']);

$pageTitle = "Student Dashboard";
require_once __DIR__ . '/includes/header.php';
?>
<!-- Profile Card, Enrolled Course Card, Edit Profile Modal -->
<?php require_once __DIR__ . '/includes/footer.php'; ?>`,

  'about.php': `<?php
$pageTitle = "About StudentHub";
require_once __DIR__ . '/includes/header.php';
?>
<!-- Project Aim, Objectives, Technologies, and Benefits -->
<?php require_once __DIR__ . '/includes/footer.php'; ?>`,

  'contact.php': `<?php
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare('INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)');
    $stmt->execute([$_POST['name'], $_POST['email'], $_POST['subject'], $_POST['message']]);
    setFlash('success', 'Message submitted successfully.');
    header('Location: contact.php?status=sent');
    exit;
}
$pageTitle = "Contact Admissions";
require_once __DIR__ . '/includes/header.php';
?>
<!-- Contact Form & Campus Information -->
<?php require_once __DIR__ . '/includes/footer.php'; ?>`,

  'config/database.php': `<?php
declare(strict_types=1);

function getDBConnection(): PDO {
    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $db   = getenv('DB_NAME') ?: 'student_management_db';
    $user = getenv('DB_USER') ?: 'root';
    $pass = getenv('DB_PASS') ?: '';

    try {
        $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
        return new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    } catch (PDOException $e) {
        // Fallback to SQLite
        $sqlite = __DIR__ . '/../database/database.sqlite';
        return new PDO("sqlite:$sqlite", null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
}`,

  'includes/functions.php': `<?php
declare(strict_types=1);

function sanitize(string $data): string {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function isValidIndianPhone(string $phone): bool {
    return (bool) preg_match('/^[6-9]\\d{9}$/', trim($phone));
}

function generateStudentId(PDO $pdo): string {
    $stmt = $pdo->query("SELECT COUNT(*) AS total FROM students");
    $count = 1001 + (int)($stmt->fetch()['total'] ?? 0);
    return "STU-" . date('Y') . "-$count";
}

function getCoursesFromXML(): array {
    $xmlPath = __DIR__ . '/../data/courses.xml';
    if (!file_exists($xmlPath)) return [];
    $xml = simplexml_load_file($xmlPath);
    $courses = [];
    foreach ($xml->course as $c) {
        $courses[] = [
            'code' => (string)$c->code,
            'name' => (string)$c->name,
            'department' => (string)$c->department,
            'category' => (string)$c->category,
            'duration' => (string)$c->duration,
            'fee' => (int)$c->fee,
            'feeFormatted' => (string)$c->feeFormatted,
            'eligibility' => (string)$c->eligibility,
            'description' => (string)$c->description,
        ];
    }
    return $courses;
}

function getCourseByCode(string $code): ?array {
    foreach (getCoursesFromXML() as $c) {
        if (strcasecmp($c['code'], trim($code)) === 0) return $c;
    }
    return null;
}`,

  'includes/auth.php': `<?php
declare(strict_types=1);
if (session_status() === PHP_SESSION_NONE) session_start();

function isLoggedIn(): bool {
    return !empty($_SESSION['logged_in']) && !empty($_SESSION['student_id']);
}

function requireAuth(): void {
    if (!isLoggedIn()) {
        header('Location: login.php');
        exit;
    }
}

function loginStudent(array $student): void {
    session_regenerate_id(true);
    $_SESSION['logged_in'] = true;
    $_SESSION['user_db_id'] = $student['id'];
    $_SESSION['student_id'] = $student['student_id'];
    $_SESSION['student_name'] = $student['full_name'];
    $_SESSION['student_email'] = $student['email'];
    $_SESSION['student_course_code'] = $student['selected_course_code'];
}

function logoutStudent(): void {
    $_SESSION = [];
    session_destroy();
}`,

  'data/courses.xml': `<?xml version="1.0" encoding="UTF-8"?>
<courses>
  <course>
    <code>IT101</code>
    <name>B.Tech Information Technology</name>
    <department>Engineering &amp; Technology</department>
    <category>Undergraduate Engineering</category>
    <duration>4 Years</duration>
    <fee>85000</fee>
    <feeFormatted>₹85,000 / year</feeFormatted>
    <eligibility>10+2 with PCM (Min. 60% marks)</eligibility>
    <description>Comprehensive 4-year engineering curriculum focusing on enterprise software architecture, cloud networks, and full-stack development.</description>
  </course>
  <course>
    <code>BC102</code>
    <name>Bachelor of Computer Applications</name>
    <department>Computer Applications</department>
    <category>Undergraduate Computing</category>
    <duration>3 Years</duration>
    <fee>60000</fee>
    <feeFormatted>₹60,000 / year</feeFormatted>
    <eligibility>10+2 with Math or Computer (Min. 50% marks)</eligibility>
    <description>Industry-oriented 3-year undergraduate degree empowering students with programming skills, web applications, and database management.</description>
  </course>
  <course>
    <code>CS103</code>
    <name>B.Sc Computer Science</name>
    <department>Science &amp; Computing</department>
    <category>Undergraduate Science</category>
    <duration>3 Years</duration>
    <fee>50000</fee>
    <feeFormatted>₹50,000 / year</feeFormatted>
    <eligibility>10+2 with Math (Min. 50% marks)</eligibility>
    <description>Rigorous academic degree focusing on theoretical foundations of computing, algorithmic analysis, and system programming.</description>
  </course>
  <course>
    <code>MC104</code>
    <name>Master of Computer Applications</name>
    <department>Postgraduate Computing</department>
    <category>Postgraduate Masters</category>
    <duration>2 Years</duration>
    <fee>75000</fee>
    <feeFormatted>₹75,000 / year</feeFormatted>
    <eligibility>Graduation in BCA/B.Sc or Math background (Min. 55% marks)</eligibility>
    <description>Advanced postgraduate degree designed to prepare tech specialists for high-level software engineering and IT project leadership.</description>
  </course>
</courses>`,

  'database/schema.sql': `CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(30) NOT NULL UNIQUE,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    gender ENUM('Male', 'Female', 'Other', 'Prefer not to say') DEFAULT 'Prefer not to say',
    date_of_birth DATE NULL,
    department VARCHAR(100) NOT NULL,
    selected_course_code VARCHAR(20) NOT NULL,
    address TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,

  'README.md': `# Student Registration & Course Management System (PHP 8+ & XML)
Drop folder into XAMPP/htdocs and open http://localhost/student-management-system/`
};
