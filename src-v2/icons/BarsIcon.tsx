import type { SVGProps } from 'react';

export const BarsIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4.5 10H15.5M4.5 14H15.5M4.5 6H15.5"
    />
  </svg>
);
