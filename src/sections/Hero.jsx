import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Users, Award, Clock, X } from 'lucide-react';
import advert from '../../src/assets/Videos/advert.mp4'
import Impression from '../../src/assets/Images/impression.jpeg'

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => {
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <section id="home" className='home' style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--primary-color) 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      paddingTop: '80px',
      marginTop: '5rem',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
          width: 'inherit'
        }} className="hero-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ order: 2 }}
            className="mobile-order-2"
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              <div className='text' style={{
                background: 'var(--primary-color)',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'inline-block',
                // marginTop: '2rem'
              }}>
                Professional Training
              </div>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 'bold',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: 'var(--text-secondary)'
            }} className="mobile-center">
              Transform Your Career with{' '}
              <span style={{ color: 'var(--primary-color)' }}>Gep Protech</span>
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
              lineHeight: '1.6',
              marginBottom: '2rem',
              opacity: 0.9,
              maxWidth: '600px'
            }}>
              Master in-demand skills with our comprehensive vocational training programs.
              Get hands-on experience and launch your career in tech, design, and business.
            </p>

            <div className='enrol-grid' style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '3rem'
            }}>
              <motion.a
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none',
                  // color:'var(--text-secondary)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href='/enroll'
              // onClick={openVideo}
              >
                {/* <Play size={20} /> */}
                Enroll Now
              </motion.a>
              <button className="btn-primary">
                <a href="#courses" style={{ color: 'white', textDecoration: 'none' }}>
                  Explore Courses
                </a>
              </button>
              <motion.a
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none',
                  margin: '0',
                }}
                whileHover={{ scale: 1.05, color: 'white' }}
                whileTap={{ scale: 0.95 }}
                href='/blog'
              // onClick={openVideo}
              >
                {/* <Play size={20} /> */}
                What's New
              </motion.a>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
            }}>
              {[
                { icon: Users, number: '2K+', label: 'Students Trained' },
                { icon: Award, number: '50+', label: 'Certified Courses' },
                { icon: Clock, number: '98%', label: 'Success Rate' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  style={{ textAlign: 'center' }}
                >
                  <item.icon
                    size={32}
                    style={{
                      marginBottom: '0.5rem',
                      color: 'var(--primary-color)'
                    }}
                    className="stats-icon"
                  />
                  <div
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      fontWeight: 'bold',
                      color: 'var(--text-secondary)'
                    }}
                    className="stats-number"
                  >
                    {item.number}
                  </div>
                  <div
                    style={{
                      fontSize: '0.9rem',
                      opacity: 0.8
                    }}
                    className="stats-label"
                  >
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'var(--card-bg)',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '2px solid var(--primary-color)',
              order: 1,
              position: 'relative',
              overflow: 'hidden'
            }}
            className="mobile-order-1"
          >
            {/* Video Thumbnail with Image */}
            <div
              style={{
                width: '100%',
                height: '400px',
                borderRadius: '15px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={openVideo}
              className="video-thumbnail"
            >
              {/* Background Image */}
              <img
                src={Impression}
                alt="Gep Protech Student Success Stories"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
              />

              {/* Dark Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.3s ease'
              }}>
                {/* Play Button */}
                <motion.div
                  style={{
                    background: 'rgba(218, 165, 32, 0.9)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Play size={32} fill="white" />
                </motion.div>
              </div>

              {/* Video Title */}
              <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '0',
                width: '100%',
                textAlign: 'center',
                color: 'white',
                padding: '0 1rem'
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>
                  Student Success Stories
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  opacity: 0.9,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}>
                  Click to watch inspiring stories from our graduates
                </p>
              </div>

              {/* Play Indicator */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '0.8rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Play size={12} />
                VIDEO
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              padding: '1rem'
            }}
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                width: 'clamp(300px, 90vw, 800px)',
                maxHeight: '90vh',
                background: 'var(--card-bg)',
                borderRadius: '15px',
                overflow: 'hidden',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeVideo}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0,0,0,0.7)',
                  border: 'none',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  zIndex: 2001,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={20} />
              </button>

              {/* Video Player */}
              <div style={{
                width: '100%',
                height: '0',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                position: 'relative'
              }}>
                <video
                  controls
                  autoPlay
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                >
                  <source
                    src={advert}
                    type="video/mp4"
                  />
                  <source
                    src={advert}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Info */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '600'
                }}>
                  Welcome to Gep Protech Academic
                </h3>
                <p style={{
                  opacity: 0.8,
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  Discover how our vocational training programs can transform your career.
                  Watch this introduction to learn about our teaching methodology,
                  state-of-the-art facilities, and student success stories.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
      
        @media (max-width: 990px) {
      .home {
        margin-top: 9rem !important; /* Higher margin for mobile */
      }
    }



        @media (min-width: 769px) {
          .hero-grid {
            // margin-top: 3rem
            grid-template-columns: 1fr 1fr !important;
          }
          .enrol-grid{
            flex-wrap: nowrap !important;
          }
          .mobile-center {
            text-align: left !important;
          }

          .home{
            margin-top: 10rem 
          }


          
        }
          }
          .mobile-order-1 { order: 2 !important; }
          .mobile-order-2 { order: 1 !important; }
        }

        /* Video hover effects */
        .video-thumbnail:hover img {
          transform: scale(1.05);
        }
        
        .video-thumbnail:hover > div:first-child {
          background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6));
        }

        /* Dark mode styles for stats */
        [data-theme="dark"] .stats-icon {
          color: white !important;
        }

        [data-theme="dark"] .stats-number {
          color: white !important;
        }

        [data-theme="dark"] .stats-label {
          color: rgba(255, 255, 255, 0.8) !important;
        }

        /* Light mode styles for stats */
        [data-theme="light"] .stats-icon {
          color: var(--primary-color) !important;
        }

        [data-theme="light"] .stats-number {
          color: var(--text-secondary) !important;
        }

        [data-theme="light"] .stats-label {
          color: rgba(0, 0, 0, 0.8) !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;