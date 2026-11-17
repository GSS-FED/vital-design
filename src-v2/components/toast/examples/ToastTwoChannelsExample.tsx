'use client';

import { Button } from '@/components/button/Button';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/toast/Toast';
import { XmarkIcon } from '@/icons/XmarkIcon';

// In an app, the outer provider would use the exported `toastManager`.
const toast = createToastManager<ToasterToastData>();
const errorToast = createToastManager<ToasterToastData>();

export function ToastTwoChannelsExample() {
  return (
    <ToastProvider toastManager={toast} position="bottom-right">
      <ToastProvider
        toastManager={errorToast}
        position="top-center"
        variant="subtle"
      >
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              toast.add({ type: 'success', title: 'Saved to draft' })
            }
          >
            Bottom-right success
          </Button>
          <Button
            onClick={() =>
              errorToast.add({
                type: 'error',
                title: 'Connection lost',
                data: { icon: <XmarkIcon className="size-5" /> },
              })
            }
          >
            Top-center error
          </Button>
        </div>
      </ToastProvider>
    </ToastProvider>
  );
}
