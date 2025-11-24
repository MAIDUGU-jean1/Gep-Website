import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Users, GraduationCap } from 'lucide-react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
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

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const phoneNumber = '237674386778';
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Optional: Show confirmation message
    alert('Opening WhatsApp to start your enrollment process...');
    
    // Reset form
    setFormData({ name: '', email: '', contact: '', courses: [], message: '', education: '', educationOther: '', occupation: '' });
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
              Fill out the form below and we'll redirect you to WhatsApp to complete your enrollment process with our team.
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
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease'
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
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease'
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
                  type="contact" 
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease'
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
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
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
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: '8px',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease'
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
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease'
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
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
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
                    transition: 'border-color 0.3s ease'
                  }}
                  placeholder="Tell us about your educational background, career goals, and any specific requirements..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                marginTop: '1rem',
                background: 'linear-gradient(135deg, #25D366, #128C7E)'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.418"/>
                </svg>
                Start Enrollment via WhatsApp
              </button>
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
                  icon: GraduationCap,
                  title: 'Simple Registration',
                  info: 'Fill out our enrollment form and we\'ll guide you through the rest of the process'
                },
                {
                  icon: Users,
                  title: 'Personal Consultation',
                  info: 'Get personalized guidance on choosing the right course for your career goals'
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
      `}</style>
    </section>
  );
};

export default Enroll;