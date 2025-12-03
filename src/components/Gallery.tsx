import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { projects } from '../data/projectData';
import '../styles/Gallery.css';
import { ArrowRightIcon, CloseIcon } from '../assets/svg/iconsSvg';

const Gallery = () => {
  const galleryItems = projects.filter(
    (p) => (p.category === 'art' || p.category === 'render' || p.category === 'design') && p.featured === true
  );

  const [previewImage, setPreviewImage] = useState<Project | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const scrollDirectionRef = useRef<number>(0);
  const lastMouseXRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  const autoScrollFrameRef = useRef<number | null>(null);
  const lastAutoScrollTimeRef = useRef<number>(0);

  const handleImageClick = (item: Project) => {
    setPreviewImage(item);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClosePreview();
    }
  };

  // Grab scroll handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!galleryRef.current) return;
    
    // Allow dragging from anywhere in the gallery, including buttons/images
    // But prevent default image drag behavior
    if ((e.target as HTMLElement).tagName === 'IMG') {
      e.preventDefault();
    }
    
    stopAutoScroll(); // Stop any existing auto-scroll
    
    isDraggingRef.current = true;
    startXRef.current = e.clientX; // Use clientX for better accuracy
    lastMouseXRef.current = e.clientX;
    scrollLeftRef.current = galleryRef.current.scrollLeft;
    scrollDirectionRef.current = 0;
    hasDraggedRef.current = false;
    galleryRef.current.style.cursor = 'grabbing';
    galleryRef.current.style.userSelect = 'none';
  };

  const handleMouseLeave = () => {
    if (!galleryRef.current) return;
    
    isDraggingRef.current = false;
    galleryRef.current.style.cursor = 'grab';
    galleryRef.current.style.userSelect = 'auto';
    // Don't stop auto-scroll on mouse leave - let it continue
  };

  const handleMouseUp = () => {
    // Handled by global mouseup listener
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Handled by global mousemove listener for better performance
    e.preventDefault();
  };

  const startAutoScroll = () => {
    stopAutoScroll(); // Clear any existing auto-scroll
    
    if (!galleryRef.current) return;
    
    const scrollSpeed = 6; // Pixels per frame
    const direction = scrollDirectionRef.current;
    
    if (direction === 0) {
      return; // No direction, don't start
    }
    
    // Set flag BEFORE starting to prevent scroll event from stopping it
    isAutoScrollingRef.current = true;
    
    const animate = (currentTime: number) => {
      if (!galleryRef.current || !isAutoScrollingRef.current) {
        stopAutoScroll();
        return;
      }
      
      // Initialize lastTime on first frame
      if (lastAutoScrollTimeRef.current === 0) {
        lastAutoScrollTimeRef.current = currentTime;
        autoScrollFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const deltaTime = currentTime - lastAutoScrollTimeRef.current;
      lastAutoScrollTimeRef.current = currentTime;
      
      const maxScroll = galleryRef.current.scrollWidth - galleryRef.current.clientWidth;
      const currentScroll = galleryRef.current.scrollLeft;
      
      // Stop if at boundaries
      if ((direction > 0 && currentScroll >= maxScroll - 0.5) || (direction < 0 && currentScroll <= 0.5)) {
        stopAutoScroll();
        return;
      }
      
      // Update scroll position based on time for consistent speed
      const pixelsToMove = (scrollSpeed * deltaTime) / 16.67; // Normalize to 60fps
      galleryRef.current.scrollLeft += pixelsToMove * direction;
      
      // Continue animation
      autoScrollFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Reset time ref and start the animation
    lastAutoScrollTimeRef.current = 0;
    autoScrollFrameRef.current = requestAnimationFrame(animate);
  };

  const stopAutoScroll = () => {
    isAutoScrollingRef.current = false;
    if (autoScrollFrameRef.current) {
      cancelAnimationFrame(autoScrollFrameRef.current);
      autoScrollFrameRef.current = null;
    }
    lastAutoScrollTimeRef.current = 0;
    scrollDirectionRef.current = 0;
  };

  // Stop auto-scroll on manual scroll (but not when auto-scrolling)
  const handleScroll = () => {
    // Don't stop auto-scroll if we're currently auto-scrolling
    // This prevents the scroll event from stopping our own auto-scroll
    if (isAutoScrollingRef.current) {
      return;
    }
    stopAutoScroll();
  };

  // Global mouse handlers for smooth dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !galleryRef.current) return;
      
      e.preventDefault();
      
      // Update immediately without RAF for zero delay
      const mouseX = e.clientX;
      const walk = (mouseX - startXRef.current) * 1.5; // Scroll speed multiplier
      galleryRef.current.scrollLeft = scrollLeftRef.current - walk;
      
      // Determine drag direction based on mouse movement for auto-scroll
      const mouseDelta = mouseX - lastMouseXRef.current;
      if (Math.abs(mouseDelta) > 1) { // Only update if significant movement
        hasDraggedRef.current = true;
        // Inverted: dragging right (positive delta) decreases scrollLeft (negative direction)
        scrollDirectionRef.current = mouseDelta > 0 ? -1 : 1;
      }
      lastMouseXRef.current = mouseX;
    };

    const handleGlobalMouseUp = () => {
      if (!galleryRef.current) return;
      
      if (isDraggingRef.current) {
        const wasDragging = hasDraggedRef.current;
        const direction = scrollDirectionRef.current;
        
        isDraggingRef.current = false;
        galleryRef.current.style.cursor = 'grab';
        galleryRef.current.style.userSelect = 'auto';
        
        // Start auto-scroll based on drag direction
        if (direction !== 0 && wasDragging) {
          // Use setTimeout to ensure scroll event doesn't interfere
          setTimeout(() => {
            if (galleryRef.current) {
              startAutoScroll();
            }
          }, 0);
        } else {
          stopAutoScroll();
        }
      }
    };

    const preventImageDrag = (e: DragEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'IMG') {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const gallery = galleryRef.current;
    if (gallery) {
      // Only listen to scroll for manual scrolls, not auto-scroll
      gallery.addEventListener('scroll', handleScroll);
      // Stop auto-scroll on wheel
      gallery.addEventListener('wheel', () => {
        stopAutoScroll();
      });
      gallery.addEventListener('dragstart', preventImageDrag);
      gallery.addEventListener('drag', preventImageDrag);
    }
    
    // Add global listeners for smooth dragging
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      stopAutoScroll();
      if (autoScrollFrameRef.current) {
        cancelAnimationFrame(autoScrollFrameRef.current);
      }
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      if (gallery) {
        gallery.removeEventListener('scroll', handleScroll);
        gallery.removeEventListener('wheel', stopAutoScroll);
        gallery.removeEventListener('dragstart', preventImageDrag);
        gallery.removeEventListener('drag', preventImageDrag);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="gallery" className="gallery-container">
      <div className="header section-title">
        <h2 className="title">gallery.</h2>
        <ArrowRightIcon />
      </div>
      <div 
        className="grid-gallery"
        ref={galleryRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ userSelect: 'none' }}
      >
        {galleryItems.map((item) => (
          <button
            key={item.id}
            className="card-container"
            onClick={(e) => {
              // Prevent click if user was dragging
              if (hasDraggedRef.current) {
                e.preventDefault();
                e.stopPropagation();
                return;
              }
              handleImageClick(item);
            }}
          >
            <div className="card-image-container-small">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="card-image"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Preview Modal - Rendered via Portal to avoid PageTransition transform issues */}
      {previewImage && createPortal(
        <div
          onClick={handleBackdropClick}
          className="modal-backdrop"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-content"
          >
            <img
              src={previewImage.thumbnail}
              alt={previewImage.title}
              className="modal-image"
            />
            <button
              onClick={handleClosePreview}
              className="btn-close"
            >
              <CloseIcon />
            </button>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Gallery;
