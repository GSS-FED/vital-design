import type { SVGProps } from 'react';

export const CircleQuestionIcon = (
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
    <g transform="translate(2.999 2.999)">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.39585 4.24908C5.67107 3.70216 6.36619 3.36695 7.07189 3.36695C8.09516 3.36695 8.83614 4.00208 8.83614 4.88421C8.83614 5.63226 8.37744 6.14036 7.95402 6.44558C7.48825 6.86018 7.086 7.30124 7.01896 7.91873M13.3526 7.00132C13.3526 8.68579 12.6835 10.3013 11.4924 11.4924C10.3013 12.6835 8.68579 13.3526 7.00132 13.3526C5.31684 13.3526 3.70136 12.6835 2.51026 11.4924C1.31915 10.3013 0.65 8.68579 0.65 7.00132C0.65 5.31684 1.31915 3.70136 2.51026 2.51026C3.70136 1.31915 5.31684 0.65 7.00132 0.65C8.68579 0.65 10.3013 1.31915 11.4924 2.51026C12.6835 3.70136 13.3526 5.31684 13.3526 7.00132Z"
      />
      <circle cx={6.982} cy={10.365} r={0.845} fill="currentColor" />
    </g>
  </svg>
);
