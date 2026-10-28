<?php
/**
 * Student Registration and Course Management System
 * Page 2: Student Registration
 * File: register.php
 */

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/auth.php';

redirectIfLoggedIn();

$courses = getCoursesFromXML();
$selectedCourseParam = trim($_GET['course'] ?? '');

$errors = [];
$formData = [
    'full_name'     => '',
    'email'         => '',
    'phone'         => '',
    'gender'        => '',
    'date_of_birth' => '',
    'department'    => '',
    'course_code'   => $selectedCourseParam,
    'address'       => '',
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. Verify CSRF Token
    $csrfToken = $_POST['csrf_token'] ?? '';
    if (!verifyCsrfToken($csrfToken)) {
        $errors[] = 'Security token expired or invalid. Please try submitting again.';
    }

    // 2. Extract and Sanitize Inputs
    $formData['full_name']     = sanitize($_POST['full_name'] ?? '');
    $formData['email']         = strtolower(trim($_POST['email'] ?? ''));
    $formData['phone']         = trim($_POST['phone'] ?? '');
    $formData['gender']        = sanitize($_POST['gender'] ?? 'Prefer not to say');
    $formData['date_of_birth'] = sanitize($_POST['date_of_birth'] ?? '');
    $formData['department']    = sanitize($_POST['department'] ?? '');
    $formData['course_code']   = sanitize($_POST['course_code'] ?? '');
    $formData['address']       = sanitize($_POST['address'] ?? '');
    $password                  = $_POST['password'] ?? '';
    $confirmPassword           = $_POST['confirm_password'] ?? '';
    $termsAgreed               = isset($_POST['terms_agreed']);

    // 3. Server-Side Validation
    if (empty($formData['full_name']) || strlen($formData['full_name']) < 2) {
        $errors[] = 'Please enter your complete legal name.';
    }

    if (empty($formData['email']) || !filter_var($formData['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Please enter a valid academic/personal email address.';
    }

    if (!isValidIndianPhone($formData['phone'])) {
        $errors[] = 'Please enter a valid 10-digit Indian phone number (starts with 6-9).';
    }

    if (strlen($password) < 8) {
        $errors[] = 'Password must be at least 8 characters long.';
    }

    if ($password !== $confirmPassword) {
        $errors[] = 'Password and Confirm Password do not match.';
    }

    if (empty($formData['department'])) {
        $errors[] = 'Please select your academic department.';
    }

    if (empty($formData['course_code'])) {
        $errors[] = 'Please select a course to register.';
    } else {
        // Validate against XML course catalog
        $courseObj = getCourseByCode($formData['course_code']);
        if (!$courseObj) {
            $errors[] = 'Invalid course selected. Please pick a valid course from our catalog.';
        }
    }

    if (!$termsAgreed) {
        $errors[] = 'You must agree to the academic terms and conditions.';
    }

    // 4. Duplicate Email Check & Secure Storage
    if (empty($errors)) {
        try {
            $pdo = getDBConnection();

            // Check if email already registered
            $checkStmt = $pdo->prepare('SELECT id FROM students WHERE email = :email LIMIT 1');
            $checkStmt->execute([':email' => $formData['email']]);
            
            if ($checkStmt->fetch()) {
                $errors[] = 'An account with this email address already exists. Please login instead.';
            } else {
                // Generate secure Student ID and hash password
                $newStudentId = generateStudentId($pdo);
                $passwordHash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

                $insertStmt = $pdo->prepare('
                    INSERT INTO students (
                        student_id, full_name, email, phone, password_hash,
                        gender, date_of_birth, department, selected_course_code, address
                    ) VALUES (
                        :student_id, :full_name, :email, :phone, :password_hash,
                        :gender, :date_of_birth, :department, :selected_course_code, :address
                    )
                ');

                $insertStmt->execute([
                    ':student_id'            => $newStudentId,
                    ':full_name'             => $formData['full_name'],
                    ':email'                 => $formData['email'],
                    ':phone'                 => $formData['phone'],
                    ':password_hash'         => $passwordHash,
                    ':gender'                => $formData['gender'],
                    ':date_of_birth'         => !empty($formData['date_of_birth']) ? $formData['date_of_birth'] : null,
                    ':department'            => $formData['department'],
                    ':selected_course_code'  => $formData['course_code'],
                    ':address'               => $formData['address'],
                ]);

                // Flash success message and redirect to login
                setFlash('success', "Registration successful! Your Student ID is {$newStudentId}. Please log in.");
                header('Location: login.php?registered=true&email=' . urlencode($formData['email']));
                exit;
            }
        } catch (PDOException $e) {
            $errors[] = 'Database error during registration: ' . htmlspecialchars($e->getMessage());
        }
    }
}

$pageTitle = "Student Registration";
require_once __DIR__ . '/includes/header.php';
?>

<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
            <!-- Header Card -->
            <div class="text-center mb-4">
                <div class="brand-icon mx-auto mb-3" style="width: 48px; height: 48px; font-size: 1.5rem;">
                    <i class="bi bi-mortarboard-fill"></i>
                </div>
                <h2 class="fw-extrabold text-slate-900">Student Portal Registration</h2>
                <p class="text-secondary">Join StudentHub to access courses, submit coursework, and view grades.</p>
            </div>

            <!-- Error Alerts -->
            <?php if (!empty($errors)): ?>
                <div class="alert alert-danger shadow-sm mb-4" role="alert">
                    <h6 class="fw-bold mb-2"><i class="bi bi-exclamation-triangle-fill me-2"></i>Please correct the following:</h6>
                    <ul class="mb-0 ps-3">
                        <?php foreach ($errors as $error): ?>
                            <li><?= htmlspecialchars($error) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <!-- Form Card -->
            <div class="card card-custom p-4 p-md-5 shadow-sm border">
                <form id="studentRegisterForm" method="POST" action="register.php" novalidate>
                    <input type="hidden" name="csrf_token" value="<?= generateCsrfToken() ?>">

                    <div class="row g-3">
                        <!-- Full Name -->
                        <div class="col-md-6">
                            <label for="full_name" class="form-label fw-semibold">Full Legal Name <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-person"></i></span>
                                <input type="text" class="form-control" id="full_name" name="full_name" placeholder="e.g. Aarav Sharma" value="<?= htmlspecialchars($formData['full_name']) ?>" required>
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="col-md-6">
                            <label for="email" class="form-label fw-semibold">Student Email Address <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                                <input type="email" class="form-control" id="email" name="email" placeholder="student@example.edu" value="<?= htmlspecialchars($formData['email']) ?>" required>
                            </div>
                            <div class="form-text">Must be unique; used as your login username.</div>
                        </div>

                        <!-- Phone -->
                        <div class="col-md-6">
                            <label for="phone" class="form-label fw-semibold">Phone Number (10 digits) <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text">+91</span>
                                <input type="tel" class="form-control" id="phone" name="phone" placeholder="9876543210" maxlength="10" value="<?= htmlspecialchars($formData['phone']) ?>" required>
                            </div>
                            <div class="form-text">10-digit Indian mobile number.</div>
                        </div>

                        <!-- Department -->
                        <div class="col-md-6">
                            <label for="department" class="form-label fw-semibold">Academic Department <span class="text-danger">*</span></label>
                            <select class="form-select" id="department" name="department" required>
                                <option value="">-- Choose Department --</option>
                                <option value="Engineering & Technology" <?= ($formData['department'] === 'Engineering & Technology') ? 'selected' : '' ?>>Engineering &amp; Technology</option>
                                <option value="Computer Applications" <?= ($formData['department'] === 'Computer Applications') ? 'selected' : '' ?>>Computer Applications</option>
                                <option value="Science & Computing" <?= ($formData['department'] === 'Science & Computing') ? 'selected' : '' ?>>Science &amp; Computing</option>
                                <option value="Postgraduate Computing" <?= ($formData['department'] === 'Postgraduate Computing') ? 'selected' : '' ?>>Postgraduate Computing</option>
                                <option value="Management Studies" <?= ($formData['department'] === 'Management Studies') ? 'selected' : '' ?>>Management Studies</option>
                                <option value="Vocational & Professional" <?= ($formData['department'] === 'Vocational & Professional') ? 'selected' : '' ?>>Vocational &amp; Professional</option>
                            </select>
                        </div>

                        <!-- Course Selection (From XML) -->
                        <div class="col-12">
                            <label for="course_code" class="form-label fw-semibold">Program / Course Selection <span class="text-danger">*</span></label>
                            <select class="form-select" id="course_code" name="course_code" required>
                                <option value="">-- Choose Course from XML Catalog --</option>
                                <?php foreach ($courses as $c): ?>
                                    <option value="<?= htmlspecialchars($c['code']) ?>" <?= ($formData['course_code'] === $c['code']) ? 'selected' : '' ?>>
                                        <?= htmlspecialchars($c['code']) ?> — <?= htmlspecialchars($c['name']) ?> (<?= htmlspecialchars($c['duration']) ?> | <?= htmlspecialchars($c['feeFormatted']) ?>)
                                    </option>
                                <?php endforeach; ?>
                            </select>
                            <div class="form-text">Course list parsed directly from <code>data/courses.xml</code>.</div>
                        </div>

                        <!-- Password -->
                        <div class="col-md-6">
                            <label for="password" class="form-label fw-semibold">Create Password <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                                <input type="password" class="form-control" id="password" name="password" placeholder="Min. 8 characters" minlength="8" required>
                                <button class="btn btn-outline-secondary" type="button" data-toggle-password="password" title="Show/Hide Password">
                                    <i class="bi bi-eye"></i>
                                </button>
                            </div>
                            <div class="form-text">Minimum 8 characters. Never stored in plaintext.</div>
                        </div>

                        <!-- Confirm Password -->
                        <div class="col-md-6">
                            <label for="confirm_password" class="form-label fw-semibold">Confirm Password <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
                                <input type="password" class="form-control" id="confirm_password" name="confirm_password" placeholder="Re-enter password" required>
                                <button class="btn btn-outline-secondary" type="button" data-toggle-password="confirm_password" title="Show/Hide Password">
                                    <i class="bi bi-eye"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Gender (Optional) -->
                        <div class="col-md-6">
                            <label for="gender" class="form-label fw-semibold">Gender <span class="text-muted small">(Optional)</span></label>
                            <select class="form-select" id="gender" name="gender">
                                <option value="Prefer not to say" <?= ($formData['gender'] === 'Prefer not to say') ? 'selected' : '' ?>>Prefer not to say</option>
                                <option value="Male" <?= ($formData['gender'] === 'Male') ? 'selected' : '' ?>>Male</option>
                                <option value="Female" <?= ($formData['gender'] === 'Female') ? 'selected' : '' ?>>Female</option>
                                <option value="Other" <?= ($formData['gender'] === 'Other') ? 'selected' : '' ?>>Other</option>
                            </select>
                        </div>

                        <!-- Date of Birth (Optional) -->
                        <div class="col-md-6">
                            <label for="date_of_birth" class="form-label fw-semibold">Date of Birth <span class="text-muted small">(Optional)</span></label>
                            <input type="date" class="form-control" id="date_of_birth" name="date_of_birth" value="<?= htmlspecialchars($formData['date_of_birth']) ?>">
                        </div>

                        <!-- Address (Optional) -->
                        <div class="col-12">
                            <label for="address" class="form-label fw-semibold">Residential Address <span class="text-muted small">(Optional)</span></label>
                            <textarea class="form-control" id="address" name="address" rows="2" placeholder="Street, City, State, PIN Code"><?= htmlspecialchars($formData['address']) ?></textarea>
                        </div>

                        <!-- Terms & Conditions -->
                        <div class="col-12 mt-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="terms_agreed" name="terms_agreed" required>
                                <label class="form-check-label small text-secondary" for="terms_agreed">
                                    I agree to the <a href="about.php" target="_blank" class="text-primary text-decoration-none fw-semibold">Student Honor Code &amp; Academic Terms</a>. All submitted information is genuine.
                                </label>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div class="col-12 mt-4">
                            <button type="submit" class="btn btn-gradient btn-lg w-100 shadow-sm py-2">
                                <i class="bi bi-check-circle-fill me-2"></i> Complete Student Registration
                            </button>
                        </div>
                    </div>
                </form>

                <hr class="my-4">

                <div class="text-center small text-secondary">
                    Already registered? <a href="login.php" class="text-primary fw-semibold text-decoration-none">Sign in to your Student Account <i class="bi bi-arrow-right"></i></a>
                </div>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
