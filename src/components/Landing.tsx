import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Landing: React.FC = () => {
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

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

    return () => window.removeEventListener("resize", updateSubtitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="hero-main-wrapper" id="hero">
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
