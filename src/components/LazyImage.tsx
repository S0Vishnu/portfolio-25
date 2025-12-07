import { useEffect, useRef, useState } from 'react';
import Skeleton from './Skeleton';
import '../styles/LazyImage.css';

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
  const [hasError, setHasError] = useState(false);
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

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true); // Stop showing skeleton on error
  };

  return (
    <div className={`lazy-image-container ${className || ''}`} ref={imgRef}>
      {isInView && (
        <>
          {!isLoaded && !hasError && (
            <div className="lazy-image-skeleton">
              <Skeleton variant="image" animation="wave" className="lazy-image-skeleton-inner" />
            </div>
          )}
          {hasError && (
            <div className="lazy-image-error">
              <p>Failed to load image</p>
            </div>
          )}
          <img
            src={src}
            alt={alt}
            className={`lazy-image ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''}`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        </>
      )}
      {!isInView && (
        <div className="lazy-image-skeleton">
          <Skeleton variant="image" animation="wave" className="lazy-image-skeleton-inner" />
        </div>
      )}
    </div>
  );
};

export default LazyImage;

