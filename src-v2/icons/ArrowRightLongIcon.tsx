import type { SVGProps } from 'react';

export const ArrowRightLongIcon = (
  props: SVGProps<SVGSVGElement>,
) => (
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
      d="M4.16667 10H15.8333M12.5 6.66667L15.8333 10L12.5 13.3333"
    />
  </svg>
);
