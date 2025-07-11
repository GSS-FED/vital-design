import { colors } from '../constants';

type SearchIconProps = {
  width: number;
  height: number;
  color?: string;
  opacity?: number;
};

export const SearchIcon = (props: SearchIconProps) => {
  const {
    width,
    height,
    color = colors.grayscale500,
    opacity,
  } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 13"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      fillOpacity={opacity}
    >
      <path d="M8.625 5.375C8.625 4.03906 7.89844 2.82031 6.75 2.14062C5.57812 1.46094 4.14844 1.46094 3 2.14062C1.82812 2.82031 1.125 4.03906 1.125 5.375C1.125 6.73438 1.82812 7.95312 3 8.63281C4.14844 9.3125 5.57812 9.3125 6.75 8.63281C7.89844 7.95312 8.625 6.73438 8.625 5.375ZM7.89844 9.21875C7.05469 9.875 6 10.25 4.875 10.25C2.17969 10.25 0 8.07031 0 5.375C0 2.70312 2.17969 0.5 4.875 0.5C7.54688 0.5 9.75 2.70312 9.75 5.375C9.75 6.52344 9.35156 7.57812 8.69531 8.42188L11.8359 11.5391C12.0469 11.7734 12.0469 12.125 11.8359 12.3359C11.6016 12.5703 11.25 12.5703 11.0391 12.3359L7.89844 9.21875Z" />
    </svg>
  );
};
