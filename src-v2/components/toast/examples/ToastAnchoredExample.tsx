'use client';

import { Button } from '@/components/button/Button';
import {
  AnchoredToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/toast/Toast';
import { useRef, useState } from 'react';

// In an app, use the exported `anchoredToastManager`.
const toast = createToastManager<ToasterToastData>();

export function ToastAnchoredExample() {
  const ref = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);

  return (
    <AnchoredToastProvider toastManager={toast} variant="subtle">
      <Button
        ref={ref}
        theme="primary"
        onClick={() => {
          const next = count + 1;
          setCount(next);
          toast.add({
            type: 'success',
            title: `Copied! (${next})`,
            positionerProps: {
              anchor: ref.current,
              side: 'top',
              sideOffset: 8,
            },
          });
        }}
      >
        Copy
      </Button>
    </AnchoredToastProvider>
  );
}
