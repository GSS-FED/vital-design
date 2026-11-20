import type { SVGProps } from 'react';

export const ThumbtackSolidIcon = (
  props: SVGProps<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    strokeWidth={1.75}
    viewBox="0 0 20 20"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M8.0426 8.34307V3.875H11.9574V8.34307L13.75 10.2914V11.6223H10H6.25L6.25002 10.2914L8.0426 8.34307Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.0426 3.875V8.34307L6.25002 10.2914L6.25 11.6223H10M8.0426 3.875H7.00002M8.0426 3.875H11.9574M11.9574 3.875V8.34307L13.75 10.2914V11.6223H10M11.9574 3.875H13M10 11.6223V16.125"
    />
  </svg>
);
