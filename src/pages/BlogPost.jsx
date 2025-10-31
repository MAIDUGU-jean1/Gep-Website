import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ChevronLeft, ChevronRight, Play, X, Image as ImageIcon } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

const BlogPost = () => {
  const { id } = useParams();
  const { getPostById } = useBlog();
  const post = getPostById(id);
  const [activeMedia, setActiveMedia] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [mediaDirection, setMediaDirection] = useState(0);

  if (!post) {
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
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ 
              color: 'var(--text-secondary)', 
              marginBottom: '1rem',
              fontSize: '2rem'
            }}>
              Post Not Found
            </h2>
            <p style={{ 
              color: 'var(--text-primary)', 
              marginBottom: '2rem',
              fontSize: '1.1rem'
            }}>
              The blog post you're looking for doesn't exist or has been moved.
            </p>
            <Link 
              to="/blog" 
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
              whileHover={{ transform: 'translateY(-2px)' }}
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter only images and videos
  const mediaFiles = post.files?.filter(file => file.type === 'image' || file.type === 'video') || [];

  const nextMedia = () => {
    setMediaDirection(1);
    setMediaIndex((prev) => (prev === mediaFiles.length - 1 ? 0 : prev + 1));
  };

  const prevMedia = () => {
    setMediaDirection(-1);
    setMediaIndex((prev) => (prev === 0 ? mediaFiles.length - 1 : prev - 1));
  };

  const openMedia = (index) => {
    setMediaIndex(index);
    setActiveMedia(mediaFiles[index]);
  };

  const mediaVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
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
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <Link 
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '10px',
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ 
              background: 'var(--primary-color)',
              color: 'white',
              transform: 'translateX(-5px)'
            }}
          >
            <ArrowLeft size={20} />
            Back to All Posts
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          {/* Post Header */}
          <header style={{ marginBottom: '3rem' }}>
            <span style={{
              background: 'var(--primary-color)',
              color: 'white',
              padding: '0.6rem 1.2rem',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '1.5rem',
              display: 'inline-block'
            }}>
              {post.category}
            </span>
            
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
              fontWeight: '700'
            }}>
              {post.title}
            </h1>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              padding: '1.5rem',
              background: 'var(--card-bg)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <User size={20} />
                <span style={{ fontWeight: '600' }}>By {post.author}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Calendar size={20} />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </header>

          {/* Media Gallery Slider */}
          {mediaFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                position: 'relative',
                marginBottom: '3rem',
                borderRadius: '15px',
                overflow: 'hidden',
                background: 'var(--card-bg)',
                border: '2px solid var(--border-color)',
                height: '400px'
              }}
            >
              <AnimatePresence custom={mediaDirection} mode="wait">
                <motion.div
                  key={mediaIndex}
                  custom={mediaDirection}
                  variants={mediaVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  onClick={() => openMedia(mediaIndex)}
                >
                  {mediaFiles[mediaIndex].type === 'video' ? (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%), url(${mediaFiles[mediaIndex].thumbnail || mediaFiles[mediaIndex].url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: '50%',
                        width: '80px',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      whileHover={{ scale: 1.1 }}
                      >
                        <Play size={32} color="var(--primary-color)" />
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={mediaFiles[mediaIndex].url} 
                      alt={mediaFiles[mediaIndex].name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {mediaFiles.length > 1 && (
                <>
                  <button
                    onClick={prevMedia}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '15px',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
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
                    <ChevronLeft size={20} color="var(--text-secondary)" />
                  </button>
                  
                  <button
                    onClick={nextMedia}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '15px',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
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
                    <ChevronRight size={20} color="var(--text-secondary)" />
                  </button>
                </>
              )}

              {/* Media Counter */}
              <div style={{
                position: 'absolute',
                bottom: '15px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                {mediaIndex + 1} / {mediaFiles.length}
              </div>
            </motion.div>
          )}

          {/* Post Content */}
          <div style={{
            color: 'var(--text-primary)',
            lineHeight: '1.8',
            fontSize: '1.1rem',
            marginBottom: '3rem'
          }}>
            {post.content.split('\n\n').map((paragraph, index) => (
              <motion.p 
                key={index} 
                style={{ marginBottom: '1.5rem' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {paragraph.startsWith('## ') ? (
                  <strong style={{
                    display: 'block',
                    fontSize: '1.3rem',
                    color: 'var(--text-secondary)',
                    margin: '2rem 0 1rem 0',
                    fontWeight: '600'
                  }}>
                    {paragraph.replace('## ', '')}
                  </strong>
                ) : (
                  paragraph
                )}
              </motion.p>
            ))}
          </div>

          {/* Media Modal */}
          {activeMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '2rem'
              }}
              onClick={() => setActiveMedia(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  position: 'relative',
                  maxWidth: '90%',
                  maxHeight: '90%',
                  background: 'black',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActiveMedia(null)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    zIndex: 1001
                  }}
                >
                  <X size={20} />
                </button>

                {activeMedia.type === 'video' ? (
                  <video
                    controls
                    autoPlay
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '80vh',
                      display: 'block'
                    }}
                  >
                    <source src={activeMedia.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img 
                    src={activeMedia.url} 
                    alt={activeMedia.name}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '80vh',
                      objectFit: 'contain'
                    }}
                  />
                )}

                {/* Navigation in Modal */}
                {mediaFiles.length > 1 && (
                  <>
                    <button
                      onClick={prevMedia}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '1rem',
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
                        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                        zIndex: 1001
                      }}
                    >
                      <ChevronLeft size={24} color="var(--text-secondary)" />
                    </button>
                    
                    <button
                      onClick={nextMedia}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '1rem',
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
                        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                        zIndex: 1001
                      }}
                    >
                      <ChevronRight size={24} color="var(--text-secondary)" />
                    </button>
                  </>
                )}

                {/* Media Info */}
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  {activeMedia.name} ({mediaIndex + 1}/{mediaFiles.length})
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.article>
      </div>
    </section>
  );
};

export default BlogPost;