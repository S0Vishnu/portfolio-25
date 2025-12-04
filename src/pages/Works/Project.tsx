import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { projects } from '../../data/projectData';
import '../../styles/components.css';
import '../../styles/Project.css';

const Project = () => {
  const { project } = useParams<{ project: string }>();

  // Reset scroll to top whenever project changes
  useEffect(() => {
    // Use requestAnimationFrame to ensure scroll happens after content is rendered
    // This ensures scroll resets even with page transitions
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      // Also try scrolling the document element for better compatibility
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [project]);

  // Find the project and get its chapters if it's a comic
  const projectData = projects.find((p) => p.id === project);
  const chapters: Chapter[] = projectData && projectData.category === 'comic' 
    ? (projectData as Comic).chapters 
    : [];

  if (!projectData) {
    return (
      <div className="project-error">
        <h1>Project Not Found</h1>
        <p>Project with ID "{project}" could not be found.</p>
        <Link to="/works" className="project-error-link">
          ← Back to Works
        </Link>
      </div>
    );
  }

  return (
    <div className="project-page-container">
      <Link to="/works" className="project-back-link">
        Back to Works
      </Link>

      <div className="project-header">
        <div className="project-header-content">
          {projectData.thumbnail && (
            <div className="project-thumbnail">
              <img src={projectData.thumbnail} alt={projectData.title} />
            </div>
          )}
          <div className="project-info">
            <h1 className="project-title">{projectData.title}</h1>
            <p className="project-description">{projectData.content}</p>
            <div className="project-meta">
              <div className="project-meta-item">
                <strong>Category:</strong>
                <span className="project-badge badge-category">
                  {projectData.category.replace('-', ' ')}
                </span>
              </div>
              <div className="project-meta-item">
                <strong>Status:</strong>
                <span className="project-badge badge-status">
                  {projectData.status}
                </span>
              </div>
              {projectData.beta && (
                <span className="project-badge badge-beta">Beta</span>
              )}
              {projectData.featured && (
                <span className="project-badge badge-status">⭐ Featured</span>
              )}
            </div>
            {projectData.link && (
              <a
                href={projectData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-details-link"
                style={{ marginTop: '1rem' }}
              >
                Visit Project ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {chapters.length > 0 && (
        <div className="project-chapters">
          <h2 className="chapters-heading">Chapters</h2>
          <div className="chapters-grid">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                to={`/works/${project}/${chapter.id}`}
                className="chapter-card"
              >
                <h3 className="chapter-title">{chapter.title}</h3>
                <div className="chapter-pages-count">
                  {chapter.pages.length} {chapter.pages.length === 1 ? 'page' : 'pages'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;

