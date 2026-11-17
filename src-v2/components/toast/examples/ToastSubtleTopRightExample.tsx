'use client';

import { Button } from '@/components/button/Button';
import {
  ToastProvider,
  type ToastStatus,
  type ToasterToastData,
  createToastManager,
} from '@/components/toast/Toast';
import { CheckIcon } from '@/icons/CheckIcon';
import { FlagIcon } from '@/icons/FlagIcon';
import { XmarkIcon } from '@/icons/XmarkIcon';
import type { ReactNode } from 'react';

const toast = createToastManager<ToasterToastData>();

const toasts: {
  type: ToastStatus;
  title: string;
  icon: ReactNode;
}[] = [
  {
    type: 'success',
    title: 'Changes saved',
    icon: <CheckIcon className="size-5" />,
  },
  {
    type: 'warning',
    title: 'Storage almost full',
    icon: <FlagIcon className="size-5" />,
  },
  {
    type: 'error',
    title: 'Upload failed',
    icon: <XmarkIcon className="size-5" />,
  },
  {
    type: 'info',
    title: 'New version available',
    icon: <FlagIcon className="size-5" />,
  },
];

export function ToastSubtleTopRightExample() {
  return (
    <ToastProvider
      toastManager={toast}
      position="top-right"
      variant="subtle"
    >
      <div className="flex flex-wrap gap-2">
        {toasts.map(({ type, title, icon }) => (
          <Button
            key={type}
            theme="primary"
            onClick={() => toast.add({ type, title, data: { icon } })}
          >
            {type}
          </Button>
        ))}
      </div>
    </ToastProvider>
  );
}
