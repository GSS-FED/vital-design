type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  opacity?: number;
};

export const ChevronDownIcon = (props: IconProps) => {
  const { opacity = 1, width = 50, height, color } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 7"
      fill={color || 'currentColor'}
      fillOpacity={opacity}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.53516 6.71484L0.285156 1.46484C0.0117188 1.21875 0.0117188 0.808594 0.285156 0.535156C0.53125 0.289062 0.941406 0.289062 1.21484 0.535156L6 5.34766L10.7852 0.5625C11.0312 0.289062 11.4414 0.289062 11.7148 0.5625C11.9609 0.808594 11.9609 1.21875 11.7148 1.46484L6.4375 6.71484C6.19141 6.98828 5.78125 6.98828 5.53516 6.71484Z" />
    </svg>
  );
};

export const ChevronUpIcon = (props: IconProps) => {
  const { opacity, width = 50, height, color } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 7"
      fill={color || 'currentColor'}
      fillOpacity={opacity}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.285156 6.03516L5.50781 1.03125C5.67188 0.894531 5.83594 0.8125 6 0.8125C6.16406 0.8125 6.30078 0.867188 6.4375 0.976562L11.6602 5.98047C11.9336 6.25391 11.9336 6.66406 11.6875 6.91016C11.4414 7.18359 11.0312 7.18359 10.7578 6.9375L6 2.39844L1.1875 6.99219C0.941406 7.23828 0.503906 7.23828 0.257812 6.96484C0.0117188 6.69141 0.0117188 6.28125 0.285156 6.03516Z" />
    </svg>
  );
};
