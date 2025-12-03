import { useEffect, useRef } from "react";
import gsap from "gsap";

const Landing = () => {
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const heroWrapperRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const isMobile = () => window.innerWidth <= 768; // Define mobile breakpoint

  const createSubtitleHTML = (text: string) => {
    const spanHTML = text
      .split("")
      .map((char) => {
        let result = "";
        if (char === "✧") {
          if (isMobile()) {
            result = `<br /><span class="char span" style="display: inline-block;">${char}</span><br />`;
          } else {
            result = `<span class="char span" style="display: inline-block;">${char}</span>`;
          }
        } else {
          result = `<span class="char" style="display: inline-block;">${char === " " ? "&nbsp;" : char
            }</span>`;
        }
        return result;
      })
      .join("");
    return spanHTML;
  };

  useEffect(() => {
    // Animate hero-title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: -40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }

    // Animate subtitle
    const updateSubtitle = () => {
      if (subtitleRef.current) {
        const text = subtitleRef.current.textContent ?? "";
        subtitleRef.current.innerHTML = createSubtitleHTML(text);

        const chars = subtitleRef.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.05,
            delay: 0.3,
          }
        );
      }
    };

    updateSubtitle();
    window.addEventListener("resize", updateSubtitle);

    // Mouse tracking for reveal effect
    const mouse = { x: -999, y: -999 };
    const targetPos = { x: -999, y: -999 };
    let animationFrameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroWrapperRef.current) return;
      
      const rect = heroWrapperRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const animate = () => {
      // Smooth interpolation for mask position
      targetPos.x += (mouse.x - targetPos.x) * 0.15;
      targetPos.y += (mouse.y - targetPos.y) * 0.15;

      if (overlayRef.current) {
        overlayRef.current.style.setProperty("--mouse-x", `${targetPos.x}px`);
        overlayRef.current.style.setProperty("--mouse-y", `${targetPos.y}px`);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    if (heroWrapperRef.current) {
      heroWrapperRef.current.addEventListener("mousemove", handleMouseMove);
      animate();
    }

    return () => {
      window.removeEventListener("resize", updateSubtitle);
      if (heroWrapperRef.current) {
        heroWrapperRef.current.removeEventListener("mousemove", handleMouseMove);
      }
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="hero-main-wrapper" id="hero" ref={heroWrapperRef}>
      <div className="hero-bg-overlay" ref={overlayRef}></div>
      <div className="hero-text-wrapper">
        <div className="hero-title-wrapper">
          <h1 className="hero-title" ref={titleRef}>
            👋, I'm <span>Vishnu</span>
          </h1>
        </div>
        <div className="hero-subtitle">
          <div className="content" ref={subtitleRef}>
            <div className="text">Design</div>
            <span className="span">✧</span>
            <div className="text">Develop</div>
            <span className="span">✧</span>
            <div className="text">Model</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
