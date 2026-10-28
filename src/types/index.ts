/**
 * Student Registration and Course Management System
 * Type Definitions
 */

export interface Course {
  code: string;
  name: string;
  department: string;
  category: string;
  duration: string;
  fee: number;
  feeFormatted: string;
  eligibility: string;
  description: string;
  seats: number;
  rating: number;
  icon: string;
  badge?: string;
  syllabus: string[];
  careerOpportunities: string;
}

export interface Student {
  id: string;
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  dateOfBirth?: string;
  department: string;
  selectedCourseCode: string;
  address?: string;
  status: 'Active' | 'Pending Verification' | 'Suspended';
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  ticketId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export type ActivePage = 
  | 'home' 
  | 'register' 
  | 'login' 
  | 'courses' 
  | 'course-details' 
  | 'dashboard' 
  | 'about' 
  | 'contact';
