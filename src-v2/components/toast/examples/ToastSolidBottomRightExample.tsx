'use client';

import { Button } from '@/components/button/Button';
import {
  ToastProvider,
  type ToastStatus,
  type ToasterToastData,
  createToastManager,
} from '@/components/toast/Toast';

// In an app, mount one `ToastProvider` at the root and call the exported
// `toastManager`. Each example here has its own manager so its toasts stay
// in its own viewport.
const toast = createToastManager<ToasterToastData>();

const toasts: { type: ToastStatus; title: string }[] = [
  { type: 'success', title: 'Changes saved' },
  { type: 'warning', title: 'Storage almost full' },
  { type: 'error', title: 'Upload failed' },
  { type: 'info', title: 'New version available' },
];

export function ToastSolidBottomRightExample() {
  return (
    <ToastProvider toastManager={toast}>
      <div className="flex flex-wrap gap-2">
        {toasts.map(({ type, title }) => (
          <Button
            key={type}
            theme="primary"
            onClick={() => toast.add({ type, title })}
          >
            {type}
          </Button>
        ))}
      </div>
    </ToastProvider>
  );
}
