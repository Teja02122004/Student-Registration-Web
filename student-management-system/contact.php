<?php
/**
 * Student Registration and Course Management System
 * Page 7: Contact Page
 * File: contact.php
 */

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/auth.php';

$errors = [];
$submittedData = [
    'name'    => '',
    'email'   => '',
    'subject' => '',
    'message' => '',
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        $errors[] = 'Security token invalid. Please refresh the form and try again.';
    }

    $submittedData['name']    = sanitize($_POST['name'] ?? '');
    $submittedData['email']   = strtolower(trim($_POST['email'] ?? ''));
    $submittedData['subject'] = sanitize($_POST['subject'] ?? '');
    $submittedData['message'] = sanitize($_POST['message'] ?? '');

    if (empty($submittedData['name']) || strlen($submittedData['name']) < 2) {
        $errors[] = 'Please enter your full name.';
    }

    if (empty($submittedData['email']) || !filter_var($submittedData['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Please provide a valid email address.';
    }

    if (empty($submittedData['subject'])) {
        $errors[] = 'Please specify the subject of your inquiry.';
    }

    if (empty($submittedData['message']) || strlen($submittedData['message']) < 10) {
        $errors[] = 'Please provide a detailed inquiry message (minimum 10 characters).';
    }

    if (empty($errors)) {
        try {
            $pdo = getDBConnection();
            $stmt = $pdo->prepare('
                INSERT INTO contact_messages (name, email, subject, message)
                VALUES (:name, :email, :subject, :message)
            ');
            $stmt->execute([
                ':name'    => $submittedData['name'],
                ':email'   => $submittedData['email'],
                ':subject' => $submittedData['subject'],
                ':message' => $submittedData['message'],
            ]);

            setFlash('success', 'Thank you! Your message has been received by Admissions. Ticket Reference: ADM-' . rand(10000, 99999));
            header('Location: contact.php?status=success');
            exit;
        } catch (PDOException $e) {
            $errors[] = 'Database processing error: ' . htmlspecialchars($e->getMessage());
        }
    }
}

$pageTitle = "Contact Admissions & Student Helpdesk";
require_once __DIR__ . '/includes/header.php';
?>

<div class="container py-5">
    <div class="row g-5">
        <!-- Contact Form Column -->
        <div class="col-lg-7">
            <div class="d-inline-flex align-items-center gap-2 px-3 py-1 mb-2 rounded-pill bg-primary-subtle text-primary border border-primary-subtle small fw-semibold">
                <i class="bi bi-headset"></i> 24/7 Admissions Support
            </div>
            <h2 class="fw-extrabold text-slate-900 mb-2">Get in Touch with Admissions</h2>
            <p class="text-secondary mb-4">
                Have questions regarding program eligibility, fee structures, or the registration process? Send us a message and an academic counselor will respond within 24 hours.
            </p>

            <?php if (!empty($errors)): ?>
                <div class="alert alert-danger shadow-sm mb-4" role="alert">
                    <ul class="mb-0 ps-3">
                        <?php foreach ($errors as $err): ?>
                            <li><?= htmlspecialchars($err) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <?php if (isset($_GET['status']) && $_GET['status'] === 'success'): ?>
                <div class="alert alert-success shadow-sm mb-4" role="alert">
                    <i class="bi bi-check-circle-fill me-2"></i>
                    Your message has been registered in the database. Our academic advisors will reach out via email shortly.
                </div>
            <?php endif; ?>

            <div class="card card-custom p-4 p-md-5 border shadow-sm">
                <form method="POST" action="contact.php" novalidate>
                    <input type="hidden" name="csrf_token" value="<?= generateCsrfToken() ?>">

                    <div class="row g-3">
                        <div class="col-md-6">
                            <label for="contact_name" class="form-label fw-semibold">Your Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="contact_name" name="name" placeholder="e.g. Priya Patel" value="<?= htmlspecialchars($submittedData['name']) ?>" required>
                        </div>

                        <div class="col-md-6">
                            <label for="contact_email" class="form-label fw-semibold">Your Email <span class="text-danger">*</span></label>
                            <input type="email" class="form-control" id="contact_email" name="email" placeholder="priya@example.com" value="<?= htmlspecialchars($submittedData['email']) ?>" required>
                        </div>

                        <div class="col-12">
                            <label for="contact_subject" class="form-label fw-semibold">Subject <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="contact_subject" name="subject" placeholder="e.g. Course eligibility query for B.Tech IT" value="<?= htmlspecialchars($submittedData['subject']) ?>" required>
                        </div>

                        <div class="col-12">
                            <label for="contact_message" class="form-label fw-semibold">Inquiry Message <span class="text-danger">*</span></label>
                            <textarea class="form-control" id="contact_message" name="message" rows="4" placeholder="Detail your query or requested assistance..." required><?= htmlspecialchars($submittedData['message']) ?></textarea>
                        </div>

                        <div class="col-12 mt-4">
                            <button type="submit" class="btn btn-gradient btn-lg w-100 shadow-sm py-2">
                                <i class="bi bi-send-fill me-2"></i> Send Inquiry Message
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Campus Info & FAQs Column -->
        <div class="col-lg-5">
            <div class="card card-custom p-4 border shadow-sm mb-4">
                <h5 class="fw-bold text-slate-900 mb-3">Campus Admissions Office</h5>

                <ul class="list-unstyled small text-secondary d-flex flex-column gap-3 mb-0">
                    <li class="d-flex gap-3">
                        <div class="brand-icon shrink-0" style="width: 40px; height: 40px; font-size: 1.1rem;">
                            <i class="bi bi-geo-alt-fill"></i>
                        </div>
                        <div>
                            <strong class="text-slate-900 d-block">Physical Campus:</strong>
                            <span>StudentHub Academic Complex, Knowledge Boulevard, Bengaluru, Karnataka - 560100</span>
                        </div>
                    </li>
                    <li class="d-flex gap-3">
                        <div class="brand-icon shrink-0" style="width: 40px; height: 40px; font-size: 1.1rem;">
                            <i class="bi bi-telephone-fill"></i>
                        </div>
                        <div>
                            <strong class="text-slate-900 d-block">Direct Helpline:</strong>
                            <span>+91 800-456-7890 / +91 80-2345-6789</span>
                        </div>
                    </li>
                    <li class="d-flex gap-3">
                        <div class="brand-icon shrink-0" style="width: 40px; height: 40px; font-size: 1.1rem;">
                            <i class="bi bi-envelope-at-fill"></i>
                        </div>
                        <div>
                            <strong class="text-slate-900 d-block">Official Email:</strong>
                            <span>admissions@studenthub.edu</span>
                        </div>
                    </li>
                    <li class="d-flex gap-3">
                        <div class="brand-icon shrink-0" style="width: 40px; height: 40px; font-size: 1.1rem;">
                            <i class="bi bi-clock-fill"></i>
                        </div>
                        <div>
                            <strong class="text-slate-900 d-block">Admissions Counter Timings:</strong>
                            <span>Monday to Saturday: 9:00 AM – 6:00 PM IST</span>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- FAQ Accordion -->
            <div class="card card-custom p-4 border shadow-sm">
                <h6 class="fw-bold text-slate-900 mb-3">Frequently Asked Questions</h6>
                <div class="accordion accordion-flush" id="faqAccordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="faq1">
                            <button class="accordion-button collapsed px-0 py-2 small fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                                How is the Student ID generated?
                            </button>
                        </h2>
                        <div id="collapse1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body px-0 text-muted small">
                                The Student ID is generated automatically using the university formula <code>STU-YYYY-XXXX</code> during database insertion.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="faq2">
                            <button class="accordion-button collapsed px-0 py-2 small fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                                Where are course records maintained?
                            </button>
                        </h2>
                        <div id="collapse2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body px-0 text-muted small">
                                All course offerings, fees, and syllabus outlines reside inside <code>data/courses.xml</code> and are dynamically parsed by PHP SimpleXML.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
