import type { SVGProps } from 'react';

export const SquareArrowOutUpRightIcon = (
  props: SVGProps<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.857}
    viewBox="0 0 20 20"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"
      transform="matrix(.7 0 0 .7 1.6 1.35)"
    />
    <path d="m21 3-9 9" transform="matrix(.7 0 0 .7 1.6 1.35)" />
    <path d="M15 3h6v6" transform="matrix(.7 0 0 .7 1.6 1.35)" />
  </svg>
);
