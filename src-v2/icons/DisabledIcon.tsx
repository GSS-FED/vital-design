type IconProps = {
  width?: number;
  height?: number;
};

export const DisabledIcon = (props: IconProps) => {
  const { width = 50, height = 50 } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 42 42"
      width={width}
      height={height}
      fill="currentColor"
    >
      <path d="M42 21C42 32.6484 32.5664 42 21 42C9.35156 42 0 32.6484 0 21C0 9.43359 9.35156 0 21 0C32.5664 0 42 9.43359 42 21ZM7.54687 10.418C5.25 13.3711 3.9375 17.0625 3.9375 21C3.9375 30.4336 11.5664 38.0625 21 38.0625C24.9375 38.0625 28.6289 36.75 31.582 34.4531L7.54687 10.418ZM38.0625 21C38.0625 11.6484 30.3516 3.9375 21 3.9375C16.9805 3.9375 13.2891 5.33203 10.3359 7.62891L34.3711 31.6641C36.668 28.7109 38.0625 25.0195 38.0625 21Z" />
    </svg>
  );
};
