'use client';

import { Button } from '@/components/button/Button';
import { Spinner } from '@/components/spinner/Spinner';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/toast/Toast';
import { CheckIcon } from '@/icons/CheckIcon';

const toast = createToastManager<ToasterToastData>();

export function ToastLoadingExample() {
  return (
    <ToastProvider
      toastManager={toast}
      position="top-right"
      variant="subtle"
    >
      <Button
        onClick={() => {
          // Stands in for a real upload that finishes after 2.5 seconds.
          const upload = setTimeout(() => {
            toast.update('upload', {
              type: 'success',
              title: 'Upload complete',
              timeout: 4000,
              data: { icon: <CheckIcon className="size-5" /> },
            });
          }, 2500);
          toast.add({
            id: 'upload',
            type: 'loading',
            title: 'Uploading…',
            timeout: 0,
            data: {
              icon: <Spinner className="size-5" />,
              cancelProps: {
                children: 'Cancel',
                onClick: () => clearTimeout(upload),
              },
            },
          });
        }}
      >
        Loading toast
      </Button>
    </ToastProvider>
  );
}
