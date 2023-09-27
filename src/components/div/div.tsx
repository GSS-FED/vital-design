import { ComponentProps } from 'react';

type DivProps = ComponentProps<'div'>;

export default function Div(props: DivProps) {
  const { children, ...rest } = props;

  return <div {...rest}>{children}</div>;
}
