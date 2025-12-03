import { useEffect, useRef, type ReactElement } from 'react';
import { gsap } from 'gsap';
import {
  React,
  TypeScript,
  Vite,
  Git,
  Github,
  Figma,
  HTML5,
  CSS3,
  JavaScript,
  VSCode,
  Firebase,
  ThreeJS,
  Blender,
  PhotoShop,
  Illustrator,
  SCSS,
  ChatGPT,
  Jira,
  DavinciResolve,
} from '../assets/svg/techStackSvg';
import '../styles/TechStack.css';

interface TechIcon {
  name: string;
  component: () => ReactElement;
}

const TechStack = () => {
  const techIcons: TechIcon[] = [
    { name: 'React', component: React },
    { name: 'TypeScript', component: TypeScript },
    { name: 'Vite', component: Vite },
    { name: 'JavaScript', component: JavaScript },
    { name: 'HTML5', component: HTML5 },
    { name: 'CSS3', component: CSS3 },
    { name: 'SCSS', component: SCSS },
    { name: 'Git', component: Git },
    { name: 'Github', component: Github },
    { name: 'Figma', component: Figma },
    { name: 'VSCode', component: VSCode },
    { name: 'Firebase', component: Firebase },
    { name: 'ThreeJS', component: ThreeJS },
    { name: 'Blender', component: Blender },
    { name: 'PhotoShop', component: PhotoShop },
    { name: 'Illustrator', component: Illustrator },
    { name: 'ChatGPT', component: ChatGPT },
    { name: 'Jira', component: Jira },
    { name: 'DavinciResolve', component: DavinciResolve },
  ];

  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !marqueeContentRef.current) return;

    const marquee = marqueeRef.current;
    const content = marqueeContentRef.current;

    // Duplicate content for seamless loop
    const clone = content.cloneNode(true) as HTMLDivElement;
    marquee.appendChild(clone);

    // Calculate width
    const contentWidth = content.scrollWidth;
    const speed = 1; // seconds per 100px

    // Create animation
    const animation = gsap.to(marquee, {
      x: -contentWidth,
      duration: (contentWidth / 100) * speed,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section id="tech-stack" className="tech-stack-section">
      <div className="tech-marquee-container">
        <div
          ref={marqueeRef}
          className="tech-marquee"
        >
          <div
            ref={marqueeContentRef}
            className="tech-marquee-content"
          >
            {techIcons.map((tech, index) => {
              const IconComponent = tech.component;
              return (
                <div
                  key={`${tech.name}-${index}`}
                  className="tech-item"
                >
                  <div className="tech-icon-container">
                    <IconComponent />
                  </div>
                  {/* <span className="tech-name">{tech.name}</span> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;

