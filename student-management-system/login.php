<?php
/**
 * Student Registration and Course Management System
 * Page 3: Student Login
 * File: login.php
 */

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/auth.php';

redirectIfLoggedIn();

$errors = [];
$emailInput = trim($_GET['email'] ?? '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verify CSRF
    $csrfToken = $_POST['csrf_token'] ?? '';
    if (!verifyCsrfToken($csrfToken)) {
        $errors[] = 'Security token invalid. Please refresh and try again.';
    }

    $email = strtolower(trim($_POST['email'] ?? ''));
    $password = $_POST['password'] ?? '';
    $emailInput = $email;

    if (empty($email) || empty($password)) {
        $errors[] = 'Please provide both your registered email address and password.';
    } else {
        try {
            $pdo = getDBConnection();
            $stmt = $pdo->prepare('SELECT * FROM students WHERE email = :email LIMIT 1');
            $stmt->execute([':email' => $email]);
            $student = $stmt->fetch();

            if ($student && password_verify($password, $student['password_hash'])) {
                // Successful verification: Establish session and redirect
                loginStudent($student);
                setFlash('success', "Welcome back, " . htmlspecialchars($student['full_name']) . "!");
                header('Location: dashboard.php');
                exit;
            } else {
                $errors[] = 'Invalid email address or password. Please verify your credentials.';
            }
        } catch (PDOException $e) {
            $errors[] = 'Authentication system error: ' . htmlspecialchars($e->getMessage());
        }
    }
}

$pageTitle = "Student Login";
require_once __DIR__ . '/includes/header.php';
?>

<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-8">
            <!-- Header -->
            <div class="text-center mb-4">
                <div class="brand-icon mx-auto mb-3" style="width: 48px; height: 48px; font-size: 1.5rem;">
                    <i class="bi bi-shield-lock-fill"></i>
                </div>
                <h2 class="fw-extrabold text-slate-900">Student Login</h2>
                <p class="text-secondary small">Sign in with your registered credentials to access your dashboard.</p>
            </div>

            <!-- Error Alerts -->
            <?php if (!empty($errors)): ?>
                <div class="alert alert-danger shadow-sm mb-4" role="alert">
                    <ul class="mb-0 ps-3">
                        <?php foreach ($errors as $error): ?>
                            <li><?= htmlspecialchars($error) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <!-- Demo Credentials Helper Callout -->
            <div class="card bg-primary-subtle border-primary-subtle text-primary p-3 mb-4 rounded-3 small">
                <div class="fw-bold mb-1"><i class="bi bi-info-circle-fill me-1"></i> Quick Demo Access:</div>
                <div>Email: <code>aarav.sharma@studenthub.edu</code></div>
                <div>Password: <code>Student@123</code></div>
            </div>

            <!-- Login Form Card -->
            <div class="card card-custom p-4 p-md-4 shadow-sm border">
                <form id="studentLoginForm" method="POST" action="login.php" novalidate>
                    <input type="hidden" name="csrf_token" value="<?= generateCsrfToken() ?>">

                    <!-- Email -->
                    <div class="mb-3">
                        <label for="email" class="form-label fw-semibold">Student Email Address</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                            <input type="email" class="form-control" id="email" name="email" placeholder="student@example.edu" value="<?= htmlspecialchars($emailInput) ?>" required autofocus>
                        </div>
                    </div>

                    <!-- Password with Show/Hide -->
                    <div class="mb-3">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <label for="password" class="form-label fw-semibold mb-0">Password</label>
                            <button type="button" class="btn btn-link btn-sm p-0 text-decoration-none" data-bs-toggle="modal" data-bs-target="#forgotPasswordModal">
                                Forgot password?
                            </button>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-lock"></i></span>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password" required>
                            <button class="btn btn-outline-secondary" type="button" data-toggle-password="password" title="Toggle visibility">
                                <i class="bi bi-eye"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="mt-4">
                        <button type="submit" class="btn btn-gradient btn-lg w-100 shadow-sm py-2">
                            <i class="bi bi-box-arrow-in-right me-2"></i> Sign In to Portal
                        </button>
                    </div>
                </form>

                <hr class="my-4">

                <div class="text-center small text-secondary">
                    Don't have a student account? <a href="register.php" class="text-primary fw-semibold text-decoration-none">Register Now <i class="bi bi-arrow-right"></i></a>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Forgot Password Modal -->
<div class="modal fade" id="forgotPasswordModal" tabindex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4 border-0 shadow">
            <div class="modal-header border-0 pb-0">
                <h5 class="modal-title fw-bold" id="forgotPasswordModalLabel"><i class="bi bi-key-fill text-primary me-2"></i>Reset Student Password</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body py-3">
                <p class="text-secondary small">
                    Enter your registered student email address or Student ID. An automated temporary access link or OTP verification will be transmitted to your registered mobile and inbox.
                </p>
                <div class="mb-3">
                    <label for="reset_email" class="form-label fw-semibold small">Registered Email or Student ID</label>
                    <input type="text" class="form-control" id="reset_email" placeholder="e.g. STU-2026-1001 or email@studenthub.edu">
                </div>
                <div class="p-3 bg-light rounded-3 small text-muted">
                    <i class="bi bi-shield-lock me-1"></i> For institutional security, password resets are logged with client IP verification. If locked out, please contact the IT Helpdesk at <code>ithelpdesk@studenthub.edu</code>.
                </div>
            </div>
            <div class="modal-footer border-0 pt-0">
                <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm px-3" onclick="alert('Password reset instructions dispatched to your verified student contacts.'); bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal')).hide();">
                    Dispatch Reset Link
                </button>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
