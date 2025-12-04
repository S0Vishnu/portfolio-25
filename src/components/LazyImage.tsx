import { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

/**
 * LazyImage component that loads images only when they enter the viewport
 * Uses Intersection Observer API for efficient lazy loading
 */
const LazyImage = ({ src, alt, className, onLoad }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    // Create Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Once in view, we can disconnect the observer
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      {
        // Start loading when image is 200px away from viewport
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    observerRef.current.observe(imgElement);

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <div className={`lazy-image-container ${className || ''}`} ref={imgRef}>
      {isInView && (
        <>
          {!isLoaded && (
            <div className="lazy-image-placeholder">
              <div className="lazy-image-spinner" />
            </div>
          )}
          <img
            src={src}
            alt={alt}
            className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
            onLoad={handleLoad}
            loading="lazy"
          />
        </>
      )}
      {!isInView && (
        <div className="lazy-image-placeholder">
          <div className="lazy-image-spinner" />
        </div>
      )}
    </div>
  );
};

export default LazyImage;

