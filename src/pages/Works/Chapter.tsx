import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { projects } from '../../data/projectData';
import LazyImage from '../../components/LazyImage';
import '../../styles/Chapter.css';

const ChapterPage = () => {
  const { project, chapter } = useParams<{ project: string; chapter: string }>();

  // Reset scroll to top whenever chapter changes
  useEffect(() => {
    // Use requestAnimationFrame to ensure scroll happens after content is rendered
    // This ensures scroll resets even with page transitions
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      // Also try scrolling the document element for better compatibility
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [chapter, project]);

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
      <div className="chapter-container">
        <h1>Project Not Found</h1>
        <p>This project doesn't have chapters.</p>
        <Link to="/works">Back to Works</Link>
      </div>
    );
  }

  if (!currentChapter) {
    return (
      <div className="chapter-container">
        <h1>Chapter Not Found</h1>
        <p>Chapter "{chapter}" could not be found in this project.</p>
        <Link to={`/works/${project}`}>Back to Project</Link>
      </div>
    );
  }

  return (
    <div className="chapter-container">
      {/* Header */}
      <div className="chapter-header">
        <h1>{currentChapter.title}</h1>
        <p className="chapter-subtitle">
          Chapter <strong>{currentChapter.title}</strong> from <strong>{projectData.title}</strong>
        </p>
      </div>

      {/* Chapter Navigation */}
      <div className="nav-container">
        <div className="nav-links">
          {hasPrevious && previousChapter && (
            <Link to={`/works/${project}/${previousChapter.id}`} className="nav-link">
              ← Previous
            </Link>
          )}

          <Link to={`/works/${project}`} className="nav-link">All Chapters</Link>

          {hasNext && nextChapter && (
            <Link to={`/works/${project}/${nextChapter.id}`} className="nav-link">
              Next →
            </Link>
          )}
        </div>
      </div>

      {/* Comic Pages */}
      <div className="comic-pages-container">
        {currentChapter.pages.map((page) => (
          <div key={page.id} className="comic-page-wrapper">
            {page.url && (
              <LazyImage
                src={page.url}
                alt={`${projectData.title} - ${currentChapter.title} - Page ${page.number}`}
                className="comic-page-image"
              />
            )}
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="nav-container nav-bottom">
        <div className="nav-links">
          {hasPrevious && previousChapter && (
            <Link to={`/works/${project}/${previousChapter.id}`} className="nav-link">
              ← Previous: {previousChapter.title}
            </Link>
          )}

          <Link to={`/works/${project}`} className="nav-link">All Chapters</Link>

          {hasNext && nextChapter && (
            <Link to={`/works/${project}/${nextChapter.id}`} className="nav-link">
              Next: {nextChapter.title} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;

