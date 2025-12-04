import { useEffect, useRef } from "react";
import "../styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const last = { x: 0, y: 0 };

    const updateMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Optimize: Check element type directly instead of using closest()
      const isInteractive = target.tagName === "BUTTON" || 
                           target.tagName === "A" ||
                           target.closest("button") !== null ||
                           target.closest("a") !== null;
      
      if (isInteractive && !isHoveredRef.current) {
        document.body.classList.add("button-hovered");
        isHoveredRef.current = true;
      } else if (!isInteractive && isHoveredRef.current) {
        document.body.classList.remove("button-hovered");
        isHoveredRef.current = false;
      }
    };

    document.addEventListener("mousemove", updateMouse);
    document.addEventListener("mouseover", handleHover);
    document.addEventListener("mouseout", handleHover);

    const animate = () => {
      // Early exit if component unmounted
      if (!cursorRef.current || !innerRef.current) {
        return;
      }

      pos.x += (mouse.x - pos.x) * 0.12;
      pos.y += (mouse.y - pos.y) * 0.12;

      const dx = pos.x - last.x;
      const dy = pos.y - last.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const velocity = Math.sqrt(dx * dx + dy * dy);

      const scaleX = 1 + Math.min(velocity / 15, 0.5);
      const scaleY = 1 - Math.min(velocity / 25, 0.2);

      cursorRef.current.style.transform = `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      innerRef.current.style.transform = `rotate(${-angle}deg)`;

      last.x = pos.x;
      last.y = pos.y;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", updateMouse);
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("mouseout", handleHover);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="cb-cursor" ref={cursorRef}>
      <div className="cb-cursor-inner" ref={innerRef}></div>
    </div>
  );
};

export default Cursor;
