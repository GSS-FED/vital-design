'use client';

import { Button } from '@/components/button/Button';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/toast/Toast';

const toast = createToastManager<ToasterToastData>();

export function ToastWithDescriptionExample() {
  return (
    <ToastProvider toastManager={toast}>
      <Button
        onClick={() =>
          toast.add({
            type: 'success',
            title: 'Changes saved',
            description: 'All changes were applied to the project.',
          })
        }
      >
        Toast with description
      </Button>
    </ToastProvider>
  );
}
