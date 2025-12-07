import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { projects } from '../data/projectData';
import { CloseIcon, ArrowRightIcon } from '../assets/svg/iconsSvg';
import { NAVIGATION_TIMING } from '../constants';
import Skeleton from '../components/Skeleton';
import '../styles/Works.css';

const Works = () => {
  const [previewImage, setPreviewImage] = useState<Project | Comic | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'slide-in-right' | 'slide-in-left' | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isInitialOpen, setIsInitialOpen] = useState<boolean>(true);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Memoize grouped projects to avoid recalculation
  const projectsByCategory = useMemo(() => ({
    projects: projects.filter(p => p.category === 'web-project'),
    designs: projects.filter(p => p.category === 'design'),
    gallery: projects.filter(p => p.category === 'art' || p.category === 'render'),
    comics: projects.filter(p => p.category === 'comic'),
    stories: projects.filter(p => p.category === 'story'),
  }), []);

  // Get all gallery items for navigation
  const galleryItems = projectsByCategory.gallery;

  const handleImageClick = (item: Project | Comic, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const index = galleryItems.findIndex(p => p.id === item.id);
    setCurrentIndex(index >= 0 ? index : 0);
    setPreviewImage(item);
    setSlideDirection(null);
    setIsInitialOpen(true);
    setIsImageLoading(true);
    // Store the element that had focus before opening modal
    previousFocusRef.current = document.activeElement as HTMLElement;
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
    setSlideDirection(null);
    setIsInitialOpen(true);
    // Restore focus to the element that had it before opening modal
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  };

  // Extract navigation logic to avoid duplication
  const navigateToIndex = useCallback((targetIndex: number, direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    setIsInitialOpen(false);
    setIsAnimating(true);
    setIsImageLoading(true);
    setSlideDirection(direction);
    
    setTimeout(() => {
      setCurrentIndex(targetIndex);
      setPreviewImage(galleryItems[targetIndex]);
      setSlideDirection(direction === 'left' ? 'slide-in-right' : 'slide-in-left');
      
      setTimeout(() => {
        setSlideDirection(null);
        setIsAnimating(false);
      }, NAVIGATION_TIMING.SLIDE_IN);
    }, NAVIGATION_TIMING.SLIDE_OUT);
  }, [isAnimating, galleryItems]);

  const goToNext = useCallback(() => {
    if (currentIndex < galleryItems.length - 1) {
      navigateToIndex(currentIndex + 1, 'left');
    }
  }, [currentIndex, galleryItems.length, navigateToIndex]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      navigateToIndex(currentIndex - 1, 'right');
    }
  }, [currentIndex, navigateToIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToNext();
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToPrevious();
  };

  // Keyboard navigation and focus trap
  useEffect(() => {
    if (!previewImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClosePreview();
      }
    };

    // Focus trap: keep focus within modal
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;
      
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleTabKey);
    
    // Focus first focusable element in modal
    const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', handleTabKey);
    };
  }, [previewImage, currentIndex, galleryItems, isAnimating, goToNext, goToPrevious]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClosePreview();
    }
  };

  const renderCard = (project: Project | Comic) => {
    // Determine image class based on category
    const getImageClass = () => {
      if (project.category === 'comic') return 'card-image card-image-comic';
      if (project.category === 'art' || project.category === 'render') return 'card-image card-image-gallery';
      if (project.category === 'web-project' || project.category === 'design') return 'card-image card-image-project';
      return 'card-image';
    };

    const isGallery = project.category === 'art' || project.category === 'render';
    const isComic = project.category === 'comic';

    const cardContent = (
      <>
        <img
          src={project.thumbnail}
          alt={project.title}
          className={getImageClass()}
          onClick={isGallery ? (e) => handleImageClick(project, e) : undefined}
          style={{ display: 'block', cursor: 'var(--cursor-pointer)' }}
          draggable={false}
        />
        {!isGallery && !isComic && <div className="card-content-small">
          <h3 className="card-title-small">{project.title}</h3>
          <p className="card-description-works">{project.content}</p>
          <div className="badge-container">
            <span className="badge-category">
              {project.category.replace('-', ' ')}
            </span>
            {project.beta && (
              <span className="badge-beta-small">(Beta)</span>
            )}
            {project.featured && (
              <span className="badge-featured">⭐ Featured</span>
            )}
            {project.link && (
              <span className="badge-live-small">
                🔗 Live
              </span>
            )}
          </div>
        </div>}
      </>
    );

    // Comics: open in new page
    if (isComic) {
      return (
        <Link
          key={project.id}
          to={`/works/${project.id}`}
          rel="noopener noreferrer"
          className="card-works"
        >
          {cardContent}
        </Link>
      );
    }

    // Gallery items: preview on click, link if available
    if (isGallery) {
      if (project.link) {
        return (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card-works"
            onClick={(e) => {
              // If clicking image, show preview instead of navigating
              if ((e.target as HTMLElement).tagName === 'IMG') {
                e.preventDefault();
                handleImageClick(project, e);
              }
            }}
          >
            {cardContent}
          </a>
        );
      }
      // Gallery without link: just show preview
      return (
        <div
          key={project.id}
          className="card-works"
          onClick={(e) => {
            // If clicking image, show preview
            if ((e.target as HTMLElement).tagName === 'IMG') {
              handleImageClick(project, e);
            } else {
              // Clicking card also shows preview
              handleImageClick(project, e);
            }
          }}
        >
          {cardContent}
        </div>
      );
    }

    // Projects and Designs with links: external link
    if (project.link && (project.category === 'web-project' || project.category === 'design')) {
      return (
        <a
          key={project.id}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="card-works"
        >
          {cardContent}
        </a>
      );
    }

    // Default: internal link
    return (
      <Link
        key={project.id}
        to={`/works/${project.id}`}
        className="card-works"
      >
        {cardContent}
      </Link>
    );
  };

  const renderCategorySection = (title: string, items: (Project | Comic)[]) => {
    return (
      <div className="category-section">
        <h2 className="category-heading">{title}</h2>
        {items.length > 0 ? (
          <div className={`grid-works ${title.toLowerCase()}-container`}>
            {items.map(project => renderCard(project))}
          </div>
        ) : (
          <p className="empty-category">No items in this category yet.</p>
        )}
      </div>
    );
  };

  return (
    <>
      <div className='works-container'>
        {renderCategorySection('Projects', projectsByCategory.projects)}
        {renderCategorySection('Designs', projectsByCategory.designs)}
        {renderCategorySection('Comics', projectsByCategory.comics)}
        {renderCategorySection('Stories', projectsByCategory.stories)}
        {renderCategorySection('Gallery', projectsByCategory.gallery)}
      </div>

      {/* Preview Modal for Gallery */}
      {previewImage && createPortal(
        <div
          onClick={handleBackdropClick}
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="modal-content"
          >
            {/* Navigation Buttons */}
            {galleryItems.length > 1 && (
              <>
                {currentIndex > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="btn-nav btn-nav-prev"
                    aria-label="Previous image"
                  >
                    <div className="arrow-icon arrow-left">
                      <ArrowRightIcon />
                    </div>
                  </button>
                )}
                {currentIndex < galleryItems.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="btn-nav btn-nav-next"
                    aria-label="Next image"
                  >
                    <ArrowRightIcon />
                  </button>
                )}
              </>
            )}

            {/* Image Container with Slide Animation */}
            <div className="modal-image-container">
              {isImageLoading && (
                <div className="modal-image-skeleton">
                  <Skeleton variant="image" animation="wave" className="modal-skeleton-inner" />
                </div>
              )}
              <img
                src={previewImage.thumbnail}
                alt={previewImage.title}
                className={`modal-image ${
                  slideDirection === 'slide-in-right' 
                    ? 'slide-in-right' 
                    : slideDirection === 'slide-in-left' 
                      ? 'slide-in-left' 
                      : slideDirection === 'left' 
                        ? 'slide-out-left' 
                        : slideDirection === 'right' 
                          ? 'slide-out-right' 
                          : isInitialOpen && !isAnimating && !slideDirection
                            ? 'modal-image-initial' 
                            : ''
                } ${isImageLoading ? 'loading' : 'loaded'}`}
                key={`${previewImage.id}-${currentIndex}-${isInitialOpen}`}
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
              />
            </div>

            <div style={{ textAlign: 'center', color: '#fff' }}>
              <h3 id="modal-title" style={{ marginBottom: '0.5rem' }}>{previewImage.title}</h3>
              <p id="modal-description" style={{ margin: 0, color: '#aaa' }}>{previewImage.content}</p>
              {galleryItems.length > 1 && (
                <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.875rem' }} aria-live="polite">
                  {currentIndex + 1} / {galleryItems.length}
                </p>
              )}
            </div>
            {previewImage.link && (
              <a
                href={previewImage.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  border: '2px solid #fff',
                  borderRadius: '8px',
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                View Link
              </a>
            )}
            <button
              onClick={handleClosePreview}
              className="btn-close"
              aria-label="Close preview"
            >
              <CloseIcon />
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Works;
