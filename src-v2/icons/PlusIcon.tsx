import type { SVGProps } from 'react';

export const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M6.75 1.125c.422 0 .75.328.75.75v3.375h3.375c.422 0 .75.328.75.75s-.328.75-.75.75H7.5v3.375c0 .422-.328.75-.75.75s-.75-.328-.75-.75V6.75H2.625a.74.74 0 0 1-.75-.75c0-.422.328-.75.75-.75H6V1.875c0-.422.328-.75.75-.75z" />
  </svg>
);
