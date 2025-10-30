import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, FileText, ArrowLeft, Download, Play, Image, File, Video, Archive, ExternalLink } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

const BlogPost = () => {
  const { id } = useParams();
  const { getPostById } = useBlog();
  const post = getPostById(id);
  const [activeVideo, setActiveVideo] = useState(null);

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

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return <FileText size={24} />;
      case 'video':
        return <Play size={24} />;
      case 'image':
        return <Image size={24} />;
      case 'archive':
        return <Archive size={24} />;
      default:
        return <File size={24} />;
    }
  };

  const getFileTypeColor = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return '#FF6B6B';
      case 'video':
        return '#4ECDC4';
      case 'image':
        return '#45B7D1';
      case 'archive':
        return '#96CEB4';
      default:
        return '#FFEAA7';
    }
  };

  const handleFileClick = (file) => {
    if (file.type === 'video') {
      setActiveVideo(file.url);
    } else if (file.type === 'image') {
      window.open(file.url, '_blank');
    } else {
      // For other file types, simulate download
      window.open(file.url || '#', '_blank');
    }
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
            margin: '0 auto',
            background: 'var(--card-bg)',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '2px solid var(--border-color)'
          }}
        >
          {/* Featured Image */}
          <div style={{
            height: '400px',
            background: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%), url(${post.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '2rem',
              left: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <span style={{
                background: 'var(--primary-color)',
                color: 'white',
                padding: '0.6rem 1.2rem',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '3rem' }}>
            {/* Post Header */}
            <header style={{ marginBottom: '2.5rem' }}>
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
                background: 'var(--bg-primary)',
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

            {/* Video Player Modal */}
            {activeVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000,
                  padding: '2rem'
                }}
                onClick={() => setActiveVideo(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    position: 'relative',
                    maxWidth: '800px',
                    width: '100%',
                    background: 'black',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setActiveVideo(null)}
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
                    ×
                  </button>
                  <video
                    controls
                    autoPlay
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  >
                    <source src={activeVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              </motion.div>
            )}

            {/* Attached Files Section */}
            {post.files && post.files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  background: 'var(--bg-primary)',
                  padding: '2.5rem',
                  borderRadius: '15px',
                  border: '2px solid var(--border-color)',
                  marginBottom: '3rem'
                }}
              >
                <h3 style={{
                  fontSize: '1.8rem',
                  marginBottom: '2rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <FileText size={28} />
                  Attached Files ({post.files.length})
                </h3>
                
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {post.files.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1.5rem',
                        background: 'var(--card-bg)',
                        borderRadius: '12px',
                        border: '2px solid var(--border-color)',
                        cursor: file.type === 'video' || file.type === 'image' ? 'pointer' : 'default',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      whileHover={{ 
                        transform: 'translateY(-3px)',
                        borderColor: getFileTypeColor(file.type),
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                      }}
                      onClick={() => handleFileClick(file)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '60px',
                          height: '60px',
                          borderRadius: '12px',
                          background: getFileTypeColor(file.type),
                          color: 'white',
                          flexShrink: 0
                        }}>
                          {getFileIcon(file.type)}
                        </div>
                        
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: 'var(--text-secondary)',
                            marginBottom: '0.3rem',
                            wordBreak: 'break-word'
                          }}>
                            {file.name}
                          </h4>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            fontSize: '0.9rem',
                            color: 'var(--text-primary)',
                            opacity: 0.7
                          }}>
                            <span style={{ textTransform: 'uppercase', fontWeight: '500' }}>
                              {file.type}
                            </span>
                            <span>•</span>
                            <span>{file.size}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {file.type === 'video' && (
                          <button
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              background: 'var(--primary-color)',
                              color: 'white',
                              border: 'none',
                              padding: '0.8rem 1.2rem',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontWeight: '500',
                              transition: 'all 0.3s ease'
                            }}
                            whileHover={{ transform: 'scale(1.05)' }}
                          >
                            <Play size={18} />
                            Play
                          </button>
                        )}
                        
                        <button
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border-color)',
                            padding: '0.8rem 1.2rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                          }}
                          whileHover={{ 
                            background: 'var(--primary-color)',
                            color: 'white'
                          }}
                        >
                          <Download size={18} />
                          Download
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                textAlign: 'center',
                padding: '3rem',
                background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
                borderRadius: '15px',
                color: 'white'
              }}
            >
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '1rem'
              }}>
                Interested in Our Programs?
              </h3>
              <p style={{
                marginBottom: '2rem',
                fontSize: '1.1rem',
                opacity: 0.9
              }}>
                Explore our courses and start your journey in technology today.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link 
                  to="" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'white',
                    color: 'var(--primary-color)',
                    padding: '1rem 2rem',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ transform: 'translateY(-2px)' }}
                >
                  View Courses
                  <ExternalLink size={18} />
                </Link>
                <Link 
                  to="/contact" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'transparent',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    border: '2px solid white',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ 
                    background: 'white',
                    color: 'var(--primary-color)'
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default BlogPost;