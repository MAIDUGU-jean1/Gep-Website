import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Play, Image as ImageIcon } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { posts, loading } = useBlog();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (posts.length > 0) {
      const timer = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(timer);
    }
  }, [currentSlide, posts.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div style={{
        padding: 'clamp(6rem, 10vw, 10rem) 0 4rem 0',
        background: 'var(--bg-primary)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="container">
          <div style={{ 
            textAlign: 'center',
            color: 'var(--text-primary)',
            fontSize: '1.2rem'
          }}>
            Loading latest updates...
          </div>
        </div>
      </div>
    );
  }

  const sliderVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section style={{
      padding: 'clamp(6rem, 10vw, 10rem) 0 4rem 0',
      background: 'var(--bg-primary)',
      minHeight: '100vh'
    }}>
      <div className="container">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <Link 
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              marginBottom: '2rem',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ 
              background: 'var(--primary-color)',
              color: 'white'
            }}
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ textAlign: 'center' }}
          >
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: 'var(--text-secondary)',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Latest Updates
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-primary)',
              opacity: 0.8,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Stay informed with the latest news, announcements, and developments from Gep Protech Academy
            </p>
          </motion.div>
        </motion.div>

        {/* Main Slider - Shows ALL Posts */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              position: 'relative',
              maxWidth: '1200px',
              margin: '0 auto 4rem auto',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              height: '600px'
            }}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%), url(${posts[currentSlide]?.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '3rem'
                }}
              >
                <div style={{
                  color: 'white',
                  maxWidth: '600px',
                  textAlign: 'left'
                }}>
                  <span style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    padding: '0.5rem 1.2rem',
                    borderRadius: '25px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '1rem',
                    display: 'inline-block'
                  }}>
                    {posts[currentSlide]?.category}
                  </span>
                  
                  <h2 style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                    marginBottom: '1rem',
                    lineHeight: '1.2',
                    fontWeight: '700'
                  }}>
                    {posts[currentSlide]?.title}
                  </h2>
                  
                  <p style={{
                    fontSize: '1.1rem',
                    marginBottom: '1.5rem',
                    opacity: 0.9,
                    lineHeight: '1.6'
                  }}>
                    {posts[currentSlide]?.excerpt}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <User size={18} />
                      <span>{posts[currentSlide]?.author}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={18} />
                      <span>{new Date(posts[currentSlide]?.date).toLocaleDateString()}</span>
                    </div>
                    
                    {/* Show media counts */}
                    {posts[currentSlide]?.files && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {posts[currentSlide].files.filter(f => f.type === 'video').length > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Play size={16} />
                            <span>{posts[currentSlide].files.filter(f => f.type === 'video').length} video(s)</span>
                          </div>
                        )}
                        {posts[currentSlide].files.filter(f => f.type === 'image').length > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ImageIcon size={16} />
                            <span>{posts[currentSlide].files.filter(f => f.type === 'image').length} image(s)</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <Link 
                      to={`/blog/${posts[currentSlide]?.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'var(--primary-color)',
                        color: 'white',
                        padding: '1rem 2rem',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      whileHover={{ 
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                      }}
                    >
                      View Gallery & Details
                      <ArrowRight size={18} />
                    </Link>
                    
                    <span style={{
                      fontSize: '0.9rem',
                      opacity: 0.8
                    }}>
                      {currentSlide + 1} / {posts.length}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              style={{
                position: 'absolute',
                top: '50%',
                left: '20px',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} color="var(--text-secondary)" />
            </button>
            
            <button
              onClick={nextSlide}
              style={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} color="var(--text-secondary)" />
            </button>

            {/* Dots Indicator */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '10px',
              zIndex: 10
            }}>
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: index === currentSlide ? 'var(--primary-color)' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {posts.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: 'var(--text-primary)'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>📝</div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '1rem',
              color: 'var(--text-secondary)'
            }}>
              No updates yet
            </h3>
            <p style={{ opacity: 0.7 }}>
              Check back later for the latest news and announcements.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;