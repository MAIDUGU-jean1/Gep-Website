import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Home, Info, BookOpen, GraduationCap, Calendar, Users, Image, Award, Phone, MessageCircle, Bell } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import Logo from '../assets/Images/logo1.png';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', icon: <Home size={18} /> },
    { name: 'About', href: '/#about', icon: <Info size={18} /> },
    { name: 'Courses', href: '/#courses', icon: <BookOpen size={18} /> },
    { name: 'Blog', href: '/blog', icon: <GraduationCap size={18} /> },
    { name: 'Events', href: '/events', icon: <Calendar size={18} /> },
    { name: 'Tutors', href: '/#tutors', icon: <Users size={18} /> },
    { name: 'Gallery', href: '/#gallery', icon: <Image size={18} /> },
    { name: 'Achievements', href: '/#achievements', icon: <Award size={18} /> },
    { name: 'Contact', href: '/#contact', icon: <Phone size={18} /> },
  ];

  const headerStyle = {
    background: 'var(--bg-secondary)',
    padding: '0.5rem 0',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(10px)'
  };

  const logoStyle = {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    objectFit: 'cover'
  };

  const buttonStyle = {
    background: 'var(--card-bg)',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  };

  const navLinkStyle = {
    color: 'var(--text-primary)',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
    position: 'relative',
    whiteSpace: 'nowrap'
  };

  return (
    <>
      <header style={headerStyle}>
        <div className="container">
          {/* Main Navigation Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1rem'
          }}>
            {/* Logo and Title */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flex: 1
            }}>
              <img src={Logo} alt="Gep Protech Academy" style={logoStyle} />
              <div>
                <h1 style={{
                  color: 'var(--text-secondary)',
                  fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                  fontWeight: 'bold',
                  lineHeight: '1.2',
                  margin: 0
                }}>
                  Gep Protech Academy
                </h1>

                {/* Quick Access Buttons - Desktop */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginTop: '0.25rem',
                }} className="mobile-hidden">
                  <a href='https://student.gepprotech.com' target='_blank' style={{ textDecoration: 'none' }}>
                    <button style={{
                      background: 'var(--primary)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                      fontSize: '0.8rem',
                      color: isDark ? 'white' : 'black',
                      whiteSpace: 'nowrap'
                    }}>
                      GeP Student
                    </button>
                  </a>
                  <a href='https://internship.gepprotech.com' target='_blank' style={{ textDecoration: 'none' }}>
                    <button style={{
                      background: 'var(--primary)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                      fontSize: '0.8rem',
                      color: isDark ? 'white' : 'black',
                      whiteSpace: 'nowrap'
                    }}>
                      GeP Internship Program
                    </button>
                  </a>
                  <a href='#' target='_blank' style={{ textDecoration: 'none' }}>
                    <button style={{
                      background: 'var(--primary)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                      fontSize: '0.8rem',
                      color: isDark ? 'white' : 'black',
                      whiteSpace: 'nowrap'
                    }}>
                      GeP e-Learning
                    </button>
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Navigation - Center */}
            <nav style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              flex: 2
            }} className="mobile-hidden">
              {navItems.slice(0, 6).map((item) => (
                <a key={item.name} href={item.href} style={navLinkStyle}>
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Action Buttons - Right Side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="mobile-hidden">
              <button onClick={toggleTheme} style={buttonStyle}>
                {isDark ? <Sun size={18} color="var(--primary-color)" /> : <Moon size={18} color="var(--primary-color)" />}
              </button>

              <button style={buttonStyle}>
                <a href='/blog'>
                  <Bell size={18} color="var(--primary-color)" />
                </a>
                <span style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: '10px',
                  backgroundColor: 'red',
                  position: 'relative',
                  right: '8px',
                  bottom: '2px'
                }}></span>
              </button>

              <a href="/enroll" style={{
                ...buttonStyle,
                background: 'linear-gradient(135deg, var(--primary-color), #daa520)',
                borderRadius: '25px',
                padding: '10px 20px',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(218, 165, 32, 0.3)'
              }}>
                Enroll Now
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  ...buttonStyle,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--primary-color), #daa520)',
                  color: 'white'
                }}
              >
                <Menu size={22} />
              </button>
            </div>

            {/* Mobile Menu Button - Right Side */}
            <div style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.5rem'
            }} className="mobile-menu">
              <button onClick={toggleTheme} style={buttonStyle}>
                {isDark ? <Sun size={18} color="var(--primary-color)" /> : <Moon size={18} color="var(--primary-color)" />}
              </button>

              <button style={buttonStyle}>
                <a href='/blog'>
                  <Bell size={18} color="var(--primary-color)" />
                </a>
                <span style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: '10px',
                  backgroundColor: 'red',
                  position: 'relative',
                  right: '8px',
                  bottom: '2px'
                }}></span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  ...buttonStyle,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--primary-color), #daa520)',
                  color: 'white'
                }}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .mobile-hidden { 
              display: none !important; 
            }
            .mobile-menu { 
              display: flex !important; 
            }
          }
          
          @media (min-width: 769px) {
            .mobile-menu { 
              display: none !important; 
            }
          }

          /* Hover effects */
          a:hover {
            color: var(--primary-color) !important;
          }

          button:hover {
            transform: scale(1.05);
          }

          /* Smooth transitions */
          * {
            transition: color 0.3s ease, background-color 0.3s ease;
          }
        `}</style>
      </header>

      {/* Mobile Menu Modal - Slides from Left */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 1100,
                backdropFilter: 'blur(5px)'
              }}
            />

            {/* Modal Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '30%',
                minWidth: '280px',
                maxWidth: '350px',
                height: '100vh',
                background: 'var(--bg-secondary)',
                zIndex: 1200,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '5px 0 30px rgba(0,0,0,0.3)',
                overflow: 'hidden'
              }}
            >
              {/* Modal Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.5rem',
                borderBottom: '1px solid var(--border-color)',
                background: 'linear-gradient(135deg, var(--primary-color), #daa520)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={Logo} alt="Gep Protech" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h2 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>Gep Protech</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', margin: 0 }}>Academy</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Items */}
              <nav style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem 0'
              }}>
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      padding: '1rem 1.5rem',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontWeight: '500',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      borderLeft: '3px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--hover-color)';
                      e.currentTarget.style.borderLeftColor = 'var(--primary-color)';
                      e.currentTarget.style.color = 'var(--primary-color)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderLeftColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                  >
                    <span style={{ color: 'var(--primary-color)' }}>{item.icon}</span>
                    {item.name}
                  </motion.a>
                ))}
              </nav>

              {/* Special Enroll Button */}
              <div style={{
                padding: '1.5rem',
                borderTop: '1px solid var(--border-color)'
              }}>
                <motion.a
                  href="/enroll"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '15px 25px',
                    background: 'linear-gradient(135deg, var(--primary-color), #daa520)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 20px rgba(218, 165, 32, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(218, 165, 32, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(218, 165, 32, 0.4)';
                  }}
                >
                  <GraduationCap size={22} />
                  Enroll Now
                </motion.a>
                <p style={{
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  marginTop: '12px',
                  marginBottom: 0
                }}>
                  {/* Start your tech journey today! */}
                  © 2026 Gep Protech Academic.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button - Bottom Left */}
      <motion.a
        href="https://wa.me/237XXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
          zIndex: 999,
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(37, 211, 102, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)';
        }}
      >
        <MessageCircle size={30} color="white" />
      </motion.a>
    </>
  );
};

export default Header;
