import { Link } from 'react-router-dom';
import { projects } from '../data/projectData';
import '../styles/Projects.css';

const Projects = () => {
  const featuredProjects = projects.filter(
    (p) => p.featured === true && p.category !== 'art' && p.category !== 'render'
  );

  return (
    <section id="projects">
      <h2 className="section-title">Featured Projects</h2>
      <div className="grid-projects">
        {featuredProjects.map((project) => {
          const CardContent = (
            <>
              <div className="card-image-container">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">
                  {project.title}
                </h3>
                <p className="card-description">
                  {project.content}
                </p>
                <div className="badge-container">
                  <span className="badge">
                    {project.category.replace('-', ' ')}
                  </span>
                  {project.beta && (
                    <span className="badge-beta">
                      Beta
                    </span>
                  )}
                  {project.link && (
                    <span className="badge-live">
                      🔗 Live
                    </span>
                  )}
                </div>
              </div>
            </>
          );

          if (project.link) {
            return (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
              >
                {CardContent}
              </a>
            );
          }

          return (
            <Link 
              key={project.id} 
              to={`/works/${project.id}`}
              className="card"
            >
              {CardContent}
            </Link>
          );
        })}
      </div>
      <div className="center-container">
        <Link 
          to="/works" 
          className="btn-primary"
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
};

export default Projects;
