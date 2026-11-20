import type { SVGProps } from 'react';

export const CircleDotIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <g transform="translate(2.976 2.976)">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.35 7C13.35 10.507 10.507 13.35 7 13.35C3.49299 13.35 0.65 10.507 0.65 7C0.65 3.49299 3.49299 0.65 7 0.65C10.507 0.65 13.35 3.49299 13.35 7Z"
      />
      <circle cx={7} cy={7} r={3.25} fill="currentColor" />
    </g>
  </svg>
);
