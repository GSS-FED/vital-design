type IconProps = {
  width?: number;
  height?: number;
};

export const MinusIcon = (props: IconProps) => {
  const { width, height } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 3"
      width={width}
      height={height}
      fill="currentColor"
    >
      <path d="M9.125 2.25H.875a.74.74 0 0 1-.75-.75c0-.398.328-.75.75-.75h8.25c.398 0 .75.352.75.75 0 .422-.352.75-.75.75z" />
    </svg>
  );
};
