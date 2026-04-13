import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './css/FindPath.css';

const TRACKS = {
  AI: { name: "Generative AI Engineering", desc: "You're drawn to intelligence, pattern recognition, and building systems that think. AI Engineering sits at the frontier of what's possible in tech." },
  PD: { name: "Product Design (UX/UI)", desc: "You think visually and empathetically. You care deeply about how things look, feel, and how people experience them. You make tech human." },
  CS: { name: "Cybersecurity & Ethical Hacking", desc: "You're analytical, detail-oriented, and love finding what others miss. You think like an attacker so you can defend like a guardian." },
  NW: { name: "Computer Networking & Maintenance", desc: "You're practical, technical, and love understanding how systems connect. You're the invisible backbone that keeps everything running." },
  DM: { name: "Digital Marketing", desc: "You understand people, storytelling, and persuasion. You turn attention into action and build bridges between great products and the world." },
  PM: { name: "Project Management", desc: "You're a natural organizer and communicator. You bring order to chaos, keep teams aligned, and make sure things actually get done." },
  BI: { name: "Business Intelligence", desc: "You're a data-driven thinker who loves finding hidden patterns. You turn numbers into narratives that help organizations make smarter decisions." },
  FE: { name: "Front-End Web Development", desc: "You love building what people see and interact with. You sit at the intersection of design and code, turning ideas into living, breathing experiences." },
  BE: { name: "Back-End Web Development", desc: "You love the logic behind the scenes — servers, databases, and systems that power everything. You build the engine, not just the hood." },
  MA: { name: "Mobile App Development", desc: "You love building things people carry in their pocket. Mobile apps live closer to daily life than any other technology — and you want to build them." }
};

