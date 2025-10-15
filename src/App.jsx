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
import TutorProfile from './pages/TutorProfile'; // Import the new profile component

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
    </>
  );
}

function App() {
  useTheme(); // Initialize theme

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tutor/:id" element={<TutorProfile />} />
            {/* You can add more routes here later */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;