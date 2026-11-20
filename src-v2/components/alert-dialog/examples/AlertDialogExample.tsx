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
import { CircleExclamationSolidIcon } from '@/icons/CircleExclamationSolidIcon';

export function AlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button theme="dangerous">Delete project</Button>}
      />
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogViewport>
          <AlertDialogPopup>
            <AlertDialogBody>
              <AlertDialogMedia className="text-warning-500">
                <CircleExclamationSolidIcon />
              </AlertDialogMedia>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete this project?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  The project and its files will be removed for
                  everyone. This can&apos;t be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogBody>
            <AlertDialogFooter>
              <AlertDialogClose
                render={
                  <Button
                    variant="text"
                    size="lg"
                    className="text-grayscale-opacity-600"
                  >
                    Cancel
                  </Button>
                }
              />
              <AlertDialogClose
                render={
                  <Button variant="text" size="lg" theme="alarm">
                    Delete
                  </Button>
                }
              />
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialogViewport>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
