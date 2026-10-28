<?php
/**
 * Student Registration and Course Management System
 * Page 1: Home Page
 * File: index.php
 */

$pageTitle = "Welcome to StudentHub | Student Registration & Course Portal";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/functions.php';

$allCourses = getCoursesFromXML();
$featuredCourses = array_slice($allCourses, 0, 4);
?>

<!-- Hero Section -->
<section class="hero-section py-5 position-relative overflow-hidden">
    <div class="container py-lg-4">
        <div class="row align-items-center g-5">
            <div class="col-lg-7">
                <div class="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-primary-subtle text-primary border border-primary-subtle small fw-semibold">
                    <i class="bi bi-stars"></i> Next-Gen Student Portal 2026
                </div>
                <h1 class="display-4 fw-extrabold text-slate-900 mb-3" style="line-height: 1.15;">
                    Welcome to <span class="text-primary">StudentHub</span>
                </h1>
                <p class="fs-4 text-purple fw-semibold mb-3">
                    Learn More. Achieve More.
                </p>
                <p class="lead text-secondary mb-4" style="max-width: 580px;">
                    A seamless, unified academic portal empowering students to register securely, browse our XML-driven course catalog, enroll in industry-accredited programs, and track academic milestones on a personalized dashboard.
                </p>

                <div class="d-flex flex-wrap gap-3 mb-4">
                    <a href="register.php" class="btn btn-gradient btn-lg px-4 shadow">
                        <i class="bi bi-person-plus-fill me-2"></i> Student Registration
                    </a>
                    <a href="courses.php" class="btn btn-outline-primary btn-lg px-4">
                        <i class="bi bi-journal-bookmark-fill me-2"></i> Explore Courses
                    </a>
                </div>

                <div class="d-flex align-items-center gap-4 text-secondary small pt-2 border-top border-light-subtle">
                    <div class="d-flex align-items-center gap-2">
                        <i class="bi bi-shield-check text-success fs-5"></i>
                        <span>BCRYPT Secured</span>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <i class="bi bi-filetype-xml text-primary fs-5"></i>
                        <span>XML Course Engine</span>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <i class="bi bi-speedometer text-info fs-5"></i>
                        <span>Instant Enrollment</span>
                    </div>
                </div>
            </div>

            <!-- Hero Illustration Box -->
            <div class="col-lg-5">
                <div class="position-relative p-4 rounded-4 shadow-lg bg-white border border-light-subtle">
                    <div class="p-4 rounded-3 text-white mb-3" style="background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%);">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <span class="badge bg-white text-primary fw-bold">Live Portal</span>
                            <i class="bi bi-mortarboard fs-3 text-warning"></i>
                        </div>
                        <h4 class="fw-bold mb-1">StudentHub Central</h4>
                        <p class="small text-white-50 mb-0">Academic Session 2026-2027</p>
                    </div>

                    <div class="row g-2 mb-3">
                        <div class="col-6">
                            <div class="p-3 rounded-3 bg-light border">
                                <div class="text-secondary small">Registered Students</div>
                                <div class="fs-4 fw-bold text-slate-900 tabular-numbers">2,480+</div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="p-3 rounded-3 bg-light border">
                                <div class="text-secondary small">Available Courses</div>
                                <div class="fs-4 fw-bold text-primary tabular-numbers"><?= count($allCourses) ?> Programs</div>
                            </div>
                        </div>
                    </div>

                    <div class="p-3 rounded-3 bg-primary-subtle border border-primary-subtle text-primary small d-flex align-items-center gap-2">
                        <i class="bi bi-info-circle-fill fs-5"></i>
                        <span>Admissions open for Engineering, Computing & Science disciplines.</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Statistics Section -->
<section class="py-5 bg-white border-bottom">
    <div class="container">
        <div class="row g-4 text-center">
            <div class="col-md-3 col-6">
                <div class="p-3">
                    <div class="display-6 fw-bold text-primary tabular-numbers"><?= count($allCourses) ?>+</div>
                    <div class="text-secondary fw-medium mt-1">Available Courses</div>
                    <small class="text-muted">Updated via courses.xml</small>
                </div>
            </div>
            <div class="col-md-3 col-6">
                <div class="display-6 fw-bold text-purple tabular-numbers">100%</div>
                <div class="text-secondary fw-medium mt-1">Easy Registration</div>
                <small class="text-muted">Instant online validation</small>
            </div>
            <div class="col-md-3 col-6">
                <div class="display-6 fw-bold text-success tabular-numbers">10,000+</div>
                <div class="text-secondary fw-medium mt-1">Alumni Network</div>
                <small class="text-muted">Top tech companies</small>
            </div>
            <div class="col-md-3 col-6">
                <div class="display-6 fw-bold text-indigo tabular-numbers">24/7</div>
                <div class="text-secondary fw-medium mt-1">Student Interface</div>
                <small class="text-muted">Mobile friendly portal</small>
            </div>
        </div>
    </div>
</section>

