import '../styles/Skeleton.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'image';
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton = ({
  width,
  height,
  className = '',
  variant = 'rectangular',
  animation = 'pulse',
}: SkeletonProps) => {
  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || '1rem',
  };

  return (
    <div
      className={`skeleton skeleton-${variant} skeleton-${animation} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

export default Skeleton;

