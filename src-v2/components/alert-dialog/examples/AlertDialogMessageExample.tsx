'use client';

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogViewport,
} from '@/components/alert-dialog/AlertDialog';
import { Button } from '@/components/button/Button';
import { CircleCheckSolidIcon } from '@/icons/CircleCheckSolidIcon';
import { CircleExclamationSolidIcon } from '@/icons/CircleExclamationSolidIcon';
import { CircleXmarkSolidIcon } from '@/icons/CircleXmarkSolidIcon';
import type { ReactNode } from 'react';

const messages: {
  status: string;
  icon: ReactNode;
  title: string;
  description: string;
}[] = [
  {
    status: 'Warning',
    icon: <CircleExclamationSolidIcon className="text-warning-500" />,
    title: 'Storage almost full',
    description: 'You have used 90% of your workspace storage.',
  },
  {
    status: 'Success',
    icon: <CircleCheckSolidIcon className="text-success-500" />,
    title: 'Import complete',
    description: 'All 128 records were imported.',
  },
  {
    status: 'Error',
    icon: <CircleXmarkSolidIcon className="text-destructive-500" />,
    title: 'Something went wrong',
    description:
      'The report could not be generated. Try again later.',
  },
];

export function AlertDialogMessageExample() {
  return (
    <div className="flex flex-wrap gap-3">
      {messages.map((message) => (
        <AlertDialog key={message.status}>
          <AlertDialogTrigger
            render={<Button theme="default">{message.status}</Button>}
          />
          <AlertDialogPortal>
            <AlertDialogBackdrop />
            <AlertDialogViewport>
              <AlertDialogPopup>
                <AlertDialogBody>
                  <AlertDialogMedia>{message.icon}</AlertDialogMedia>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {message.title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {message.description}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <AlertDialogClose
                    render={
                      <Button
                        variant="text"
                        size="lg"
                        theme="primary"
                      >
                        OK
                      </Button>
                    }
                  />
                </AlertDialogFooter>
              </AlertDialogPopup>
            </AlertDialogViewport>
          </AlertDialogPortal>
        </AlertDialog>
      ))}
    </div>
  );
}
