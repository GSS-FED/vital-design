import type { SVGProps } from 'react';

export const InfoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.3}
    viewBox="0 0 20 20"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <circle cx={10} cy={10} r={6.35} />
    <path d="M10 12.54V10" />
    <path d="M10 7.46h.01" />
  </svg>
);
