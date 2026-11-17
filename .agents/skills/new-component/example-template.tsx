'use client';

// 文件範例模板：src-v2/components/<component-name>/examples/ComponentNameExample.tsx
// 一個檔案一個 export function，檔名與 export 同名；替換所有 ComponentName。
// 其他變體另開 ComponentName<Variant>Example.tsx，靜態狀態集中在
// ComponentNameStatesExample.tsx。整個檔案就是文件 Code tab 的內容，也是一張
// 視覺回歸截圖：不要用 Date.now()、亂數或遠端圖片。
import { ComponentName } from '@/components/component-name/ComponentName';
import { useState } from 'react';

export function ComponentNameExample() {
  const [value, setValue] = useState('');

  return <ComponentName value={value} onValueChange={setValue} />;
}
