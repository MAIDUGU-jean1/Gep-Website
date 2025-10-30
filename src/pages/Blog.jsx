import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, FileText, ArrowLeft, ArrowRight, Play, Image, Download } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { posts, loading } = useBlog();

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return <FileText size={16} />;
      case 'video':
        return <Play size={16} />;
      case 'image':
        return <Image size={16} />;
      default:
        return <FileText size={16} />;
    }
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

        {/* Blog Posts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2.5rem',
          marginTop: '4rem'
        }}>
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                background: 'var(--card-bg)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '2px solid var(--border-color)',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              whileHover={{ 
                y: -8,
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                borderColor: 'var(--primary-color)'
              }}
            >
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                zIndex: 2
              }}>
                <span style={{
                  background: 'var(--primary-color)',
                  color: 'white',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '25px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {post.category}
                </span>
              </div>

              {/* Featured Image */}
              <div style={{
                height: '250px',
                background: `linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%), url(${post.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }} />

              {/* Content */}
              <div style={{ padding: '2rem' }}>
                {/* Meta Information */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  marginBottom: '1.2rem',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={16} />
                    <span style={{ fontWeight: '500' }}>{post.author}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 style={{
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.4',
                  fontWeight: '600'
                }}>
                  {post.title}
                </h3>
                
                {/* Excerpt */}
                <p style={{
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6',
                  opacity: 0.8,
                  fontSize: '1rem'
                }}>
                  {post.excerpt}
                </p>
                
                {/* Files Preview */}
                {post.files && post.files.length > 0 && (
                  <div style={{ 
                    marginBottom: '2rem',
                    background: 'var(--bg-primary)',
                    padding: '1.2rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      fontWeight: '600'
                    }}>
                      <FileText size={18} />
                      <span>Attachments ({post.files.length})</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {post.files.slice(0, 3).map((file, fileIndex) => (
                        <div
                          key={fileIndex}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            padding: '0.8rem',
                            background: 'var(--card-bg)',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            transition: 'all 0.3s ease'
                          }}
                          whileHover={{ 
                            background: 'var(--primary-color)',
                            color: 'white'
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            background: 'var(--bg-primary)',
                            color: 'var(--primary-color)',
                            flexShrink: 0
                          }}>
                            {getFileIcon(file.type)}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontSize: '0.9rem',
                              fontWeight: '500',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {file.name}
                            </div>
                            <div style={{
                              fontSize: '0.75rem',
                              opacity: 0.7,
                              marginTop: '2px'
                            }}>
                              {file.size}
                            </div>
                          </div>
                          <Download size={16} style={{ opacity: 0.6, flexShrink: 0 }} />
                        </div>
                      ))}
                      {post.files.length > 3 && (
                        <div style={{
                          textAlign: 'center',
                          fontSize: '0.8rem',
                          color: 'var(--text-secondary)',
                          padding: '0.5rem',
                          opacity: 0.7
                        }}>
                          +{post.files.length - 3} more files
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Read More Button */}
                <Link 
                  to={`/blog/${post.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  whileHover={{ 
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                  }}
                >
                  Read Full Story
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

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