import { useParams, Link } from 'react-router-dom';
import type { Chapter, Comic } from '../../types';
import { projects } from '../../data/projectData';
import '../../styles/components.css';

const Project = () => {
  const { project } = useParams<{ project: string }>();

  // Find the project and get its chapters if it's a comic
  const projectData = projects.find((p) => p.id === project);
  const chapters: Chapter[] = projectData && projectData.category === 'comic' 
    ? (projectData as Comic).chapters 
    : [];

  if (!projectData) {
    return (
      <div>
        <h1>Project Not Found</h1>
        <p>Project with ID "{project}" could not be found.</p>
        <Link to="/works">Back to Works</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{projectData.title}</h1>
      <p>{projectData.content}</p>
      <p>
        <strong>Category:</strong> {projectData.category} | 
        <strong> Status:</strong> {projectData.status}
        {projectData.beta && <span className="badge-beta-small" style={{ marginLeft: '0.5rem' }}>(Beta)</span>}
      </p>
      {chapters.length > 0 && (
        <>
          <h2>Chapters:</h2>
          <ul>
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <Link to={`/works/${project}/${chapter.id}`}>{chapter.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Project;

