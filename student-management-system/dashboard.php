<?php
/**
 * Student Registration and Course Management System
 * Page 5: Student Dashboard
 * File: dashboard.php
 */

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/auth.php';

requireAuth();

$pdo = getDBConnection();
$userId = $_SESSION['user_db_id'];

// Handle Profile Update Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_profile') {
    if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        setFlash('danger', 'Security token expired. Please try again.');
    } else {
        $fullName = sanitize($_POST['full_name'] ?? '');
        $phone = trim($_POST['phone'] ?? '');
        $gender = sanitize($_POST['gender'] ?? 'Prefer not to say');
        $address = sanitize($_POST['address'] ?? '');

        if (empty($fullName) || strlen($fullName) < 2) {
            setFlash('danger', 'Please provide a valid full name.');
        } elseif (!isValidIndianPhone($phone)) {
            setFlash('danger', 'Please enter a valid 10-digit Indian phone number.');
        } else {
            try {
                $updateStmt = $pdo->prepare('
                    UPDATE students 
                    SET full_name = :full_name, phone = :phone, gender = :gender, address = :address, updated_at = CURRENT_TIMESTAMP
                    WHERE id = :id
                ');
                $updateStmt->execute([
                    ':full_name' => $fullName,
                    ':phone'     => $phone,
                    ':gender'    => $gender,
                    ':address'   => $address,
                    ':id'        => $userId,
                ]);

                $_SESSION['student_name'] = $fullName;
                setFlash('success', 'Profile information updated successfully!');
                header('Location: dashboard.php');
                exit;
            } catch (PDOException $e) {
                setFlash('danger', 'Failed to update profile: ' . htmlspecialchars($e->getMessage()));
            }
        }
    }
}

// Fetch full student record
$stmt = $pdo->prepare('SELECT * FROM students WHERE id = :id LIMIT 1');
$stmt->execute([':id' => $userId]);
$student = $stmt->fetch();

if (!$student) {
    logoutStudent();
    header('Location: login.php');
    exit;
}

$enrolledCourse = getCourseByCode($student['selected_course_code']);
$allCourses = getCoursesFromXML();

$pageTitle = "Student Dashboard";
require_once __DIR__ . '/includes/header.php';
?>

