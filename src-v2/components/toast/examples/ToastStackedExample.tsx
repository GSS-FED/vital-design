'use client';

import { Button } from '@/components/button/Button';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/toast/Toast';

const toast = createToastManager<ToasterToastData>();

export function ToastStackedExample() {
  return (
    <ToastProvider toastManager={toast}>
      <Button
        onClick={() => {
          toast.add({ type: 'success', title: 'File uploaded' });
          toast.add({
            type: 'warning',
            title: 'Storage almost full',
          });
          toast.add({ type: 'error', title: 'Sync failed' });
        }}
      >
        Stack three toasts
      </Button>
    </ToastProvider>
  );
}
