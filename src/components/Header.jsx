import React, { useState } from 'react';
import { Moon, Sun, Menu, X, GraduationCap } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import Logo from '../assets/Images/Logo.jpeg'; // Adjust the path as necessary

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['Home', 'About', 'Courses', 'Tutors', 'Gallery','Achievements', 'Contact'];

  return (
    <header style={{
      background: 'var(--bg-secondary)',
      padding: '1rem 0',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="container">
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <img src={Logo} alt="Not found" size={32} color="var(--primary-color)"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover'
              }} />
            {/* <GraduationCap size={32} color="var(--primary-color)" /> */}
            <h1 style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(1.5rem, 5vw, 2.0rem)',
              fontWeight: 'bold'
            }}>
              Gep Protech <br /> Academy
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }} className="mobile-hidden">
            <nav style={{ display: 'flex', gap: '2rem' }}>
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'color 0.3s ease',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  position: 'relative'
                }}>
                  {item}
                </a>
              ))}
            </nav>
            
            <button onClick={toggleTheme} style={{
              background: 'var(--card-bg)',
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}>
              {isDark ? <Sun size={20} color="var(--primary-color)" /> : <Moon size={20} color="var(--primary-color)" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div style={{ display: 'none' }} className="mobile-menu">
            <button onClick={toggleTheme} style={{
              background: 'var(--card-bg)',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              marginRight: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {isDark ? <Sun size={18} color="var(--primary-color)" /> : <Moon size={18} color="var(--primary-color)" />}
            </button>
            
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{
              background: 'var(--card-bg)',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: 'var(--bg-secondary)',
            padding: '1rem',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
            borderTop: '1px solid var(--border-color)'
          }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {navItems.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontWeight: '500',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--border-color)',
                    fontSize: '1.1rem',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-hidden { display: none !important; }
          .mobile-menu { display: flex !important; align-items: center; }
        }
        
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;