import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, MapPin, Clock, Users, GraduationCap,
  CheckCircle, User, Briefcase, BookOpen, ArrowRight,
  ArrowLeft, Award, Check, Lock, ChevronRight, Home,
  School, MessageSquare
} from 'lucide-react';
import axios from 'axios';
import { useRef } from 'react';
import './css/Enrollment.css';

const Enrollment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    name: '',
    email: '',
    contact: '',

    // Step 2: Academic Info
    education: '',
    educationOther: '',
    occupation: '',

    // Step 3: Course Selection & Career Goal
    courses: [],
    careerGoal: '',

    // Enrollment Type
    enrollmentType: '',
  });

  const [loading, setLoading] = useState(false);
  const [showGroupPopup, setShowGroupPopup] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false
  });

  // Configuration for enrollment types
  const isBootcampOpen = false;
  const isInternshipOpen = true;

  const coursesList = [
    "BackEnd Web Development",
    "Cartography and GIS",
    "Computer Networking",
    "Computer Programming",
    "Computer Studies for Secretaries Duties",
    "Cybersecurity",
    "Database Management",
    "Data Analysis",
    "Digital Marketing",
    "Front End Web Development",
    "Generative AI Engineering",
    "Graphic Design",
    "Mobile App Development",
    "Software/Hardware Maintenance",
    "Topography and Remote Sensing",
    "UI/UX Design",
    "Business Intelligence",
    "DevOps",
    "Computer Aided Design (CAD)",
    "IT Project Management",
  ];

  // FIX 1: Bootcamp/Internship Preview step number is now 3 (not 4) so currentStep reaches it correctly
  const steps = (formData.enrollmentType === 'bootcamp' || formData.enrollmentType === 'internship') ? [
    { number: 1, title: 'Personal Info', icon: User, description: 'Tell us about yourself' },
    { number: 2, title: 'Background', icon: School, description: 'Your education & occupation' },
    { number: 3, title: 'Preview', icon: CheckCircle, description: 'Review and submit' }
  ] : [
    { number: 1, title: 'Personal Info', icon: User, description: 'Tell us about yourself' },
    { number: 2, title: 'Background', icon: School, description: 'Your education & occupation' },
    { number: 3, title: 'Courses & Goals', icon: BookOpen, description: 'Select interests & career goals' },
    { number: 4, title: 'Preview', icon: CheckCircle, description: 'Review and submit' }
  ];

  const notifTimerRef = useRef(null);
  const innerNotifTimerRef = useRef(null);

  // Handle step adjustment when enrollment type changes
  useEffect(() => {
    if ((formData.enrollmentType === 'bootcamp' || formData.enrollmentType === 'internship') && currentStep > 2) {
      setCurrentStep(2);
    }
  }, [formData.enrollmentType, currentStep, steps.length]);

  const showNotification = (message, type) => {
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
    if (innerNotifTimerRef.current) clearTimeout(innerNotifTimerRef.current);

    setNotification({ message: '', type: '', visible: false });

    innerNotifTimerRef.current = setTimeout(() => {
      setNotification({ message, type, visible: true });

      const timeout = type === 'error' ? 30 * 60 * 1000 : 6000;
      notifTimerRef.current = setTimeout(() => {
        setNotification(prev => ({ ...prev, visible: false }));
      }, timeout);
    }, 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let submissionSucceeded = false;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) throw new Error('API URL is not configured');

      const enrollmentData = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        education: formData.education === 'Other'
          ? formData.educationOther || 'Other'
          : formData.education,
        occupation: formData.occupation,
        courses: formData.courses,
        message: formData.careerGoal,
      };

      let endpoint = 'public-enrollment';
      if (formData.enrollmentType === 'bootcamp') endpoint = 'bootcamp-application';
      else if (formData.enrollmentType === 'internship') endpoint = 'internship-application';

      console.log('📤 Sending to:', `${apiUrl}/${endpoint}`);
      console.log('📦 Payload:', enrollmentData);

      const dbResult = await axios.post(`${apiUrl}/${endpoint}`, enrollmentData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (dbResult.data && dbResult.data.message) {

        submissionSucceeded = true;

        let successMessage = '';
        if (formData.enrollmentType === 'internship') {
          successMessage = dbResult.data.message || 'Internship application submitted successfully!\n\n';
          successMessage += `📧 We'll contact you soon with confirmation details.`;
        } else if (formData.enrollmentType === 'bootcamp') {
          successMessage = dbResult.data.message || 'Bootcamp application submitted successfully!\n\n';
          successMessage += `📧 We'll contact you soon with confirmation details.`;
        } else {
          successMessage = dbResult.data.message || 'Vocational Training enrollment submitted successfully!\n\n';
          successMessage += `📧 We'll contact you soon with confirmation details.`;
        }

        showNotification(successMessage, 'success');

        const typeLabel = formData.enrollmentType === 'internship' ? 'Internship' :
          formData.enrollmentType === 'bootcamp' ? 'Bootcamp' : 'Vocational Training';

        const whatsappMessage = `
New ${typeLabel} Application from Gep Protech Website:

*Name:* ${formData.name}
*Email:* ${formData.email}
*Contact:* ${formData.contact}
*Course Interests:* ${formData.enrollmentType === 'bootcamp' ? 'Not required for Bootcamp' : (formData.courses.length > 0 ? formData.courses.join(', ') : 'Not specified')}
*Career Goal:*
${formData.careerGoal}

*Educational Qualification:* ${formData.education === 'Other' ? formData.educationOther || 'Other' : (formData.education || 'Not specified')}
*Current Occupation:* ${formData.occupation || 'Not specified'}

---
Sent from Gep Protech Academic Website
        `.trim();

        const whatsappUrl = `https://wa.me/237674386778?text=${encodeURIComponent(whatsappMessage)}`;

        setEmailSent(true);

        setTimeout(() => {
          // window.open(whatsappUrl, '_blank');
          setTimeout(() => setShowGroupPopup(true), 1000);
        }, 1500);

        setFormData({
          name: '', email: '', contact: '',
          education: '', educationOther: '', occupation: '',
          courses: [], careerGoal: '',
          enrollmentType: ''
        });
        setCurrentStep(1);

      } else {
        throw new Error(dbResult.data?.message || 'Enrollment failed');
      }

    } catch (error) {

      if (submissionSucceeded) {
        console.warn('⚠️ Minor post-success error (ignored):', error.message);
        return;
      }

      console.error('❌ Submission error:', error);

      let errorMessage = 'Oops! Something went wrong. Please try again.';

      if (error.response) {
        const { status, statusText, data } = error.response;
        const serverMsg = data?.message || data?.error || JSON.stringify(data);

        if (data?.errors) {
          errorMessage += '\n\nPlease check the following:';
          Object.entries(data.errors).forEach(([field, messages]) => {
            const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
            errorMessage += `\n• ${fieldName}: ${Array.isArray(messages) ? messages[0] : messages}`;
          });
        }
      } else if (error.request) {
        errorMessage = 'Unable to connect to our servers. Please check your internet connection and try again.';
      } else {
        errorMessage = `Error: ${error.message}`;
      }

      showNotification(errorMessage, 'error');

    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle enrollment type change - reset to step 1 to avoid validation errors
    if (name === 'enrollmentType') {
      setFormData({
        ...formData,
        enrollmentType: value,
        // Reset step 2+ fields when switching types
        education: '',
        educationOther: '',
        occupation: '',
        courses: [],
        careerGoal: ''
      });
      setCurrentStep(1);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCourseChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      courses: selectedOptions
    });
  };

  const handleJoinGroup = () => {
    const groupLink = 'https://chat.whatsapp.com/GhT341sUq7GIfQLQexCFmN';
    window.open(groupLink, '_blank');
    setShowGroupPopup(false);
  };

  // FIX 3: nextStep/prevStep are now fully sequential — no manual skipping needed
  const nextStep = () => {
    if (currentStep === 1 && !formData.enrollmentType) {
      showNotification('Please choose an enrollment type (Internship or Vocational Training) to continue.', 'error');
      return;
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    const isBootcamp = formData.enrollmentType === 'bootcamp';
    switch (currentStep) {
      case 1:
        return formData.enrollmentType && formData.name && formData.email && formData.contact;
      case 2:
        return formData.education && (formData.education !== 'Other' || formData.educationOther);
      case 3:
        // For bootcamp, step 3 is Preview — always valid
        if (isBootcamp) return true;
        // For enrollment, step 3 is Courses & Goals — require selection + career goal
        return formData.courses.length > 0 && formData.careerGoal.trim();
      case 4:
        return true;
      default:
        return true;
    }
  };

  const getProgressPercentage = () => {
    return (currentStep / steps.length) * 100;
  };

  return (
    <section id="enroll" className="enrollment-section">
      <div className="enrollment-container">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="enrollment-header"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="enrollment-header-icon"
          >
            <GraduationCap size={35} color="white" />
          </motion.div>
          <h2 className="section-title enrollment-title">
            Enroll at Gep Protech
          </h2>
          <p className="section-subtitle enrollment-subtitle">
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600' }}>
              Choose the section below to enroll or apply for :
            </a>
          </p>
          <p className="enrollment-description">
            Complete the steps below to begin your journey with us. Your information is secure and will be sent to our team.
          </p>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Don't know what path to choose?
            </span>
            <a
              href="/find-path"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/find-path';
              }}
              className="find-path-link"
            >
              Find Your Path
            </a>
          </div>

          {/* Enrollment Type Radio Buttons */}
          <div className="enrollment-types">
            {isInternshipOpen && (
              <label className={`enrollment-type-label ${formData.enrollmentType === 'internship' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="enrollmentType"
                  value="internship"
                  checked={formData.enrollmentType === 'internship'}
                  onChange={handleChange}
                />
                <span className="type-title">Internship</span>
                <span className="type-description">
                  2-months internship program from August to September 2026.
                </span>
                {formData.enrollmentType === 'internship' && (
                  <div className="check-badge">
                    <Check size={12} color="white" />
                  </div>
                )}
              </label>
            )}
            <label className={`enrollment-type-label ${formData.enrollmentType === 'enrollment' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="enrollmentType"
                value="enrollment"
                checked={formData.enrollmentType === 'enrollment'}
                onChange={handleChange}
              />
              <span className="type-title">Vocational Training</span>
              <span className="type-description">
                3-month plus, Professional and Vocational Tech Training schedule from April to June 2026.
              </span>
              {formData.enrollmentType === 'enrollment' && (
                <div className="check-badge">
                  <Check size={12} color="white" />
                </div>
              )}
            </label>
          </div>

          {/* Security message after radio buttons - only visible when no radio button selected */}
          {!formData.enrollmentType && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="enrollment-security-warning"
            >
              <Lock size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Select your enrollment type to proceed.
            </motion.p>
          )}
        </motion.div>

        {formData.enrollmentType && (
          <>
            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="progress-container"
            >
              <div className="progress-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="progress-step-badge">
                    Step {currentStep}/{steps.length}
                  </span>
                  <span className="progress-step-title">
                    {steps[currentStep - 1].title}
                  </span>
                </div>
                <span className="progress-percentage">
                  {Math.round(getProgressPercentage())}% Complete
                </span>
              </div>

              <div className="progress-bar-bg">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 0.3 }}
                  className="progress-bar-fill"
                />
              </div>
            </motion.div>

            {/* Steps Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="steps-nav"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  whileHover={{ y: -2 }}
                  className={`step-item ${index + 1 < currentStep ? 'completed' : ''} ${index + 1 === currentStep ? 'active' : ''}`}
                  onClick={() => setCurrentStep(step.number)}
                >
                  <div className="step-number">
                    {index + 1 < currentStep ? (
                      <Check size={14} color="white" />
                    ) : (
                      <step.icon size={14} color={index + 1 === currentStep ? 'var(--primary-color)' : 'var(--text-primary)'} />
                    )}
                  </div>
                  <span className="step-label">
                    {step.title}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Form Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="form-container"
            >
              {/* Current Step Header */}
              <div className="form-header">
                {(() => {
                  const StepIcon = steps[currentStep - 1]?.icon;
                  return StepIcon ? (
                    <div className="form-header-icon">
                      <StepIcon size={20} color="white" />
                    </div>
                  ) : null;
                })()}
                <div>
                  <h3 className="form-header-title">
                    {steps[currentStep - 1].title}
                  </h3>
                  <p className="form-header-description">
                    {steps[currentStep - 1].description}
                  </p>
                </div>
              </div>

              {/* Form Steps */}
              <div style={{ padding: '1.5rem' }}>
                <AnimatePresence mode="wait">

                  {/* Step: Personal Info */}
                  {steps[currentStep - 1]?.title === 'Personal Info' && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="step-content"
                    >
                      <div className="input-group">
                        <label className="input-label">
                          <User size={16} style={{ marginRight: '0.5rem' }} />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          className="input-field"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="input-group">
                        <label className="input-label">
                          <Mail size={16} style={{ marginRight: '0.5rem' }} />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          className="input-field"
                          placeholder="Enter your email address"
                        />
                      </div>

                      <div className="input-group">
                        <label className="input-label">
                          <Phone size={16} style={{ marginRight: '0.5rem' }} />
                          WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          name="contact"
                          value={formData.contact}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          className="input-field"
                          placeholder="+237 XXX XXX XXX"
                        />
                        <p className="helper-text">We'll use this to contact you via WhatsApp</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Step: Background */}
                  {steps[currentStep - 1]?.title === 'Background' && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="step-content"
                    >
                      <div className="input-group">
                        <label className="input-label">
                          <School size={16} style={{ marginRight: '0.5rem' }} />
                          Educational Qualification *
                        </label>
                        <select
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          className="input-field"
                        >
                          <option value="">Select qualification</option>
                          <option value="No formal education">No formal education</option>
                          <option value="Advanced level">Advanced level</option>
                          <option value="HND">HND</option>
                          <option value="University Student">University Student</option>
                          <option value="Bachelor's degree">Bachelor's degree</option>
                          <option value="Master's degree">Master's degree</option>
                          <option value="PhD">PhD</option>
                          <option value="Other">Other (Specify)</option>
                        </select>
                      </div>

                      {formData.education === 'Other' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <input
                            type="text"
                            name="educationOther"
                            value={formData.educationOther}
                            onChange={handleChange}
                            placeholder="Specify your qualification"
                            className="input-field"
                          />
                        </motion.div>
                      )}

                      <div className="input-group">
                        <label className="input-label">
                          <Briefcase size={16} style={{ marginRight: '0.5rem' }} />
                          Current Occupation
                        </label>
                        <input
                          type="text"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                          disabled={loading}
                          className="input-field"
                          placeholder="e.g., Student, Software Engineer, etc."
                        />
                      </div>

                      <div className="input-group">
                        <label className="input-label">
                          <Briefcase size={16} style={{ marginRight: '0.5rem' }} />
                          Career Goal *
                        </label>
                        <textarea
                          name="careerGoal"
                          value={formData.careerGoal}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          rows="4"
                          className="input-field"
                          placeholder="Tell us about your career goals and background. Why are you interested in these courses?"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step: Courses & Goals — only renders for enrollment (bootcamp never reaches this title) */}
                  {steps[currentStep - 1]?.title === 'Courses & Goals' && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="step-content"
                    >
                      <div className="input-group">
                        <label className="input-label">
                          <BookOpen size={16} style={{ marginRight: '0.5rem' }} />
                          Select Courses of Interest * (Multiple)
                        </label>
                        <div style={{ position: 'relative' }}>
                          <select
                            name="courses"
                            value={formData.courses}
                            onChange={handleCourseChange}
                            multiple
                            size="6"
                            disabled={loading}
                            className="input-field"
                          >
                            {coursesList.map((course, index) => (
                              <option key={index} value={course}>
                                {course}
                              </option>
                            ))}
                          </select>
                        </div>
                        <p className="helper-text">Hold Ctrl (Cmd on Mac) to select multiple courses</p>

                        {formData.courses.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="courses-selected"
                          >
                            <strong>
                              Selected Courses ({formData.courses.length}):
                            </strong>
                            <div className="courses-tags">
                              {formData.courses.map((course, idx) => (
                                <span key={idx} className="course-tag">
                                  {course}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step: Preview — renders for both bootcamp (step 3) and enrollment (step 4) */}
                  {steps[currentStep - 1]?.title === 'Preview' && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="step-content"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="preview-card"
                      >
                        <h4 className="preview-title">
                          📋 Preview Your {formData.enrollmentType === 'bootcamp' ? 'Bootcamp' : formData.enrollmentType === 'internship' ? 'Internship' : 'Vocational Training'}
                        </h4>

                        <div className="preview-grid">
                          <div>
                            <p className="preview-label">Name</p>
                            <p className="preview-value">{formData.name}</p>
                          </div>
                          <div>
                            <p className="preview-label">Email</p>
                            <p className="preview-value" style={{ wordBreak: 'break-all' }}>{formData.email}</p>
                          </div>
                          <div>
                            <p className="preview-label">WhatsApp</p>
                            <p className="preview-value">{formData.contact}</p>
                          </div>
                          <div>
                            <p className="preview-label">Education Level</p>
                            <p className="preview-value">
                              {formData.education === 'Other' ? formData.educationOther : formData.education}
                            </p>
                          </div>
                          <div>
                            <p className="preview-label">Occupation</p>
                            <p className="preview-value">{formData.occupation}</p>
                          </div>
                          <div>
                            <p className="preview-label">Enrollment Type</p>
                            <p className="preview-value">
                              {formData.enrollmentType === 'bootcamp' ? 'Bootcamp' : formData.enrollmentType === 'internship' ? 'Internship' : 'Vocational Training'}
                            </p>
                          </div>
                        </div>

                        {formData.enrollmentType !== 'bootcamp' && (
                          <div className="preview-courses">
                            <p className="preview-courses-title">Selected Courses</p>
                            <div className="preview-courses-list">
                              {formData.courses.map((course, idx) => (
                                <span key={idx} className="preview-course-tag">
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <p className="preview-label">Career Goal</p>
                          <p className="preview-goal">
                            {formData.careerGoal}
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="success-banner"
                      >
                        <CheckCircle size={18} color="#25D366" />
                        <span>
                          All information looks good? Click Submit to continue to WhatsApp.
                        </span>
                      </motion.div>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="navigation-buttons">
                  {currentStep > 1 && (
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="nav-button secondary"
                    >
                      <ArrowLeft size={18} />
                      Previous
                    </motion.button>
                  )}

                  {currentStep < steps.length ? (
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="nav-button primary"
                      style={{
                        background: !isStepValid() ? 'var(--border-color)' : 'var(--primary-color)',
                        color: !isStepValid() ? 'var(--text-primary)' : 'white',
                        cursor: !isStepValid() ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Next Step
                      <ArrowRight size={18} />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading || !isStepValid()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="nav-button whatsapp"
                      style={{
                        background: loading ? 'var(--border-color)' : undefined,
                        cursor: loading || !isStepValid() ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {loading ? (
                        <><div className="spinner" />Submitting...</>
                      ) : (
                        <><CheckCircle size={18} />Submit</>
                      )}
                    </motion.button>
                  )}
                </div>

                {/* Success Message */}
                {emailSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: '0.5rem', color: '#25D366', fontSize: '0.9rem', fontWeight: '500',
                      marginTop: '1rem', padding: '0.75rem',
                      background: 'rgba(37, 211, 102, 0.1)', borderRadius: '8px'
                    }}
                  >
                    <CheckCircle size={16} />
                    Email sent! Redirecting to WhatsApp...
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="trust-badges"
            >
              {[
                { icon: Lock, text: 'Secure & Private' },
                { icon: Check, text: 'Quick Response' },
                { icon: Award, text: 'Certified Courses' }
              ].map((item, index) => (
                <div key={index} className="trust-badge">
                  <item.icon size={16} color="var(--primary-color)" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* Group Join Popup Modal */}
      <AnimatePresence>
        {showGroupPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGroupPopup(false)}
            className="modal-backdrop"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content"
            >
              <div className="modal-header">
                <div className="modal-icon">
                  <Users size={30} color="white" />
                </div>

                <h3 className="modal-title">
                  Join Our Community!
                </h3>

                <p className="modal-description">
                  Connect with fellow students, get updates, and be part of our growing family.
                </p>
              </div>

              <div className="modal-buttons">
                <motion.button
                  onClick={handleJoinGroup}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="modal-button whatsapp"
                >
                  <Users size={18} />
                  Join WhatsApp Group
                </motion.button>

                <motion.button
                  onClick={() => setShowGroupPopup(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="modal-button secondary"
                >
                  Maybe Later
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Enrollment;