<!-- Features Section -->
<section class="py-5 bg-light">
    <div class="container py-lg-4">
        <div class="text-center mb-5">
            <h6 class="text-uppercase text-primary fw-bold letter-spacing-1">Portal Highlights</h6>
            <h2 class="fw-extrabold text-slate-900">Engineered for Academic Excellence</h2>
            <p class="text-secondary mx-auto" style="max-width: 600px;">
                Designed with standard enterprise architectural patterns: secure authentication, decoupled XML course metadata, and intuitive dashboard analytics.
            </p>
        </div>

        <div class="row g-4">
            <!-- Feature 1 -->
            <div class="col-lg-3 col-md-6">
                <div class="card h-100 card-custom card-hover p-4 border-0 shadow-sm">
                    <div class="card-icon-box icon-blue">
                        <i class="bi bi-person-badge-fill"></i>
                    </div>
                    <h5 class="fw-bold mb-2">Student Registration</h5>
                    <p class="text-secondary small mb-0">
                        Multi-field registration validating student credentials, department, 10-digit mobile, and immediate course enrollment.
                    </p>
                </div>
            </div>

            <!-- Feature 2 -->
            <div class="col-lg-3 col-md-6">
                <div class="card h-100 card-custom card-hover p-4 border-0 shadow-sm">
                    <div class="card-icon-box icon-purple">
                        <i class="bi bi-shield-lock-fill"></i>
                    </div>
                    <h5 class="fw-bold mb-2">Secure Login</h5>
                    <p class="text-secondary small mb-0">
                        Protected with PHP <code>password_verify()</code> and session regeneration. No plaintext credentials are ever stored.
                    </p>
                </div>
            </div>

            <!-- Feature 3 -->
            <div class="col-lg-3 col-md-6">
                <div class="card h-100 card-custom card-hover p-4 border-0 shadow-sm">
                    <div class="card-icon-box icon-emerald">
                        <i class="bi bi-file-earmark-code-fill"></i>
                    </div>
                    <h5 class="fw-bold mb-2">XML Course Engine</h5>
                    <p class="text-secondary small mb-0">
                        Dynamic XML retrieval parsing course eligibility, annual fees in INR (₹), syllabus topics, and category filters.
                    </p>
                </div>
            </div>

            <!-- Feature 4 -->
            <div class="col-lg-3 col-md-6">
                <div class="card h-100 card-custom card-hover p-4 border-0 shadow-sm">
                    <div class="card-icon-box icon-amber">
                        <i class="bi bi-phone-fill"></i>
                    </div>
                    <h5 class="fw-bold mb-2">Responsive Design</h5>
                    <p class="text-secondary small mb-0">
                        Fully responsive Bootstrap 5 and modern CSS grid ensuring seamless experience across smartphones, tablets, and desktops.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Popular Courses Section -->
<section class="py-5 bg-white">
    <div class="container py-lg-4">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
            <div>
                <h6 class="text-uppercase text-primary fw-bold">Academic Curriculum</h6>
                <h2 class="fw-extrabold text-slate-900 mb-0">Popular Degree Programs</h2>
            </div>
            <a href="courses.php" class="btn btn-outline-primary btn-sm px-3 align-self-start align-self-md-auto">
                View All <?= count($allCourses) ?> Courses <i class="bi bi-arrow-right ms-1"></i>
            </a>
        </div>

        <div class="row g-4">
            <?php foreach ($featuredCourses as $course): ?>
                <div class="col-lg-3 col-md-6">
                    <div class="card h-100 card-custom card-hover p-3 shadow-sm d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <span class="badge bg-primary text-white fw-semibold px-2 py-1"><?= htmlspecialchars($course['code']) ?></span>
                            <span class="badge bg-light text-secondary border"><?= htmlspecialchars($course['duration']) ?></span>
                        </div>
                        <h5 class="fw-bold mt-2 mb-1 text-slate-900" style="font-size: 1.1rem; min-height: 2.6rem;">
                            <?= htmlspecialchars($course['name']) ?>
                        </h5>
                        <div class="text-muted small mb-2"><?= htmlspecialchars($course['department']) ?></div>
                        <p class="text-secondary small flex-grow-1" style="line-height: 1.45;">
                            <?= htmlspecialchars(mb_strimwidth($course['description'], 0, 95, '...')) ?>
                        </p>
                        
                        <div class="pt-3 border-top d-flex justify-content-between align-items-center mt-auto">
                            <div>
                                <span class="text-xs text-muted d-block">Annual Fee</span>
                                <span class="fw-bold text-primary fs-6"><?= htmlspecialchars($course['feeFormatted']) ?></span>
                            </div>
                            <a href="course-details.php?code=<?= urlencode($course['code']) ?>" class="btn btn-sm btn-outline-secondary">
                                Details
                            </a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Call to Action Section -->
<section class="py-5" style="background: linear-gradient(135deg, #1e3a8a 0%, #4338ca 50%, #6d28d9 100%); color: #ffffff;">
    <div class="container py-4 text-center">
        <h2 class="display-6 fw-extrabold mb-3">Begin Your Academic Journey Today</h2>
        <p class="lead text-white-50 mx-auto mb-4" style="max-width: 600px;">
            Join over 2,400 students advancing their careers in computing, technology, and management. Registration takes less than 2 minutes.
        </p>
        <div class="d-flex justify-content-center gap-3">
            <a href="register.php" class="btn btn-light btn-lg text-primary fw-bold px-4 shadow">
                <i class="bi bi-person-plus-fill me-2"></i> Register Online
            </a>
            <a href="contact.php" class="btn btn-outline-light btn-lg px-4">
                <i class="bi bi-envelope me-2"></i> Contact Admissions
            </a>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
