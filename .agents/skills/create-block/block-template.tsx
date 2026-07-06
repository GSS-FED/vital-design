// Block 結構模板
// 替換 BlockName、block-name、props 定義與 JSX 內容
import ComponentA from '@/components/component-a/ComponentA';
import ComponentB from '@/components/component-b/ComponentB';
import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

export type BlockNameProps = {
  // 必要 props（無預設值）
  requiredProp: string;
  // 可選 props（有預設值或可選）
  optionalProp?: string;
  children?: ReactNode;
  className?: string;
};

export function BlockName({
  requiredProp,
  optionalProp,
  children,
  className,
}: BlockNameProps) {
  return (
    <div
      className={cn(
        // 基礎 Layout classes
        'flex items-center gap-4',
        // 視覺樣式 classes
        'border border-grayscale-opacity-200 rounded-lg bg-white p-4',
        // 允許外部覆寫
        className,
      )}
    >
      {/* 組合元件 */}
      <ComponentA prop={requiredProp} />
      {optionalProp && <ComponentB>{optionalProp}</ComponentB>}
      {children}
    </div>
  );
}

// ===== Registry 條目範本 =====
// 新增 block 後，在 registry/blocks.ts 的 blocks 陣列加入（勿直接編輯 registry.json）：
// 同時在 registry/types.ts 的 RegistryItemName union 中加入新的 block 名稱。
// 修改後執行 pnpm run registry:build 產生 registry.json。
//
// {
//   name: 'block-name',
//   type: 'registry:block',
//   title: 'Block Name',
//   description: '區塊描述',
//   categories: ['category1', 'category2'],
//   dependencies: ['clsx', 'tailwind-merge'],
//   registryDependencies: [
//     '@vital-design/utils',
//     '@vital-design/component-a',
//     '@vital-design/component-b',
//   ],
//   files: [
//     {
//       path: 'src-v2/blocks/block-name/BlockName.tsx',
//       type: 'registry:component',
//     },
//   ],
// }
