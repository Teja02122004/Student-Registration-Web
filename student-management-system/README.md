# StudentHub: Student Registration & Course Management System

A production-grade, secure academic web application built with **PHP 8+**, **SimpleXML**, **MySQL / SQLite (PDO)**, and **Bootstrap 5**.

---

## 📌 Project Architecture

```
student-management-system/
├── index.php                 # Page 1: Home Page & Portal Hero
├── register.php              # Page 2: Student Registration Form & Duplicate Check
├── login.php                 # Page 3: Secure Session Authentication & Show/Hide Password
├── logout.php                # Logout Controller & Session Invalidation
├── courses.php               # Page 4: XML-Driven Course Management & Dynamic Filter
├── course-details.php        # Detailed Course View & Syllabus Modules
├── dashboard.php             # Page 5: Protected Student Dashboard & Profile Editor
├── about.php                 # Page 6: Aim, Objectives, Architecture & Benefits
├── contact.php               # Page 7: Admissions Inquiry Form & FAQ Accordion
├── config/
│   └── database.php          # Robust PDO Database Connection (MySQL + SQLite fallback)
├── includes/
│   ├── header.php            # Royal Blue Responsive Navigation Bar
│   ├── footer.php            # Campus Info, Copyright & Quick Links
│   ├── auth.php              # Session Guards, CSRF & Route Protection
│   └── functions.php         # XML Parser (SimpleXML), Indian Phone & Sanitization
├── data/
│   └── courses.xml           # Structured XML Course Catalog with Fees & Syllabi
├── database/
│   └── schema.sql            # MySQL Database Schema with Seed Data & Indexes
└── assets/
    ├── css/style.css         # Modern Royal Blue & Purple Theme Stylesheet
    └── js/script.js          # Client-side Validation, Live Course Search & Password Toggle
```

---

## 🚀 How to Run Locally with XAMPP / WAMP / MAMP

### Prerequisites
- PHP 8.0 or higher
- Apache Web Server
- MySQL 5.7+ or MariaDB 10.4+ (or use automatic SQLite fallback)

### Step 1: Place Files into Web Root
1. Copy or extract the `student-management-system/` directory into your Apache document root:
   - **XAMPP Windows**: `C:\xampp\htdocs\student-management-system`
   - **XAMPP macOS**: `/Applications/XAMPP/xamppfiles/htdocs/student-management-system`
   - **WAMP**: `C:\wamp64\www\student-management-system`
   - **Linux / LAMP**: `/var/www/html/student-management-system`

### Step 2: Database Setup (phpMyAdmin)
1. Open your browser and navigate to `http://localhost/phpmyadmin/`.
2. Click on the **Databases** tab and create a new database named `student_management_db` with collation `utf8mb4_unicode_ci`.
3. Select `student_management_db`, click on **Import**, and select `database/schema.sql`.
4. Click **Go** to execute the script. The tables (`students`, `contact_messages`, `student_sessions`) and demo records will be created.

### Step 3: Launch in Browser
Open your browser and navigate to:
```
http://localhost/student-management-system/
```

---

## ⚡ Alternative: Run Instantly with PHP Built-In Server

If you have PHP 8+ installed on your terminal, you can run the application directly without XAMPP:

```bash
cd student-management-system
php -S localhost:8000
```
Open `http://localhost:8000` in your browser. If MySQL is not running, `config/database.php` will automatically create and connect to `database/database.sqlite` seamlessly!

---

## 🔑 Pre-Configured Demo Credentials

Use these verified credentials to test authenticated student features:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Demo Student 1** | `aarav.sharma@studenthub.edu` | `Student@123` |
| **Demo Student 2** | `priya.patel@studenthub.edu` | `Student@123` |

---

## 🛡️ Security Implementation Details

1. **Password Hashing**: Passwords are cryptographically salted and hashed using `password_hash($pass, PASSWORD_BCRYPT, ['cost' => 12])`. Plaintext is never stored.
2. **Session Security**: `session_regenerate_id(true)` is invoked on authentication to eliminate Session Fixation vulnerabilities.
3. **Route Protection**: `requireAuth()` guards the student dashboard and redirects unauthenticated requests.
4. **SQL Injection Defense**: 100% of queries use PDO Prepared Statements with bound parameters.
5. **CSRF Tokens**: Form submissions validate cryptographically random anti-CSRF tokens stored in the session.
6. **XSS Protection**: All dynamic output is escaped using `htmlspecialchars(..., ENT_QUOTES, 'UTF-8')`.

---

## 📄 XML Integration Architecture

All academic programs (B.Tech IT, BCA, B.Sc CS, MCA, AI & Data Science, Cybersecurity) are defined in `data/courses.xml`. The function `getCoursesFromXML()` in `includes/functions.php` reads this file using PHP's `simplexml_load_file()`, transforming it into an array for cards, tables, and registration dropdowns. Updating `courses.xml` updates the whole system with zero code changes!
