import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Zap, X, ArrowRight, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import "./styles/DiscountCountdown.css";

// Discount end date - April 10, 2026
const DISCOUNT_END_DATE = new Date("2026-04-10T23:59:59").getTime();

// Calculate initial time remaining
const getTimeRemaining = () => {
  const now = new Date().getTime();
  const distance = DISCOUNT_END_DATE - now;

  if (distance < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    expired: false,
  };
};

const DiscountCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = getTimeRemaining();
      setTimeLeft(newTime);

      if (newTime.expired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll detection
  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setHasScrolled(true);
      setIsScrolling(true);

      // Clear previous timeout
      clearTimeout(scrollTimeout);

      // Set scrolling to false after 1 second of no scrolling
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // If expired, return null to hide the component
  if (timeLeft.expired) {
    return null;
  }

  const formatNumber = (num) => String(num).padStart(2, "0");

  // Calculate progress percentage (from 32 days total)
  const totalSeconds = 32 * 24 * 60 * 60;
  const remainingSeconds = timeLeft.days * 24 * 60 * 60 + timeLeft.hours * 60 * 60 + timeLeft.minutes * 60 + timeLeft.seconds;
  const progressPercent = Math.min(100, (remainingSeconds / totalSeconds) * 100);

  const TimeUnit = ({ value, label }) => (
    <div className="scrolling-time-unit">
      <motion.div
        className="scrolling-value"
        key={value}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {formatNumber(value)}
      </motion.div>
      <span className="scrolling-label">{label}</span>
    </div>
  );

  return (
    <>
      <motion.div
        className={`discount-floating-container ${isScrolling && hasScrolled ? "scrolling-mode" : "fixed-mode"}`}
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}
      >
        {/* Scrolling Mode - Compressed bar */}
        {isScrolling && hasScrolled ? (
          <motion.div
            className="scrolling-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="scrolling-content">
              <div className="scrolling-title-section">
                <Zap size={16} className="scrolling-icon" />
                <span className="scrolling-title">30% Off Ends Soon!</span>
              </div>

              <div className="scrolling-timer">
                <TimeUnit value={timeLeft.days} label="Days" />
                <span className="scrolling-sep">:</span>
                <TimeUnit value={timeLeft.hours} label="Hrs" />
                <span className="scrolling-sep">:</span>
                <TimeUnit value={timeLeft.minutes} label="Min" />
              </div>

              <Link to="/enroll" className="scrolling-cta-button">
                Apply Now
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Fixed Mode - Compact button */
          <motion.button
            className="fixed-discount-btn"
            onClick={() => setShowModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap size={18} />
            <span>30% OFF</span>
          </motion.button>
        )}
      </motion.div>

      {/* Modal for more information */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="discount-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
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
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>

              <div className="modal-header">
                <div className="modal-icon-wrapper">
                  <Gift size={40} className="modal-gift-icon" />
                </div>
                <h2 className="modal-title">Limited Time Offer!</h2>
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
                <Link to="/enroll" className="modal-apply-btn" onClick={() => setShowModal(false)}>
                  <Timer size={18} />
                  Apply Now
                </Link>
                <a href="/#courses" className="modal-courses-btn" onClick={() => setShowModal(false)}>
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
    </>
  );
};

export default DiscountCountdown;
