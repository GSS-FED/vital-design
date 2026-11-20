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
import { Checkbox } from '@/components/checkbox/Checkbox';
import { Field, FieldLabel } from '@/components/field/Field';
import { CircleExclamationSolidIcon } from '@/icons/CircleExclamationSolidIcon';
import { useState } from 'react';

export function AlertDialogCheckboxExample() {
  const [skipToday, setSkipToday] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button theme="default">Merge items</Button>}
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
                  Merge the selected items?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Their comments and attachments will be combined into
                  one item.
                </AlertDialogDescription>
                <Field orientation="horizontal" className="mt-2">
                  <Checkbox
                    id="alert-dialog-skip-today"
                    checked={skipToday}
                    onCheckedChange={setSkipToday}
                  />
                  <FieldLabel htmlFor="alert-dialog-skip-today">
                    Don&apos;t ask again today
                  </FieldLabel>
                </Field>
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
                  <Button variant="text" size="lg" theme="primary">
                    Merge
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
