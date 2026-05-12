import { Spinner } from '@/components/spinner/Spinner';
import { CheckIcon } from '@/icons/CheckIcon';
import { CloseIcon } from '@/icons/CloseIcon';
import { FlagIcon } from '@/icons/FlagIcon';
import { type Meta, type StoryObj } from '@storybook/react';
import { Button } from '../button/Button';
import {
  Toast,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  type ToastPosition,
  ToastProvider,
  type ToastStatus,
  ToastTitle,
  ToastViewport,
  Toaster,
  type ToasterToastData,
} from './Toast';
import { useToast } from './useToast';

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

const POSITIONS: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toast',
  component: Toaster,
};

export default meta;

type Story = StoryObj<typeof Toaster>;

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

export const SolidBottomRight: Story = {
  render: () => (
    <ToastProvider>
      <div className="min-h-[240px] p-6">
        <StatusButtons />
      </div>
      <Toaster position="bottom-right" />
    </ToastProvider>
  ),
};

export const SolidTopRight: Story = {
  render: () => (
    <ToastProvider>
      <div className="min-h-[240px] p-6">
        <StatusButtons />
      </div>
      <Toaster position="top-right" />
    </ToastProvider>
  ),
};

export const SolidTopCenter: Story = {
  render: () => (
    <ToastProvider>
      <div className="min-h-[240px] p-6">
        <StatusButtons />
      </div>
      <Toaster position="top-center" />
    </ToastProvider>
  ),
};

export const SubtleTopRight: Story = {
  render: () => (
    <ToastProvider>
      <div className="min-h-[240px] p-6">
        <StatusIconButtons />
      </div>
      <Toaster position="top-right" variant="subtle" />
    </ToastProvider>
  ),
};

export const SubtleBottomRight: Story = {
  render: () => (
    <ToastProvider>
      <div className="min-h-[240px] p-6">
        <StatusIconButtons />
      </div>
      <Toaster position="bottom-right" variant="subtle" />
    </ToastProvider>
  ),
};

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
            icon: <Spinner />,
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
            data: {
              icon: <CheckIcon />,
            },
          });
        }, 2500);
      }}
    >
      Loading toast
    </Button>
  );
}

export const Loading: Story = {
  render: () => (
    <ToastProvider>
      <div className="min-h-[240px] p-6">
        <LoadingButton />
      </div>
      <Toaster position="top-right" variant="subtle" />
    </ToastProvider>
  ),
};

function PositionsRow({ position }: { position: ToastPosition }) {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast.add({
          type: 'info',
          title: position,
        })
      }
    >
      {position}
    </Button>
  );
}

function PositionsScene({ position }: { position: ToastPosition }) {
  return (
    <ToastProvider>
      <div className="flex min-h-[140px] flex-col gap-3 rounded border border-grayscale-200 bg-white p-4">
        <p className="font-sans text-xs text-grayscale-600">
          position: {position}
        </p>
        <PositionsRow position={position} />
      </div>
      <Toaster position={position} />
    </ToastProvider>
  );
}

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-3">
      {POSITIONS.map((position) => (
        <PositionsScene key={position} position={position} />
      ))}
    </div>
  ),
};

function WithDescriptionButton() {
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

export const WithDescription: Story = {
  render: () => (
    <ToastProvider>
      <div className="min-h-[240px] p-6">
        <WithDescriptionButton />
      </div>
      <Toaster />
    </ToastProvider>
  ),
};

function WithActionButton() {
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

export const WithAction: Story = {
  render: () => (
    <ToastProvider>
      <div className="min-h-[240px] p-6">
        <WithActionButton />
      </div>
      <Toaster />
    </ToastProvider>
  ),
};

function WithIconButton() {
  const toast = useToast<ToasterToastData>();
  return (
    <Button
      onClick={() =>
        toast.add({
          type: 'warning',
          title: '請注意系統公告',
          data: { icon: <FlagIcon className="size-5" /> },
        })
      }
    >
      Toast with icon
    </Button>
  );
}

export const WithIcon: Story = {
  render: () => (
    <ToastProvider>
      <div className="min-h-[240px] p-6">
        <WithIconButton />
      </div>
      <Toaster />
    </ToastProvider>
  ),
};

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

export const PromiseFlow: Story = {
  render: () => (
    <ToastProvider>
      <div className="min-h-[240px] p-6">
        <PromiseButton />
      </div>
      <Toaster />
    </ToastProvider>
  ),
};

function StackedButton() {
  const toast = useToast();
  return (
    <Button
      onClick={() => {
        toast.add({ type: 'success', title: '第一則' });
        toast.add({ type: 'warning', title: '第二則' });
        toast.add({ type: 'error', title: '第三則' });
      }}
    >
      Stack three toasts
    </Button>
  );
}

export const Stacked: Story = {
  render: () => (
    <ToastProvider>
      <div className="min-h-[240px] p-6">
        <StackedButton />
      </div>
      <Toaster />
    </ToastProvider>
  ),
};

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

export const CustomDataRenderer: Story = {
  render: () => (
    <ToastProvider>
      <div className="min-h-[240px] p-6">
        <UserToastButton />
      </div>
      <ToastPortal>
        <ToastViewport>
          <UserToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  ),
};
