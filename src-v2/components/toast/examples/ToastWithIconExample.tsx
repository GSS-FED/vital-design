'use client';

import { Button } from '@/components/button/Button';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/toast/Toast';
import { FlagIcon } from '@/icons/FlagIcon';

const toast = createToastManager<ToasterToastData>();

export function ToastWithIconExample() {
  return (
    <ToastProvider toastManager={toast}>
      <Button
        onClick={() =>
          toast.add({
            type: 'warning',
            title: 'Maintenance starts at 22:00',
            data: { icon: <FlagIcon className="size-5" /> },
          })
        }
      >
        Toast with icon
      </Button>
    </ToastProvider>
  );
}
