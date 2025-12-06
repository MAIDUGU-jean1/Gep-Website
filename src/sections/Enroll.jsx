import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Users, GraduationCap, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser'; // Install with: npm install @emailjs/browser

const Enroll = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    courses: [],
    message: '',
    education: '',
    educationOther: '',
    occupation: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. First send email to info@gepprotech.com
      const emailMessage = `
New Enrollment Request from Gep Protech Website:

Student Details:
---------------
Name: ${formData.name}
Email: ${formData.email}
Contact: ${formData.contact}
Educational Qualification: ${formData.education === 'Other' ? formData.educationOther || 'Other' : (formData.education || 'Not specified')}
Current Occupation: ${formData.occupation || 'Not specified'}

Course Interests:
----------------
${formData.courses.length > 0 ? formData.courses.join(', ') : 'Not specified'}

Message:
--------
${formData.message}

---
This enrollment request was submitted from the Gep Protech Academic Website.
      `.trim();

      // Send email using EmailJS
      const emailResult = await emailjs.send(
        'service_pc9b9e9', // Replace with your EmailJS service ID
        'template_dcr8suq', // Replace with your EmailJS template ID
        {
          to_email: 'info@gepprotech.com',
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.contact,
          message: emailMessage,
          qualification: formData.education === 'Other' ? formData.educationOther || 'Other' : formData.education,
          occupation: formData.occupation,
          courses: formData.courses.join(', '),
          date: new Date().toLocaleString()
        },
        'yhRZ0bDCnRoc1YgDW' // Replace with your EmailJS public key
      );

      if (emailResult.status === 200) {
        setEmailSent(true);
        
        // 2. Create WhatsApp message for student to send
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

        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const phoneNumber = '237674386778';
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Show success message with information about both destinations
        alert(`✅ Your enrollment request has been sent to info@gepprotech.com\n\n📱 We will now redirect you to WhatsApp to send your details to our enrollment team.\n\nYou are sending your information to:\n1. info@gepprotech.com (Already sent)\n2. WhatsApp: +237 674 386 778\n\nPlease complete the process by sending the message on WhatsApp.`);
        
        // Open WhatsApp in new tab
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
          
          // Show group invitation popup after a delay
          setTimeout(() => {
            setShowGroupPopup(true);
          }, 1000);
        }, 1500);
        
        // Reset form
        setFormData({ name: '', email: '', contact: '', courses: [], message: '', education: '', educationOther: '', occupation: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ There was an error sending your enrollment request. Please try again or contact us directly.');
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
    const groupLink = 'https://chat.whatsapp.com/YOUR_GROUP_LINK'; // Replace with your actual group link
    window.open(groupLink, '_blank');
    setShowGroupPopup(false);
  };

  return (
    <section id="enroll" style={{
      padding: 'clamp(4rem, 8vw, 8rem) 0',
      background: 'var(--bg-primary)'
    }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="section-title">Start Your Journey</h2>
          <p className="section-subtitle">
            Ready to transform your future? Enroll now and begin your technology education with Gep Protech Academy.
          </p>
        </motion.div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '4rem',
          alignItems: 'start'
        }} className="enroll-grid">
          {/* Enrollment Form - Now comes first on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              background: 'var(--card-bg)',
              padding: '2.5rem',
              borderRadius: '15px',
              border: '2px solid var(--border-color)',
              order: 1 // Form comes first on mobile
            }}
            className="enroll-form"
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Start Your Enrollment
            </h3>
            <p style={{ marginBottom: '1.5rem', opacity: 0.8, fontSize: '0.95rem' }}>
              Fill out the form below and we'll send your details to both our email and WhatsApp for faster processing.
            </p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: 'var(--text-secondary)'
                }}>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    opacity: loading ? 0.7 : 1
                  }}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: 'var(--text-secondary)'
                }}>
                  Email Address *
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    opacity: loading ? 0.7 : 1
                  }}
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: 'var(--text-secondary)'
                }}>
                  Contact *
                </label>
                <input 
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    opacity: loading ? 0.7 : 1
                  }}
                  placeholder="Enter your whatsapp number"
                />
              </div>

              {/* Educational Qualification */}
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: 'var(--text-secondary)'
                }}>
                  Educational Qualification
                </label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  <option value="">Select qualification</option>
                  <option value="No formal education">No formal education</option>
                  <option value="Advanced level">Advanced level</option>
                  <option value="HND">HND</option>
                  <option value="University Student">University Student</option>
                  <option value="Bachelor's degree">Bachelor's degree</option>
                  <option value="Master's degree">Master's degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other: Specify</option>
                </select>
              </div>

              {/* If Other selected, show specify input */}
              {formData.education === 'Other' && (
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '500',
                    color: 'var(--text-secondary)'
                  }}>
                    Please specify
                  </label>
                  <input
                    type="text"
                    name="educationOther"
                    value={formData.educationOther}
                    onChange={handleChange}
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: '8px',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease',
                      opacity: loading ? 0.7 : 1
                    }}
                    placeholder="Specify your qualification"
                  />
                </div>
              )}

              {/* Current Occupation */}
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: 'var(--text-secondary)'
                }}>
                  Current Occupation
                </label>
                <input 
                  type="text" 
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    opacity: loading ? 0.7 : 1
                  }}
                  placeholder="e.g., Student, Unemployed, Software Engineer"
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: 'var(--text-secondary)'
                }}>
                  Course Interests (Select multiple)
                </label>
                <select 
                  name="courses"
                  value={formData.courses}
                  onChange={handleCourseChange}
                  multiple
                  size="5"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {coursesList.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                <p style={{ 
                  marginTop: '0.5rem', 
                  fontSize: '0.8rem', 
                  opacity: 0.7,
                  fontStyle: 'italic'
                }}>
                  Hold Ctrl (or Cmd on Mac) to select multiple courses
                </p>
                {formData.courses.length > 0 && (
                  <div style={{ 
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    background: 'var(--bg-primary)',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <strong>Selected courses:</strong> {formData.courses.join(', ')}
                  </div>
                )}
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: 'var(--text-secondary)'
                }}>
                  Message *
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease',
                    opacity: loading ? 0.7 : 1
                  }}
                  placeholder="Tell us about your educational background, career goals, and any specific requirements..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  marginTop: '1rem',
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="spinning">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.418"/>
                    </svg>
                    Start Enrollment via Email & WhatsApp
                  </>
                )}
              </button>
              
              {emailSent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#25D366',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginTop: '0.5rem'
                  }}
                >
                  <CheckCircle size={16} />
                  Email sent successfully! Redirecting to WhatsApp...
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Enrollment Information - Now comes second on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              order: 2 // Information comes second on mobile
            }}
            className="enroll-info"
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Enrollment Process
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                {
                  icon: Mail,
                  title: 'Email Confirmation',
                  info: 'Your details are first sent to info@gepprotech.com for official record'
                },
                {
                  icon: Users,
                  title: 'WhatsApp Follow-up',
                  info: 'Then redirected to WhatsApp for immediate consultation with our team'
                },
                {
                  icon: Clock,
                  title: 'Flexible Scheduling',
                  info: 'Choose from morning, afternoon, or weekend classes to fit your schedule'
                },
                {
                  icon: MapPin,
                  title: 'Campus Location',
                  info: 'ENS Street Bambili, Near Psalms one city'
                }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'start'
                }}>
                  <div style={{
                    background: 'var(--primary-color)',
                    padding: '12px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'white'
                  }}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                      {item.title}
                    </h4>
                    <p style={{ whiteSpace: 'pre-line', opacity: 0.8, lineHeight: '1.6' }}>{item.info}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              style={{
                marginTop: '2rem',
                padding: '2rem',
                background: 'var(--card-bg)',
                borderRadius: '15px',
                border: '2px solid var(--border-color)'
              }}
            >
              <h4 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Why Enroll With Us?
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Industry-recognized certifications',
                  'Hands-on practical training',
                  'Job placement assistance',
                  'Flexible payment plans',
                  'Modern equipment and facilities',
                  'Experienced instructors',
                  'Career development support',
                  'Lifetime access to learning resources'
                ].map((feature, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: 'var(--primary-color)',
                      borderRadius: '50%'
                    }}></div>
                    <span style={{ opacity: 0.8 }}>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Group Join Popup Modal */}
      <AnimatePresence>
        {showGroupPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGroupPopup(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(5px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              overflowY: 'auto'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                background: 'var(--card-bg)',
                padding: '2.5rem',
                borderRadius: '15px',
                border: '2px solid var(--border-color)',
                maxWidth: '500px',
                width: '100%',
                zIndex: 1001,
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                maxHeight: 'calc(100vh - 40px)',
                overflowY: 'auto'
              }}
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

                <h3 style={{ 
                  fontSize: '1.5rem', 
                  marginBottom: '1rem', 
                  color: 'var(--text-secondary)'
                }}>
                  Join Our Community!
                </h3>

                <p style={{ 
                  color: 'var(--text-primary)', 
                  marginBottom: '1.5rem',
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  Connect with fellow students, get updates, ask questions, and be part of our growing community. Click below to join our official WhatsApp group.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.418"/>
                    </svg>
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

                <p style={{ 
                  fontSize: '0.8rem', 
                  color: 'var(--text-primary)', 
                  opacity: 0.6,
                  marginTop: '1.5rem'
                }}>
                  You can join our group anytime from our website
                </p>
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
          .enroll-form {
            order: 2 !important; /* Form on right side on desktop */
          }
          .enroll-info {
            order: 1 !important; /* Info on left side on desktop */
          }
        }

        /* Mobile view - form comes first */
        @media (max-width: 767px) {
          .enroll-form {
            order: 1 !important; /* Form first on mobile */
          }
          .enroll-info {
            order: 2 !important; /* Info second on mobile */
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

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .spinning {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Enroll;