<div class="container py-5">
    <!-- Welcome Banner (Gradient) -->
    <div class="card p-4 p-md-5 rounded-4 border-0 text-white mb-4 shadow" style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #6d28d9 100%);">
        <div class="row align-items-center">
            <div class="col-md-8">
                <div class="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-white text-dark small fw-bold">
                    <i class="bi bi-person-check-fill text-success"></i> Authenticated Session
                </div>
                <h2 class="display-6 fw-extrabold mb-1">
                    Welcome, <?= htmlspecialchars($student['full_name']) ?>!
                </h2>
                <p class="text-white-50 mb-3">
                    Student ID: <code class="text-white fw-bold bg-dark bg-opacity-50 px-2 py-1 rounded"><?= htmlspecialchars($student['student_id']) ?></code> · Department: <?= htmlspecialchars($student['department']) ?>
                </p>
                <div class="d-flex flex-wrap gap-2">
                    <button class="btn btn-light btn-sm fw-semibold" data-bs-toggle="modal" data-bs-target="#editProfileModal">
                        <i class="bi bi-pencil-square me-1"></i> Edit Profile
                    </button>
                    <a href="courses.php" class="btn btn-outline-light btn-sm">
                        <i class="bi bi-journal-plus me-1"></i> Change / Add Course
                    </a>
                </div>
            </div>
            <div class="col-md-4 text-md-end mt-4 mt-md-0">
                <div class="d-inline-block text-start p-3 rounded-3 bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-20 small">
                    <div class="text-white-50 mb-1">Enrolled Since</div>
                    <div class="fw-bold fs-6 mb-2"><?= date('d M Y', strtotime($student['created_at'])) ?></div>
                    <div class="text-white-50 mb-1">Account Status</div>
                    <div><span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">Active Matriculation</span></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Grid -->
    <div class="row g-4">
        <!-- Left: Selected Course Card -->
        <div class="col-lg-7">
            <div class="card card-custom p-4 border shadow-sm h-100">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h5 class="fw-bold text-slate-900 mb-0">
                        <i class="bi bi-journal-bookmark-fill text-primary me-2"></i>My Enrolled Program
                    </h5>
                    <a href="courses.php" class="btn btn-outline-primary btn-sm">Browse Catalog</a>
                </div>

                <?php if ($enrolledCourse): ?>
                    <div class="p-4 rounded-3 border bg-light mb-3">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <span class="badge bg-primary px-3 py-1"><?= htmlspecialchars($enrolledCourse['code']) ?></span>
                            <span class="badge bg-white text-dark border"><?= htmlspecialchars($enrolledCourse['duration']) ?></span>
                        </div>
                        <h4 class="fw-bold text-slate-900 mt-2"><?= htmlspecialchars($enrolledCourse['name']) ?></h4>
                        <div class="text-primary small fw-semibold mb-2"><?= htmlspecialchars($enrolledCourse['department']) ?></div>
                        <p class="text-secondary small mb-3"><?= htmlspecialchars($enrolledCourse['description']) ?></p>

                        <div class="row g-2 border-top pt-3 small">
                            <div class="col-6">
                                <span class="text-muted d-block">Annual Tuition:</span>
                                <span class="fw-bold text-slate-900 fs-6 tabular-numbers"><?= htmlspecialchars($enrolledCourse['feeFormatted']) ?></span>
                            </div>
                            <div class="col-6">
                                <span class="text-muted d-block">Eligibility:</span>
                                <span class="fw-medium text-slate-900"><?= htmlspecialchars($enrolledCourse['eligibility']) ?></span>
                            </div>
                        </div>
                    </div>

                    <h6 class="fw-bold text-slate-900 mb-2">Curriculum Topics:</h6>
                    <ul class="list-group list-group-flush border rounded-3 mb-3 small">
                        <?php foreach (array_slice($enrolledCourse['syllabus'], 0, 4) as $topic): ?>
                            <li class="list-group-item d-flex align-items-center gap-2">
                                <i class="bi bi-check-circle-fill text-success"></i>
                                <span><?= htmlspecialchars($topic) ?></span>
                            </li>
                        <?php endforeach; ?>
                    </ul>

                    <div class="d-flex gap-2">
                        <a href="course-details.php?code=<?= urlencode($enrolledCourse['code']) ?>" class="btn btn-outline-secondary btn-sm">
                            <i class="bi bi-file-earmark-text me-1"></i> View Full Syllabus
                        </a>
                    </div>
                <?php else: ?>
                    <div class="alert alert-warning">
                        No enrolled course found. Please select a course from the catalog.
                    </div>
                <?php endif; ?>
            </div>
        </div>

        <!-- Right: Profile Card & Quick Actions -->
        <div class="col-lg-5">
            <div class="card card-custom p-4 border shadow-sm mb-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="fw-bold text-slate-900 mb-0">
                        <i class="bi bi-person-bounding-box text-purple me-2"></i>Profile Details
                    </h5>
                    <button class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#editProfileModal">
                        <i class="bi bi-pencil"></i> Edit
                    </button>
                </div>

                <ul class="list-group list-group-flush small">
                    <li class="list-group-item d-flex justify-content-between px-0 py-2">
                        <span class="text-muted">Full Name:</span>
                        <span class="fw-semibold text-dark"><?= htmlspecialchars($student['full_name']) ?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between px-0 py-2">
                        <span class="text-muted">Email:</span>
                        <span class="fw-semibold text-dark"><?= htmlspecialchars($student['email']) ?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between px-0 py-2">
                        <span class="text-muted">Mobile:</span>
                        <span class="fw-semibold text-dark">+91 <?= htmlspecialchars($student['phone']) ?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between px-0 py-2">
                        <span class="text-muted">Gender:</span>
                        <span class="fw-semibold text-dark"><?= htmlspecialchars($student['gender'] ?? 'Not specified') ?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between px-0 py-2">
                        <span class="text-muted">Date of Birth:</span>
                        <span class="fw-semibold text-dark"><?= !empty($student['date_of_birth']) ? htmlspecialchars($student['date_of_birth']) : 'Not provided' ?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between px-0 py-2">
                        <span class="text-muted">Department:</span>
                        <span class="fw-semibold text-dark"><?= htmlspecialchars($student['department']) ?></span>
                    </li>
                    <li class="list-group-item px-0 py-2">
                        <span class="text-muted d-block mb-1">Residential Address:</span>
                        <span class="text-dark"><?= !empty($student['address']) ? nl2br(htmlspecialchars($student['address'])) : 'No address on file' ?></span>
                    </li>
                </ul>

                <hr class="my-3">

                <div class="d-flex justify-content-between align-items-center">
                    <a href="logout.php" class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-box-arrow-right me-1"></i> Sign Out
                    </a>
                    <span class="text-muted small">Session Protected</span>
                </div>
            </div>

            <!-- Available Courses Quick Shortcut -->
            <div class="card card-custom p-4 border shadow-sm">
                <h6 class="fw-bold mb-3"><i class="bi bi-stars text-warning me-2"></i>Other Recommended Programs</h6>
                <div class="d-flex flex-column gap-2">
                    <?php foreach (array_slice($allCourses, 0, 3) as $rc): ?>
                        <?php if ($rc['code'] !== $student['selected_course_code']): ?>
                            <a href="course-details.php?code=<?= urlencode($rc['code']) ?>" class="d-flex justify-content-between align-items-center p-2 rounded-2 text-decoration-none bg-light text-dark hover-bg-light">
                                <div>
                                    <span class="badge bg-primary me-2"><?= htmlspecialchars($rc['code']) ?></span>
                                    <span class="small fw-semibold"><?= htmlspecialchars($rc['name']) ?></span>
                                </div>
                                <i class="bi bi-chevron-right text-muted small"></i>
                            </a>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Edit Profile Modal -->
