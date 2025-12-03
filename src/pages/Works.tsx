import { Link } from 'react-router-dom';
import { projects } from '../data/projectData';
import '../styles/Works.css';

const Works = () => {
  return (
    <div className='works-container'>
      <h1>Works</h1>
      <p>All Projects</p>
      <div className="grid-works">
        {projects.map((project) => {
          const cardContent = (
            <>
              <img 
                src={project.thumbnail} 
                alt={project.title}
                className="card-image"
                style={{ display: 'block' }}
              />
              <div className="card-content-small">
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
              </div>
            </>
          );

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

          return (
            <Link 
              key={project.id} 
              to={`/works/${project.id}`}
              className="card-works"
            >
              {cardContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Works;
