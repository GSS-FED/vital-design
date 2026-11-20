import type { SVGProps } from 'react';

export const CircleInfoIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <g transform="translate(3 3)">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.00059 10.0296V7.025M13.35 7C13.35 10.507 10.507 13.35 7 13.35C3.49299 13.35 0.65 10.507 0.65 7C0.65 3.49299 3.49299 0.65 7 0.65C10.507 0.65 13.35 3.49299 13.35 7Z"
      />
      <circle cx={7} cy={4.538} r={0.873} fill="currentColor" />
    </g>
  </svg>
);
