import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Gallery from '../components/Gallery';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className='home-container'>
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

