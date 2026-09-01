import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Users,
  Award,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Info,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import advert from '../../src/assets/Videos/advert.mp4';
import Impression from '../../src/assets/Images/impression.jpeg';

// Helper function to clean HTML tags from backend post descriptions
const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

// Helper function to check if a file is an MP4 or valid video file
const isSupportedVideoFile = (file) => {
  if (!file) return false;
  const ext = file.filetype || file.type || '';
  const path = file.filepath || file.url || '';
  const videoExtensions = ['mp4', 'mov', 'avi', 'wmv', 'webm', 'mkv', '3gp'];

  if (videoExtensions.includes(ext.toLowerCase())) return true;
  if (path && videoExtensions.some((e) => path.toLowerCase().endsWith(`.${e}`))) return true;
  return false;
};

const Hero = () => {
  const { posts } = useBlog();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showModalDescription, setShowModalDescription] = useState(false);

  const fileUrl = import.meta.env.VITE_FILE_API_URL || 'http://127.0.0.1:8000';

  // Construct dynamic slides: Default main video + Public Video Posts from backend
  const slides = useMemo(() => {
    const mainSlide = {
      id: 'main-success-story',
      title: 'Student Success Stories',
      description:
        'Discover how our vocational training programs can transform your career. Watch this introduction to learn about our teaching methodology, state-of-the-art facilities, and student success stories.',
      type: 'video',
      videoUrl: advert,
      thumbnail: Impression,
      badge: 'WATCH VIDEO',
      category: 'Featured'
    };

    if (!posts || posts.length === 0) {
      return [mainSlide];
    }

    // Filter public posts from backend API that strictly contain an MP4/video file
    const videoPosts = posts.filter((post) => {
      const isPublic = post.target_type === 'public' || !post.target_type;
      if (!isPublic) return false;

      // Check if post contains at least one video file
      return post.files && post.files.some(isSupportedVideoFile);
    });

    const postSlides = videoPosts.map((post) => {
      const videoFile = post.files.find(isSupportedVideoFile);
      const imageFile = post.files.find((f) =>
        ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(
          f.filetype?.toLowerCase() || ''
        )
      );

      const mediaVideoUrl = `${fileUrl}/${videoFile.filepath}`;
      const mediaImageUrl = imageFile
        ? `${fileUrl}/${imageFile.filepath}`
        : post.image || Impression;

      return {
        id: post.id,
        title: post.title,
        description: stripHtml(post.description || post.excerpt || ''),
        type: 'video',
        videoUrl: mediaVideoUrl,
        thumbnail: mediaImageUrl,
        badge: 'VIDEO POST',
        category: post.category || 'Updates'
      };
    });

    return [mainSlide, ...postSlides];
  }, [posts, fileUrl]);

  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentSlideIndex] || slides[0];

  const openVideo = () => {
    setShowModalDescription(false); // Hide initial text on full popup screen by default
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <section id="home" className="home" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--primary-color) 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      paddingTop: '80px',
      marginTop: '5rem',
      overflow: 'hidden'
    }}>
      {/* Watermark Background Image (Full-Screen Fit) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${Impression})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        opacity: 0.12,
        pointerEvents: 'none',
        zIndex: 1,
        filter: 'grayscale(15%)'
      }} />

      <div className="container" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
          width: 'inherit'
        }} className="hero-grid">
          {/* Left Column: Text & Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ order: 1 }}
            className="hero-text-col"
          >
            <div className="hero-badge-container" style={{
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
                display: 'inline-block'
              }}>
                Professional Training
              </div>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              fontWeight: 'bold',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: 'var(--text-secondary)'
            }} className="mobile-center">
              Transform Your Career with{' '}
              <span style={{ color: 'var(--primary-color)' }}>Gep Protech</span>
            </h1>

            <p style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
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
                  textDecoration: 'none'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href='/enroll'
              >
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
                  margin: '0'
                }}
                whileHover={{ scale: 1.05, color: 'white' }}
                whileTap={{ scale: 0.95 }}
                href='/blog'
              >
                What's New
              </motion.a>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem'
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

          {/* Right Column: Swipable Video / Blog Media Slider */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'var(--card-bg)',
              padding: '1.5rem',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              border: '2px solid var(--primary-color)',
              order: 2,
              position: 'relative',
              overflow: 'hidden'
            }}
            className="hero-video-col"
          >
            {/* Swipable Video/Media Card Container */}
            <div
              style={{
                width: '100%',
                height: '380px',
                borderRadius: '15px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={openVideo}
              className="video-thumbnail"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide.id}
                  src={currentSlide.thumbnail}
                  alt={currentSlide.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                />
              </AnimatePresence>

              {/* Dark Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.7))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.3s ease'
              }}>
                {/* Play Button */}
                <motion.div
                  style={{
                    background: 'rgba(218, 165, 32, 0.95)',
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Play size={32} fill="white" style={{ marginLeft: '4px' }} />
                </motion.div>
              </div>

              {/* Left Arrow Button */}
              {slides.length > 1 && (
                <button
                  onClick={prevSlide}
                  aria-label="Previous video"
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary-color)';
                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  }}
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              {/* Right Arrow Button */}
              {slides.length > 1 && (
                <button
                  onClick={nextSlide}
                  aria-label="Next video"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary-color)';
                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  }}
                >
                  <ChevronRight size={22} />
                </button>
              )}

              {/* Slide Title & Category Overlay */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '0',
                width: '100%',
                textAlign: 'center',
                color: 'white',
                padding: '0 3.5rem'
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  fontWeight: '700',
                  marginBottom: '0.4rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {currentSlide.title}
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  opacity: 0.95,
                  textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                }}>
                  Click to watch video & explore details
                </p>
              </div>

              {/* Type Indicator Badge (Top Right) */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(0,0,0,0.75)',
                color: 'white',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                {currentSlide.type === 'video' ? (
                  <Play size={12} fill="white" />
                ) : (
                  <ImageIcon size={12} />
                )}
                <span>{currentSlide.badge}</span>
              </div>

              {/* Slide Count Indicator (Top Left) */}
              {slides.length > 1 && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(0,0,0,0.65)',
                  color: 'var(--primary-color)',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  border: '1px solid rgba(218,165,32,0.4)'
                }}>
                  {currentSlideIndex + 1} / {slides.length}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Video Modal Popup (Full-Screen Video + Description Toggle Arrow) */}
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
              background: 'rgba(0, 0, 0, 0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              padding: '1rem'
            }}
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              style={{
                width: 'clamp(320px, 92vw, 900px)',
                maxHeight: '92vh',
                background: '#0d1117',
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(218, 165, 32, 0.3)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8)'
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
                  background: 'rgba(0,0,0,0.75)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  zIndex: 2001,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <X size={20} />
              </button>

              {/* Full Screen Video / Media Player */}
              <div style={{
                width: '100%',
                height: '0',
                paddingBottom: showModalDescription ? '48%' : '56.25%',
                position: 'relative',
                background: '#000',
                transition: 'padding-bottom 0.3s ease'
              }}>
                {currentSlide.type === 'video' ? (
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
                    <source src={currentSlide.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={currentSlide.thumbnail}
                    alt={currentSlide.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                )}
              </div>

              {/* Interactive Arrow Toggle for Description */}
              <div style={{
                background: '#161b22',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '0.95rem'
                }}>
                  <span style={{
                    color: 'var(--primary-color)',
                    background: 'rgba(218, 165, 32, 0.15)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase'
                  }}>
                    {currentSlide.badge}
                  </span>
                  <span style={{
                    maxWidth: '300px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {currentSlide.title}
                  </span>
                </div>

                <button
                  onClick={() => setShowModalDescription(!showModalDescription)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(218, 165, 32, 0.2)',
                    border: '1px solid rgba(218, 165, 32, 0.4)',
                    color: 'var(--primary-color)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{showModalDescription ? 'Hide Description' : 'View Description'}</span>
                  {showModalDescription ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {/* Collapsible Description Box */}
              <AnimatePresence>
                {showModalDescription && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: '#0d1117',
                      padding: '1.2rem 1.5rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      maxHeight: '180px',
                      overflowY: 'auto'
                    }}
                  >
                    <h4 style={{
                      color: 'var(--primary-color)',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      marginBottom: '0.5rem'
                    }}>
                      {currentSlide.title}
                    </h4>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.88)',
                      lineHeight: '1.6',
                      fontSize: '0.92rem',
                      margin: 0
                    }}>
                      {currentSlide.description || 'No detailed description available for this post.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 990px) {
          .home {
            margin-top: 3.5rem !important;
            padding-top: 115px !important;
            padding-bottom: 60px !important;
          }
          .hero-text-col {
            margin-top: 1rem !important;
          }
          .hero-badge-container {
            justify-content: center !important;
          }
          .mobile-center {
            text-align: center !important;
          }
        }

        @media (min-width: 769px) {
          .hero-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
          .enrol-grid {
            flex-wrap: nowrap !important;
          }
          .mobile-center {
            text-align: left !important;
          }
          .home {
            margin-top: 4rem !important;
            padding-top: 100px !important;
          }
        }

        /* Video hover effects */
        .video-thumbnail:hover img {
          transform: scale(1.05);
        }
        
        .video-thumbnail:hover > div:first-child {
          background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7));
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