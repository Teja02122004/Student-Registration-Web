/**
 * Main Application Root (App.tsx)
 * Coordinates routes, XML course data fetching, student session state,
 * modal dialogs, and navigation.
 */

import React, { useState, useEffect } from 'react';
import { ActivePage, Course, Student } from './types/index.ts';
import { loadCoursesFromXML, FALLBACK_COURSES } from './utils/xmlParser.ts';
import { 
  initStorage, 
  getCurrentSession, 
  logoutStudent as clearSession,
  updateStudentCourse 
} from './utils/storage.ts';
import confetti from 'canvas-confetti';

// Components
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './components/HomePage.tsx';
import { RegisterPage } from './components/RegisterPage.tsx';
import { LoginPage } from './components/LoginPage.tsx';
import { CoursesPage } from './components/CoursesPage.tsx';
import { DashboardPage } from './components/DashboardPage.tsx';
import { AboutPage } from './components/AboutPage.tsx';
import { ContactPage } from './components/ContactPage.tsx';
import { CourseDetailsModal } from './components/CourseDetailsModal.tsx';
import { PhpExplorerModal } from './components/PhpExplorerModal.tsx';

import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [courses, setCourses] = useState<Course[]>(FALLBACK_COURSES);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  
  // Navigation props state
  const [preSelectedCourseForRegister, setPreSelectedCourseForRegister] = useState<string>('');
  const [preFilledEmailForLogin, setPreFilledEmailForLogin] = useState<string>('');
  const [modalCourse, setModalCourse] = useState<Course | null>(null);
  const [phpExplorerOpen, setPhpExplorerOpen] = useState(false);

  // Global Toast Notice
  const [toast, setToast] = useState<{ type: 'success' | 'danger' | 'info'; message: string } | null>(null);

  const showToast = (type: 'success' | 'danger' | 'info', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  // Initialization: seed storage and load XML courses
  useEffect(() => {
    initStorage();
    const session = getCurrentSession();
    if (session) {
      setCurrentStudent(session);
    }

    // Load XML courses
    loadCoursesFromXML().then((loaded) => {
      if (loaded && loaded.length > 0) {
        setCourses(loaded);
      }
    });
  }, []);

  // Handlers
  const handleSelectCourse = (courseCode: string) => {
    if (currentStudent) {
      // Update enrolled course in storage
      const res = updateStudentCourse(currentStudent.id, courseCode);
      if (res.success && res.student) {
        setCurrentStudent(res.student);
        showToast('success', `Enrolled in ${courseCode} successfully! Updated on your dashboard.`);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
        setActivePage('dashboard');
      } else {
        showToast('danger', res.message);
      }
    } else {
      // Prompt student to register with this course pre-selected
      setPreSelectedCourseForRegister(courseCode);
      setActivePage('register');
      showToast('info', `Selected ${courseCode}. Complete registration to finalize enrollment.`);
    }
  };

  const handleRegisteredSuccess = (email: string) => {
    setPreFilledEmailForLogin(email);
    setActivePage('login');
    showToast('success', 'Registration complete! Please enter your password to sign in.');
  };

  const handleLoginSuccess = (student: Student) => {
    setCurrentStudent(student);
    setActivePage('dashboard');
    showToast('success', `Welcome back, ${student.fullName}!`);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 },
    });
  };

  const handleLogout = () => {
    clearSession();
    setCurrentStudent(null);
    setActivePage('login');
    showToast('info', 'You have been safely signed out.');
  };

  const handleProfileUpdated = (updated: Student) => {
    setCurrentStudent(updated);
    showToast('success', 'Your student profile has been updated.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-['Plus_Jakarta_Sans'] text-slate-900 selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        currentStudent={currentStudent}
        onLogout={handleLogout}
        onOpenPhpExplorer={() => setPhpExplorerOpen(true)}
      />

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in max-w-sm">
          <div
            className={`p-4 rounded-2xl shadow-xl flex items-start gap-3 border ${
              toast.type === 'success'
                ? 'bg-emerald-900 text-white border-emerald-700'
                : toast.type === 'danger'
                ? 'bg-red-900 text-white border-red-700'
                : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : toast.type === 'danger' ? (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            )}
            <div className="text-xs font-medium leading-relaxed flex-1">
              {toast.message}
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-white/60 hover:text-white p-0.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Page View Routing */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            courses={courses}
            setActivePage={setActivePage}
            onSelectCourse={handleSelectCourse}
            onViewCourseDetails={(course) => setModalCourse(course)}
          />
        )}

        {activePage === 'register' && (
          <RegisterPage
            courses={courses}
            preSelectedCourseCode={preSelectedCourseForRegister}
            setActivePage={setActivePage}
            onRegisteredSuccess={handleRegisteredSuccess}
          />
        )}

        {activePage === 'login' && (
          <LoginPage
            initialEmail={preFilledEmailForLogin}
            setActivePage={setActivePage}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {activePage === 'courses' && (
          <CoursesPage
            courses={courses}
            currentStudent={currentStudent}
            onSelectCourse={handleSelectCourse}
            onViewCourseDetails={(course) => setModalCourse(course)}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            currentStudent={currentStudent}
            courses={courses}
            setActivePage={setActivePage}
            onLogout={handleLogout}
            onProfileUpdated={handleProfileUpdated}
            onViewCourseDetails={(course) => setModalCourse(course)}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            setActivePage={setActivePage}
            onOpenPhpExplorer={() => setPhpExplorerOpen(true)}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Course Details Modal */}
      <CourseDetailsModal
        course={modalCourse}
        currentStudent={currentStudent}
        onClose={() => setModalCourse(null)}
        onSelectCourse={handleSelectCourse}
      />

      {/* PHP Source Explorer & ZIP Downloader Modal */}
      <PhpExplorerModal
        isOpen={phpExplorerOpen}
        onClose={() => setPhpExplorerOpen(false)}
      />

      {/* Footer */}
      <Footer
        setActivePage={setActivePage}
        onOpenPhpExplorer={() => setPhpExplorerOpen(true)}
      />

    </div>
  );
}
