'use client';

import { Button } from '@/components/button/Button';
import { Spinner } from '@/components/spinner/Spinner';
import {
  Toast,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  type ToastStatus,
  ToastTitle,
  ToastViewport,
  Toaster,
  type ToasterToastData,
} from '@/components/toast/Toast';
import { useToast } from '@/components/toast/useToast';
import { CheckIcon } from '@/icons/CheckIcon';
import { CloseIcon } from '@/icons/CloseIcon';
import { FlagIcon } from '@/icons/FlagIcon';
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

function StatusButtons() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((status) => (
        <Button
          key={status}
          theme="primary"
          onClick={() =>
            toast.add({
              type: status,
              title: `${status} 提示`,
            })
          }
        >
          {status}
        </Button>
      ))}
    </div>
  );
}

function StatusIconButtons() {
  const toast = useToast<ToasterToastData>();
  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((status) => (
        <Button
          key={status}
          theme="primary"
          onClick={() =>
            toast.add({
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
  return (
    <ComponentPreview centered={false}>
      <ToastProvider>
        <StatusButtons />
        <Toaster />
      </ToastProvider>
    </ComponentPreview>
  );
}

export function ToastTopRightPreview() {
  return (
    <ComponentPreview centered={false}>
      <ToastProvider>
        <StatusButtons />
        <Toaster position="top-right" />
      </ToastProvider>
    </ComponentPreview>
  );
}

export function ToastSubtlePreview() {
  return (
    <ComponentPreview centered={false}>
      <ToastProvider>
        <StatusIconButtons />
        <Toaster position="top-right" variant="subtle" />
      </ToastProvider>
    </ComponentPreview>
  );
}

export function ToastTopCenterPreview() {
  return (
    <ComponentPreview centered={false}>
      <ToastProvider>
        <StatusButtons />
        <Toaster position="top-center" />
      </ToastProvider>
    </ComponentPreview>
  );
}

function LoadingButton() {
  const toast = useToast<ToasterToastData>();
  return (
    <Button
      onClick={() => {
        const id = toast.add({
          type: 'loading',
          title: '上傳中',
          timeout: 0,
          data: {
            icon: <Spinner className="size-5" />,
            cancelProps: {
              children: '取消',
              onClick: () => {
                window.alert('已取消');
              },
            },
          },
          actionProps: {
            children: '動作',
            onClick: () => {
              window.alert('已執行動作');
            },
          },
        });
        setTimeout(() => {
          toast.update(id, {
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
  return (
    <ComponentPreview centered={false}>
      <ToastProvider>
        <LoadingButton />
        <Toaster position="top-right" variant="subtle" />
      </ToastProvider>
    </ComponentPreview>
  );
}

function DescriptionButton() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast.add({
          type: 'success',
          title: '已成功儲存',
          description: '所有變更已套用至專案。',
        })
      }
    >
      Toast with description
    </Button>
  );
}

export function ToastDescriptionPreview() {
  return (
    <ComponentPreview centered={false}>
      <ToastProvider>
        <DescriptionButton />
        <Toaster />
      </ToastProvider>
    </ComponentPreview>
  );
}

function ActionButton() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast.add({
          type: 'info',
          title: '已封存項目',
          actionProps: {
            children: '復原',
            onClick: () => {
              window.alert('已復原');
            },
          },
        })
      }
    >
      Toast with action
    </Button>
  );
}

export function ToastActionPreview() {
  return (
    <ComponentPreview centered={false}>
      <ToastProvider>
        <ActionButton />
        <Toaster />
      </ToastProvider>
    </ComponentPreview>
  );
}

function IconButton() {
  const toast = useToast<ToasterToastData>();
  return (
    <Button
      onClick={() =>
        toast.add({
          type: 'warning',
          title: '請注意系統公告',
          data: {
            icon: <FlagIcon className="size-5" />,
          },
        })
      }
    >
      Toast with icon
    </Button>
  );
}

export function ToastIconPreview() {
  return (
    <ComponentPreview centered={false}>
      <ToastProvider>
        <IconButton />
        <Toaster />
      </ToastProvider>
    </ComponentPreview>
  );
}

function PromiseButton() {
  const toast = useToast();
  return (
    <Button
      onClick={() => {
        const work = new Promise<string>((resolve) =>
          setTimeout(() => resolve('完成'), 1500),
        );
        void toast.promise(work, {
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
  );
}

export function ToastPromisePreview() {
  return (
    <ComponentPreview centered={false}>
      <ToastProvider>
        <PromiseButton />
        <Toaster />
      </ToastProvider>
    </ComponentPreview>
  );
}

type UserToastData = {
  userId: string;
};

function UserToastButton() {
  const toast = useToast<UserToastData>();

  return (
    <Button
      onClick={() =>
        toast.add({
          title: 'Toast with custom data',
          data: { userId: '123' },
        })
      }
    >
      Custom data toast
    </Button>
  );
}

function UserToastList() {
  const { toasts } = useToast<UserToastData>();

  return toasts.map((toast) => (
    <Toast
      key={toast.id}
      toast={toast}
      className="bottom-0 right-0 min-w-[300px] bg-white p-4 text-grayscale-800"
    >
      <ToastContent className="min-w-0 flex-1">
        <div className="min-w-0 flex-1">
          <ToastTitle>{toast.title}</ToastTitle>
          <ToastDescription className="text-grayscale-600">
            userId: {toast.data?.userId}
          </ToastDescription>
        </div>
        <ToastClose className="text-grayscale-500 hover:text-grayscale-700 focus-visible:text-grayscale-700" />
      </ToastContent>
    </Toast>
  ));
}

export function ToastCustomDataPreview() {
  return (
    <ComponentPreview centered={false}>
      <ToastProvider>
        <UserToastButton />
        <ToastPortal>
          <ToastViewport>
            <UserToastList />
          </ToastViewport>
        </ToastPortal>
      </ToastProvider>
    </ComponentPreview>
  );
}
