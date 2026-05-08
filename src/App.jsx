import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, Send, BookOpen } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Courses from './sections/Courses';
import Tutors from './sections/Tutors';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';
import { useTheme } from './hooks/useTheme';
import Achievements from './sections/Achievement';
import TutorProfile from './pages/TutorProfile';
import Blog from '../src/pages/Blog';
import BlogPost from './pages/BlogPost';
import { BlogProvider } from './context/BlogContext';
import Subscribe from './sections/Subscribe';
import Enrollment from './pages/Enrollment';
import CourseDetails from './pages/CourseDetails';
import Bootcamp from './pages/Bootcamp';
import Events from './pages/Events';
import DiscountCountdown from './components/DiscountCountdown';
import Review from './pages/Review';
import FindPath from './pages/FindPath';
import GraduationFlyer from './pages/GraduationFlyer';

const WelcomePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!showPopup) return null;

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="discount-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowPopup(false)}
          style={{ zIndex: 10001 }}
        >
          <motion.div
            className="discount-modal"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '500px',
              padding: '40px 35px',
              textAlign: 'center',
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px'
            }}
          >
            <button
              className="modal-close-btn"
              onClick={() => setShowPopup(false)}
              style={{ 
                position: 'absolute', 
                top: '15px', 
                right: '15px',
                background: 'var(--bg-primary)',
                color: 'var(--text-secondary)'
              }}
            >
              <X size={20} />
            </button>

            <div className="modal-header" style={{ marginBottom: '25px' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary-color), #daa520)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 25px rgba(218, 165, 32, 0.4)'
                }}
              >
                <GraduationCap size={40} color="white" />
              </motion.div>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: '800',
                color: 'var(--text-primary)',
                marginBottom: '10px',
                letterSpacing: '-0.5px'
              }}>
                Welcome to GeP ProTech! 👋
              </h2>
              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                Your journey to becoming a tech professional starts here.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                background: 'var(--navy, #1A3A6B)',
                borderRadius: '16px',
                padding: '25px 20px',
                marginBottom: '25px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: 'rgba(218, 165, 32, 0.2)',
                borderRadius: '50%'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '100px',
                height: '100px',
                background: 'rgba(218, 165, 32, 0.1)',
                borderRadius: '50%'
              }}></div>
              
              <p style={{
                color: 'var(--primary-color)',
                fontSize: '0.9rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '10px'
              }}>
                🎉 Announcement
              </p>
              <h3 style={{
                color: 'white',
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '8px'
              }}>
                Batch 13 is Now Ongoing!
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '0.95rem',
                lineHeight: '1.5'
              }}>
                Join our current cohort and transform your career in just <strong style={{ color: 'var(--primary-color)' }}>3 months</strong> of intensive training.
              </p>
            </motion.div>

            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/enroll" 
                  onClick={() => setShowPopup(false)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    background: 'linear-gradient(135deg, var(--primary-color), #daa520)',
                    color: 'white',
                    borderRadius: '30px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(218, 165, 32, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Send size={18} />
                  Apply Now
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a 
                  href="/#courses" 
                  onClick={() => setShowPopup(false)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    background: 'transparent',
                    color: 'var(--primary-color)',
                    border: '2px solid var(--primary-color)',
                    borderRadius: '30px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <BookOpen size={18} />
                  View Courses
                </a>
              </motion.div>
            </div>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              fontStyle: 'italic'
            }}>
              "The best time to start was yesterday. The next best time is now."
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Courses />
      <Tutors />
      <Gallery />
      <Achievements />
      <Contact />
      <Subscribe />
    </>
  );
}

function App() {
  useTheme();

  return (
    <BlogProvider>
      <Router>
        <div className="App">
          <WelcomePopup />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tutor/:id" element={<TutorProfile />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/enroll" element={<Enrollment />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/bootcamp" element={<Bootcamp />} />
              <Route path="/events" element={<Events />} />
              <Route path="/review" element={<Review />} />
              <Route path="/find-path" element={<FindPath />} />
              <Route path="/graduation-flyer" element={<GraduationFlyer />} />
            </Routes>
          </main>
          <Footer />
          <DiscountCountdown />
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;