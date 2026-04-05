'use client';

const KDS_LOGO_URL = 'https://kind-dinners.lovable.app/assets/kds-logo-CTa8x3BO.png';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

export function Logo({ className = '', width, height, alt = 'Kind Diners Society' }: LogoProps) {
  return (
    <img
      src={KDS_LOGO_URL}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={(e) => { e.currentTarget.style.display = 'none'; }}
    />
  );
}
