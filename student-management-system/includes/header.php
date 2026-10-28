<?php
/**
 * Student Registration and Course Management System
 * Shared Header Component
 * File: includes/header.php
 */

require_once __DIR__ . '/functions.php';
require_once __DIR__ . '/auth.php';

$currentPage = basename($_SERVER['PHP_SELF'] ?? 'index.php');
$flash = getFlash();
$student = getCurrentStudent();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= isset($pageTitle) ? htmlspecialchars($pageTitle) . ' | StudentHub' : 'StudentHub - Student Registration & Course Management' ?></title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="d-flex flex-column min-vh-100">

<!-- Navigation Bar (Deep & Royal Blue) -->
<nav class="navbar navbar-expand-lg navbar-dark bg-royal-blue sticky-top shadow-sm">
    <div class="container">
        <a class="navbar-brand d-flex items-center gap-2" href="index.php">
            <span class="brand-icon"><i class="bi bi-mortarboard-fill"></i></span>
            <span class="brand-text">Student<span class="text-accent">Hub</span></span>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li class="nav-item">
                    <a class="nav-link <?= ($currentPage === 'index.php') ? 'active' : '' ?>" href="index.php">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?= in_array($currentPage, ['courses.php', 'course-details.php']) ? 'active' : '' ?>" href="courses.php">Courses</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?= ($currentPage === 'about.php') ? 'active' : '' ?>" href="about.php">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?= ($currentPage === 'contact.php') ? 'active' : '' ?>" href="contact.php">Contact</a>
                </li>
            </ul>

            <div class="d-flex align-items-center gap-2">
                <?php if (isLoggedIn()): ?>
                    <a href="dashboard.php" class="btn btn-outline-light btn-sm <?= ($currentPage === 'dashboard.php') ? 'active' : '' ?>">
                        <i class="bi bi-speedometer2 me-1"></i> Dashboard
                    </a>
                    <div class="dropdown">
                        <button class="btn btn-accent btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-person-circle me-1"></i> <?= htmlspecialchars($student['full_name'] ?? 'Student') ?>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow">
                            <li><h6 class="dropdown-header">ID: <?= htmlspecialchars($student['student_id'] ?? '') ?></h6></li>
                            <li><a class="dropdown-item" href="dashboard.php"><i class="bi bi-person me-2"></i>My Profile</a></li>
                            <li><a class="dropdown-item" href="courses.php"><i class="bi bi-book me-2"></i>Explore Courses</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="logout.php"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                        </ul>
                    </div>
                <?php else: ?>
                    <a href="login.php" class="btn btn-outline-light btn-sm px-3 <?= ($currentPage === 'login.php') ? 'active' : '' ?>">
                        <i class="bi bi-box-arrow-in-right me-1"></i> Student Login
                    </a>
                    <a href="register.php" class="btn btn-gradient btn-sm px-3 shadow-sm <?= ($currentPage === 'register.php') ? 'active' : '' ?>">
                        <i class="bi bi-person-plus-fill me-1"></i> Register Now
                    </a>
                <?php endif; ?>
            </div>
        </div>
    </div>
</nav>

<!-- Global Flash Messages -->
<?php if ($flash): ?>
    <div class="container mt-3">
        <div class="alert alert-<?= htmlspecialchars($flash['type']) ?> alert-dismissible fade show shadow-sm" role="alert">
            <?= htmlspecialchars($flash['message']) ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
<?php endif; ?>
