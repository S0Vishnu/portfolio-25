import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Gallery from '../components/Gallery';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Contact from '../components/Contact';
import Timeline from '../components/Timeline';

const Home = () => {
  return (
    <div className='home-container'>
      <Landing />
      <TechStack />
      <Projects />
      <Gallery />
      <Timeline />
      <About />
      <Contact />
    </div>
  );
};

export default Home;

