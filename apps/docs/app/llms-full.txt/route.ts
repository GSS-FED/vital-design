import { buildLlmsFull } from '~/lib/llms';

export const dynamic = 'force-static';
export const revalidate = false;

export function GET() {
  return new Response(buildLlmsFull(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