const QUESTIONS = [
  {
    text: "Which of these activities sounds most exciting to you?",
    opts: [
      { text: "Building apps that people use every single day", tracks: ["MA","FE","BE"] },
      { text: "Finding and fixing security vulnerabilities in systems", tracks: ["CS"] },
      { text: "Analyzing data to uncover hidden business patterns", tracks: ["BI","AI"] },
      { text: "Designing beautiful, intuitive user interfaces", tracks: ["PD","FE"] },
      { text: "Getting people to discover and love a product online", tracks: ["DM","PM"] },
      { text: "Setting up and maintaining computer networks", tracks: ["NW"] }
    ]
  },
  {
    text: "Which word describes you best?",
    opts: [
      { text: "Visual — I think in images, layouts, and aesthetics", tracks: ["PD","FE"] },
      { text: "Logical — I love breaking problems into clear steps", tracks: ["CS","BE","NW"] },
      { text: "Strategic — I think about the big picture and coordination", tracks: ["PM","DM","BI"] },
      { text: "Curious — I love learning how complex systems really work", tracks: ["AI","BE","CS"] },
      { text: "Expressive — I love communicating ideas to different audiences", tracks: ["DM","PM","PD"] }
    ]
  },
  {
    text: "When you use an app or website, what do you notice FIRST?",
    opts: [
      { text: "How it looks and how smooth it feels to use", tracks: ["PD","FE","MA"] },
      { text: "Whether it seems secure and trustworthy", tracks: ["CS"] },
      { text: "How fast and reliable it loads and responds", tracks: ["BE","NW"] },
      { text: "What data it's collecting and why", tracks: ["BI","AI","CS"] },
      { text: "How cleverly it markets itself to me", tracks: ["DM"] }
    ]
  },
  {
    text: "Which project would you be MOST proud to say you worked on?",
    opts: [
      { text: "A mobile app solving a real problem in my community", tracks: ["MA","BE"] },
      { text: "A website design so clean it won an award", tracks: ["PD","FE"] },
      { text: "A security audit that prevented a major data breach", tracks: ["CS"] },
      { text: "A data dashboard that changed how a company operates", tracks: ["BI","PM"] },
      { text: "A marketing campaign that went viral", tracks: ["DM"] },
      { text: "An AI model that genuinely helps people", tracks: ["AI","BE"] },
      { text: "A network infrastructure that scaled to millions of users", tracks: ["NW","BE"] }
    ]
  },
  {
    text: "How do you prefer to work on a typical day?",
    opts: [
      { text: "Alone, going deep into complex technical problems", tracks: ["CS","BE","AI"] },
      { text: "In a team, coordinating people and keeping things moving", tracks: ["PM","DM"] },
      { text: "Creatively, with design tools and visual frameworks", tracks: ["PD","FE"] },
      { text: "With data, spreadsheets, and analysis tools", tracks: ["BI","AI"] },
      { text: "Hands-on, configuring and maintaining physical/technical systems", tracks: ["NW","CS"] }
    ]
  },
  {
    text: "What do you want people to say when they use something you built?",
    opts: [
      { text: "This is so clean and beautiful — who designed this?", tracks: ["PD","FE"] },
      { text: "This is incredibly fast and never breaks", tracks: ["BE","NW"] },
      { text: "I feel completely safe using this", tracks: ["CS"] },
      { text: "This helped us understand our business like never before", tracks: ["BI","PM"] },
      { text: "This reached so many people — it just spread", tracks: ["DM"] },
      { text: "This feels like actual magic", tracks: ["AI","MA"] }
    ]
  },
  {
    text: "What would you most likely search on YouTube on a free afternoon?",
    opts: [
      { text: "How to design a professional UI from scratch", tracks: ["PD"] },
      { text: "How hackers actually break into systems", tracks: ["CS"] },
      { text: "How to grow a brand to 100k followers", tracks: ["DM"] },
      { text: "How databases and servers actually work", tracks: ["BE","BI"] },
      { text: "How AI language models are trained", tracks: ["AI"] },
      { text: "How to build an Android or iOS app", tracks: ["MA"] },
      { text: "How to become a great project manager", tracks: ["PM"] },
      { text: "How computer networks are designed", tracks: ["NW"] }
    ]
  },
  {
    text: "Which school subject did you enjoy most?",
    opts: [
      { text: "Mathematics or Statistics", tracks: ["BI","AI","BE"] },
      { text: "Art, Graphics, or Design", tracks: ["PD","FE"] },
      { text: "Physics or Technical Sciences", tracks: ["CS","NW","BE"] },
      { text: "Economics or Business Studies", tracks: ["DM","PM","BI"] },
      { text: "IT, Computing, or Programming", tracks: ["FE","BE","MA","CS"] },
      { text: "Communication, Media, or Languages", tracks: ["DM","PM","PD"] }
    ]
  },
  {
    text: "When you face a problem, what's your natural first move?",
    opts: [
      { text: "Break it down into small logical steps and test each one", tracks: ["CS","BE","NW"] },
      { text: "Sketch or visualize it — maps, diagrams, wireframes", tracks: ["PD","PM","BI"] },
      { text: "Research what others have done before and adapt it", tracks: ["AI","DM","FE"] },
      { text: "Talk to others and coordinate a team effort", tracks: ["PM","DM"] },
      { text: "Dig into the data and find where the problem actually lives", tracks: ["BI","CS","AI"] }
    ]
  },
  {
    text: "Which of these career titles sounds most like YOUR future?",
    opts: [
      { text: "AI Engineer or Machine Learning Developer", tracks: ["AI","BE"] },
      { text: "UX/UI Designer or Product Designer", tracks: ["PD","FE"] },
      { text: "Penetration Tester or Security Analyst", tracks: ["CS"] },
      { text: "Network Engineer or Systems Administrator", tracks: ["NW"] },
      { text: "Digital Marketing Strategist or Growth Hacker", tracks: ["DM"] },
      { text: "Project Manager or Technical Lead", tracks: ["PM","BE"] },
      { text: "Data Analyst or Business Intelligence Developer", tracks: ["BI","AI"] },
      { text: "Mobile App Developer", tracks: ["MA","FE"] },
      { text: "Full-Stack or Back-End Developer", tracks: ["BE","MA"] }
    ]
  },
  {
    text: "What frustrates you MOST in a tech product?",
    opts: [
      { text: "It's ugly, confusing, and hard to navigate", tracks: ["PD","FE"] },
      { text: "It's slow, unreliable, or crashes often", tracks: ["BE","NW"] },
      { text: "It feels insecure or privacy is unclear", tracks: ["CS"] },
      { text: "There's no data or insight to understand what's happening", tracks: ["BI","PM"] },
      { text: "Nobody knows about it — the marketing is non-existent", tracks: ["DM"] },
      { text: "The team behind it seems disorganized and directionless", tracks: ["PM"] },
      { text: "It doesn't use modern intelligence or automation", tracks: ["AI","MA"] }
    ]
  },
  {
    text: "Last question: What does success look like to YOU in 5 years?",
    opts: [
      { text: "I've built AI products that genuinely change how people work", tracks: ["AI"] },
      { text: "I've designed interfaces that millions of people love using", tracks: ["PD","FE","MA"] },
      { text: "I'm a trusted security expert protecting critical systems", tracks: ["CS"] },
      { text: "I manage the infrastructure that keeps a major company online", tracks: ["NW","BE"] },
      { text: "I've grown brands and helped businesses reach new markets", tracks: ["DM","PM"] },
      { text: "I lead tech teams and deliver projects that actually ship", tracks: ["PM","BE"] },
      { text: "I help organizations make smarter decisions through data", tracks: ["BI","AI"] },
      { text: "I have apps in the App Store with real users", tracks: ["MA","FE"] }
    ]
  }
];

