import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, ChevronUp, ChevronDown, Gift, Zap } from "lucide-react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
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

  // Scroll detection for expanding/collapsing
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

  // Determine if we should show expanded or collapsed view
  // Expanded when scrolling, collapsed when not
  const showExpanded = hasScrolled && isScrolling;

  const formatNumber = (num) => String(num).padStart(2, "0");

  const TimeUnit = ({ value, label }) => (
    <div className="countdown-time-unit">
      <motion.div 
        className="countdown-value"
        key={value}
        initial={{ scale: 1.1, y: -5 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {formatNumber(value)}
      </motion.div>
      <div className="countdown-label">{label}</div>
    </div>
  );

  return (
    <motion.div 
      className={`discount-countdown-container ${showExpanded ? "expanded" : "collapsed"}`}
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}
    >
      {/* Main button/header - always visible */}
      <motion.div 
        className="countdown-header"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="countdown-icon-wrapper">
          {showExpanded ? <Gift className="countdown-icon" /> : <Zap className="countdown-icon" />}
          <span className="countdown-pulse"></span>
        </div>
        
        <div className="countdown-header-text">
          {showExpanded ? (
            <>
              <span className="bonus-text">Bonus</span>
              <span className="countdown-title">30% Discount Ends Soon!</span>
            </>
          ) : (
            <span className="countdown-title">30% OFF</span>
          )}
        </div>

        <div className="countdown-toggle-icon">
          {showExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </div>
      </motion.div>

      {/* Expanded content */}
      <AnimatePresence>
        {showExpanded && (
          <motion.div
            className="countdown-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="countdown-timer">
              <TimeUnit value={timeLeft.days} label="Days" />
              <div className="countdown-separator">:</div>
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <div className="countdown-separator">:</div>
              <TimeUnit value={timeLeft.minutes} label="Mins" />
              <div className="countdown-separator">:</div>
              <TimeUnit value={timeLeft.seconds} label="Secs" />
            </div>

            <div className="countdown-cta">
              <span className="cta-text">Don't miss out!</span>
              <a href="#courses" className="cta-button">
                <Timer size={16} />
                View Courses
              </a>
            </div>

            <div className="countdown-progress">
              <div className="progress-bar">
                <motion.div 
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${Math.min(100, ((timeLeft.days * 24 * 60 * 60 + timeLeft.hours * 60 * 60 + timeLeft.minutes * 60 + timeLeft.seconds) / (32 * 24 * 60 * 60)) * 100)}%` 
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="progress-text">Time remaining</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed compact view - shows just timer */}
      {!showExpanded && hasScrolled && (
        <motion.div 
          className="countdown-compact"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <div className="compact-timer">
            <span className="compact-unit">{formatNumber(timeLeft.days)}d</span>
            <span className="compact-sep">:</span>
            <span className="compact-unit">{formatNumber(timeLeft.hours)}h</span>
            <span className="compact-sep">:</span>
            <span className="compact-unit">{formatNumber(timeLeft.minutes)}m</span>
            <span className="compact-sep">:</span>
            <span className="compact-unit">{formatNumber(timeLeft.seconds)}s</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DiscountCountdown;
