'use client';

import { Button } from '@/components/button/Button';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/toast/Toast';

const toast = createToastManager<ToasterToastData>();

// Stands in for a request that resolves after 1.5 seconds.
function saveDraft() {
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve('Draft saved'), 1500),
  );
}

export function ToastPromiseFlowExample() {
  return (
    <ToastProvider toastManager={toast}>
      <Button
        onClick={() => {
          void toast.promise(saveDraft(), {
            loading: { type: 'info', title: 'Saving…' },
            success: (result) => ({ type: 'success', title: result }),
            error: {
              type: 'error',
              title: 'Failed, try again later',
            },
          });
        }}
      >
        Promise toast
      </Button>
    </ToastProvider>
  );
}
