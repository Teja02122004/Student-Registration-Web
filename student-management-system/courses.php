<?php
/**
 * Student Registration and Course Management System
 * Page 4: Course Management & Catalog
 * File: courses.php
 */

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/auth.php';

$courses = getCoursesFromXML();
$student = getCurrentStudent();

// Handle instant course selection if student is logged in
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'select_course') {
    requireAuth();
    $courseCode = sanitize($_POST['course_code'] ?? '');
    $selectedCourse = getCourseByCode($courseCode);

    if ($selectedCourse && verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        try {
            $pdo = getDBConnection();
            $updateStmt = $pdo->prepare('UPDATE students SET selected_course_code = :course, updated_at = CURRENT_TIMESTAMP WHERE id = :id');
            $updateStmt->execute([
                ':course' => $selectedCourse['code'],
                ':id'     => $_SESSION['user_db_id'],
            ]);
            $_SESSION['student_course_code'] = $selectedCourse['code'];
            setFlash('success', "Enrolled successfully in {$selectedCourse['name']} ({$selectedCourse['code']})!");
            header('Location: dashboard.php');
            exit;
        } catch (PDOException $e) {
            setFlash('danger', 'Failed to update enrolled course: ' . htmlspecialchars($e->getMessage()));
        }
    }
}

// Extract distinct categories
$categories = array_values(array_unique(array_map(fn($c) => $c['category'], $courses)));

$pageTitle = "Course Catalog & Management";
require_once __DIR__ . '/includes/header.php';
?>

