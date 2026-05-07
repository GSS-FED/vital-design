import type { ComponentPropsWithoutRef } from 'react';

type IconProps = ComponentPropsWithoutRef<'svg'>;

export const ChevronDownIcon = (props: IconProps) => {
  const {
    opacity = 1,
    width = 12,
    height,
    color,
    fill,
    fillOpacity,
    ...svgProps
  } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 7"
      fill={fill ?? color ?? 'currentColor'}
      fillOpacity={fillOpacity ?? opacity}
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path d="M5.53516 6.71484L0.285156 1.46484C0.0117188 1.21875 0.0117188 0.808594 0.285156 0.535156C0.53125 0.289062 0.941406 0.289062 1.21484 0.535156L6 5.34766L10.7852 0.5625C11.0312 0.289062 11.4414 0.289062 11.7148 0.5625C11.9609 0.808594 11.9609 1.21875 11.7148 1.46484L6.4375 6.71484C6.19141 6.98828 5.78125 6.98828 5.53516 6.71484Z" />
    </svg>
  );
};

export const ChevronUpIcon = (props: IconProps) => {
  const {
    opacity,
    width = 12,
    height,
    color,
    fill,
    fillOpacity,
    ...svgProps
  } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 7"
      fill={fill ?? color ?? 'currentColor'}
      fillOpacity={fillOpacity ?? opacity}
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path d="M0.285156 6.03516L5.50781 1.03125C5.67188 0.894531 5.83594 0.8125 6 0.8125C6.16406 0.8125 6.30078 0.867188 6.4375 0.976562L11.6602 5.98047C11.9336 6.25391 11.9336 6.66406 11.6875 6.91016C11.4414 7.18359 11.0312 7.18359 10.7578 6.9375L6 2.39844L1.1875 6.99219C0.941406 7.23828 0.503906 7.23828 0.257812 6.96484C0.0117188 6.69141 0.0117188 6.28125 0.285156 6.03516Z" />
    </svg>
  );
};

export const ChevronRightIcon = (props: IconProps) => {
  const {
    opacity,
    width = 6,
    height = 11,
    color,
    fill,
    fillOpacity,
    ...svgProps
  } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 6 11"
      fill={fill ?? color ?? 'currentColor'}
      fillOpacity={fillOpacity ?? opacity}
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path d="M5.53125 4.71094C5.74219 4.94531 5.74219 5.29688 5.53125 5.50781L1.03125 10.0078C0.796875 10.2422 0.445312 10.2422 0.234375 10.0078C0 9.79688 0 9.44531 0.234375 9.23438L4.33594 5.13281L0.234375 1.00781C0 0.796875 0 0.445312 0.234375 0.234375C0.445312 0 0.796875 0 1.00781 0.234375L5.53125 4.71094Z" />
    </svg>
  );
};

export const ChevronLeftIcon = (props: IconProps) => {
  const {
    opacity = 0.4,
    width = 6,
    height = 11,
    color = 'var(--grayscale-900)',
    fill,
    fillOpacity,
    ...svgProps
  } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 6 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        d="M0.234375 4.71094L4.73438 0.234375C4.94531 0 5.29688 0 5.53125 0.234375C5.74219 0.445312 5.74219 0.796875 5.53125 1.00781L1.40625 5.10938L5.50781 9.23438C5.74219 9.44531 5.74219 9.79688 5.50781 10.0078C5.29688 10.2422 4.94531 10.2422 4.73438 10.0078L0.234375 5.50781C0 5.29688 0 4.94531 0.234375 4.71094Z"
        fill={fill ?? color}
        fillOpacity={fillOpacity ?? opacity}
      />
    </svg>
  );
};
