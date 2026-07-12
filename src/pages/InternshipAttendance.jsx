import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardCheck, MapPin, Key, CheckCircle2, AlertCircle,
  Loader2, X, Calendar, Clock, User, RefreshCw, Navigation,
  Shield, Info, ExternalLink, Award
} from 'lucide-react';
import axios from 'axios';
import './css/InternshipAttendance.css';

// ── helpers ──────────────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  return `${hour % 12 || 12}:${m} ${ampm}`;
};

const getTodayString = () => new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// ── Notification Toast ────────────────────────────────────────────────────────
const Notification = ({ type, title, message, onClose }) => {
  const icons = {
    success: <CheckCircle2 size={20} />,
    error:   <AlertCircle   size={20} />,
    warning: <AlertCircle   size={20} />,
  };
  const titles = { success: 'Success!', error: 'Oops!', warning: 'Notice' };

  return (
    <motion.div
      className={`att-notification ${type}`}
      initial={{ opacity: 0, y: -30, scale: 0.92 }}
      animate={{ opacity: 1, y: 0,   scale: 1     }}
      exit={{    opacity: 0, y: -20, scale: 0.95  }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      {icons[type]}
      <div className="att-notification-content">
        <div className="att-notification-title">{title || titles[type]}</div>
        <div className="att-notification-msg">{message}</div>
      </div>
      <button className="att-notification-close" onClick={onClose} aria-label="Dismiss">
        <X size={14} />
      </button>
    </motion.div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
const InternshipAttendance = () => {
  const [approvalCode, setApprovalCode] = useState('');
  const [location, setLocation]         = useState(null);        // { latitude, longitude }
  const [locationStatus, setLocationStatus] = useState('idle');  // idle | detecting | success | error
  const [locationError, setLocationError]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState(null);                // response data on success
  const [alreadyMarkedMsg, setAlreadyMarkedMsg] = useState('');
  const [notification, setNotification]   = useState(null);
  const notifTimer = useRef(null);

  // ── Show notification ───────────────────────────────────────────────────────
  const showNotification = useCallback((type, message, title = '', duration = 8000) => {
    if (notifTimer.current) clearTimeout(notifTimer.current);
    setNotification({ type, message, title });
    if (duration !== Infinity) {
      notifTimer.current = setTimeout(() => setNotification(null), duration);
    }
  }, []);

  // ── Detect location ─────────────────────────────────────────────────────────
  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setLocationStatus('detecting');
    setLocation(null);
    setLocationError('');

    const options = { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 };
    
    let watchId;
    let bestPos = null;
    let timeoutId;

    const finalize = () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
      if (timeoutId) clearTimeout(timeoutId);
      
      if (bestPos) {
        setLocation({ 
          latitude: bestPos.coords.latitude, 
          longitude: bestPos.coords.longitude,
          accuracy: bestPos.coords.accuracy 
        });
        setLocationStatus('success');
      } else {
        setLocationStatus('error');
        setLocationError('Could not determine an accurate location. Please check your device GPS and try again outside.');
      }
    };

    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        if (!bestPos || pos.coords.accuracy < bestPos.coords.accuracy) {
          bestPos = pos;
        }
        // Stop watching early if accuracy is 40m or better
        if (pos.coords.accuracy <= 40) {
          finalize();
        }
      },
      (err) => {
        if (!bestPos) {
          setLocationStatus('error');
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setLocationError('Location access denied. Please allow location permission in your browser settings and try again.');
              break;
            case err.POSITION_UNAVAILABLE:
              setLocationError('Location information is currently unavailable. Please check your device GPS and try again.');
              break;
            case err.TIMEOUT:
              setLocationError('Location request timed out. Please ensure you have a stable connection and try again.');
              break;
            default:
              setLocationError('An unknown error occurred while detecting your location.');
          }
          if (watchId) navigator.geolocation.clearWatch(watchId);
          if (timeoutId) clearTimeout(timeoutId);
        }
      },
      options
    );

    // Allow up to 10 seconds to find the best accuracy
    timeoutId = setTimeout(() => {
      finalize();
    }, 10000);

  }, []);

  // Removed auto-detect on mount so the user explicitly asks for coordinates
  useEffect(() => {
    return () => { if (notifTimer.current) clearTimeout(notifTimer.current); };
  }, []);

  // ── Submit attendance ────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!approvalCode.trim()) {
      showNotification('error', 'Please enter your approval code to proceed.', 'Code Required');
      return;
    }

    if (locationStatus !== 'success' || !location) {
      showNotification(
        'error',
        locationStatus === 'detecting'
          ? 'Still detecting your location. Please wait a moment and try again.'
          : 'We could not detect your location. Please allow location access and tap "Retry Location".',
        'Location Not Ready'
      );
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) throw new Error('API URL is not configured. Please contact support.');

      const response = await axios.post(
        `${apiUrl}/internship-attendance/mark`,
        {
          approval_code: approvalCode.trim().toUpperCase(),
          latitude:      location.latitude,
          longitude:     location.longitude,
        },
        {
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        }
      );

      if (response.data?.success) {
        setResult({ ...response.data.data, message: response.data.message });
        setAlreadyMarkedMsg('');
      } else {
        throw new Error(response.data?.message || 'Attendance marking failed.');
      }
    } catch (err) {
      // Server responded
      if (err.response) {
        const { status, data } = err.response;

        if (status === 422 && data?.message?.toLowerCase().includes('already')) {
          setAlreadyMarkedMsg(data.message);
          setResult(null);
          return;
        }

        const serverMsg = data?.message || 'Something went wrong on the server.';

        if (status === 403 && serverMsg.toLowerCase().includes('not within')) {
          showNotification(
            'error',
            `📍 ${serverMsg}\n\nMake sure you are physically present at the GeP ProTech campus (ENS Street, beside Psalms One City) before marking attendance.`,
            'Not Within Campus',
            Infinity
          );
        } else if (status === 403) {
          showNotification('error', serverMsg, 'Access Denied', Infinity);
        } else if (status === 404) {
          showNotification('error', 'The approval code you entered is invalid. Please double-check and try again.', 'Invalid Code');
        } else {
          showNotification('error', serverMsg, 'Server Error', Infinity);
        }
      } else if (err.request) {
        showNotification(
          'error',
          'Unable to reach the server. Please check your internet connection and try again.',
          'Connection Error'
        );
      } else {
        showNotification('error', err.message, 'Error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setApprovalCode('');
    setResult(null);
    setAlreadyMarkedMsg('');
    setNotification(null);
    detectLocation();
  };

  // ─── Location status helper UI ──────────────────────────────────────────────
  const renderLocationStatus = () => {
    if (locationStatus === 'idle') {
      return (
        <button 
          className="att-location-retry-btn" 
          onClick={detectLocation} 
          type="button"
          style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem', background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <MapPin size={18} style={{ marginRight: '8px' }} /> Get My Current Coordinates
        </button>
      );
    }

    const config = {
      detecting: {
        cls: 'detecting',
        icon: <Loader2 size={16} className="att-spin-icon" style={{ animation: 'spin 0.8s linear infinite' }} />,
        text: 'Acquiring high-accuracy GPS signal…',
      },
      success: {
        cls: 'success',
        icon: <Navigation size={16} />,
        text: `Location acquired (Accuracy: ${location?.accuracy ? Math.round(location.accuracy) + 'm' : 'Unknown'})`,
      },
      error: {
        cls: 'error',
        icon: <AlertCircle size={16} />,
        text: locationError,
      },
    }[locationStatus];

    return (
      <div>
        <div className={`location-status ${config.cls}`}>
          <div className={`location-dot ${config.cls}`} />
          {config.icon}
          <span>{config.text}</span>
        </div>
        {locationStatus === 'error' && (
          <button className="att-location-retry-btn" onClick={detectLocation} type="button">
            <RefreshCw size={13} /> Retry Location
          </button>
        )}
        {locationStatus === 'success' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a
              href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="campus-hint"
            >
              <ExternalLink size={13} />
              <span>View your position on Google Maps</span>
            </a>
            <button 
              className="att-location-retry-btn" 
              onClick={detectLocation} 
              type="button"
              style={{ background: 'transparent', padding: '4px 8px', fontSize: '0.75rem', marginTop: 0 }}
            >
              <RefreshCw size={12} /> Refresh
            </button>
          </div>
        )}
      </div>
    );
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <section className="attendance-page">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <Notification
            key="notif"
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={() => {
              if (notifTimer.current) clearTimeout(notifTimer.current);
              setNotification(null);
            }}
          />
        )}
      </AnimatePresence>

      <div className="attendance-container">
        {/* ── Header ── */}
        <motion.div
          className="attendance-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="attendance-header-icon-wrap"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
          >
            <ClipboardCheck size={36} color="white" />
          </motion.div>

          <h1 className="attendance-title">Mark Attendance</h1>
          <p className="attendance-subtitle">
            Enter your approval code to mark your internship attendance for today. You must be physically present on campus.
          </p>

          {/* Date chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
          >
            <div className="att-date-chip">
              <Calendar size={13} />
              {getTodayString()}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Info Banner ── */}
        <motion.div
          className="attendance-info-banner"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Info size={18} color="var(--primary-color)" />
          <p>
            Your location is verified automatically to confirm you are within the GeP ProTech campus (ENS Street, beside Psalms One City). Attendance can only be marked once per day.
          </p>
        </motion.div>

        {/* ── Success Result ── */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1,   y: 0  }}
              exit={{    opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            >
              <div className="attendance-card att-result-card">
                <div className="att-result-icon">
                  <CheckCircle2 size={36} color="white" />
                </div>

                <h2 className="att-result-title">Attendance Marked!</h2>
                <p className="att-result-date">
                  {formatDate(result.date)} · {result.time}
                </p>
                <p className="att-result-date" style={{ color: 'var(--primary-color)', fontWeight: 'bold', marginTop: '0.5rem', padding: '0 1rem' }}>
                  {result.message || ''}
                </p>

                <div className="att-divider" />

                <div className="att-result-stats">
                  <div className="att-stat-item">
                    <div className="att-stat-value">
                      <Award size={22} color={result.status === 'late' ? '#ecc94b' : 'var(--primary-color)'} style={{ display: 'block', margin: '0 auto 4px' }} />
                    </div>
                    <div className="att-stat-label">Session & Status</div>
                    <div style={{ fontSize: '0.85rem', color: result.status === 'late' ? '#b7791f' : '#38a169', fontWeight: 700, marginTop: '4px', textTransform: 'capitalize' }}>
                      {result.session} ({result.status})
                    </div>
                  </div>
                  <div className="att-stat-item">
                    <div className="att-stat-value">{result.total_sessions_attended}</div>
                    <div className="att-stat-label">Total Sessions Attended</div>
                  </div>
                </div>

                <p className="att-result-student">
                  <User size={15} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  {result.student_name}
                </p>

                <button className="att-mark-again-btn" onClick={handleReset}>
                  Mark for Another Student
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Already Marked State ── */}
          {alreadyMarkedMsg && !result && (
            <motion.div
              key="already"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1,   y: 0  }}
              exit={{    opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            >
              <div className="attendance-card att-already-card">
                <div className="att-already-icon">
                  <Shield size={34} color="white" />
                </div>
                <h2 className="att-already-title">Already Marked</h2>
                <p className="att-already-sub" style={{ fontSize: '0.95rem', fontWeight: 500, marginTop: '0.5rem', color: 'var(--text-primary)' }}>
                  {alreadyMarkedMsg}
                </p>
                <button className="att-mark-again-btn" onClick={handleReset} style={{ marginTop: '1.2rem' }}>
                  Try Another Code
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Attendance Form ── */}
          {!result && !alreadyMarkedMsg && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{    opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="attendance-card">
                {/* Card Header */}
                <div className="attendance-card-header">
                  <div className="attendance-card-icon">
                    <Key size={20} color="white" />
                  </div>
                  <div className="attendance-card-header-text">
                    <h3>Enter Approval Code</h3>
                    <p>Your unique code was sent by GeP ProTech</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Approval Code */}
                  <div className="att-input-group">
                    <label className="att-input-label" htmlFor="approval_code">
                      <Key size={15} />
                      Approval Code *
                    </label>
                    <input
                      id="approval_code"
                      type="text"
                      className="att-input-field"
                      placeholder="e.g. GEP-INT-2026-XXXX"
                      value={approvalCode}
                      onChange={(e) => setApprovalCode(e.target.value.toUpperCase())}
                      disabled={loading}
                      autoComplete="off"
                      spellCheck={false}
                      maxLength={30}
                    />
                    <p className="att-helper-text">
                      Code is case-insensitive. It is automatically converted to uppercase.
                    </p>
                  </div>

                  <div className="att-divider" />

                  {/* Location */}
                  <div className="att-input-group">
                    <label className="att-input-label">
                      <MapPin size={15} />
                      Your Location (Auto-Detected)
                    </label>
                    {renderLocationStatus()}
                  </div>

                  {/* Campus info */}
                  <div className="att-input-group" style={{ marginBottom: '1.5rem' }}>
                    <div className="campus-hint" style={{ cursor: 'default' }}>
                      <Shield size={13} color="var(--primary-color)" />
                      <span>Campus: ENS Street, beside Psalms One City · Max radius: 100m</span>
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="att-submit-btn"
                    disabled={loading || locationStatus === 'detecting'}
                    whileHover={!loading ? { scale: 1.01 } : {}}
                    whileTap={!loading  ? { scale: 0.98 } : {}}
                  >
                    {loading ? (
                      <>
                        <div className="att-spinner" />
                        Marking Attendance…
                      </>
                    ) : (
                      <>
                        <ClipboardCheck size={18} />
                        Mark My Attendance
                      </>
                    )}
                  </motion.button>
                </form>
              </div>

              {/* Bottom tip */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  color: 'var(--text-primary)',
                  opacity: 0.5,
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <Clock size={13} />
                Attendance is valid for today only — {new Date().toLocaleDateString('en-GB')}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InternshipAttendance;
