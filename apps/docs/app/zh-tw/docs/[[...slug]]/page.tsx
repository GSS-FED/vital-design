import {
  DocsContentPage,
  metadataFor,
  staticParamsFor,
} from '~/app/docs/[[...slug]]/page';

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return <DocsContentPage locale="zh-tw" slug={slug} />;
}

export function generateStaticParams() {
  return staticParamsFor('zh-tw');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return metadataFor('zh-tw', slug);
}

export const dynamicParams = false;
