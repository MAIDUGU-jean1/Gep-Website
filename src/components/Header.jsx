import React, { useState } from 'react';
import { Moon, Sun, Menu, Bell, X, GraduationCap, WheatIcon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import Logo from '../assets/Images/logo1.png'; // Adjust the path as necessary
import { style } from 'framer-motion/client';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['Home', 'About', 'Courses', 'Tutors', 'Gallery','Achievements', 'Contact','Enroll'];

  return (
    <header style={{
      background: 'var(--bg-secondary)',
      padding: '0.5rem 0',
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
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {/* Logo and Title Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            justifyContent: 'center',
            width: '100%'
          }}>
            <img src={Logo} alt="Gep Protech Academy" 
              style={{
                width: '60px', // Reduced size
                height: '60px', // Reduced size
                borderRadius: '50%',
                objectFit: 'cover'
              }} />
            <h1 style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 'bold',
              whiteSpace: 'nowrap' // Prevent line break
            }}>
              Gep Protech Academy <br/>
            
        <a href='http://www.student.gepprotech.com'
          target='_blank'
            style={{textDecoration:'none'}}
          >
          <button
              style={{
              background: 'var(--primary)',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              marginLeft: '1rem',
              // fontSize: '1.5rem',
              color: isDark ? 'white' : 'black',
              }}
            >
              GeP Student
          </button>
          
        </a>
          <a href='#'
          target='_blank'
            style={{textDecoration:'none'}}
          >
          <button
              style={{
              background: 'var(--primary)',
              border: 'none',
              cursor: 'pointer',
              // padding: '8px',
              // borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              marginLeft: '1rem',
              // fontSize: '1.5rem',
              color: isDark ? 'white' : 'black',
              }}
            >
              GeP E-Learning
          </button>
          
        </a>
        
            </h1>
          </div>
          
          {/* Desktop Navigation - Now below the logo/title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            justifyContent: 'center'
          }} className="mobile-hidden">
            <nav style={{ 
              display: 'flex', 
              gap: '2rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {navItems.map((item) => (
                <a key={item} href={`/#${item.toLowerCase()}`} style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'color 0.3s ease',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  position: 'relative',
                  whiteSpace: 'nowrap'
                }}>
                  {item}
                </a>
              ))}
            </nav>
            
            <button onClick={toggleTheme} style={{
              background: 'var(--card-bg)',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              marginLeft: '1rem'
            }}>
              {isDark ? <Sun size={18} color="var(--primary-color)" /> : <Moon size={18} color="var(--primary-color)" />}
            </button>

            <button style={{
              background: 'var(--card-bg)',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              marginLeft: '1rem',
            }}>
              <a href='/blog'>
                <Bell size={18} color="var(--primary-color)" />
              </a>
              <span style={{
                  width:"8px",
                  height:"8px",
                  borderRadius:'10px',
                  backgroundColor:'red',
                  position:'relative',
                  right:'8px',
                  bottom:'2px'
                }}>
                  
                </span>
            </button>
              <a href="#enroll">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="green">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.418"/>
                </svg>  
              </a>
          </div>

          {/* Mobile Menu Button */}
          <div style={{ 
            display: 'none',
            position: 'absolute',
            right: '1rem',
            top: '1rem'
          }} className="mobile-menu">

            <button style={{
              background: 'var(--card-bg)',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              // marginBottom: '3rem',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              marginLeft: '10px', // put the vlaue in pixels
              marginTop: '2.5rem'
            }}>
              <a href='/blog'>
                <Bell size={18} color="var(--primary-color)" />
              </a>
              <span style={{
                width:"8px",
                height:"8px",
                borderRadius:'10px',
                backgroundColor:'red',
                position:'relative',
                right:'8px',
                bottom:'2px'
              }}>
                
              </span>
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
              <button onClick={toggleTheme} style={{
              background: 'var(--card-bg)',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              marginRight: '19rem',
          
            }}>
              {isDark ? <Sun size={18} color="var(--primary-color)" /> : <Moon size={18} color="var(--primary-color)" />}
            </button>
            </nav>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-hidden { display: none !important; }
          .mobile-menu { display: flex !important; align-items: center; }
          
          /* Adjust header padding for mobile */
          header {
            padding: 0.75rem 0 !important;
          }
          
          /* Center the logo/title on mobile */
          nav > div:first-child {
            justify-content: center;
            padding: 0.5rem 0;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }

        /* Hover effects for nav items */
        a:hover {
          color: var(--primary-color) !important;
        }
      `}</style>
    </header>
  );
};

export default Header;