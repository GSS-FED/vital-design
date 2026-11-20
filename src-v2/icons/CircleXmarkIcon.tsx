import type { SVGProps } from 'react';

export const CircleXmarkIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7.88372 7.88336L12.1171 12.1167M12.1171 7.88336L7.88372 12.1167M16.3504 10C16.3504 13.507 13.5074 16.35 10.0004 16.35C6.49338 16.35 3.65039 13.507 3.65039 10C3.65039 6.49302 6.49338 3.65002 10.0004 3.65002C13.5074 3.65002 16.3504 6.49302 16.3504 10Z"
    />
  </svg>
);
