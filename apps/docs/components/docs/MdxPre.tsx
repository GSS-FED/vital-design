import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { ComponentProps } from 'react';
import { CodeBlockCommand } from './CodeBlockCommand';

const FumadocsPre = defaultMdxComponents.pre;

type PreProps = ComponentProps<'pre'> & {
  'data-raw'?: string;
  'data-npm'?: string;
  'data-pnpm'?: string;
  'data-yarn'?: string;
  'data-bun'?: string;
};

export function MdxPre({
  'data-raw': _raw,
  'data-npm': dataNpm,
  'data-pnpm': dataPnpm,
  'data-yarn': dataYarn,
  'data-bun': dataBun,
  ...rest
}: PreProps) {
  if (dataNpm) {
    return (
      <CodeBlockCommand
        __npm__={dataNpm}
        __pnpm__={dataPnpm}
        __yarn__={dataYarn}
        __bun__={dataBun}
      />
    );
  }

  return <FumadocsPre {...rest} />;
}
