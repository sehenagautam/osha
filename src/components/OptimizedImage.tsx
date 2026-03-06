type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

function OptimizedImage({ src, alt, className, priority = false }: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      width={900}
      height={1200}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

export default OptimizedImage;
