import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Courses from './sections/Courses';
import Tutors from './sections/Tutors';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';
import { useTheme } from './hooks/useTheme';
import Achievements from './sections/Achievement';
import TutorProfile from './pages/TutorProfile';
import Blog from '../src/pages/Blog'; // Add this import
import BlogPost from './pages/BlogPost'; // We'll create this next
import { BlogProvider } from './context/BlogContext'; // Add this import
import Enroll from './sections/Enroll';
import Enrollment from './pages/Enrollment';

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Courses />
      <Tutors />
      <Gallery />
      <Achievements />
      <Contact />
      <Enroll/>
    </>
  );
}

function App() {
  useTheme();

  return (
    <BlogProvider> {/* Wrap with BlogProvider */}
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tutor/:id" element={<TutorProfile />} />
              <Route path="/blog" element={<Blog />} /> {/* Blog listing page */}
              <Route path="/blog/:id" element={<BlogPost />} /> {/* Individual post page */}
              <Route path="/enroll" element={<Enrollment/>}/>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;