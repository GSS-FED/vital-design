import type { SVGProps } from 'react';

export const EyeIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10 5.5C5 5.5 3 10 3 10C3 10 5 14.5 10 14.5C15 14.5 17 10 17 10C17 10 15 5.5 10 5.5ZM12.5 10C12.5 11.3807 11.3807 12.5 10 12.5C8.61929 12.5 7.5 11.3807 7.5 10C7.5 8.61929 8.61929 7.5 10 7.5C11.3807 7.5 12.5 8.61929 12.5 10ZM9.45213 8.85676C9.45213 9.27568 9.11253 9.61528 8.69361 9.61528C8.27469 9.61528 7.93509 9.27568 7.93509 8.85676C7.93509 8.43784 8.27469 8.09824 8.69361 8.09824C9.11253 8.09824 9.45213 8.43784 9.45213 8.85676Z"
    />
  </svg>
);
