'use client';

import { useState } from 'react';

interface ImageWrapperProps {
  src: string;
  alt: string;
  className?: string;
  rounded?: boolean;
  objectFit?: 'cover' | 'contain';
  fallbackSrc?: string;
}

export function ImageWrapper({
  src,
  alt,
  className = '',
  rounded = true,
  objectFit = 'cover',
  fallbackSrc = '/assets/placeholder.svg',
}: ImageWrapperProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const roundedClass = rounded ? 'rounded-2xl' : '';
  const objectFitClass = objectFit === 'cover' ? 'object-cover' : 'object-contain';

  return (
    <div className={`relative overflow-hidden ${roundedClass} ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`h-full w-full ${objectFitClass} ${roundedClass}`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    </div>
  );
}
