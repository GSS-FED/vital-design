import type { SVGProps } from 'react';

export const InfoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <circle cx={12} cy={12} r={10} fill="currentColor" />
    <path fill="currentColor" d="M12 16v-4" />
    <path fill="currentColor" d="M12 8h.01" />
  </svg>
);
