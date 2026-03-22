import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Timer } from 'lucide-react';
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
import Blog from '../src/pages/Blog'; // Add this import
import BlogPost from './pages/BlogPost'; // We'll create this next
import { BlogProvider } from './context/BlogContext'; // Add this import
import Subscribe from './sections/Subscribe';
import Enrollment from './pages/Enrollment';
import CourseDetails from './pages/CourseDetails';
import DiscountCountdown from './components/DiscountCountdown';

// Welcome Popup Component - shows on every page load/refresh
const WelcomePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Discount end date - April 10, 2026
  const DISCOUNT_END_DATE = new Date("2026-04-10T23:59:59").getTime();

  useEffect(() => {
    // Show popup after a short delay on mount
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = DISCOUNT_END_DATE - now;

      if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, "0");

  // Calculate progress percentage (from 32 days total)
  const totalSeconds = 32 * 24 * 60 * 60;
  const remainingSeconds = timeLeft.days * 24 * 60 * 60 + timeLeft.hours * 60 * 60 + timeLeft.minutes * 60 + timeLeft.seconds;
  const progressPercent = Math.min(100, (remainingSeconds / totalSeconds) * 100);

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
          >
            <button
              className="modal-close-btn"
              onClick={() => setShowPopup(false)}
            >
              <X size={20} />
            </button>

            <div className="modal-header">
              <div className="modal-icon-wrapper">
                <Gift size={40} className="modal-gift-icon" />
              </div>
              <h2 className="modal-title">Welcome to Gep Protech!</h2>
              <p className="modal-subtitle">Get 30% off on all our courses</p>
            </div>

            <div className="modal-timer-section">
              <p className="timer-label">Offer ends in:</p>
              <div className="modal-timer">
                <div className="modal-time-block">
                  <span className="modal-time-value">{formatNumber(timeLeft.days)}</span>
                  <span className="modal-time-label">Days</span>
                </div>
                <span className="modal-time-sep">:</span>
                <div className="modal-time-block">
                  <span className="modal-time-value">{formatNumber(timeLeft.hours)}</span>
                  <span className="modal-time-label">Hours</span>
                </div>
                <span className="modal-time-sep">:</span>
                <div className="modal-time-block">
                  <span className="modal-time-value">{formatNumber(timeLeft.minutes)}</span>
                  <span className="modal-time-label">Minutes</span>
                </div>
                <span className="modal-time-sep">:</span>
                <div className="modal-time-block">
                  <span className="modal-time-value">{formatNumber(timeLeft.seconds)}</span>
                  <span className="modal-time-label">Seconds</span>
                </div>
              </div>
            </div>

            <div className="modal-progress-section">
              <div className="progress-header">
                <span>Time remaining</span>
                <span>{Math.round(progressPercent)}% left</span>
              </div>
              <div className="modal-progress-bar">
                <motion.div
                  className="modal-progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="modal-cta-section">
              <Link to="/enroll" className="modal-apply-btn" onClick={() => setShowPopup(false)}>
                <Timer size={18} />
                Apply Now
              </Link>
              <a href="/#courses" className="modal-courses-btn" onClick={() => setShowPopup(false)}>
                View Courses
              </a>
            </div>

            <p className="modal-offer-text">
              Don't miss out on this amazing opportunity to learn new skills and advance your career!
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
    <BlogProvider> {/* Wrap with BlogProvider */}
      <Router>
        <div className="App">
          <WelcomePopup />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tutor/:id" element={<TutorProfile />} />
              <Route path="/blog" element={<Blog />} /> {/* Blog listing page */}
              <Route path="/blog/:id" element={<BlogPost />} /> {/* Individual post page */}
              <Route path="/enroll" element={<Enrollment />} />
              <Route path="/course/:id" element={<CourseDetails />} />
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