import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-description">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-button">
            Go to Home
          </Link>
          <Link to="/works" className="not-found-link">
            View Works
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

