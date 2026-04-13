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
  }, [formData.enrollmentType, steps.length]);

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
    const groupLink = 'https://chat.whatsapp.com/https://chat.whatsapp.com/GhT341sUq7GIfQLQexCFmN?mode=gi_t';
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
    <section id="enroll" style={{
      padding: 'clamp(6rem, 10vw, 8rem) 0',
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, rgba(var(--primary-color-rgb), 0.05) 100%)',
      minHeight: 'calc(100vh - 140px)',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ width: '100%' }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 5vw, 3rem)',
            padding: '0 1rem'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            style={{
              width: '70px',
              height: '70px',
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 10px 30px rgba(var(--primary-color-rgb), 0.3)'
            }}
          >
            <GraduationCap size={35} color="white" />
          </motion.div>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}>
            Enroll at Gep Protech
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600' }}>
              Choose the section below to enroll or apply for :
            </a>
          </p>
          <p style={{
            textAlign: 'center',
            marginTop: '1rem',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            opacity: 0.8
          }}>
            Complete the steps below to begin your journey with us. Your information is secure and will be sent to our team.
          </p>
          
          <div style={{
            textAlign: 'center',
            marginTop: '1.5rem'
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Don't know what path to choose? 
            </span>
            <a 
              href="/find-path" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/find-path';
              }}
              style={{
                color: 'var(--primary-color)',
                fontWeight: '600',
                textDecoration: 'none',
                marginLeft: '0.5rem',
                fontSize: '0.95rem',
                borderBottom: '1px solid var(--primary-color)',
                paddingBottom: '2px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#b8942e';
                e.target.style.borderBottomColor = '#b8942e';
              }}
              onMouseOut={(e) => {
                e.target.style.color = 'var(--primary-color)';
                e.target.style.borderBottomColor = 'var(--primary-color)';
              }}
            >
              Find Your Path
            </a>
          </div>
          
          {/* Enrollment Type Radio Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '1.5rem',
            flexWrap: 'wrap'
          }}>
            {isInternshipOpen && (
              <label style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                padding: '1rem 2rem',
                borderRadius: '15px',
                border: formData.enrollmentType === 'internship' ? '2px solid var(--primary-color)' : '2px solid var(--border-color)',
                background: formData.enrollmentType === 'internship' ? 'rgba(var(--primary-color-rgb), 0.1)' : 'transparent',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}>
                {formData.enrollmentType === 'internship' && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    width: '20px',
                    height: '20px',
                    background: 'var(--primary-color)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Check size={12} color="white" />
                  </div>
                )}
                <input
                  type="radio"
                  name="enrollmentType"
                  value="internship"
                  checked={formData.enrollmentType === 'internship'}
                  onChange={handleChange}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
                />
                <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '1.1rem' }}>Internship</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '200px' }}>
                  2-months internship program from August to September 2026.
                </span>
              </label>
            )}
            <label style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              padding: '1rem 2rem',
              borderRadius: '15px',
              border: formData.enrollmentType === 'enrollment' ? '2px solid var(--primary-color)' : '2px solid var(--border-color)',
              background: formData.enrollmentType === 'enrollment' ? 'rgba(var(--primary-color-rgb), 0.1)' : 'transparent',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}>
              {formData.enrollmentType === 'enrollment' && (
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '20px',
                  height: '20px',
                  background: 'var(--primary-color)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Check size={12} color="white" />
                </div>
              )}
              <input
                type="radio"
                name="enrollmentType"
                value="enrollment"
                checked={formData.enrollmentType === 'enrollment'}
                onChange={handleChange}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
              />
              <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '1.1rem' }}>Vocational Training</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '200px' }}>
                3-month plus, Professional and Vocational Tech Training schedule from April to June 2026.
              </span>
            </label>
          </div>
          {/* Security message after radio buttons - only visible when no radio button selected */}
          {!formData.enrollmentType && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              style={{
                color: "red",
                fontWeight: '500',
                textAlign: 'center',
                padding: '1rem',
              }}
            >
              <Lock size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Select your enrollment type to proceed.
            </motion.p>
          )}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ maxWidth: '800px', margin: '0 auto 2rem auto', padding: '0 1rem' }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                background: 'var(--primary-color)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                Step {currentStep}/{steps.length}
              </span>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                {steps[currentStep - 1].title}
              </span>
            </div>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', opacity: 0.7 }}>
              {Math.round(getProgressPercentage())}% Complete
            </span>
          </div>

          <div style={{
            width: '100%', height: '8px',
            background: 'var(--border-color)',
            borderRadius: '4px', overflow: 'hidden'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 0.3 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))',
                borderRadius: '4px'
              }}
            />
          </div>
        </motion.div>

        {/* Steps Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '0.5rem',
            maxWidth: '800px',
            margin: '0 auto 2rem auto',
            padding: '0 1rem',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              whileHover={{ y: -2 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                minWidth: '70px',
                padding: '0.75rem 0.5rem',
                borderRadius: '10px',
                background: currentStep === step.number ? 'var(--primary-color)' : 'transparent',
                color: currentStep === step.number ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: index + 1 < currentStep ? 0.6 : 1
              }}
              onClick={() => setCurrentStep(step.number)}
            >
              <div style={{
                width: '30px', height: '30px',
                borderRadius: '50%',
                background: index + 1 < currentStep ? 'var(--primary-color)' :
                  currentStep === step.number ? 'white' : 'var(--border-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {index + 1 < currentStep ? (
                  <Check size={14} color="white" />
                ) : (
                  <step.icon size={14} color={currentStep === step.number ? 'var(--primary-color)' : 'var(--text-primary)'} />
                )}
              </div>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: currentStep === step.number ? '600' : '400',
                display: 'none',
                '@media (min-width: 480px)': { display: 'block' }
              }}>
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
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: 'var(--card-bg)',
            borderRadius: '20px',
            border: '2px solid var(--border-color)',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}
        >
          {/* Current Step Header */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-primary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '40px', height: '40px',
                background: 'var(--primary-color)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white'
              }}>
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  {steps[currentStep - 1].title}
                </h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, margin: 0 }}>
                  {steps[currentStep - 1].description}
                </p>
              </div>
            </div>
          </div>

          {/* Form Steps */}
          <div style={{ padding: '1.5rem' }}>
            <AnimatePresence mode="wait">

              {/* FIX 2: All panels now render based on steps[currentStep-1].title instead of hardcoded numbers */}

              {/* Step: Personal Info */}
              {steps[currentStep - 1]?.title === 'Personal Info' && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                  <div className="input-group">
                    <label style={labelStyle}>
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
                      style={inputStyle}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="input-group">
                    <label style={labelStyle}>
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
                      style={inputStyle}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="input-group">
                    <label style={labelStyle}>
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
                      style={inputStyle}
                      placeholder="+237 XXX XXX XXX"
                    />
                    <p style={helperTextStyle}>We'll use this to contact you via WhatsApp</p>
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
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                  <div className="input-group">
                    <label style={labelStyle}>
                      <School size={16} style={{ marginRight: '0.5rem' }} />
                      Educational Qualification *
                    </label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      style={inputStyle}
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
                        style={inputStyle}
                      />
                    </motion.div>
                  )}

                  <div className="input-group">
                    <label style={labelStyle}>
                      <Briefcase size={16} style={{ marginRight: '0.5rem' }} />
                      Current Occupation
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      disabled={loading}
                      style={inputStyle}
                      placeholder="e.g., Student, Software Engineer, etc."
                    />
                  </div>

                  <div className="input-group">
                    <label style={labelStyle}>
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
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
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
                >
                  <div className="input-group">
                    <label style={labelStyle}>
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
                        style={{ ...inputStyle, padding: '0.75rem', minHeight: '200px' }}
                      >
                        {coursesList.map((course, index) => (
                          <option key={index} value={course} style={{ padding: '0.75rem', margin: '2px 0', borderRadius: '4px' }}>
                            {course}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p style={helperTextStyle}>Hold Ctrl (Cmd on Mac) to select multiple courses</p>

                    {formData.courses.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          marginTop: '1rem', padding: '1rem',
                          background: 'var(--bg-primary)',
                          borderRadius: '8px', border: '1px solid var(--border-color)'
                        }}
                      >
                        <strong style={{ display: 'block', marginBottom: '0.5rem' }}>
                          Selected Courses ({formData.courses.length}):
                        </strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {formData.courses.map((course, idx) => (
                            <span key={idx} style={{
                              background: 'var(--primary-color)', color: 'white',
                              padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.85rem'
                            }}>
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
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      padding: '1.5rem',
                      background: 'var(--bg-primary)',
                      borderRadius: '12px',
                      border: '2px solid var(--primary-color)',
                      display: 'flex', flexDirection: 'column', gap: '1.5rem'
                    }}
                  >
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                      📋 Preview Your {formData.enrollmentType === 'bootcamp' ? 'Bootcamp' : formData.enrollmentType === 'internship' ? 'Internship' : 'Vocational Training'}
                    </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.95rem' }}>
                      <div>
                        <p style={{ opacity: 0.7, marginBottom: '0.25rem' }}>Name</p>
                        <p style={{ fontWeight: 600, color: 'var(--text-secondary)', wordBreak: 'break-word' }}>{formData.name}</p>
                      </div>
                      <div>
                        <p style={{ opacity: 0.7, marginBottom: '0.25rem' }}>Email</p>
                        <p style={{ fontWeight: 600, color: 'var(--text-secondary)', wordBreak: 'break-all' }}>{formData.email}</p>
                      </div>
                      <div>
                        <p style={{ opacity: 0.7, marginBottom: '0.25rem' }}>WhatsApp</p>
                        <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{formData.contact}</p>
                      </div>
                      <div>
                        <p style={{ opacity: 0.7, marginBottom: '0.25rem' }}>Education Level</p>
                        <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                          {formData.education === 'Other' ? formData.educationOther : formData.education}
                        </p>
                      </div>
                      <div>
                        <p style={{ opacity: 0.7, marginBottom: '0.25rem' }}>Occupation</p>
                        <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{formData.occupation}</p>
                      </div>
                      <div>
                        <p style={{ opacity: 0.7, marginBottom: '0.25rem' }}>Enrollment Type</p>
                        <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                          {formData.enrollmentType === 'bootcamp' ? 'Bootcamp' : formData.enrollmentType === 'internship' ? 'Internship' : 'Vocational Training'}
                        </p>
                      </div>
                    </div>

                    {formData.enrollmentType !== 'bootcamp' && (
                      <div>
                        <p style={{ opacity: 0.7, marginBottom: '0.5rem' }}>Selected Courses</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {formData.courses.map((course, idx) => (
                            <span key={idx} style={{
                              background: 'var(--primary-color)', color: 'white',
                              padding: '0.4rem 0.9rem', borderRadius: '20px',
                              fontSize: '0.9rem', fontWeight: '500'
                            }}>
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <p style={{ opacity: 0.7, marginBottom: '0.5rem' }}>Career Goal</p>
                      <p style={{ fontWeight: 500, whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                        {formData.careerGoal}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      marginTop: '1.5rem', padding: '1rem',
                      background: 'rgba(37, 211, 102, 0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(37, 211, 102, 0.3)',
                      display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                  >
                    <CheckCircle size={18} color="#25D366" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      All information looks good? Click Submit to continue to WhatsApp.
                    </span>
                  </motion.div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '1rem' }}>
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    ...buttonStyle,
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '2px solid var(--border-color)',
                    flex: 1
                  }}
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
                  style={{
                    ...buttonStyle,
                    background: !isStepValid() ? 'var(--border-color)' : 'var(--primary-color)',
                    color: !isStepValid() ? 'var(--text-primary)' : 'white',
                    border: 'none',
                    cursor: !isStepValid() ? 'not-allowed' : 'pointer',
                    flex: currentStep > 1 ? 1 : 'none',
                    minWidth: currentStep === 1 ? '100%' : 'auto'
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
                  style={{
                    ...buttonStyle,
                    background: loading ? 'var(--border-color)' : 'linear-gradient(135deg, #25D366, #128C7E)',
                    color: 'white',
                    border: 'none',
                    cursor: loading || !isStepValid() ? 'not-allowed' : 'pointer',
                    width: '100%'
                  }}
                >
                  {loading ? (
                    <><div className="spinner" style={spinnerStyle} />Submitting...</>
                  ) : (
                    <><CheckCircle size={18} />Submit</>
                  )}
                </motion.button>
              )}
            </div>

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
          style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: '1.5rem', marginTop: '2rem', padding: '0 1rem'
          }}
        >
          {[
            { icon: Lock, text: 'Secure & Private' },
            { icon: Check, text: 'Quick Response' },
            { icon: Award, text: 'Certified Courses' }
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--card-bg)', padding: '0.5rem 1rem',
              borderRadius: '25px', border: '1px solid var(--border-color)'
            }}>
              <item.icon size={16} color="var(--primary-color)" />
              <span style={{ fontSize: '0.9rem' }}>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Group Join Popup Modal */}
      <AnimatePresence>
        {showGroupPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGroupPopup(false)}
            style={modalBackdropStyle}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={modalContentStyle}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px', height: '60px',
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <Users size={30} color="white" />
                </div>

                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                  Join Our Community!
                </h3>

                <p style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: '1.6', opacity: 0.8 }}>
                  Connect with fellow students, get updates, and be part of our growing family.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <motion.button
                    onClick={handleJoinGroup}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'linear-gradient(135deg, #25D366, #128C7E)',
                      color: 'white', border: 'none',
                      padding: '1rem 2rem', borderRadius: '10px',
                      fontSize: '1rem', fontWeight: '600', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                  >
                    <Users size={18} />
                    Join WhatsApp Group
                  </motion.button>

                  <motion.button
                    onClick={() => setShowGroupPopup(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'transparent', color: 'var(--text-secondary)',
                      border: '2px solid var(--border-color)',
                      padding: '1rem 2rem', borderRadius: '10px',
                      fontSize: '1rem', fontWeight: '600', cursor: 'pointer'
                    }}
                  >
                    Maybe Later
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .enroll-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .section-title { font-size: 1.8rem; }
          .section-subtitle { font-size: 0.95rem; }
        }
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: var(--primary-color) !important;
        }
        select[multiple] option:checked {
          background: var(--primary-color) linear-gradient(0deg, var(--primary-color) 0%, var(--primary-color) 100%);
          color: white;
        }
        select[multiple] option { padding: 0.5rem; }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner { animation: spin 1s linear infinite; }
      `}</style>

      {/* Floating Notification Toast */}
      <AnimatePresence>
        {notification.visible && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.35, type: 'spring' }}
            style={{
              position: 'fixed',
              top: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              minWidth: '320px',
              maxWidth: '90vw',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              background: notification.type === 'success'
                ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                : 'linear-gradient(135deg, #dc2626, #b91c1c)',
              color: 'white',
              fontSize: '0.95rem',
              lineHeight: '1.5',
              whiteSpace: 'pre-line',
              cursor: 'pointer'
            }}
            onClick={() => setNotification(prev => ({ ...prev, visible: false }))}
            title="Click to dismiss"
          >
            <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>
              {notification.type === 'success' ? '✅' : '❌'}
            </span>
            <span style={{ flex: 1 }}>{notification.message}</span>
            <span style={{ flexShrink: 0, opacity: 0.8, fontSize: '1.1rem', marginLeft: '0.5rem', cursor: 'pointer' }}>✕</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Styles
const labelStyle = {
  display: 'flex', alignItems: 'center',
  marginBottom: '0.5rem', fontWeight: '500',
  color: 'var(--text-secondary)', fontSize: '0.95rem'
};

const inputStyle = {
  width: '100%', padding: '1rem',
  border: '2px solid var(--border-color)',
  borderRadius: '10px', background: 'var(--bg-primary)',
  color: 'var(--text-primary)', fontSize: '1rem',
  transition: 'all 0.3s ease'
};

const helperTextStyle = {
  marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.7, fontStyle: 'italic'
};

const buttonStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  gap: '8px', padding: '1rem 1.5rem', borderRadius: '10px',
  fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease'
};

const spinnerStyle = {
  width: '20px', height: '20px',
  border: '3px solid rgba(255,255,255,0.3)',
  borderTopColor: 'white', borderRadius: '50%',
  animation: 'spin 1s linear infinite'
};

const modalBackdropStyle = {
  position: 'fixed', inset: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(5px)',
  zIndex: 10000, display: 'flex',
  alignItems: 'center', justifyContent: 'center', padding: '1rem'
};

const modalContentStyle = {
  background: 'var(--card-bg)', padding: '2rem',
  borderRadius: '15px', border: '2px solid var(--border-color)',
  maxWidth: '500px', width: '100%',
  maxHeight: 'calc(100vh - 40px)', overflowY: 'auto',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
};

export default Enrollment;