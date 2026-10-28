/**
 * Contact Page (Page 7)
 * Admissions Inquiry Form with validation, ticket ID generation,
 * campus contact details, and interactive FAQ accordion.
 */

import React, { useState } from 'react';
import { submitContactMessage } from '../utils/storage.ts';
import { 
  Mail, 
  Send, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ChevronDown,
  Headphones
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ message: string; ticketId: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How is the Student ID formatted and issued?',
      a: 'The Student ID is generated automatically upon database insertion using the institutional formula STU-YYYY-XXXX (e.g. STU-2026-1001). It serves as your permanent academic identifier.',
    },
    {
      q: 'Can I change my course after registering?',
      a: 'Yes. Once logged into your Student Dashboard, you can navigate to the Course Catalog and click "Select Course" on any other eligible program to update your enrolled matriculation record.',
    },
    {
      q: 'How does the XML course storage work?',
      a: 'All degree program data (fees, duration, eligibility, syllabi) is maintained inside data/courses.xml. Both our PHP SimpleXML backend and client DOMParser parse this file dynamically, allowing immediate curriculum updates with zero schema alterations.',
    },
    {
      q: 'Is my password secure in this system?',
      a: 'Yes. Passwords are never stored in plaintext. In the PHP backend, passwords are cryptographically salted and hashed using password_hash(..., PASSWORD_BCRYPT). In this browser preview, SHA-256 Web Crypto hashing is enforced.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessInfo(null);

    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg('Please enter your full legal name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!subject.trim()) {
      setErrorMsg('Please specify the subject of your inquiry.');
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setErrorMsg('Please provide a message with at least 10 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = submitContactMessage({
        name,
        email,
        subject,
        message,
      });

      setIsSubmitting(false);
      setSuccessInfo({ message: res.message, ticketId: res.ticketId });

      // Clear form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Error submitting message.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold mb-3">
          <Headphones className="w-3.5 h-3.5" />
          <span>24/7 Admissions &amp; Technical Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
          Contact Admissions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Have queries regarding degree eligibility, annual fees, or registration? Get in touch with our admissions counselors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          
          <h2 className="text-xl font-bold text-slate-900 font-['Outfit'] mb-2">
            Send an Admissions Inquiry
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Submissions are registered directly in the <code>contact_messages</code> database table.
          </p>

          {/* Feedback banners */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-800 text-xs flex items-center gap-2.5 border border-red-200">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successInfo && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-start gap-3 border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-bold text-emerald-900 mb-1">
                  Message Dispatched Successfully!
                </strong>
                <span>{successInfo.message}</span>
                <div className="mt-2 font-mono font-bold text-slate-800 bg-white/80 px-2 py-1 rounded inline-block border border-emerald-200">
                  Ticket Reference: {successInfo.ticketId}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Patel"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="priya@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Course eligibility query for B.Tech Information Technology"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail your question or requested admissions support..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Transmitting Message...' : 'Submit Admissions Inquiry'}</span>
            </button>
          </form>

        </div>

        {/* Info & FAQ Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Office Contact Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
              Admissions Liaison Office
            </h3>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Campus Address:</strong>
                  <span>StudentHub Academic Complex, Knowledge Boulevard, Bengaluru, Karnataka - 560100</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900">Helpline:</strong>
                  <span>+91 800-456-7890 (Toll-Free) / +91 80-2345-6789</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900">Official Inbox:</strong>
                  <span>admissions@studenthub.edu</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900">Desk Hours:</strong>
                  <span>Monday to Saturday: 9:00 AM – 6:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive FAQs Accordion */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-2">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full p-3 text-left text-xs font-bold text-slate-800 bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-3 text-xs text-slate-600 bg-white leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
