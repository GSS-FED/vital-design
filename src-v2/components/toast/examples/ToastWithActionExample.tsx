'use client';

import { Button } from '@/components/button/Button';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/toast/Toast';

const toast = createToastManager<ToasterToastData>();

export function ToastWithActionExample() {
  return (
    <ToastProvider toastManager={toast}>
      <Button
        onClick={() =>
          toast.add({
            type: 'info',
            title: 'Item archived',
            actionProps: {
              children: 'Undo',
              onClick: () =>
                toast.add({
                  type: 'success',
                  title: 'Item restored',
                }),
            },
          })
        }
      >
        Toast with action
      </Button>
    </ToastProvider>
  );
}
