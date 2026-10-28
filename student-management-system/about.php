<?php
/**
 * Student Registration and Course Management System
 * Page 6: About Page
 * File: about.php
 */

$pageTitle = "About StudentHub & Technical Architecture";
require_once __DIR__ . '/includes/header.php';
?>

<div class="container py-5">
    <!-- Header -->
    <div class="text-center mb-5">
        <div class="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-primary-subtle text-primary border border-primary-subtle small fw-semibold">
            <i class="bi bi-info-circle-fill"></i> Enterprise Student Portal
        </div>
        <h1 class="display-5 fw-extrabold text-slate-900 mb-2">About the Student Management System</h1>
        <p class="lead text-secondary mx-auto" style="max-width: 680px;">
            A unified academic web platform designed to streamline student admissions, provide instant program discovery via XML catalog feeds, and enforce strict session security.
        </p>
    </div>

    <!-- Aim & Objectives (Two Column) -->
    <div class="row g-4 mb-5">
        <div class="col-lg-6">
            <div class="card card-custom p-4 p-md-5 border shadow-sm h-100">
                <div class="card-icon-box icon-blue mb-3">
                    <i class="bi bi-bullseye"></i>
                </div>
                <h3 class="fw-bold text-slate-900 mb-3">Project Aim</h3>
                <p class="text-secondary" style="line-height: 1.7;">
                    The primary aim of StudentHub is to eliminate legacy paper-based university registration workflows by providing an automated, resilient, and accessible portal. It bridges prospective applicants and institutional administrators through standardized data validation, real-time course discovery, and protected student dashboards.
                </p>
                <div class="p-3 bg-light rounded-3 border-start border-4 border-primary mt-auto">
                    <span class="fw-semibold text-slate-900">Key Mission:</span>
                    <span class="text-secondary small d-block">Deliver modern, zero-latency digital matriculation with complete data integrity and institutional compliance.</span>
                </div>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="card card-custom p-4 p-md-5 border shadow-sm h-100">
                <div class="card-icon-box icon-purple mb-3">
                    <i class="bi bi-check2-circle"></i>
                </div>
                <h3 class="fw-bold text-slate-900 mb-3">Core Objectives</h3>
                <ul class="list-unstyled d-flex flex-column gap-3 mb-0">
                    <li class="d-flex align-items-start gap-2">
                        <i class="bi bi-patch-check-fill text-success fs-5 mt-1"></i>
                        <div>
                            <strong class="text-slate-900">Automate Enrollment:</strong>
                            <p class="text-secondary small mb-0">Provide multi-field online registration with client &amp; server validation for phone, email, and credentials.</p>
                        </div>
                    </li>
                    <li class="d-flex align-items-start gap-2">
                        <i class="bi bi-patch-check-fill text-success fs-5 mt-1"></i>
                        <div>
                            <strong class="text-slate-900">Decoupled XML Course Storage:</strong>
                            <p class="text-secondary small mb-0">Maintain course codes, fees, syllabus modules, and eligibility in an interoperable XML dataset parsed dynamically via PHP.</p>
                        </div>
                    </li>
                    <li class="d-flex align-items-start gap-2">
                        <i class="bi bi-patch-check-fill text-success fs-5 mt-1"></i>
                        <div>
                            <strong class="text-slate-900">Bulletproof Authentication:</strong>
                            <p class="text-secondary small mb-0">Never store plaintext credentials; leverage modern cryptographic hashing (<code>password_hash</code>) with session fixation immunity.</p>
                        </div>
                    </li>
                    <li class="d-flex align-items-start gap-2">
                        <i class="bi bi-patch-check-fill text-success fs-5 mt-1"></i>
                        <div>
                            <strong class="text-slate-900">Responsive Student Hub:</strong>
                            <p class="text-secondary small mb-0">Empower students to inspect matriculation status, update profile records, and explore additional courses seamlessly.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Technologies Grid -->
    <div class="card card-custom p-4 p-md-5 border shadow-sm mb-5">
        <div class="text-center mb-4">
            <h6 class="text-uppercase text-primary fw-bold">Stack Architecture</h6>
            <h3 class="fw-extrabold text-slate-900">Technologies Powering StudentHub</h3>
        </div>

        <div class="row g-4 text-center">
            <div class="col-md-2 col-4">
                <div class="p-3 rounded-3 bg-light border h-100">
                    <i class="bi bi-filetype-html fs-2 text-danger"></i>
                    <h6 class="fw-bold mt-2 mb-0">HTML5</h6>
                    <small class="text-muted">Semantic markup</small>
                </div>
            </div>
            <div class="col-md-2 col-4">
                <div class="p-3 rounded-3 bg-light border h-100">
                    <i class="bi bi-filetype-css fs-2 text-primary"></i>
                    <h6 class="fw-bold mt-2 mb-0">CSS3 / BS5</h6>
                    <small class="text-muted">Responsive UI</small>
                </div>
            </div>
            <div class="col-md-2 col-4">
                <div class="p-3 rounded-3 bg-light border h-100">
                    <i class="bi bi-filetype-js fs-2 text-warning"></i>
                    <h6 class="fw-bold mt-2 mb-0">JavaScript</h6>
                    <small class="text-muted">Client filtering</small>
                </div>
            </div>
            <div class="col-md-2 col-4">
                <div class="p-3 rounded-3 bg-light border h-100">
                    <i class="bi bi-filetype-php fs-2 text-indigo"></i>
                    <h6 class="fw-bold mt-2 mb-0">PHP 8+</h6>
                    <small class="text-muted">Server controller</small>
                </div>
            </div>
            <div class="col-md-2 col-4">
                <div class="p-3 rounded-3 bg-light border h-100">
                    <i class="bi bi-filetype-xml fs-2 text-purple"></i>
                    <h6 class="fw-bold mt-2 mb-0">XML Feed</h6>
                    <small class="text-muted">SimpleXML parsed</small>
                </div>
            </div>
            <div class="col-md-2 col-4">
                <div class="p-3 rounded-3 bg-light border h-100">
                    <i class="bi bi-database-fill-check fs-2 text-success"></i>
                    <h6 class="fw-bold mt-2 mb-0">PDO SQL</h6>
                    <small class="text-muted">Prepared statements</small>
                </div>
            </div>
        </div>
    </div>

    <!-- Benefits Section -->
    <div class="row g-4">
        <div class="col-md-4">
            <div class="card card-custom p-4 border shadow-sm h-100">
                <div class="card-icon-box icon-emerald mb-2">
                    <i class="bi bi-clock-history"></i>
                </div>
                <h5 class="fw-bold text-slate-900">Instant Online Processing</h5>
                <p class="text-secondary small mb-0">
                    Eliminates long physical admission queues with immediate Student ID allocation and real-time database indexing.
                </p>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card card-custom p-4 border shadow-sm h-100">
                <div class="card-icon-box icon-blue mb-2">
                    <i class="bi bi-diagram-3"></i>
                </div>
                <h5 class="fw-bold text-slate-900">Decoupled Catalog Maintenance</h5>
                <p class="text-secondary small mb-0">
                    Faculty coordinators can update course offerings, seats, and fees in XML without modifying underlying database schemas or server code.
                </p>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card card-custom p-4 border shadow-sm h-100">
                <div class="card-icon-box icon-amber mb-2">
                    <i class="bi bi-shield-lock"></i>
                </div>
                <h5 class="fw-bold text-slate-900">Zero Trust Credential Privacy</h5>
                <p class="text-secondary small mb-0">
                    Built-in CSRF token protection, prepared SQL parameters, output sanitization (XSS defense), and BCRYPT password hashing.
                </p>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
