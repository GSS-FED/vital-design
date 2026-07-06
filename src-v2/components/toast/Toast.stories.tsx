import { Spinner } from '@/components/spinner/Spinner';
import { CheckIcon } from '@/icons/CheckIcon';
import { CloseIcon } from '@/icons/CloseIcon';
import { FlagIcon } from '@/icons/FlagIcon';
import { type Meta, type StoryObj } from '@storybook/react';
import { useMemo, useRef, useState } from 'react';
import { Button } from '../button/Button';
import {
  AnchoredToastProvider,
  type ToastPosition,
  ToastProvider,
  type ToastStatus,
  type ToastVariant,
  type ToasterToastData,
  createToastManager,
  useToast,
} from './Toast';

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

type ToastStoryParams = {
  anchored?: boolean;
  position?: ToastPosition;
  variant?: ToastVariant;
};

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Toast',
  component: ToastProvider,
  decorators: [
    (Story, context) => {
      const params = (context.parameters.toast ??
        {}) as ToastStoryParams;
      const manager = useMemo(
        () => createToastManager<ToasterToastData>(),
        [],
      );

      if (params.anchored) {
        return (
          <AnchoredToastProvider
            toastManager={manager}
            variant={params.variant}
          >
            <Story />
          </AnchoredToastProvider>
        );
      }

      return (
        <ToastProvider
          toastManager={manager}
          position={params.position}
          variant={params.variant}
        >
          <Story />
        </ToastProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof ToastProvider>;

function StatusButtons() {
  const toast = useToast<ToasterToastData>();
  return (
    <div className="flex flex-wrap gap-2 p-6">
      {STATUSES.map((status) => (
        <Button
          key={status}
          theme="primary"
          onClick={() =>
            toast.add({ type: status, title: `${status} 提示` })
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
    <div className="flex flex-wrap gap-2 p-6">
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
  render: () => <StatusButtons />,
};

export const SolidTopRight: Story = {
  parameters: { toast: { position: 'top-right' } },
  render: () => <StatusButtons />,
};

export const SolidTopCenter: Story = {
  parameters: { toast: { position: 'top-center' } },
  render: () => <StatusButtons />,
};

export const SubtleTopRight: Story = {
  parameters: {
    toast: { position: 'top-right', variant: 'subtle' },
  },
  render: () => <StatusIconButtons />,
};

export const SubtleBottomRight: Story = {
  parameters: { toast: { variant: 'subtle' } },
  render: () => <StatusIconButtons />,
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
              onClick: () => window.alert('已取消'),
            },
          },
          actionProps: {
            children: '動作',
            onClick: () => window.alert('已執行動作'),
          },
        });
        setTimeout(() => {
          toast.update(id, {
            type: 'success',
            title: '上傳完成',
            timeout: 4000,
            data: { icon: <CheckIcon /> },
          });
        }, 2500);
      }}
    >
      Loading toast
    </Button>
  );
}

export const Loading: Story = {
  parameters: {
    toast: { position: 'top-right', variant: 'subtle' },
  },
  render: () => (
    <div className="p-6">
      <LoadingButton />
    </div>
  ),
};

function PositionScene({ position }: { position: ToastPosition }) {
  const manager = useMemo(
    () => createToastManager<ToasterToastData>(),
    [],
  );
  return (
    <ToastProvider toastManager={manager} position={position}>
      <div className="flex min-h-[140px] flex-col gap-3 rounded border border-grayscale-opacity-200 bg-white p-4">
        <p className="font-sans text-xs text-grayscale-opacity-600">
          position: {position}
        </p>
        <Button
          onClick={() =>
            manager.add({ type: 'info', title: position })
          }
        >
          {position}
        </Button>
      </div>
    </ToastProvider>
  );
}

export const Positions: Story = {
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-3">
      {POSITIONS.map((position) => (
        <PositionScene key={position} position={position} />
      ))}
    </div>
  ),
};

function WithDescriptionButton() {
  const toast = useToast<ToasterToastData>();
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
    <div className="p-6">
      <WithDescriptionButton />
    </div>
  ),
};

function WithActionButton() {
  const toast = useToast<ToasterToastData>();
  return (
    <Button
      onClick={() =>
        toast.add({
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
  );
}

export const WithAction: Story = {
  render: () => (
    <div className="p-6">
      <WithActionButton />
    </div>
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
    <div className="p-6">
      <WithIconButton />
    </div>
  ),
};

function PromiseButton() {
  const toast = useToast<ToasterToastData>();
  return (
    <Button
      onClick={() => {
        const work = new Promise<string>((resolve) =>
          setTimeout(() => resolve('完成'), 1500),
        );
        void toast.promise(work, {
          loading: { type: 'info', title: '處理中…' },
          success: (result) => ({ type: 'success', title: result }),
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
    <div className="p-6">
      <PromiseButton />
    </div>
  ),
};

function StackedButton() {
  const toast = useToast<ToasterToastData>();
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
    <div className="p-6">
      <StackedButton />
    </div>
  ),
};

/**
 * Pattern: two channels for two positions.
 *
 * Each position needs its own manager + ToastProvider. Mount both
 * providers at the app root, then import the relevant manager wherever
 * you fire a toast. The default `toastManager` and `anchoredToastManager`
 * are exported from `'./Toast'`; create extra managers with `createToastManager`.
 *
 * ```tsx
 * // toast-managers.ts
 * import { createToastManager, type ToasterToastData } from '@/components/toast'
 * export const errorToast = createToastManager<ToasterToastData>()
 *
 * // app root
 * import { toastManager, ToastProvider } from '@/components/toast'
 * import { errorToast } from './toast-managers'
 *
 * <ToastProvider position="bottom-right">              // default toastManager
 *   <ToastProvider toastManager={errorToast} position="top-center">
 *     {children}
 *   </ToastProvider>
 * </ToastProvider>
 *
 * // anywhere
 * import { toastManager } from '@/components/toast'
 * import { errorToast } from './toast-managers'
 *
 * toastManager.add({ type: 'success', title: 'Saved' })
 * errorToast.add({ type: 'error', title: 'Connection lost' })
 * ```
 */
function TwoChannelsScene() {
  const bottomManager = useMemo(
    () => createToastManager<ToasterToastData>(),
    [],
  );
  const topManager = useMemo(
    () => createToastManager<ToasterToastData>(),
    [],
  );

  return (
    <ToastProvider
      toastManager={bottomManager}
      position="bottom-right"
    >
      <ToastProvider
        toastManager={topManager}
        position="top-center"
        variant="subtle"
      >
        <div className="flex flex-wrap gap-2 p-6">
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
                data: {
                  icon: <CloseIcon className="size-5" />,
                },
              })
            }
          >
            Top-center error
          </Button>
        </div>
      </ToastProvider>
    </ToastProvider>
  );
}

export const TwoChannels: Story = {
  decorators: [(Story) => <Story />],
  render: () => <TwoChannelsScene />,
};

function AnchoredButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);
  const toast = useToast<ToasterToastData>();
  return (
    <Button
      ref={ref}
      theme="primary"
      onClick={() => {
        const next = count + 1;
        setCount(next);
        toast.add({
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
  );
}

export const Anchored: Story = {
  parameters: { toast: { anchored: true, variant: 'subtle' } },
  render: () => (
    <div className="flex min-h-[240px] items-center justify-center p-6">
      <AnchoredButton />
    </div>
  ),
};
