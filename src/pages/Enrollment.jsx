import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Clock, Users, GraduationCap, 
  CheckCircle, User, Briefcase, BookOpen, ArrowRight, 
  ArrowLeft, Award, Check, Lock, ChevronRight, Home,
  School, MessageSquare
} from 'lucide-react';
import axios from 'axios';
import emailjs from '@emailjs/browser';

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
    
    // Step 3: Course Selection
    courses: [],
    
    // Step 4: Message
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [showGroupPopup, setShowGroupPopup] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

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
    "UI/UX Design"
  ];

  const steps = [
    {
      number: 1,
      title: 'Personal Info',
      icon: User,
      description: 'Tell us about yourself'
    },
    {
      number: 2,
      title: 'Background',
      icon: School,
      description: 'Your education & occupation'
    },
    {
      number: 3,
      title: 'Courses',
      icon: BookOpen,
      description: 'Select your interests'
    },
    {
      number: 4,
      title: 'Message',
      icon: MessageSquare,
      description: 'Any specific requirements?'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      
      if (!apiUrl) {
        throw new Error('API URL is not configured');
      }

      // Prepare data for database submission
      const enrollmentData = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        education: formData.education === 'Other' ? formData.educationOther || 'Other' : formData.education,
        occupation: formData.occupation,
        // send courses as an array so backend validation (array) passes
        courses: formData.courses,
        message: formData.message
      };

      // Submit to database
      const dbResult = await axios.post(`${apiUrl}/public-enrollment`, enrollmentData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (dbResult.data && dbResult.data.success) {
        setEmailSent(true);
        
        // Check if backend email notification was sent successfully
        const emailNotificationSent = dbResult.data.email_sent !== false;
        
        // Create WhatsApp message
        const whatsappMessage = `
New Enrollment Request from Gep Protech Website:

*Name:* ${formData.name}
*Email:* ${formData.email}
*Contact:* ${formData.contact}
*Course Interests:* ${formData.courses.length > 0 ? formData.courses.join(', ') : 'Not specified'}
*Message:*
${formData.message}

*Educational Qualification:* ${formData.education === 'Other' ? formData.educationOther || 'Other' : (formData.education || 'Not specified')}
*Current Occupation:* ${formData.occupation || 'Not specified'}

---
Sent from Gep Protech Academic Website
        `.trim();

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const phoneNumber = '237674386778';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Build success message with email notification status
        let successMessage = `✅ Your enrollment has been saved successfully!\n\n`;
        if (!emailNotificationSent) {
          successMessage += `⚠️ Note: Admin notification email could not be sent, but your enrollment was recorded.\n\n`;
        } else {
          successMessage += `📧 Admin team has been notified via email.\n\n`;
        }
        successMessage += `📱 You'll now be redirected to WhatsApp.`;
        
        alert(successMessage);
        
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
          setTimeout(() => {
            setShowGroupPopup(true);
          }, 1000);
        }, 1500);
        
        // Reset form
        setFormData({ 
          name: '', email: '', contact: '', courses: [], 
          message: '', education: '', educationOther: '', occupation: '' 
        });
        setCurrentStep(1);
      } else {
        throw new Error(dbResult.data?.message || 'Enrollment failed');
      }
    } catch (error) {
      console.error('Error:', error);
      
      // Handle axios error response
      let errorMessage = 'There was an error. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 422) {
          // Validation errors
          const errors = error.response.data.errors || error.response.data.message;
          if (typeof errors === 'object') {
            errorMessage = 'Validation Error:\n' + Object.entries(errors)
              .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages[0] : messages}`)
              .join('\n');
          } else {
            errorMessage = `Validation Error: ${errors}`;
          }
        } else if (error.response.status === 500) {
          errorMessage = 'Server Error: Please contact support';
        } else {
          errorMessage = error.response.data?.message || `Error: ${error.response.statusText}`;
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        errorMessage = error.message;
      }
      
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCourseChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      courses: selectedOptions
    });
  };

  const handleJoinGroup = () => {
    const groupLink = 'https://chat.whatsapp.com/YOUR_GROUP_LINK';
    window.open(groupLink, '_blank');
    setShowGroupPopup(false);
  };

  const nextStep = () => {
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
    switch(currentStep) {
      case 1:
        return formData.name && formData.email && formData.contact;
      case 2:
        return formData.education && (formData.education !== 'Other' || formData.educationOther);
      case 3:
        return formData.courses.length > 0;
      case 4:
        return formData.message;
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
            Complete the steps below to begin your journey with us. Your information is secure and will be sent to our team.
          </p>
        </motion.div>

        {/* Progress Bar - Mobile Friendly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            maxWidth: '800px',
            margin: '0 auto 2rem auto',
            padding: '0 1rem'
          }}
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
                {steps[currentStep-1].title}
              </span>
            </div>
            <span style={{ 
              fontSize: '0.9rem', 
              color: 'var(--text-primary)',
              opacity: 0.7
            }}>
              {Math.round(getProgressPercentage())}% Complete
            </span>
          </div>
          
          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '8px',
            background: 'var(--border-color)',
            borderRadius: '4px',
            overflow: 'hidden'
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

        {/* Steps Navigation - Mobile Friendly */}
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
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: index + 1 < currentStep ? 'var(--primary-color)' : 
                          currentStep === step.number ? 'white' : 'var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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
                width: '40px',
                height: '40px',
                background: 'var(--primary-color)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                {/* {steps[currentStep-1].icon({ size: 20 })} */}
              </div>
              <div>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  color: 'var(--text-secondary)',
                  marginBottom: '0.25rem'
                }}>
                  {steps[currentStep-1].title}
                </h3>
                <p style={{ 
                  fontSize: '0.9rem', 
                  opacity: 0.7,
                  margin: 0
                }}>
                  {steps[currentStep-1].description}
                </p>
              </div>
            </div>
          </div>

          {/* Form Steps */}
          <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
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
                    <p style={helperTextStyle}>
                      We'll use this to contact you via WhatsApp
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Academic Info */}
              {currentStep === 2 && (
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
                </motion.div>
              )}

              {/* Step 3: Course Selection */}
              {currentStep === 3 && (
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
                        style={{
                          ...inputStyle,
                          padding: '0.75rem',
                          minHeight: '200px'
                        }}
                      >
                        {coursesList.map((course, index) => (
                          <option key={index} value={course} style={{
                            padding: '0.75rem',
                            margin: '2px 0',
                            borderRadius: '4px'
                          }}>
                            {course}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p style={helperTextStyle}>
                      Hold Ctrl (Cmd on Mac) to select multiple courses
                    </p>
                    
                    {formData.courses.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          marginTop: '1rem',
                          padding: '1rem',
                          background: 'var(--bg-primary)',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)'
                        }}
                      >
                        <strong style={{ display: 'block', marginBottom: '0.5rem' }}>
                          Selected Courses ({formData.courses.length}):
                        </strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {formData.courses.map((course, idx) => (
                            <span
                              key={idx}
                              style={{
                                background: 'var(--primary-color)',
                                color: 'white',
                                padding: '0.3rem 0.8rem',
                                borderRadius: '15px',
                                fontSize: '0.85rem'
                              }}
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Message */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="input-group">
                    <label style={labelStyle}>
                      <MessageSquare size={16} style={{ marginRight: '0.5rem' }} />
                      Your Message *
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      rows="6"
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                        minHeight: '150px'
                      }}
                      placeholder="Tell us about your goals, why you're interested in these courses, and any questions you have..."
                    />
                  </div>

                  {/* Summary Preview */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      marginTop: '1.5rem',
                      padding: '1rem',
                      background: 'var(--bg-primary)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                      Preview Your Enrollment:
                    </h4>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                      <p><strong>Name:</strong> {formData.name || 'Not provided'}</p>
                      <p><strong>Email:</strong> {formData.email || 'Not provided'}</p>
                      <p><strong>Education:</strong> {formData.education === 'Other' ? formData.educationOther : formData.education || 'Not provided'}</p>
                      <p><strong>Courses:</strong> {formData.courses.length > 0 ? formData.courses.join(', ') : 'None selected'}</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '2rem',
              gap: '1rem'
            }}>
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
                  type="submit"
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
                    <>
                      <div className="spinner" style={spinnerStyle} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      Complete Enrollment
                    </>
                  )}
                </motion.button>
              )}
            </div>

            {emailSent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  color: '#25D366',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: 'rgba(37, 211, 102, 0.1)',
                  borderRadius: '8px'
                }}
              >
                <CheckCircle size={16} />
                Email sent! Redirecting to WhatsApp...
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Trust Badges - Mobile Friendly */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '2rem',
            padding: '0 1rem'
          }}
        >
          {[
            { icon: Lock, text: 'Secure & Private' },
            { icon: Check, text: 'Quick Response' },
            { icon: Award, text: 'Certified Courses' }
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--card-bg)',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              border: '1px solid var(--border-color)'
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
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
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
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      border: '2px solid var(--border-color)',
                      padding: '1rem 2rem',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
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
          .enroll-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.8rem;
          }
          .section-subtitle {
            font-size: 0.95rem;
          }
        }

        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: var(--primary-color) !important;
        }

        select[multiple] option:checked {
          background: var(--primary-color) linear-gradient(0deg, var(--primary-color) 0%, var(--primary-color) 100%);
          color: white;
        }

        select[multiple] option {
          padding: 0.5rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
};

// Styles
const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.5rem',
  fontWeight: '500',
  color: 'var(--text-secondary)',
  fontSize: '0.95rem'
};

const inputStyle = {
  width: '100%',
  padding: '1rem',
  border: '2px solid var(--border-color)',
  borderRadius: '10px',
  background: 'var(--bg-primary)',
  color: 'var(--text-primary)',
  fontSize: '1rem',
  transition: 'all 0.3s ease'
};

const helperTextStyle = {
  marginTop: '0.5rem',
  fontSize: '0.8rem',
  opacity: 0.7,
  fontStyle: 'italic'
};

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '1rem 1.5rem',
  borderRadius: '10px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

const spinnerStyle = {
  width: '20px',
  height: '20px',
  border: '3px solid rgba(255,255,255,0.3)',
  borderTopColor: 'white',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
};

const modalBackdropStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(5px)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem'
};

const modalContentStyle = {
  background: 'var(--card-bg)',
  padding: '2rem',
  borderRadius: '15px',
  border: '2px solid var(--border-color)',
  maxWidth: '500px',
  width: '100%',
  maxHeight: 'calc(100vh - 40px)',
  overflowY: 'auto',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
};

export default Enrollment;