import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { AnimationProvider } from './components/animations/AnimationProvider';
import { Preloader } from './components/Preloader';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { EnrollmentModal } from './components/EnrollmentModal';
import { ConsultationModal } from './components/ConsultationModal';

import { HomeView } from './views/HomeView';
import { ServicesTrainingsView } from './views/ServicesTrainingsView';
import { AboutView } from './views/AboutView';
import { PortfolioView } from './views/PortfolioView';
import { BlogView } from './views/BlogView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

import { TrainingCourse } from './content/site';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCourseForEnrollment, setSelectedCourseForEnrollment] = useState<TrainingCourse | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    try {
      return sessionStorage.getItem('ae-seen') === '1';
    } catch (error) {
      console.warn('Unable to read the animation preloader session state.', error);
      return false;
    }
  });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimatePage = prefersReducedMotion !== true && activeTab !== 'admin';
  const finishPreloader = useCallback(() => setIsPreloaderDone(true), []);

  // Sync with browser hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'services', 'trainings', 'about', 'portfolio', 'blog', 'contact', 'admin'].includes(hash)) {
        setActiveTab(hash === 'trainings' ? 'services' : hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnrollCourse = (course: TrainingCourse) => {
    setSelectedCourseForEnrollment(course);
  };

  const handleOpenConsultation = () => {
    setIsConsultationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col relative selection:bg-[#C8282D] selection:text-white">
      {/* 1. AE Logo Preloader */}
      {!isPreloaderDone && <Preloader onComplete={finishPreloader} />}

      {/* 2. Top Scroll Progress */}
      <ScrollProgress />
      <AnimationProvider />

      {/* 3. Top Navigation Bar (Hidden in Admin full view) */}
      {activeTab !== 'admin' && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          onOpenConsultation={handleOpenConsultation}
        />
      )}

      {/* 5. Main Content Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={shouldAnimatePage ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldAnimatePage ? { opacity: 0, y: -6 } : undefined}
            transition={{ duration: shouldAnimatePage ? 0.22 : 0, ease: 'easeOut' }}
          >
            {activeTab === 'home' && (
              <HomeView
                setActiveTab={handleTabChange}
                onEnrollCourse={handleEnrollCourse}
                onOpenConsultation={handleOpenConsultation}
              />
            )}

            {activeTab === 'services' && (
              <ServicesTrainingsView
                initialTab="services"
                onEnrollCourse={handleEnrollCourse}
                onOpenConsultation={handleOpenConsultation}
              />
            )}

            {activeTab === 'about' && (
              <AboutView
                onOpenConsultation={handleOpenConsultation}
                setActiveTab={handleTabChange}
              />
            )}

            {activeTab === 'portfolio' && (
              <PortfolioView onOpenConsultation={handleOpenConsultation} />
            )}

            {activeTab === 'blog' && (
              <BlogView
                onOpenConsultation={handleOpenConsultation}
                setActiveTab={handleTabChange}
              />
            )}

            {activeTab === 'contact' && (
              <ContactView onLeadSubmitted={() => {}} />
            )}

            {activeTab === 'admin' && (
              <AdminView onBack={() => handleTabChange('home')} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 6. Footer (Hidden in Admin full view) */}
      {activeTab !== 'admin' && (
        <Footer
          setActiveTab={handleTabChange}
          onOpenConsultation={handleOpenConsultation}
        />
      )}

      {/* 7. Floating WhatsApp Quick Connect */}
      <FloatingWhatsApp />

      {/* 8. Course Admission / Enrollment Modal */}
      <EnrollmentModal
        course={selectedCourseForEnrollment}
        isOpen={!!selectedCourseForEnrollment}
        onClose={() => setSelectedCourseForEnrollment(null)}
      />

      {/* 9. Direct Strategic Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </div>
  );
}
