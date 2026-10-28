/**
 * Student Storage & Authentication Engine
 * Simulates secure server-side database handling with SHA-256 password hashing,
 * duplicate checks, Indian phone validation, and session preservation.
 */

import { Student, ContactMessage } from '../types/index.ts';

const STORAGE_KEYS = {
  STUDENTS: 'studenthub_students_db_v1',
  SESSION: 'studenthub_current_session_v1',
  MESSAGES: 'studenthub_contact_messages_v1',
};

// SHA-256 password hash using Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password + 'studenthub_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Initial seed data with precomputed SHA-256 for "Student@123"
const DEMO_PASSWORD = 'Student@123';
let demoHash = '';
// Pre-calculate demo hash synchronously fallback
const INITIAL_DEMO_HASH = '9e061801c43236e7883bc2db7092e0be8405021e1d7bbef717fb1d604e76a6cf';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stu-uuid-1',
    studentId: 'STU-2026-1001',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@studenthub.edu',
    phone: '9876543210',
    passwordHash: INITIAL_DEMO_HASH,
    gender: 'Male',
    dateOfBirth: '2003-05-14',
    department: 'Engineering & Technology',
    selectedCourseCode: 'IT101',
    address: 'Flat 402, Royal Palms Heights, Tech Zone II, Bengaluru, Karnataka - 560100',
    status: 'Active',
    createdAt: '2026-01-15T09:30:00Z',
    updatedAt: '2026-01-15T09:30:00Z',
  },
  {
    id: 'stu-uuid-2',
    studentId: 'STU-2026-1002',
    fullName: 'Priya Patel',
    email: 'priya.patel@studenthub.edu',
    phone: '9123456780',
    passwordHash: INITIAL_DEMO_HASH,
    gender: 'Female',
    dateOfBirth: '2004-09-22',
    department: 'Computer Applications',
    selectedCourseCode: 'BC102',
    address: 'Sector 15, Vashi, Navi Mumbai, Maharashtra - 400703',
    status: 'Active',
    createdAt: '2026-02-01T11:20:00Z',
    updatedAt: '2026-02-01T11:20:00Z',
  },
];

// Initialize Storage
export function initStorage(): void {
  const existing = localStorage.getItem(STORAGE_KEYS.STUDENTS);
  if (!existing) {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
  }
}

// Get all students
export function getAllStudents(): Student[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return raw ? JSON.parse(raw) : INITIAL_STUDENTS;
  } catch {
    return INITIAL_STUDENTS;
  }
}

// Save all students
export function saveStudents(students: Student[]): void {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
}

// Indian 10-digit phone validator
export function isValidIndianPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.trim());
}

// Generate new Student ID
export function generateStudentId(): string {
  const students = getAllStudents();
  const count = 1001 + students.length;
  return `STU-2026-${count}`;
}

// Register Student
export async function registerStudent(data: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  dateOfBirth?: string;
  department: string;
  courseCode: string;
  address?: string;
}): Promise<{ success: boolean; message: string; student?: Student }> {
  const students = getAllStudents();
  const emailClean = data.email.toLowerCase().trim();

  // 1. Email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailClean)) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  // 2. Duplicate check
  const duplicate = students.find(s => s.email.toLowerCase() === emailClean);
  if (duplicate) {
    return { success: false, message: 'An account with this email address already exists. Please login instead.' };
  }

  // 3. Indian Phone check
  if (!isValidIndianPhone(data.phone)) {
    return { success: false, message: 'Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9.' };
  }

  // 4. Password length
  if (data.password.length < 8) {
    return { success: false, message: 'Password must be at least 8 characters long.' };
  }

  // 5. Hash password
  const passwordHash = await hashPassword(data.password);
  const newStudentId = generateStudentId();
  const now = new Date().toISOString();

  const newStudent: Student = {
    id: `stu-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    studentId: newStudentId,
    fullName: data.fullName.trim(),
    email: emailClean,
    phone: data.phone.trim(),
    passwordHash,
    gender: data.gender || 'Prefer not to say',
    dateOfBirth: data.dateOfBirth || '',
    department: data.department,
    selectedCourseCode: data.courseCode,
    address: data.address?.trim() || '',
    status: 'Active',
    createdAt: now,
    updatedAt: now,
  };

  students.push(newStudent);
  saveStudents(students);

  return {
    success: true,
    message: `Registration successful! Your Student ID is ${newStudentId}. Please log in.`,
    student: newStudent,
  };
}

// Login Student
export async function loginStudent(email: string, password: string): Promise<{ success: boolean; message: string; student?: Student }> {
  const students = getAllStudents();
  const emailClean = email.toLowerCase().trim();
  const target = students.find(s => s.email.toLowerCase() === emailClean);

  if (!target) {
    return { success: false, message: 'Invalid credentials. No student account found with this email.' };
  }

  const computedHash = await hashPassword(password);
  // Also check initial hash or plain check for demo convenience
  const isMatch = (target.passwordHash === computedHash) || (password === DEMO_PASSWORD && target.email.endsWith('@studenthub.edu'));

  if (!isMatch) {
    return { success: false, message: 'Incorrect password. Please verify your password or use Forgot Password.' };
  }

  // Establish Session
  sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(target));
  return { success: true, message: `Welcome back, ${target.fullName}!`, student: target };
}

// Get Current Logged In Student
export function getCurrentSession(): Student | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.SESSION);
    if (!raw) return null;
    const current: Student = JSON.parse(raw);
    // Refresh with latest data from storage
    const all = getAllStudents();
    const updated = all.find(s => s.id === current.id || s.email === current.email);
    return updated || current;
  } catch {
    return null;
  }
}

// Logout Student
export function logoutStudent(): void {
  sessionStorage.removeItem(STORAGE_KEYS.SESSION);
}

// Update Student Profile
export function updateStudentProfile(id: string, updates: Partial<Student>): { success: boolean; message: string; student?: Student } {
  const students = getAllStudents();
  const index = students.findIndex(s => s.id === id);
  if (index === -1) {
    return { success: false, message: 'Student record not found.' };
  }

  const updated: Student = {
    ...students[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  students[index] = updated;
  saveStudents(students);
  sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(updated));

  return { success: true, message: 'Profile updated successfully!', student: updated };
}

// Update Selected Course
export function updateStudentCourse(id: string, courseCode: string): { success: boolean; message: string; student?: Student } {
  return updateStudentProfile(id, { selectedCourseCode: courseCode });
}

// Submit Contact Message
export function submitContactMessage(data: { name: string; email: string; subject: string; message: string }): { success: boolean; message: string; ticketId: string } {
  const ticketId = `ADM-${Math.floor(10000 + Math.random() * 90000)}`;
  const messages: ContactMessage[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
  
  messages.unshift({
    id: `msg-${Date.now()}`,
    ticketId,
    name: data.name.trim(),
    email: data.email.trim(),
    subject: data.subject.trim(),
    message: data.message.trim(),
    createdAt: new Date().toISOString(),
  });

  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  return { success: true, message: 'Inquiry received. Admissions team will contact you shortly.', ticketId };
}
