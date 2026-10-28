/**
 * Student Registration and Course Management System
 * Client-Side Interactivity & Form Validation
 * File: assets/js/script.js
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Password Visibility Toggle
    const togglePasswordButtons = document.querySelectorAll('[data-toggle-password]');
    togglePasswordButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-toggle-password');
            const input = document.getElementById(targetId);
            const icon = btn.querySelector('i');
            if (input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    if (icon) {
                        icon.classList.remove('bi-eye');
                        icon.classList.add('bi-eye-slash');
                    }
                } else {
                    input.type = 'password';
                    if (icon) {
                        icon.classList.remove('bi-eye-slash');
                        icon.classList.add('bi-eye');
                    }
                }
            }
        });
    });

    // 2. Client-Side Validation for Registration Form
    const registerForm = document.getElementById('studentRegisterForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            const password = document.getElementById('password')?.value || '';
            const confirmPassword = document.getElementById('confirm_password')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            const terms = document.getElementById('terms_agreed')?.checked;
            
            let hasError = false;
            let errorMessage = '';

            // 10-digit Indian phone regex
            const phonePattern = /^[6-9]\d{9}$/;
            if (!phonePattern.test(phone.trim())) {
                errorMessage = 'Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9.';
                hasError = true;
            } else if (password.length < 8) {
                errorMessage = 'Password must be at least 8 characters long.';
                hasError = true;
            } else if (password !== confirmPassword) {
                errorMessage = 'Password and Confirm Password do not match.';
                hasError = true;
            } else if (!terms) {
                errorMessage = 'You must agree to the terms and conditions.';
                hasError = true;
            }

            if (hasError) {
                e.preventDefault();
                displayAlert(errorMessage, 'danger');
            }
        });
    }

    // 3. Client-Side Validation for Login Form
    const loginForm = document.getElementById('studentLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const email = document.getElementById('email')?.value || '';
            const password = document.getElementById('password')?.value || '';

            if (!email.trim() || !password.trim()) {
                e.preventDefault();
                displayAlert('Please enter both your registered email and password.', 'warning');
            }
        });
    }

    // 4. Course Filter and Search (Dynamic Filter)
    const courseSearchInput = document.getElementById('courseSearchInput');
    const courseCards = document.querySelectorAll('.course-item');
    const courseRows = document.querySelectorAll('.course-table-row');
    const categoryButtons = document.querySelectorAll('[data-category-filter]');

    let currentCategory = 'all';
    let searchQuery = '';

    function applyCourseFilter() {
        const query = searchQuery.toLowerCase().trim();

        const matchCourse = (item) => {
            const title = item.getAttribute('data-course-title')?.toLowerCase() || '';
            const code = item.getAttribute('data-course-code')?.toLowerCase() || '';
            const dept = item.getAttribute('data-course-dept')?.toLowerCase() || '';
            const cat = item.getAttribute('data-course-category') || '';

            const matchesCategory = (currentCategory === 'all' || cat === currentCategory);
            const matchesQuery = !query || title.includes(query) || code.includes(query) || dept.includes(query);

            return matchesCategory && matchesQuery;
        };

        // Filter cards
        courseCards.forEach(card => {
            card.style.display = matchCourse(card) ? '' : 'none';
        });

        // Filter table rows
        courseRows.forEach(row => {
            row.style.display = matchCourse(row) ? '' : 'none';
        });
    }

    if (courseSearchInput) {
        courseSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            applyCourseFilter();
        });
    }

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active', 'btn-primary'));
            categoryButtons.forEach(b => b.classList.add('btn-outline-secondary'));
            btn.classList.add('active', 'btn-primary');
            btn.classList.remove('btn-outline-secondary');

            currentCategory = btn.getAttribute('data-category-filter') || 'all';
            applyCourseFilter();
        });
    });

    // Helper: Display Alert Banner
    function displayAlert(message, type = 'danger') {
        const container = document.getElementById('alertFeedbackContainer') || document.querySelector('.container');
        if (!container) return;

        const alertEl = document.createElement('div');
        alertEl.className = `alert alert-${type} alert-dismissible fade show shadow-sm mt-3`;
        alertEl.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        container.prepend(alertEl);
        window.scrollTo({ top: alertEl.offsetTop - 80, behavior: 'smooth' });

        setTimeout(() => {
            alertEl.classList.remove('show');
            setTimeout(() => alertEl.remove(), 300);
        }, 5000);
    }
});
