import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, Send, BookOpen, FlaskConical } from 'lucide-react';
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
        width: '90%',
        padding: '25px 20px',
        textAlign: 'center',
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        maxHeight: '90vh',
        overflowY: 'auto'
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

      <div className="modal-header" style={{ marginBottom: '20px' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary-color), #daa520)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px',
            boxShadow: '0 6px 20px rgba(218, 165, 32, 0.4)'
          }}
        >
          <GraduationCap size={30} color="white" />
        </motion.div>
        <h2 style={{
          fontSize: 'clamp(1.3rem, 5vw, 1.8rem)',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '8px',
          letterSpacing: '-0.5px'
        }}>
          Welcome to GeP ProTech! 👋
        </h2>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.5'
        }}>
          Your journey to becoming a tech professional starts here.
        </p>
      </div>

      {/* Batch 13 announcement */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: 'var(--navy, #1A3A6B)',
          borderRadius: '16px',
          padding: '18px 15px',
          marginBottom: '15px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute', top: '-15px', right: '-15px',
          width: '60px', height: '60px',
          background: 'rgba(218, 165, 32, 0.2)', borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute', bottom: '-20px', left: '-20px',
          width: '70px', height: '70px',
          background: 'rgba(218, 165, 32, 0.1)', borderRadius: '50%'
        }} />
        <p style={{
          color: 'var(--primary-color)',
          fontSize: '0.8rem', fontWeight: '600',
          textTransform: 'uppercase', letterSpacing: '1px',
          marginBottom: '8px'
        }}>
          🎉 Announcement
        </p>
        <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px' }}>
          Batch 13 is Now Ongoing!
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', lineHeight: '1.4' }}>
          Join our current cohort and transform your career in just{' '}
          <strong style={{ color: 'var(--primary-color)' }}>3 months</strong> of intensive training.
        </p>
      </motion.div>

      {/* NEW: Soap & Detergent Production announcement */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{
          background: 'linear-gradient(135deg, rgba(26,58,107,0.08) 0%, rgba(200,152,42,0.10) 100%)',
          border: '1.5px solid rgba(200,152,42,0.4)',
          borderRadius: '16px',
          padding: '16px 15px',
          marginBottom: '20px',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'left'
        }}
      >
        <div style={{
          position: 'absolute', top: '-10px', right: '-10px',
          width: '50px', height: '50px',
          background: 'rgba(200,152,42,0.12)', borderRadius: '50%'
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #1A3A6B, #c8982a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <FlaskConical size={14} color="white" />
          </div>
          <p style={{
            color: '#c8982a', fontSize: '0.75rem', fontWeight: '700',
            textTransform: 'uppercase', letterSpacing: '1px', margin: 0
          }}>
            🧼 New Program — Enrolling Now
          </p>
        </div>
        <h3 style={{ color: '#1A3A6B', fontSize: '1.05rem', fontWeight: '800', marginBottom: '5px' }}>
          Soap & Detergent Production (SaDP)
        </h3>
        <p style={{ color: 'var(--text-primary)', fontSize: '0.82rem', lineHeight: '1.5', marginBottom: '10px', opacity: 0.85 }}>
          From raw materials to market-ready products — learn to produce Liquid Soap, Omo, Savon Transparent, Chocolate Soap & more.
          <strong style={{ color: '#1A3A6B' }}> Learn. Produce. Succeed.</strong>
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{
            background: 'rgba(26,58,107,0.1)', color: '#1A3A6B',
            fontSize: '0.75rem', fontWeight: '700',
            padding: '3px 10px', borderRadius: '20px',
            border: '1px solid rgba(26,58,107,0.2)'
          }}>
            Reg: 5,000 FRS
          </span>
          <span style={{
            background: 'rgba(200,152,42,0.15)', color: '#8a6010',
            fontSize: '0.75rem', fontWeight: '700',
            padding: '3px 10px', borderRadius: '20px',
            border: '1px solid rgba(200,152,42,0.35)'
          }}>
            Training: 50,000 FRS
          </span>
          <span style={{
            background: 'rgba(37,211,102,0.1)', color: '#1a7a40',
            fontSize: '0.75rem', fontWeight: '700',
            padding: '3px 10px', borderRadius: '20px',
            border: '1px solid rgba(37,211,102,0.25)'
          }}>
            8 Modules
          </span>
        </div>
      </motion.div>

      {/* Action buttons */}
      <div style={{
        display: 'flex', gap: '10px',
        marginBottom: '15px', flexWrap: 'wrap', justifyContent: 'center'
      }}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/enroll"
            onClick={() => setShowPopup(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '12px 22px',
              background: 'linear-gradient(135deg, var(--primary-color), #daa520)',
              color: 'white', borderRadius: '30px',
              fontWeight: '600', fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(218, 165, 32, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            <Send size={16} />
            Apply Now
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <a
            href="/#courses"
            onClick={() => setShowPopup(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '12px 22px', background: 'transparent',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)',
              borderRadius: '30px', fontWeight: '600', fontSize: '0.9rem',
              textDecoration: 'none', transition: 'all 0.3s ease'
            }}
          >
            <BookOpen size={16} />
            View Courses
          </a>
        </motion.div>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic' }}>
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