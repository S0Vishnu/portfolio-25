import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Gallery from '../components/Gallery';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Contact from '../components/Contact';
import FixedContent from '../components/fixedContent';

const Home = () => {
  return (
    <div className='home-container'>
      <FixedContent />
      <Landing />
      <TechStack />
      <Projects />
      <Gallery />
      <About />
      <Contact />
    </div>
  );
};

export default Home;

