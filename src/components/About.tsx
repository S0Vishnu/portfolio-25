import '../styles/About.css';
import { SmilyIcon } from '../assets/svg/iconsSvg';
import aboutImage from '../assets/images/me/me-min.png';

const About = () => {
  return (
    <section id="about" className="about-container">
      <h2>About Me <SmilyIcon /></h2>

      <div className="content-container">
        <div className="image-container">
          <img src={aboutImage} alt="About Me" className="about-image" />
        </div>
        <div className="content">
          <p>
            Hey! I’m <strong>Vishnu</strong>, a curious designer-developer hybrid who
            spends an unreasonable amount of time turning ideas into things you can click,
            watch, or get inspired by.
          </p>
          <br />
          <p>
            I’m a self-taught creator with a love for sleek interfaces, playful motion,
            and anything that mixes tech with art. Based in <strong>India</strong>,
            I build digital experiences that blend storytelling, personality, and just the
            right amount of nerdiness.
          </p>
          <br />
          <p>
            My work floats between <strong>web development, 3D experimentation, visual design,
              and illustration</strong>.
          </p>
          <br />
          <p>
            When I’m not pushing pixels or debugging something at 2 AM, you’ll probably find me
            sketching characters, tinkering with manhwa, or building weird side projects
            that nobody asked for but everyone ends up loving.
          </p>
          <br />
          <p>
            If you're dreaming up something that needs style, personality, or a little digital
            magic, I’d love to help bring it to life.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
