import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
  try {
    // Simulate fetching posts from an API
    const response = await axios.get('http://127.0.0.1:8000/api/blog');
    console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
} ;

  useEffect(() => {
    // Sample blog posts with different file types
    const samplePosts = [
      {
        id: 1,
        title: "New AI and Machine Learning Courses Launched",
        excerpt: "Discover our latest AI and Machine Learning specialization tracks designed for the future of technology.",
        content: `We are thrilled to announce the launch of our new AI and Machine Learning specialization tracks! These comprehensive courses are designed to equip students with cutting-edge skills in artificial intelligence.

## What's Included:
- Hands-on projects with real-world applications
- Industry-relevant curriculum developed with tech leaders
- Expert instructors with years of industry experience
- Career support and job placement assistance

Our new courses cover everything from fundamental concepts to advanced AI implementations, ensuring our students are prepared for the rapidly evolving tech landscape.`,
        author: "Admin Team",
        date: "2024-01-15",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        category: "Courses",
        files: [
          { 
            name: "AI Course Brochure.pdf", 
            type: "pdf", 
            url: "#",
            size: "2.4 MB"
          },
          { 
            name: "Course Curriculum Overview.png", 
            type: "image", 
            url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            size: "1.2 MB"
          },
          { 
            name: "Welcome Video.mp4", 
            type: "video", 
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            size: "15.7 MB",
            thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        id: 2,
        title: "Student Hackathon 2024 - Register Now!",
        excerpt: "Join our annual hackathon and showcase your programming skills for amazing prizes and opportunities.",
        content: `Get ready for the most exciting event of the year! Our annual Student Hackathon 2024 is now open for registration.

## Event Details:
- **Date:** February 15-16, 2024
- **Theme:** Sustainable Technology Solutions
- **Prizes:** Over $10,000 in cash prizes + internship opportunities
- **Location:** Gep Protech Campus & Online

This year's theme focuses on creating technology solutions that address environmental challenges and promote sustainability.`,
        author: "Events Team",
        date: "2024-01-10",
        image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        category: "Events",
        files: [
          { 
            name: "Hackathon Rules & Guidelines.pdf", 
            type: "pdf", 
            url: "#",
            size: "1.8 MB"
          },
          { 
            name: "Registration Form.docx", 
            type: "document", 
            url: "#",
            size: "0.8 MB"
          },
          { 
            name: "Event Promo Video.mp4", 
            type: "video", 
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            size: "22.3 MB"
          }
        ]
      },
      {
        id: 3,
        title: "New Partnership with Tech Industry Leaders",
        excerpt: "We've partnered with leading tech companies to provide better internship opportunities for our students.",
        content: `We are proud to announce new partnerships with several leading technology companies that will significantly enhance our students' learning experience and career prospects.

## Our New Partners:
- **TechCorp Solutions** - Software Development
- **DataFlow Analytics** - Data Science & AI
- **SecureNet Systems** - Cybersecurity
- **Innovate Labs** - Research & Development

These partnerships will bring real-world projects into our curriculum and provide exclusive internship opportunities.`,
        author: "Partnership Team",
        date: "2024-01-05",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        category: "Partnerships",
        files: [
          { 
            name: "Partnership Announcement.pdf", 
            type: "pdf", 
            url: "#",
            size: "3.1 MB"
          },
          { 
            name: "Partner Companies List.xlsx", 
            type: "document", 
            url: "#",
            size: "0.5 MB"
          }
        ]
      },
      {
        id: 4,
        title: "Campus Infrastructure Upgrade Complete",
        excerpt: "Our campus has been upgraded with state-of-the-art facilities and equipment for better learning experience.",
        content: `We're excited to announce the completion of our campus infrastructure upgrade! Our students now have access to:

## New Facilities:
- **Advanced Computer Labs** with high-performance workstations
- **Collaborative Learning Spaces** for group projects
- **Innovation Hub** for startup incubation
- **Enhanced Network Infrastructure** for seamless connectivity

These improvements ensure our students learn in an environment that matches industry standards.`,
        author: "Facilities Team",
        date: "2024-01-03",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        category: "Campus",
        files: [
          { 
            name: "Campus Tour Video.mp4", 
            type: "video", 
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            size: "18.9 MB"
          },
          { 
            name: "New Facilities Gallery.zip", 
            type: "archive", 
            url: "#",
            size: "45.2 MB"
          }
        ]
      }
    ];

    
    // Simulate API loading
    setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 1000);
  }, []);

  const getPostById = (id) => {
    return posts.find(post => post.id === parseInt(id));
  };

  const value = {
    posts,
    loading,
    getPostById
  };
  fetchPosts();

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};