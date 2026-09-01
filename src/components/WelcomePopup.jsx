import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  GraduationCap,
  Quote,
  Send,
  BookOpen,
  Sparkles,
  Flame,
  ArrowRight
} from 'lucide-react';
import './styles/WelcomePopup.css';

const WelcomePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleNavigateCourses = (e) => {
    e.preventDefault();
    setShowPopup(false);

    if (window.location.pathname === '/') {
      const coursesElem = document.getElementById('courses');
      if (coursesElem) {
        coursesElem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/#courses';
      }
    } else {
      navigate('/#courses');
    }
  };

  if (!showPopup) return null;

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="welcome-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="welcome-popup-card simple-quote-popup"
            initial={{ scale: 0.85, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="welcome-popup-close-btn"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="welcome-popup-header">
              <div className="welcome-popup-badge-container">
                <div className="welcome-popup-badge">
                  <span className="welcome-popup-pulse-dot" />
                  <span>BATCH 14 ADMISSIONS OPEN</span>
                </div>
              </div>

              <h2 className="welcome-popup-title">
                Join <span className="welcome-popup-title-highlight">Batch 14</span> Program
              </h2>
            </div>

            {/* Motivational Quote & Message Section */}
            <div className="welcome-popup-content motivational-container">
              <div className="motivational-quote-card">
                <div className="quote-icon-wrapper">
                  <Quote size={28} />
                </div>
                <blockquote className="quote-text">
                  “Whatever the mind can conceive and believe, it can achieve.”
                </blockquote>
                {/* <cite className="quote-author">— Napoleon Hill</cite> */}
              </div>

              <p className="motivational-message">
                Don’t wait. The time will never be <em>'just right.'</em> Start where you stand today. <strong>Batch 14</strong> is your gateway to mastering high-value skills, unlocking your potential, and building a rewarding career.
              </p>
            </div>

            {/* Footer Action Buttons */}
            <div className="welcome-popup-footer">
              <div className="welcome-popup-actions">
                <Link
                  to="/enroll"
                  className="welcome-popup-btn-enroll"
                  onClick={handleClose}
                >
                  <Send size={16} />
                  <span>Enroll Now</span>
                </Link>

                <a
                  href="/#courses"
                  className="welcome-popup-btn-courses"
                  onClick={handleNavigateCourses}
                >
                  <BookOpen size={16} />
                  <span>View Courses</span>
                </a>
              </div>

              <div className="welcome-popup-urgency">
                <Flame size={14} color="#e53e3e" />
                <span>Limited Seats Available for Batch 14</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;