<div class="container py-5">
    <!-- Header Title -->
    <div class="row align-items-center mb-4">
        <div class="col-lg-8">
            <div class="d-inline-flex align-items-center gap-2 px-3 py-1 mb-2 rounded-pill bg-primary-subtle text-primary border border-primary-subtle small fw-semibold">
                <i class="bi bi-filetype-xml"></i> XML-Powered Curriculum
            </div>
            <h2 class="fw-extrabold text-slate-900 mb-1">Academic Degree Programs &amp; Courses</h2>
            <p class="text-secondary mb-0">Browse university-approved programs parsed dynamically from <code>data/courses.xml</code>.</p>
        </div>
        <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
            <span class="badge bg-secondary-subtle text-secondary px-3 py-2 border fs-6">
                <i class="bi bi-collection me-1"></i> Total Programs: <?= count($courses) ?>
            </span>
        </div>
    </div>

    <!-- Filter and Search Toolbar -->
    <div class="card card-custom p-3 mb-4 shadow-sm border">
        <div class="row g-3 align-items-center">
            <!-- Search -->
            <div class="col-lg-5 col-md-6">
                <div class="input-group">
                    <span class="input-group-text bg-white"><i class="bi bi-search text-muted"></i></span>
                    <input type="text" id="courseSearchInput" class="form-control border-start-0" placeholder="Search by course code, title, or department...">
                </div>
            </div>

            <!-- Categories -->
            <div class="col-lg-7 col-md-6 d-flex flex-wrap gap-2 justify-content-md-end">
                <button type="button" class="btn btn-primary btn-sm px-3 active" data-category-filter="all">All Disciplines</button>
                <?php foreach ($categories as $cat): ?>
                    <button type="button" class="btn btn-outline-secondary btn-sm px-3" data-category-filter="<?= htmlspecialchars($cat) ?>">
                        <?= htmlspecialchars($cat) ?>
                    </button>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- View Switcher (Cards & Table) -->
    <ul class="nav nav-pills mb-4" id="courseViewTabs" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="cards-tab" data-bs-toggle="pill" data-bs-target="#cards-view" type="button" role="tab" aria-controls="cards-view" aria-selected="true">
                <i class="bi bi-grid-fill me-1"></i> Course Cards Grid
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="table-tab" data-bs-toggle="pill" data-bs-target="#table-view" type="button" role="tab" aria-controls="table-view" aria-selected="false">
                <i class="bi bi-table me-1"></i> Detailed Catalog Table
            </button>
        </li>
    </ul>

    <div class="tab-content" id="courseViewTabsContent">
        <!-- VIEW 1: CARDS GRID -->
        <div class="tab-pane fade show active" id="cards-view" role="tabpanel" aria-labelledby="cards-tab">
            <div class="row g-4" id="courseCardsGrid">
                <?php foreach ($courses as $c): ?>
                    <div class="col-lg-4 col-md-6 course-item" 
                         data-course-title="<?= htmlspecialchars($c['name']) ?>" 
                         data-course-code="<?= htmlspecialchars($c['code']) ?>"
                         data-course-dept="<?= htmlspecialchars($c['department']) ?>"
                         data-course-category="<?= htmlspecialchars($c['category']) ?>">
                        <div class="card h-100 card-custom card-hover p-4 border shadow-sm d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <span class="badge bg-primary text-white fw-bold px-2 py-1 fs-6"><?= htmlspecialchars($c['code']) ?></span>
                                <span class="badge bg-light text-secondary border"><?= htmlspecialchars($c['duration']) ?></span>
                            </div>

                            <h4 class="fw-bold text-slate-900 mb-1" style="font-size: 1.25rem;">
                                <?= htmlspecialchars($c['name']) ?>
                            </h4>
                            <div class="text-primary small fw-semibold mb-2"><?= htmlspecialchars($c['department']) ?></div>
                            <p class="text-secondary small mb-3 flex-grow-1" style="line-height: 1.5;">
                                <?= htmlspecialchars($c['description']) ?>
                            </p>

                            <!-- Key Specs -->
                            <div class="p-3 rounded-3 bg-light border mb-3 small">
                                <div class="d-flex justify-content-between mb-1">
                                    <span class="text-muted">Eligibility:</span>
                                    <span class="fw-medium text-dark text-end" style="max-width: 60%;"><?= htmlspecialchars($c['eligibility']) ?></span>
                                </div>
                                <div class="d-flex justify-content-between align-items-center pt-1 border-top">
                                    <span class="text-muted">Annual Fee:</span>
                                    <span class="fw-bold text-primary fs-6"><?= htmlspecialchars($c['feeFormatted']) ?></span>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="d-flex gap-2 mt-auto">
                                <a href="course-details.php?code=<?= urlencode($c['code']) ?>" class="btn btn-outline-secondary btn-sm flex-fill">
                                    <i class="bi bi-info-circle me-1"></i> Details
                                </a>

                                <?php if (isLoggedIn()): ?>
                                    <form method="POST" action="courses.php" class="flex-fill">
                                        <input type="hidden" name="csrf_token" value="<?= generateCsrfToken() ?>">
                                        <input type="hidden" name="action" value="select_course">
                                        <input type="hidden" name="course_code" value="<?= htmlspecialchars($c['code']) ?>">
                                        <button type="submit" class="btn btn-gradient btn-sm w-100" <?= ($student['course_code'] === $c['code']) ? 'disabled' : '' ?>>
                                            <?= ($student['course_code'] === $c['code']) ? '<i class="bi bi-check2"></i> Enrolled' : '<i class="bi bi-plus-circle me-1"></i> Select Course' ?>
                                        </button>
                                    </form>
                                <?php else: ?>
                                    <a href="register.php?course=<?= urlencode($c['code']) ?>" class="btn btn-gradient btn-sm flex-fill">
                                        <i class="bi bi-person-plus me-1"></i> Select &amp; Register
                                    </a>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- VIEW 2: TABLE VIEW -->
        <div class="tab-pane fade" id="table-view" role="tabpanel" aria-labelledby="table-tab">
            <div class="table-responsive bg-white rounded-3 shadow-sm border">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col" style="width: 100px;">Code</th>
                            <th scope="col">Course Title</th>
                            <th scope="col">Department</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Annual Fees (INR)</th>
                            <th scope="col">Eligibility</th>
                            <th scope="col" class="text-end" style="width: 160px;">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($courses as $c): ?>
                            <tr class="course-table-row"
                                data-course-title="<?= htmlspecialchars($c['name']) ?>" 
                                data-course-code="<?= htmlspecialchars($c['code']) ?>"
                                data-course-dept="<?= htmlspecialchars($c['department']) ?>"
                                data-course-category="<?= htmlspecialchars($c['category']) ?>">
                                <td><span class="badge bg-primary"><?= htmlspecialchars($c['code']) ?></span></td>
                                <td>
                                    <a href="course-details.php?code=<?= urlencode($c['code']) ?>" class="fw-bold text-dark text-decoration-none">
                                        <?= htmlspecialchars($c['name']) ?>
                                    </a>
                                    <div class="text-muted small"><?= htmlspecialchars($c['category']) ?></div>
                                </td>
                                <td><?= htmlspecialchars($c['department']) ?></td>
                                <td><?= htmlspecialchars($c['duration']) ?></td>
                                <td class="fw-bold text-primary tabular-numbers"><?= htmlspecialchars($c['feeFormatted']) ?></td>
                                <td class="small text-secondary" style="max-width: 250px;"><?= htmlspecialchars($c['eligibility']) ?></td>
                                <td class="text-end">
                                    <a href="course-details.php?code=<?= urlencode($c['code']) ?>" class="btn btn-outline-secondary btn-sm me-1" title="View details">
                                        <i class="bi bi-eye"></i>
                                    </a>
                                    <?php if (isLoggedIn()): ?>
                                        <form method="POST" action="courses.php" class="d-inline">
                                            <input type="hidden" name="csrf_token" value="<?= generateCsrfToken() ?>">
                                            <input type="hidden" name="action" value="select_course">
                                            <input type="hidden" name="course_code" value="<?= htmlspecialchars($c['code']) ?>">
                                            <button type="submit" class="btn btn-sm btn-primary" <?= ($student['course_code'] === $c['code']) ? 'disabled' : '' ?>>
                                                <?= ($student['course_code'] === $c['code']) ? 'Enrolled' : 'Select' ?>
                                            </button>
                                        </form>
                                    <?php else: ?>
                                        <a href="register.php?course=<?= urlencode($c['code']) ?>" class="btn btn-sm btn-gradient">Select</a>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
