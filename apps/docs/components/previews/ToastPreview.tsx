'use client';

import { Button } from '@/components/button/Button';
import { Spinner } from '@/components/spinner/Spinner';
import {
  AnchoredToastProvider,
  ToastProvider,
  type ToastStatus,
  type ToasterToastData,
  createToastManager,
} from '@/components/toast/Toast';
import { CheckIcon } from '@/icons/CheckIcon';
import { CloseIcon } from '@/icons/CloseIcon';
import { FlagIcon } from '@/icons/FlagIcon';
import { useMemo, useRef, useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const STATUSES: ToastStatus[] = [
  'success',
  'warning',
  'error',
  'info',
];

const STATUS_ICON_NODE: Record<ToastStatus, React.ReactNode> = {
  success: <CheckIcon className="size-5" />,
  warning: <FlagIcon className="size-5" />,
  error: <CloseIcon className="size-5" />,
  info: <FlagIcon className="size-5" />,
  loading: <Spinner className="size-5" />,
};

function useFreshManager() {
  return useMemo(() => createToastManager<ToasterToastData>(), []);
}

function StatusButtons({
  manager,
}: {
  manager: ReturnType<typeof useFreshManager>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((status) => (
        <Button
          key={status}
          theme="primary"
          onClick={() =>
            manager.add({ type: status, title: `${status} 提示` })
          }
        >
          {status}
        </Button>
      ))}
    </div>
  );
}

function StatusIconButtons({
  manager,
}: {
  manager: ReturnType<typeof useFreshManager>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((status) => (
        <Button
          key={status}
          theme="primary"
          onClick={() =>
            manager.add({
              type: status,
              title: `${status} 提示`,
              data: { icon: STATUS_ICON_NODE[status] },
            })
          }
        >
          {status}
        </Button>
      ))}
    </div>
  );
}

export function ToastPreview() {
  const manager = useFreshManager();
  return (
    <ComponentPreview centered={false}>
      <ToastProvider toastManager={manager}>
        <StatusButtons manager={manager} />
      </ToastProvider>
    </ComponentPreview>
  );
}

export function ToastTopRightPreview() {
  const manager = useFreshManager();
  return (
    <ComponentPreview centered={false}>
      <ToastProvider toastManager={manager} position="top-right">
        <StatusButtons manager={manager} />
      </ToastProvider>
    </ComponentPreview>
  );
}

export function ToastSubtlePreview() {
  const manager = useFreshManager();
  return (
    <ComponentPreview centered={false}>
      <ToastProvider
        toastManager={manager}
        position="top-right"
        variant="subtle"
      >
        <StatusIconButtons manager={manager} />
      </ToastProvider>
    </ComponentPreview>
  );
}

export function ToastTopCenterPreview() {
  const manager = useFreshManager();
  return (
    <ComponentPreview centered={false}>
      <ToastProvider toastManager={manager} position="top-center">
        <StatusButtons manager={manager} />
      </ToastProvider>
    </ComponentPreview>
  );
}

function LoadingButton({
  manager,
}: {
  manager: ReturnType<typeof useFreshManager>;
}) {
  return (
    <Button
      onClick={() => {
        const id = manager.add({
          type: 'loading',
          title: '上傳中',
          timeout: 0,
          data: {
            icon: <Spinner className="size-5" />,
            cancelProps: {
              children: '取消',
              onClick: () => window.alert('已取消'),
            },
          },
          actionProps: {
            children: '動作',
            onClick: () => window.alert('已執行動作'),
          },
        });
        setTimeout(() => {
          manager.update(id, {
            type: 'success',
            title: '上傳完成',
            timeout: 4000,
            data: { icon: <CheckIcon className="size-5" /> },
          });
        }, 2500);
      }}
    >
      Loading toast
    </Button>
  );
}

export function ToastLoadingPreview() {
  const manager = useFreshManager();
  return (
    <ComponentPreview centered={false}>
      <ToastProvider
        toastManager={manager}
        position="top-right"
        variant="subtle"
      >
        <LoadingButton manager={manager} />
      </ToastProvider>
    </ComponentPreview>
  );
}

export function ToastDescriptionPreview() {
  const manager = useFreshManager();
  return (
    <ComponentPreview centered={false}>
      <ToastProvider toastManager={manager}>
        <Button
          onClick={() =>
            manager.add({
              type: 'success',
              title: '已成功儲存',
              description: '所有變更已套用至專案。',
            })
          }
        >
          Toast with description
        </Button>
      </ToastProvider>
    </ComponentPreview>
  );
}

export function ToastActionPreview() {
  const manager = useFreshManager();
  return (
    <ComponentPreview centered={false}>
      <ToastProvider toastManager={manager}>
        <Button
          onClick={() =>
            manager.add({
              type: 'info',
              title: '已封存項目',
              actionProps: {
                children: '復原',
                onClick: () => window.alert('已復原'),
              },
            })
          }
        >
          Toast with action
        </Button>
      </ToastProvider>
    </ComponentPreview>
  );
}

export function ToastIconPreview() {
  const manager = useFreshManager();
  return (
    <ComponentPreview centered={false}>
      <ToastProvider toastManager={manager}>
        <Button
          onClick={() =>
            manager.add({
              type: 'warning',
              title: '請注意系統公告',
              data: { icon: <FlagIcon className="size-5" /> },
            })
          }
        >
          Toast with icon
        </Button>
      </ToastProvider>
    </ComponentPreview>
  );
}

export function ToastPromisePreview() {
  const manager = useFreshManager();
  return (
    <ComponentPreview centered={false}>
      <ToastProvider toastManager={manager}>
        <Button
          onClick={() => {
            const work = new Promise<string>((resolve) =>
              setTimeout(() => resolve('完成'), 1500),
            );
            void manager.promise(work, {
              loading: { type: 'info', title: '處理中…' },
              success: (result) => ({
                type: 'success',
                title: result,
              }),
              error: { type: 'error', title: '失敗，請稍後再試' },
            });
          }}
        >
          Promise toast
        </Button>
      </ToastProvider>
    </ComponentPreview>
  );
}

export function ToastTwoChannelsPreview() {
  const bottomManager = useFreshManager();
  const topManager = useFreshManager();
  return (
    <ComponentPreview centered={false}>
      <ToastProvider
        toastManager={bottomManager}
        position="bottom-right"
      >
        <ToastProvider
          toastManager={topManager}
          position="top-center"
          variant="subtle"
        >
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() =>
                bottomManager.add({
                  type: 'success',
                  title: 'Saved to draft',
                })
              }
            >
              Bottom-right success
            </Button>
            <Button
              onClick={() =>
                topManager.add({
                  type: 'error',
                  title: 'Connection lost',
                  data: { icon: <CloseIcon className="size-5" /> },
                })
              }
            >
              Top-center error
            </Button>
          </div>
        </ToastProvider>
      </ToastProvider>
    </ComponentPreview>
  );
}

export function ToastAnchoredPreview() {
  const manager = useFreshManager();
  const ref = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);
  return (
    <ComponentPreview>
      <AnchoredToastProvider toastManager={manager} variant="subtle">
        <Button
          ref={ref}
          theme="primary"
          onClick={() => {
            const next = count + 1;
            setCount(next);
            manager.add({
              type: 'success',
              title: `Copied! (${next})`,
              positionerProps: {
                anchor: ref.current,
                side: 'top',
                sideOffset: 8,
              },
            });
          }}
        >
          Copy
        </Button>
      </AnchoredToastProvider>
    </ComponentPreview>
  );
}