const FindPath = () => {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(new Array(QUESTIONS.length).fill(null));
  const [scores, setScores] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [sortedTracks, setSortedTracks] = useState([]);

  const initScores = () => {
    const initial = {};
    Object.keys(TRACKS).forEach(k => initial[k] = 0);
    return initial;
  };

  const startQuiz = () => {
    setStarted(true);
    setCurrent(0);
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setScores(initScores());
    setShowResult(false);
  };

  const selectOption = (index) => {
    const newAnswers = [...answers];
    newAnswers[current] = index;
    setAnswers(newAnswers);
  };

  const goNext = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      calculateResult();
    }
  };

  const goBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const calculateResult = () => {
    const newScores = initScores();
    
    answers.forEach((ans, qi) => {
      if (ans === null) return;
      const tracks = QUESTIONS[qi].opts[ans].tracks;
      tracks.forEach(t => {
        if (newScores[t] !== undefined) newScores[t] += (1 / tracks.length);
      });
    });

    const sorted = Object.entries(newScores).sort((a, b) => b[1] - a[1]);
    setSortedTracks(sorted);
    setScores(newScores);
    setShowResult(true);
  };

  const getProgressWidth = () => {
    return `${(current / QUESTIONS.length) * 100}%`;
  };

  const trackList = [
    "Generative AI", "Product Design", "Cybersecurity", "Networking",
    "Digital Marketing", "Project Management", "Business Intelligence",
    "Front-End Dev", "Back-End Dev", "Mobile App Dev"
  ];

  return (
    <div className="findpath-page">
      <div className="fp-top-bar">
        <div>
          <div className="brand">GeP ProTech Academy</div>
          <div className="tagline">The Pioneers of the Next Tech Frontiers</div>
        </div>
      </div>

      {!started && !showResult && (
        <div className="fp-hero">
          <h1>Find Your <span>Path</span></h1>
          <p>Answer 12 honest questions and discover which tech track aligns with your strengths, interests, and instincts.</p>
          <div className="badge">12 questions · ~3 minutes · No wrong answers</div>
        </div>
      )}

      {started && !showResult && (
        <div className="fp-hero">
          <h1>Find Your <span>Path</span></h1>
          <p>Answer the questions to discover your ideal tech track.</p>
        </div>
      )}

      {showResult && (
        <div className="fp-hero">
          <h1>Your <span>Result</span></h1>
          <p>Based on your answers, here's your personalized tech career path recommendation.</p>
        </div>
      )}

      {!started && !showResult && (
        <div className="fp-progress-wrap">
          <div className="fp-progress-bar-bg">
            <div className="fp-progress-bar-fill" style={{ width: getProgressWidth() }}></div>
          </div>
          <div className="fp-progress-label">Question {current + 1} of {QUESTIONS.length}</div>
        </div>
      )}

      {showResult && (
        <div className="fp-progress-wrap">
          <div className="fp-progress-bar-bg">
            <div className="fp-progress-bar-fill" style={{ width: '100%' }}></div>
          </div>
          <div className="fp-progress-label">Complete!</div>
        </div>
      )}

      <div className="fp-container">
        {/* START SCREEN */}
        {!started && !showResult && (
          <motion.div 
            className="fp-start-screen" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
          >
            <div className="fp-q-card" style={{ textAlign: 'center', padding: '32px 28px' }}>
              <h2 style={{ color: 'var(--navy)', fontSize: '15pt', marginBottom: '10px' }}>
                11 Tracks. One Starting Point.
              </h2>
              <p style={{ color: 'var(--grey)', fontSize: '10pt', lineHeight: '1.7', marginBottom: '20px' }}>
                GeP ProTech Academy offers training across 11 tech disciplines. This short quiz helps you discover where your natural strengths and interests point. Answer with your gut — not what sounds most impressive.
              </p>
              <div className="fp-tracks-preview">
                {trackList.map((track, i) => (
                  <span key={i} className="fp-track-chip">{track}</span>
                ))}
              </div>
              <motion.button 
                className="fp-btn-start" 
                onClick={startQuiz}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start the Quiz →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* QUIZ SCREEN */}
        {started && !showResult && (
          <motion.div 
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="fp-q-card">
              <div className="fp-q-number">Question {current + 1} of {QUESTIONS.length}</div>
              <div className="fp-q-text">{QUESTIONS[current].text}</div>
              <div className="fp-options">
                {QUESTIONS[current].opts.map((opt, i) => (
                  <div
                    key={i}
                    className={`fp-opt ${answers[current] === i ? 'selected' : ''}`}
                    onClick={() => selectOption(i)}
                  >
                    <div className="dot"></div>
                    <div className="fp-opt-text">{opt.text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fp-btn-row">
              <button 
                className="fp-btn fp-btn-secondary" 
                onClick={goBack}
                style={{ visibility: current === 0 ? 'hidden' : 'visible' }}
              >
                ← Back
              </button>
              <button 
                className="fp-btn fp-btn-primary" 
                onClick={goNext}
                disabled={answers[current] === null}
              >
                {current === QUESTIONS.length - 1 ? 'See My Results →' : 'Continue →'}
              </button>
            </div>
          </motion.div>
        )}

        {/* RESULT SCREEN */}
        {showResult && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="fp-result-hero">
              <div className="result-label">🎯 Your Recommended Track</div>
              <div className="result-track">{TRACKS[sortedTracks[0][0]].name}</div>
              <div className="result-desc">{TRACKS[sortedTracks[0][0]].desc}</div>
            </div>

            <div className="fp-result-card">
              <h3>📊 Your Full Profile — Top Matches</h3>
              <div>
                {sortedTracks.slice(0, 6).map(([key, val], idx) => {
                  const maxScore = sortedTracks[0][1];
                  const pct = maxScore > 0 ? Math.round((val / maxScore) * 100) : 0;
                  return (
                    <div key={key} className="fp-runner">
                      <div className="fp-runner-name">
                        {TRACKS[key].name.replace(' Development', '').replace(' Engineering', '').replace(' & Ethical Hacking', '')}
                      </div>
                      <div className="fp-runner-bar-bg">
                        <div 
                          className={`fp-runner-bar-fill ${idx === 0 ? 'top' : ''}`} 
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                      <div style={{ fontSize: '9pt', color: 'var(--grey)', width: '32px', textAlign: 'right' }}>{pct}%</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="fp-disclaimer">
              <strong>Important:</strong> This result is a guide — not a sentence. It reflects patterns in your answers, not your limits. If your result surprises you, that's information worth thinking about. If you feel strongly pulled toward a different track, trust that feeling. <strong>Passion + consistency will always outperform a perfect match on paper.</strong>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button 
                className="fp-btn-restart" 
                style={{ flex: '0.45', background: '#e8edf5', color: 'var(--navy)' }}
                onClick={startQuiz}
              >
                ↺ Retake
              </button>
              <button 
                className="fp-btn-restart" 
                style={{ flex: '1', background: 'var(--gold)', color: 'var(--navy)' }}
                onClick={() => window.open('/enroll', '_self')}
              >
                Apply Now →
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FindPath;