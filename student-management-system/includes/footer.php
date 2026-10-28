<?php
/**
 * Student Registration and Course Management System
 * Shared Footer Component
 * File: includes/footer.php
 */
?>
<footer class="bg-navy text-white mt-auto pt-5 pb-4 border-top border-secondary-subtle">
    <div class="container">
        <div class="row g-4 mb-4">
            <!-- Brand Column -->
            <div class="col-lg-4 col-md-6">
                <div class="d-flex align-items-center gap-2 mb-3">
                    <span class="brand-icon"><i class="bi bi-mortarboard-fill"></i></span>
                    <span class="fs-4 fw-bold">Student<span class="text-accent">Hub</span></span>
                </div>
                <p class="text-light-subtle small mb-3">
                    A comprehensive, modern student registration and course catalogue portal built with robust PHP 8+, XML storage architecture, and prepared PDO SQL queries.
                </p>
                <div class="d-flex gap-2">
                    <span class="badge bg-primary-subtle text-primary border">PHP 8+</span>
                    <span class="badge bg-info-subtle text-info border">XML Data</span>
                    <span class="badge bg-success-subtle text-success border">MySQL / PDO</span>
                    <span class="badge bg-warning-subtle text-dark border">Bootstrap 5</span>
                </div>
            </div>

            <!-- Quick Links -->
            <div class="col-lg-2 col-md-6 col-6">
                <h6 class="text-uppercase fw-bold text-white mb-3">Navigation</h6>
                <ul class="list-unstyled small">
                    <li class="mb-2"><a href="index.php" class="footer-link">Home</a></li>
                    <li class="mb-2"><a href="courses.php" class="footer-link">Course Catalog</a></li>
                    <li class="mb-2"><a href="about.php" class="footer-link">About Project</a></li>
                    <li class="mb-2"><a href="contact.php" class="footer-link">Contact & Help</a></li>
                </ul>
            </div>

            <!-- Student Portal Links -->
            <div class="col-lg-2 col-md-6 col-6">
                <h6 class="text-uppercase fw-bold text-white mb-3">Student Portal</h6>
                <ul class="list-unstyled small">
                    <li class="mb-2"><a href="login.php" class="footer-link">Student Login</a></li>
                    <li class="mb-2"><a href="register.php" class="footer-link">New Registration</a></li>
                    <li class="mb-2"><a href="dashboard.php" class="footer-link">Student Dashboard</a></li>
                    <li class="mb-2"><a href="data/courses.xml" target="_blank" class="footer-link">Raw XML Feed</a></li>
                </ul>
            </div>

            <!-- Contact Information -->
            <div class="col-lg-4 col-md-6">
                <h6 class="text-uppercase fw-bold text-white mb-3">Campus Admissions</h6>
                <ul class="list-unstyled small text-light-subtle">
                    <li class="mb-2 d-flex gap-2">
                        <i class="bi bi-geo-alt-fill text-accent"></i>
                        <span>StudentHub Academic Complex, Knowledge Boulevard, Bengaluru, Karnataka - 560100</span>
                    </li>
                    <li class="mb-2 d-flex gap-2">
                        <i class="bi bi-telephone-fill text-accent"></i>
                        <span>Toll-Free Helpline: +91 800-456-7890</span>
                    </li>
                    <li class="mb-2 d-flex gap-2">
                        <i class="bi bi-envelope-fill text-accent"></i>
                        <span>admissions@studenthub.edu</span>
                    </li>
                    <li class="mb-2 d-flex gap-2">
                        <i class="bi bi-clock-fill text-accent"></i>
                        <span>Monday - Saturday: 9:00 AM - 6:00 PM IST</span>
                    </li>
                </ul>
            </div>
        </div>

        <hr class="border-secondary my-4">

        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center small text-light-subtle">
            <p class="mb-0">&copy; <?= date('Y') ?> StudentHub Management System. All rights reserved.</p>
            <div class="d-flex gap-3 mt-2 mt-md-0">
                <span>Academic Project Submission</span>
                <span>·</span>
                <span>Security Hardened</span>
                <span>·</span>
                <span>XML + PHP Engine</span>
            </div>
        </div>
    </div>
</footer>

<!-- Bootstrap 5 Bundle JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<!-- Project Script -->
<script src="assets/js/script.js"></script>
</body>
</html>
