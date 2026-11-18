'use client';

import { Button } from '@/components/button/Button';
import {
  type ToastPosition,
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/toast/Toast';
import { useState } from 'react';

const positions: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

// One provider serves one position, so each position gets its own manager.
function PositionScene({ position }: { position: ToastPosition }) {
  const [toast] = useState(() =>
    createToastManager<ToasterToastData>(),
  );

  return (
    <ToastProvider toastManager={toast} position={position}>
      <div className="flex min-h-35 flex-col gap-3 rounded border border-grayscale-opacity-200 bg-background p-4">
        <p className="font-sans text-xs text-grayscale-opacity-600">
          position: {position}
        </p>
        <Button
          onClick={() =>
            toast.add({ type: 'info', title: `Shown at ${position}` })
          }
        >
          {position}
        </Button>
      </div>
    </ToastProvider>
  );
}

export function ToastPositionsExample() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 p-4 md:grid-cols-3">
      {positions.map((position) => (
        <PositionScene key={position} position={position} />
      ))}
    </div>
  );
}
