import type { ComponentPropsWithoutRef } from 'react';

type IconProps = ComponentPropsWithoutRef<'svg'>;

export const CheckIcon = (props: IconProps) => {
  const { width, height, ...svgProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 9"
      width={width}
      height={height}
      fill="currentColor"
      {...svgProps}
    >
      <path d="M11.016.984c.305.281.305.773 0 1.055l-6 6c-.281.305-.773.305-1.055 0l-3-3c-.305-.281-.305-.773 0-1.055.281-.305.773-.305 1.055 0l2.461 2.461L9.961.984c.281-.305.773-.305 1.055 0z" />
    </svg>
  );
};
