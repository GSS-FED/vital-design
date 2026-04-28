import type { ComponentPropsWithoutRef } from 'react';

type IconProps = ComponentPropsWithoutRef<'svg'>;

export const CloseIcon = (props: IconProps) => {
  const { width, height, ...svgProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9 9"
      width={width}
      height={height}
      fill="currentColor"
      {...svgProps}
    >
      <path d="M8.086 1.711L5.273 4.523l2.789 2.789c.234.211.234.563 0 .773-.211.234-.562.234-.773 0L4.477 5.297 1.688 8.086c-.211.234-.562.234-.773 0-.234-.211-.234-.563 0-.797L3.703 4.5.914 1.711C.68 1.5.68 1.148.914.914c.211-.211.562-.211.797 0L4.5 3.727 7.289.938c.211-.234.563-.234.797 0a.55.55 0 0 1 0 .773z" />
    </svg>
  );
};
