import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      padding: '3rem 0 1rem',
      marginTop: '4rem',
      borderTop: '3px solid var(--primary-color)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Section */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '1rem'
            }}>
              <GraduationCap size={32} color="var(--primary-color)" />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--text-secondary)'
              }}>
                Gep Protech Academic
              </h3>
            </div>
            <p style={{ marginBottom: '1.5rem', opacity: 0.8, lineHeight: '1.6' }}>
              Empowering individuals with practical skills for the modern workforce through 
              comprehensive vocational training and career development programs.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <div 
                  key={index}
                  style={{
                    background: 'var(--card-bg)',
                    padding: '10px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Icon size={20} color="var(--primary-color)" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontSize: '1.2rem', 
              marginBottom: '1.5rem', 
              color: 'var(--text-secondary)',
              fontWeight: '600'
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {['Home', 'About', 'Courses', 'Tutors', 'Gallery', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    opacity: 0.8,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 style={{ 
              fontSize: '1.2rem', 
              marginBottom: '1.5rem', 
              color: 'var(--text-secondary)',
              fontWeight: '600'
            }}>
              Popular Courses
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {['Web Development', 'Data Analysis', 'Graphic Design', 'Computer Studies', 'Mobile Development'].map((course) => (
                <span key={course} style={{ opacity: 0.8 }}>
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ 
              fontSize: '1.2rem', 
              marginBottom: '1.5rem', 
              color: 'var(--text-secondary)',
              fontWeight: '600'
            }}>
              Contact Info
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} color="var(--primary-color)" />
                <span style={{ opacity: 0.8 }}> Bambili, Bamenda </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="var(--primary-color)" />
                <span style={{ opacity: 0.8 }}>+237 674 386 778</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="var(--primary-color)" />
                <span style={{ opacity: 0.8 }}>info@gepprotech.cm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '2rem',
          textAlign: 'center',
          opacity: 0.7
        }}>
          <p>&copy; {new Date().getFullYear()} Gep Protech Academic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;