import { Link } from 'react-router-dom';
import { projects } from '../data/projectData';
import '../styles/Projects.css';

const Projects = () => {
  // Get up to 3 projects (web-project category)
  const webProjects = projects
    .filter((p) => p.category === 'web-project')
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)) // Prioritize featured
    .slice(0, 3);
  
  // Get up to 2 designs (design category)
  const designs = projects
    .filter((p) => p.category === 'design')
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)) // Prioritize featured
    .slice(0, 2);
  
  // Combine projects and designs (max 5 total)
  const featuredProjects = [...webProjects, ...designs].slice(0, 5);

  type FeaturedProject = (typeof featuredProjects)[number];

  const renderVisualCard = (project: FeaturedProject) => {
    const media = (
      <div className="project-visual-card">
        <div className="project-card-media">
          <img src={project.thumbnail} alt={project.title} />
        </div>
      </div>
    );

    if (project.link) {
      return (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-visual-link"
        >
          {media}
        </a>
      );
    }

    return (
      <Link to={`/works/${project.id}`} className="project-visual-link">
        {media}
      </Link>
    );
  };

  const renderDetails = (project: FeaturedProject) => {
    return (
      <div className="project-details">
        <div className="project-card-meta">
          <span className="project-pill">{project.category.replace('-', ' ')}</span>
          {project.beta && <span className="project-pill pill-muted">beta</span>}
          {project.status && <span className="project-pill pill-outline">{project.status}</span>}
        </div>
        <h3>{project.title}</h3>
        <p>{project.content}</p>
        {project.link ? (
          <a
            className="project-details-link"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore project ↗
          </a>
        ) : (
          <Link className="project-details-link" to={`/works/${project.id}`}>
            Explore project ↗
          </Link>
        )}
      </div>
    );
  };

  return (
    <section id="projects" className="latest-work-section">
      <div className="latest-work-frame">
        <header className="projects-heading">
          <p className="projects-eyebrow">Curated collaborations · 2025</p>
          <h2>My Latest Work</h2>
          <p className="projects-subtitle">
            A snapshot of multi-disciplinary projects pairing identity, product and playful visuals.
          </p>
        </header>

        <div className="projects-zigzag">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              className={`zigzag-row ${index % 2 === 1 ? 'is-reverse' : ''}`}
            >
              {renderVisualCard(project)}
              {renderDetails(project)}
            </article>
          ))}
        </div>

        <div className="projects-cta">
          <Link to="/works" className="projects-cta-link">
            View full archive
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
