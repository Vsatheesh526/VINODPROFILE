import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Interests from './components/Interests';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail';
import FloatingFlowers from './components/FloatingFlowers';
import RoamingSnake from './components/RoamingSnake';

function App() {
  return (
    <div className="min-h-screen">
      <RoamingSnake />
      <FloatingFlowers />
      <CursorTrail />
      <Header />
      <main>
        <Hero />
        <About />
        <Education />
        <Interests />
        <Skills />
        <Projects />
        <Experience />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
