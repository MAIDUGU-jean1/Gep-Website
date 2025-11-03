import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Play, Image as ImageIcon, File } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';
import './css/Blog.css';
import { formatDate } from '../utils/dateFormatter';

const Blog = () => {
  const { posts, loading } = useBlog();
  const [currentFileSlides, setCurrentFileSlides] = useState({});

  const fileUrl = import.meta.env.VITE_FILE_API_URL;


  // Initialize and manage file slides for each post
  useEffect(() => {
    if (posts.length > 0) {
      const initialSlides = {};
      posts.forEach((post, index) => {
        if (post.files && post.files.length > 0) {
          initialSlides[post.id] = 0;
        }
      });
      setCurrentFileSlides(initialSlides);
    }
  }, [posts]);

  // Auto-slide functionality for each post's files
  useEffect(() => {
    if (Object.keys(currentFileSlides).length > 0) {
      const timers = posts.map(post => {
        if (post.files && post.files.length > 1) {
          return setInterval(() => {
            setCurrentFileSlides(prev => ({
              ...prev,
              [post.id]: (prev[post.id] + 1) % post.files.length
            }));
          }, 5000); // Change file every 5 seconds
        }
        return null;
      });

      return () => timers.forEach(timer => timer && clearInterval(timer));
    }
  }, [currentFileSlides, posts]);

  const nextFile = (postId, fileCount) => {
    setCurrentFileSlides(prev => ({
      ...prev,
      [postId]: (prev[postId] + 1) % fileCount
    }));
  };

  const prevFile = (postId, fileCount) => {
    setCurrentFileSlides(prev => ({
      ...prev,
      [postId]: (prev[postId] - 1 + fileCount) % fileCount
    }));
  };

  const goToFile = (postId, index) => {
    setCurrentFileSlides(prev => ({
      ...prev,
      [postId]: index
    }));
  };

  if (loading) {
    return (
      <div className="blog-loading">
        <div className="container">
          <div className="blog-loading-text">
            Loading latest updates...
          </div>
        </div>
      </div>
    );
  }

  const fileVariants = {
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
    <section className="blog-section">
      <div className="container">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="blog-header"
        >
          <Link 
            to="/"
            className="blog-back-button"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="blog-title-section"
          >
            <h1 className="blog-main-title">
              Latest Updates
            </h1>
            <p className="blog-subtitle">
              Stay informed with the latest news, announcements, and developments from Gep Protech Academy
            </p>
          </motion.div>
        </motion.div>

        {/* Posts Grid */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="blog-posts-grid"
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: index * 0.1 }}
                className="blog-post-card"
              >
                {/* File Slider Section */}
                {post.files && post.files.length > 0 ? (
                  <div className="blog-file-slider">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentFileSlides[post.id] || 0}
                        variants={fileVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 }
                        }}
                        className="blog-slide-container"
                      >
                        {['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'tiff'].includes(
                          post.files[currentFileSlides[post.id]]?.filetype?.toLowerCase()
                        ) ? (
                          <img 
                            src={`${fileUrl}/${post.files[currentFileSlides[post.id]]?.filepath}`} 
                            alt={post.title}
                            className="blog-slide-image"
                          />
                        ) : ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v', '3gp'].includes(
                          post.files[currentFileSlides[post.id]]?.filetype?.toLowerCase()
                        ) ? (
                          <video 
                            controls
                            className="blog-slide-video"
                          >
                            <source 
                              src={`${fileUrl}/${post.files[currentFileSlides[post.id]]?.filepath}`} 
                              type={`video/${post.files[currentFileSlides[post.id]]?.filetype}`}
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <div className="blog-unknown-placeholder">
                            <File size={48} />
                            <span>Unsupported File Type</span>
                            <small>{post.files[currentFileSlides[post.id]]?.filetype}</small>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* File Navigation Arrows */}
                    {post.files.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevFile(post.id, post.files.length);
                          }}
                          className="blog-slide-arrow blog-slide-arrow-left"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextFile(post.id, post.files.length);
                          }}
                          className="blog-slide-arrow blog-slide-arrow-right"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}

                    {/* File Dots Indicator */}
                    {post.files.length > 1 && (
                      <div className="blog-slide-dots">
                        {post.files.map((_, fileIndex) => (
                          <button
                            key={fileIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              goToFile(post.id, fileIndex);
                            }}
                            className={`blog-slide-dot ${fileIndex === currentFileSlides[post.id] ? 'blog-slide-dot-active' : ''}`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Category Badge */}
                    <span className="blog-category-badge">
                      {post.category}
                    </span>
                  </div>
                ) : (
                  // Fallback when no files
                  <div className="blog-no-media">
                    No Media
                  </div>
                )}

                {/* Content Section - Separate from images */}
                <div className="blog-post-content">
                  <h3 className="blog-post-title">
                    {post.title}
                  </h3>
                  
                  <p className="blog-post-excerpt">
                    {post.excerpt}
                  </p>
                  
                  <div className="blog-post-meta">
                    <div className="blog-meta-info">
                      <div className="blog-meta-item">
                        <User size={16} />
                        <span>{post.admin.first_name} {post.admin.last_name}</span>
                      </div>
                      <div className="blog-meta-item">
                        <Calendar size={16} />
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                    </div>

                    {/* Media Count Badges */}
                    {post.files && (
                      <div className="blog-media-counts">
                        {post.files.filter(f => f.type === 'video').length > 0 && (
                          <div className="blog-media-badge">
                            <Play size={12} />
                            <span>{post.files.filter(f => f.type === 'video').length}</span>
                          </div>
                        )}
                        {post.files.filter(f => f.type === 'image').length > 0 && (
                          <div className="blog-media-badge">
                            <ImageIcon size={12} />
                            <span>{post.files.filter(f => f.type === 'image').length}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <Link 
                    to={`/blog/${post.id}`}
                    className="blog-details-button"
                  >
                    View Details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {posts.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="blog-empty-state"
          >
            <div className="blog-empty-icon">📝</div>
            <h3 className="blog-empty-title">
              No updates yet
            </h3>
            <p className="blog-empty-text">
              Check back later for the latest news and announcements.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;