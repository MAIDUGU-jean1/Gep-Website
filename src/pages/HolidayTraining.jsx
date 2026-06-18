import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Calendar, BookOpen,
  GraduationCap, CheckCircle, ArrowRight, ArrowLeft,
  Check, Lock, Briefcase, Heart, Baby, Star
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/HolidayTraining.css';

const HolidayTraining = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    dob: '',
    education: '',
    educationOther: '',
    occupation: '',
    courses: [],
    careerGoal: '',
    isImpaired: 'false', // added default
    isJunior: 'false', // added default
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const isAdult = categories.includes('adult');
  const isKid = categories.includes('kid');

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

  const handleCategoryToggle = (category) => {
    // Mutually exclusive: only one category at a time
    setCategories([category]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleCourseChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, courses: selectedOptions });
  };

  const steps = [
    { number: 1, title: 'Category', icon: Star, description: 'Who is this training for?' },
    { number: 2, title: 'Personal Info', icon: User, description: 'Basic identification' },
    { number: 3, title: 'Background', icon: GraduationCap, description: 'Your background' },
    ...(isAdult ? [{ number: 4, title: 'Courses', icon: BookOpen, description: 'Select your path' }] : []),
    { number: isAdult ? 5 : 4, title: 'Preview', icon: CheckCircle, description: 'Review & Submit' }
  ];

  const nextStep = () => {
    if (currentStep === 1 && categories.length === 0) {
      alert('Please select a category to continue.');
      return;
    }
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const payload = {
        ...formData,
        categories,
        type: 'Holiday Training'
      };

      // Simulating API call as per current project pattern
      console.log('Submitting Holiday Training:', payload);
      
      const endpoint = 'holiday-enrollment'; // Assuming this endpoint exists or will be handled
      await axios.post(`${apiUrl}/${endpoint}`, payload);

      setSubmitted(true);
      setTimeout(() => {
        navigate('/enroll');
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="holiday-training-section">
      <div className="holiday-training-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="enrollment-header"
        >
          <div className="enrollment-header-icon">
            <Calendar size={35} color="white" />
          </div>
          <h2 className="enrollment-title">Holiday Training Program</h2>
          <p className="enrollment-subtitle">
            Specialized training programs for all ages and abilities.
          </p>
        </motion.div>

        <div className="form-container">
          <div className="form-header">
            <div className="form-header-icon">
              {React.createElement(steps[currentStep - 1].icon, { size: 24 })}
            </div>
            <div>
              <h3 className="form-header-title">{steps[currentStep - 1].title}</h3>
              <p className="form-header-description">{steps[currentStep - 1].description}</p>
            </div>
          </div>

          <div className="step-content">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="category-selection-grid"
                >
                  {[
                    { id: 'kid', name: 'Kid', icon: Baby, desc: 'Educational tech for youngsters' },
                    { id: 'adult', name: 'Regular/Adult', icon: User, desc: 'Vocational training for professionals' }
                  ].map(cat => (
                    <label 
                      key={cat.id} 
                      className={`category-checkbox-label ${categories.includes(cat.id) ? 'selected' : ''}`}
                    >
                      <input 
                        type="checkbox" 
                        checked={categories.includes(cat.id)}
                        onChange={() => handleCategoryToggle(cat.id)}
                      />
                      <div className="category-icon-wrapper">
                        <cat.icon size={30} />
                      </div>
                      <span className="category-name">{cat.name}</span>
                      <span className="category-description">{cat.desc}</span>
                    </label>
                  ))}
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="input-group">
                    <label className="input-label"><User size={16} /> Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-field" placeholder="Enter full name" />
                  </div>
                  <div className="input-group">
                    <label className="input-label"><Mail size={16} /> Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-field" placeholder="Enter email address" />
                  </div>
                  <div className="input-group">
                    <label className="input-label"><Phone size={16} /> Phone Number *</label>
                    <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required className="input-field" placeholder="+237 XXX XXX XXX" />
                  </div>
                  {(isKid || formData.isImpaired === 'true') && (
                    <>
                      <div className="input-group">
                        <label className="input-label"><MapPin size={16} /> Home Address *</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required className="input-field" placeholder="Residential address" />
                      </div>
                      <div className="input-group">
                        <label className="input-label"><Calendar size={16} /> Date of Birth *</label>
                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="input-field" />
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="input-group">
                    <label className="input-label"><GraduationCap size={16} /> Education level/Status *</label>
                    <select name="education" value={formData.education} onChange={handleChange} required className="input-field">
                      <option value="">Select qualification</option>
                      <option value="Primary School">Primary School</option>
                      <option value="Secondary School">Secondary School</option>
                      <option value="Advanced level">Advanced level</option>
                      <option value="University Student">University Student</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {isAdult && (
                    <div className="input-group">
                      <label className="input-label"><Briefcase size={16} /> Current Occupation</label>
                      <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="input-field" placeholder="e.g. Student, Graphic Designer" />
                    </div>
                  )}

                  <div className="input-group" style={{ marginTop: '1rem' }}>
                    <label className="input-label"><Heart size={16} /> Are you specially impaired? *</label>
                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          name="isImpaired" 
                          value="true" 
                          checked={formData.isImpaired === 'true'} 
                          onChange={handleChange} 
                        />
                        Yes
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          name="isImpaired" 
                          value="false" 
                          checked={formData.isImpaired === 'false'} 
                          onChange={handleChange} 
                        />
                        No
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && isAdult && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="input-group">
                    <label className="input-label"><BookOpen size={16} /> Select Course(s) *</label>
                    <select multiple name="courses" value={formData.courses} onChange={handleCourseChange} required className="input-field">
                      {coursesList.map(course => <option key={course} value={course}>{course}</option>)}
                    </select>
                    <p className="helper-text">Hold Ctrl/Cmd to select multiple courses</p>
                  </div>
                  <div className="input-group">
                    <label className="input-label"><Star size={16} /> Career Goal *</label>
                    <textarea name="careerGoal" value={formData.careerGoal} onChange={handleChange} required className="input-field" placeholder="Tell us about your goals..." />
                  </div>
                </motion.div>
              )}

              {((currentStep === 4 && !isAdult) || (currentStep === 5 && isAdult)) && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="preview-card">
                    <div className="preview-grid">
                      <div>
                        <p className="preview-label">Selected Categories:</p>
                        <div className="courses-tags">
                          {categories.map(c => <span key={c} className="course-tag">{c.toUpperCase()}</span>)}
                        </div>
                      </div>
                      <div><p className="preview-label">Full Name:</p><p className="preview-value">{formData.name}</p></div>
                      <div><p className="preview-label">Email:</p><p className="preview-value">{formData.email}</p></div>
                      <div><p className="preview-label">Contact:</p><p className="preview-value">{formData.contact}</p></div>
                      {(isKid || formData.isImpaired === 'true') && (
                        <>
                          <div><p className="preview-label">Address:</p><p className="preview-value">{formData.address}</p></div>
                          <div><p className="preview-label">DOB:</p><p className="preview-value">{formData.dob}</p></div>
                        </>
                      )}
                      <div><p className="preview-label">Specially Impaired:</p><p className="preview-value">{formData.isImpaired === 'true' ? 'Yes' : 'No'}</p></div>
                      <div><p className="preview-label">Education:</p><p className="preview-value">{formData.education}</p></div>
                      {isAdult && (
                        <>
                          <div><p className="preview-label">Occupation:</p><p className="preview-value">{formData.occupation}</p></div>
                          <div>
                            <p className="preview-label">Courses:</p>
                            <div className="courses-tags">{formData.courses.map(c => <span key={c} className="course-tag">{c}</span>)}</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {submitted && (
                    <div className="success-message">
                      <CheckCircle size={20} />
                      <span>Submitted successfully! Redirecting...</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="navigation-buttons">
            <button type="button" onClick={prevStep} disabled={currentStep === 1 || loading} className="nav-button secondary">
              <ArrowLeft size={18} /> Back
            </button>
            {((currentStep === 4 && !isAdult) || (currentStep === 5 && isAdult)) ? (
              <button type="button" onClick={handleSubmit} disabled={loading || submitted} className="nav-button primary">
                {loading ? 'Submitting...' : 'Submit Enrollment'} <Check size={18} />
              </button>
            ) : (
              <button type="button" onClick={nextStep} className="nav-button primary">
                Next <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HolidayTraining;