<div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4 border-0 shadow">
            <div class="modal-header">
                <h5 class="modal-title fw-bold" id="editProfileModalLabel">
                    <i class="bi bi-pencil-square text-primary me-2"></i>Edit Student Profile
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form method="POST" action="dashboard.php">
                <input type="hidden" name="csrf_token" value="<?= generateCsrfToken() ?>">
                <input type="hidden" name="action" value="update_profile">

                <div class="modal-body">
                    <div class="mb-3">
                        <label for="modal_full_name" class="form-label fw-semibold small">Full Name</label>
                        <input type="text" class="form-control" id="modal_full_name" name="full_name" value="<?= htmlspecialchars($student['full_name']) ?>" required>
                    </div>

                    <div class="mb-3">
                        <label for="modal_phone" class="form-label fw-semibold small">Phone (10-digit Indian Number)</label>
                        <input type="tel" class="form-control" id="modal_phone" name="phone" maxlength="10" value="<?= htmlspecialchars($student['phone']) ?>" required>
                    </div>

                    <div class="mb-3">
                        <label for="modal_gender" class="form-label fw-semibold small">Gender</label>
                        <select class="form-select" id="modal_gender" name="gender">
                            <option value="Prefer not to say" <?= ($student['gender'] === 'Prefer not to say') ? 'selected' : '' ?>>Prefer not to say</option>
                            <option value="Male" <?= ($student['gender'] === 'Male') ? 'selected' : '' ?>>Male</option>
                            <option value="Female" <?= ($student['gender'] === 'Female') ? 'selected' : '' ?>>Female</option>
                            <option value="Other" <?= ($student['gender'] === 'Other') ? 'selected' : '' ?>>Other</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="modal_address" class="form-label fw-semibold small">Residential Address</label>
                        <textarea class="form-control" id="modal_address" name="address" rows="3"><?= htmlspecialchars($student['address'] ?? '') ?></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary btn-sm px-3">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
