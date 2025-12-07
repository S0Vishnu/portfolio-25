import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const lastRef = useRef({ x: 0, y: 0 });
  const isAnimatingRef = useRef(false);
  const currentLabelRef = useRef("");
  const location = useLocation();

  // Reset cursor on route change
  useEffect(() => {
    // Clear any active animation frame
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Reset cursor state
    mouseRef.current = { x: 0, y: 0 };
    posRef.current = { x: 0, y: 0 };
    lastRef.current = { x: 0, y: 0 };
    isAnimatingRef.current = false;

    // Reset cursor position and transform
    if (cursorRef.current && innerRef.current && rotationRef.current && labelRef.current) {
      cursorRef.current.style.transform = "";
      rotationRef.current.style.transform = "";
      innerRef.current.style.transform = "";
      labelRef.current.classList.remove("cb-cursor-label-visible");
      labelRef.current.textContent = "";
      currentLabelRef.current = "";
    }

    // Reset hover state
    if (isHoveredRef.current) {
      document.body.classList.remove("button-hovered");
      isHoveredRef.current = false;
    }
  }, [location.pathname]);

  useEffect(() => {
    const threshold = 0.1; // Minimum movement threshold to continue animating

    const setLabel = (text: string | null) => {
      if (!labelRef.current) return;
      if (text) {
        if (currentLabelRef.current !== text) {
          currentLabelRef.current = text;
          labelRef.current.textContent = text;
        }
        labelRef.current.classList.add("cb-cursor-label-visible");
      } else if (currentLabelRef.current) {
        currentLabelRef.current = "";
        labelRef.current.textContent = "";
        labelRef.current.classList.remove("cb-cursor-label-visible");
      }
    };

    const updateMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      
      // Start animation if not already running
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        animate();
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Optimize: Check element type directly instead of using closest()
      const isInteractive = target.tagName === "BUTTON" || 
                           target.tagName === "A" ||
                           target.closest("button") !== null ||
                           target.closest("a") !== null;
      const imageAlt = target.closest("[data-timeline-image]") as HTMLElement | null;
      
      if (isInteractive && !isHoveredRef.current) {
        document.body.classList.add("button-hovered");
        isHoveredRef.current = true;
      } else if (!isInteractive && isHoveredRef.current) {
        document.body.classList.remove("button-hovered");
        isHoveredRef.current = false;
      }

      if (imageAlt) {
        const alt = imageAlt.getAttribute("data-timeline-image") || "";
        setLabel(alt);
      } else {
        setLabel(null);
      }
    };

    document.addEventListener("mousemove", updateMouse);
    document.addEventListener("mouseover", handleHover);
    document.addEventListener("mouseout", handleHover);

    const animate = () => {
      // Early exit if component unmounted
      if (!cursorRef.current || !rotationRef.current || !innerRef.current) {
        isAnimatingRef.current = false;
        return;
      }

      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.12;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.12;

      const dx = posRef.current.x - lastRef.current.x;
      const dy = posRef.current.y - lastRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Only continue animating if there's meaningful movement
      if (distance < threshold && Math.abs(mouseRef.current.x - posRef.current.x) < threshold && Math.abs(mouseRef.current.y - posRef.current.y) < threshold) {
        // Stop animation when cursor is stationary
        isAnimatingRef.current = false;
        animationFrameRef.current = null;
        return;
      }

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const velocity = Math.sqrt(dx * dx + dy * dy);

      const scaleX = 1 + Math.min(velocity / 15, 0.5);
      const scaleY = 1 - Math.min(velocity / 25, 0.2);

      cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      rotationRef.current.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      innerRef.current.style.transform = `rotate(${-angle}deg)`;

      lastRef.current.x = posRef.current.x;
      lastRef.current.y = posRef.current.y;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    return () => {
      document.removeEventListener("mousemove", updateMouse);
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("mouseout", handleHover);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      isAnimatingRef.current = false;
      setLabel(null);
    };
  }, []);

  return (
    <div className="cb-cursor" ref={cursorRef}>
      <div className="cb-cursor-rotation" ref={rotationRef}>
        <div className="cb-cursor-inner" ref={innerRef}></div>
      </div>
      <div className="cb-cursor-label" ref={labelRef}></div>
    </div>
  );
};

export default Cursor;
