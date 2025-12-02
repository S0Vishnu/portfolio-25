import { useState } from 'react';
import type { Project } from '../types';
import { projects } from '../data/projectData';
import '../styles/Gallery.css';

const Gallery = () => {
  const galleryItems = projects.filter(
    (p) => (p.category === 'art' || p.category === 'render' || p.category === 'design') && p.featured === true
  );

  const [previewImage, setPreviewImage] = useState<Project | null>(null);

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

  return (
    <section id="gallery">
      <h2 className="section-title">Gallery</h2>
      <div className="grid-gallery">
        {galleryItems.map((item) => (
          <div 
            key={item.id} 
            className="card"
            onClick={() => handleImageClick(item)}
          >
            <div className="card-image-container-small">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="card-image"
              />
            </div>
            <div className="card-content">
              <h3 className="card-title-medium">
                {item.title}
              </h3>
              <p className="card-description-small">
                {item.content}
              </p>
              <span className="badge">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewImage && (
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
            <div className="modal-info">
              <h3 className="modal-title">
                {previewImage.title}
              </h3>
              <p className="modal-description">
                {previewImage.content}
              </p>
              <span className="modal-badge">
                {previewImage.category}
              </span>
            </div>
            <button
              onClick={handleClosePreview}
              className="btn-close"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
