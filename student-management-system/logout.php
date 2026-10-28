<?php
/**
 * Student Registration and Course Management System
 * Logout Handler
 * File: logout.php
 */

require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/auth.php';

logoutStudent();
setFlash('info', 'You have been safely logged out of the student portal.');
header('Location: login.php');
exit;
