import { useParams, Link } from 'react-router-dom';
import type { Comic, Chapter } from '../../types';
import { projects } from '../../data/projectData';
import '../../styles/Chapter.css';

const ChapterPage = () => {
  const { project, chapter } = useParams<{ project: string; chapter: string }>();

  // Find the project and get its chapters if it's a comic
  const projectData = projects.find((p) => p.id === project);
  const comicProject = projectData && projectData.category === 'comic' ? (projectData as Comic) : null;
  const chapters: Chapter[] = comicProject?.chapters || [];

  // Find current chapter index
  const currentChapterIndex = chapters.findIndex((ch) => ch.id === chapter);
  const currentChapter = chapters[currentChapterIndex];
  const hasPrevious = currentChapterIndex > 0;
  const hasNext = currentChapterIndex < chapters.length - 1;
  const previousChapter = hasPrevious ? chapters[currentChapterIndex - 1] : null;
  const nextChapter = hasNext ? chapters[currentChapterIndex + 1] : null;

  if (!projectData || !comicProject) {
    return (
      <div>
        <h1>Project Not Found</h1>
        <p>This project doesn't have chapters.</p>
        <Link to="/works">Back to Works</Link>
      </div>
    );
  }

  if (!currentChapter) {
    return (
      <div>
        <h1>Chapter Not Found</h1>
        <p>Chapter "{chapter}" could not be found in this project.</p>
        <Link to={`/works/${project}`}>Back to Project</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{currentChapter.title}</h1>
      <p>
        Chapter <strong>{currentChapter.title}</strong> from project <strong>{projectData.title}</strong>
      </p>

      {/* Chapter Navigation */}
      <div className="nav-container">
        <h3>Navigation</h3>
        <div className="nav-links">
          {hasPrevious && previousChapter && (
            <Link to={`/works/${project}/${previousChapter.id}`}>
              ← Previous: {previousChapter.title}
            </Link>
          )}
          
          <Link to={`/works/${project}`}>All Chapters</Link>
          
          {hasNext && nextChapter && (
            <Link to={`/works/${project}/${nextChapter.id}`}>
              Next: {nextChapter.title} →
            </Link>
          )}
        </div>
        
        {/* Chapter List */}
        <div className="nav-section">
          <h4>All Chapters:</h4>
          <ul>
            {chapters.map((ch, index) => (
              <li key={ch.id}>
                {index === currentChapterIndex ? (
                  <strong>{ch.title} (Current)</strong>
                ) : (
                  <Link to={`/works/${project}/${ch.id}`}>{ch.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;

