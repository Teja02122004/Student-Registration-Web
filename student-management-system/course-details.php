<?php
/**
 * Student Registration and Course Management System
 * Page: Course Details Deep Dive
 * File: course-details.php
 */

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/auth.php';

$code = trim($_GET['code'] ?? 'IT101');
$course = getCourseByCode($code);

if (!$course) {
    setFlash('danger', "Requested course [{$code}] does not exist in our XML catalog.");
    header('Location: courses.php');
    exit;
}

$student = getCurrentStudent();
$pageTitle = $course['name'] . " (" . $course['code'] . ")";
require_once __DIR__ . '/includes/header.php';
?>

<div class="container py-5">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.php" class="text-decoration-none">Home</a></li>
            <li class="breadcrumb-item"><a href="courses.php" class="text-decoration-none">Courses</a></li>
            <li class="breadcrumb-item active" aria-current="page"><?= htmlspecialchars($course['code']) ?></li>
        </ol>
    </nav>

    <div class="row g-4">
        <!-- Main Details Column -->
        <div class="col-lg-8">
            <div class="card card-custom p-4 p-md-5 border shadow-sm mb-4">
                <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
                    <span class="badge bg-primary fs-6 px-3 py-1"><?= htmlspecialchars($course['code']) ?></span>
                    <span class="badge bg-light text-secondary border px-3 py-1"><?= htmlspecialchars($course['category']) ?></span>
                    <?php if (!empty($course['badge'])): ?>
                        <span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-3 py-1"><?= htmlspecialchars($course['badge']) ?></span>
                    <?php endif; ?>
                </div>

                <h1 class="display-6 fw-extrabold text-slate-900 mb-2"><?= htmlspecialchars($course['name']) ?></h1>
                <p class="text-primary fw-semibold fs-5 mb-4"><?= htmlspecialchars($course['department']) ?></p>

                <h5 class="fw-bold text-slate-900 mb-2">Program Overview</h5>
                <p class="text-secondary mb-4" style="line-height: 1.7; font-size: 1.05rem;">
                    <?= htmlspecialchars($course['description']) ?>
                </p>

                <!-- Syllabus Modules from XML -->
                <h5 class="fw-bold text-slate-900 mb-3"><i class="bi bi-journal-text text-primary me-2"></i>Curriculum &amp; Syllabus Modules</h5>
                <div class="list-group list-group-flush border rounded-3 mb-4">
                    <?php if (!empty($course['syllabus'])): ?>
                        <?php foreach ($course['syllabus'] as $idx => $topic): ?>
                            <div class="list-group-item d-flex align-items-center gap-3 py-3">
                                <span class="badge bg-primary-subtle text-primary rounded-circle p-2" style="width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;">
                                    <?= $idx + 1 ?>
                                </span>
                                <span class="fw-medium text-slate-800"><?= htmlspecialchars($topic) ?></span>
                            </div>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <div class="list-group-item text-muted">Detailed syllabus modules are available upon enrollment.</div>
                    <?php endif; ?>
                </div>

                <!-- Career Pathways -->
                <?php if (!empty($course['careerOpportunities'])): ?>
                    <h5 class="fw-bold text-slate-900 mb-2"><i class="bi bi-briefcase text-success me-2"></i>Career Pathways &amp; Roles</h5>
                    <p class="text-secondary mb-0">
                        Graduates of this program transition into roles such as: <strong><?= htmlspecialchars($course['careerOpportunities']) ?></strong>.
                    </p>
                <?php endif; ?>
            </div>
        </div>

        <!-- Sidebar Summary Box -->
        <div class="col-lg-4">
            <div class="card card-custom p-4 border shadow-sm sticky-top" style="top: 100px;">
                <h5 class="fw-bold mb-3 pb-2 border-bottom">Program Specifications</h5>
                
                <ul class="list-unstyled small mb-4">
                    <li class="d-flex justify-content-between py-2 border-bottom">
                        <span class="text-muted"><i class="bi bi-clock me-2"></i>Duration:</span>
                        <span class="fw-semibold text-dark"><?= htmlspecialchars($course['duration']) ?></span>
                    </li>
                    <li class="d-flex justify-content-between py-2 border-bottom">
                        <span class="text-muted"><i class="bi bi-currency-rupee me-2"></i>Tuition Fee:</span>
                        <span class="fw-bold text-primary fs-6"><?= htmlspecialchars($course['feeFormatted']) ?></span>
                    </li>
                    <li class="d-flex justify-content-between py-2 border-bottom">
                        <span class="text-muted"><i class="bi bi-people me-2"></i>Intake Capacity:</span>
                        <span class="fw-semibold text-dark"><?= htmlspecialchars($course['seats']) ?> Seats</span>
                    </li>
                    <li class="d-flex justify-content-between py-2 border-bottom">
                        <span class="text-muted"><i class="bi bi-star-fill text-warning me-2"></i>Rating:</span>
                        <span class="fw-semibold text-dark"><?= htmlspecialchars($course['rating']) ?> / 5.0</span>
                    </li>
                </ul>

                <div class="p-3 bg-light rounded-3 mb-4 small">
                    <div class="fw-bold text-slate-900 mb-1"><i class="bi bi-check-circle-fill text-success me-1"></i> Academic Eligibility</div>
                    <p class="text-secondary mb-0"><?= htmlspecialchars($course['eligibility']) ?></p>
                </div>

                <!-- Action Button -->
                <?php if (isLoggedIn()): ?>
                    <form method="POST" action="courses.php">
                        <input type="hidden" name="csrf_token" value="<?= generateCsrfToken() ?>">
                        <input type="hidden" name="action" value="select_course">
                        <input type="hidden" name="course_code" value="<?= htmlspecialchars($course['code']) ?>">
                        <button type="submit" class="btn btn-gradient btn-lg w-100 shadow-sm" <?= ($student['course_code'] === $course['code']) ? 'disabled' : '' ?>>
                            <?= ($student['course_code'] === $course['code']) ? '<i class="bi bi-check2"></i> Currently Enrolled' : '<i class="bi bi-mortarboard me-2"></i> Enroll In This Course' ?>
                        </button>
                    </form>
                <?php else: ?>
                    <a href="register.php?course=<?= urlencode($course['code']) ?>" class="btn btn-gradient btn-lg w-100 shadow-sm text-center">
                        <i class="bi bi-person-plus me-2"></i> Register For This Course
                    </a>
                <?php endif; ?>

                <a href="courses.php" class="btn btn-outline-secondary btn-sm w-100 mt-2">
                    <i class="bi bi-arrow-left me-1"></i> Back to All Courses
                </a>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
