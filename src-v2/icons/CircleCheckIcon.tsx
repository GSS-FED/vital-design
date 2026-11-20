import type { SVGProps } from 'react';

export const CircleCheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    strokeWidth={1.3}
    viewBox="0 0 20 20"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.35456 10.5291L8.94206 12.1166L12.6462 8.4124M16.3504 9.9999C16.3504 13.5069 13.5074 16.3499 10.0004 16.3499C6.49338 16.3499 3.65039 13.5069 3.65039 9.9999C3.65039 6.49289 6.49338 3.6499 10.0004 3.6499C13.5074 3.6499 16.3504 6.49289 16.3504 9.9999Z"
    />
  </svg>
);
