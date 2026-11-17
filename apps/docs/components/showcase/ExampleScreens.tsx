'use client';

import { ReviewTaskTable } from '@/blocks/data-table/components/review-task-table';
import { CloudSidebar } from '@/blocks/sidebar-cloud-01/components/app-sidebar';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/alert/Alert';
import { Avatar, AvatarGroup } from '@/components/avatar/Avatar';
import { Badge } from '@/components/badge/Badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/breadcrumb/Breadcrumb';
import { Button } from '@/components/button/Button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/card/Card';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from '@/components/dialog/Dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import {
  Field,
  FieldDescription,
  FieldLabel,
} from '@/components/field/Field';
import { Input } from '@/components/input/input/Input';
import { Label } from '@/components/label/Label';
import { Progress } from '@/components/progress/Progress';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/radio-group/RadioGroup';
import { SearchBar } from '@/components/search-bar/SearchBar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemCheck,
  SelectItemText,
  SelectTrigger,
} from '@/components/select/Select';
import { Separator } from '@/components/separator/Separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/sidebar/Sidebar';
import { Switch } from '@/components/switch/Switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/tabs/Tabs';
import { Tag } from '@/components/tag/Tag';
import { Textarea } from '@/components/textarea/Textarea';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/toast/Toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip';
import { BellIcon } from '@/icons/BellIcon';
import { PlusIcon } from '@/icons/PlusIcon';
import { type CSSProperties, useMemo, useState } from 'react';

// The sidebar is fixed to the viewport by default; pin it inside the frame
// the same way the sidebar block previews do.
const APP_FRAME =
  'relative h-[760px] w-full overflow-hidden rounded-xl border border-grayscale-opacity-200 bg-background ' +
  '[&_[data-slot=sidebar-wrapper]]:h-full ' +
  '[&_[data-slot=sidebar-wrapper]]:min-h-0 ' +
  '[&_[data-slot=sidebar-container]]:!absolute ' +
  '[&_[data-slot=sidebar-container]]:!inset-y-0 ' +
  '[&_[data-slot=sidebar-container]]:!h-full ' +
  '[&_[data-slot=sidebar-container]]:!max-h-full';

const providerStyle = {
  '--sidebar-width': '200px',
  '--sidebar-width-icon': '56px',
} as CSSProperties;

function StatCard({
  title,
  value,
  progress,
  tag,
}: {
  title: string;
  value: string;
  progress: number;
  tag: { label: string; color: 'green' | 'gold' | 'blue' };
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
        <CardAction>
          <Tag color={tag.color} colorVariant="tint">
            {tag.label}
          </Tag>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Progress aria-label={title} value={progress} />
      </CardContent>
    </Card>
  );
}

export function TasksScreen() {
  return (
    <div className={APP_FRAME}>
      <SidebarProvider
        defaultOpen
        enableKeyboardShortcut={false}
        className="h-full min-h-0 w-full"
        style={providerStyle}
      >
        <CloudSidebar collapsible="icon" />
        <SidebarInset className="min-w-0 overflow-y-auto">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b border-grayscale-opacity-200 px-4">
            <SidebarTrigger className="md:hidden" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">專案</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>2026 年度永續報告</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-2">
              <SearchBar placeholder="搜尋任務" onSearch={() => {}} />
              <div className="relative">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          size="icon-md"
                          variant="text"
                          theme="default"
                          aria-label="通知"
                        >
                          <BellIcon data-icon="inline-start" />
                        </Button>
                      }
                    />
                    <TooltipContent>3 則新通知</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Badge
                  variant="destructive"
                  size="md"
                  className="pointer-events-none absolute -top-1 -right-1"
                >
                  3
                </Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button
                      type="button"
                      aria-label="帳號選單"
                      className="rounded-full"
                    />
                  }
                >
                  <Avatar name="Arthur Lu" color="blue" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>個人資料</DropdownMenuItem>
                  <DropdownMenuItem>偏好設定</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>登出</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-grayscale-opacity-900">
                  審查任務
                </h2>
                <p className="mt-1 text-sm text-grayscale-opacity-600">
                  追蹤每個揭露項目的負責人、進度與期限。
                </p>
              </div>
              <div className="flex items-center gap-2">
                <AvatarGroup>
                  <Avatar name="Arthur Lu" color="blue" size="sm" />
                  <Avatar
                    name="Sean Chen"
                    color="tiffany"
                    size="sm"
                  />
                  <Avatar name="Jane Doe" color="pink" size="sm" />
                </AvatarGroup>
                <Button theme="default">匯出</Button>
                <Button theme="primary">
                  <PlusIcon data-icon="inline-start" />
                  新增任務
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                title="已完成"
                value="18 / 32"
                progress={56}
                tag={{ label: '+4 本週', color: 'green' }}
              />
              <StatCard
                title="待覆核"
                value="7"
                progress={22}
                tag={{ label: '2 逾期', color: 'gold' }}
              />
              <StatCard
                title="資料蒐集"
                value="84%"
                progress={84}
                tag={{ label: '進行中', color: 'blue' }}
              />
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="mine">我負責的</TabsTrigger>
                <TabsTrigger value="review">待我覆核</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="overflow-x-auto">
              <ReviewTaskTable />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

const timezones = [
  { label: '台北 (GMT+8)', value: 'Asia/Taipei' },
  { label: '東京 (GMT+9)', value: 'Asia/Tokyo' },
  { label: '倫敦 (GMT+0)', value: 'Europe/London' },
];

function SettingRow({
  id,
  title,
  description,
  defaultChecked,
}: {
  id: string;
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <Label htmlFor={id}>{title}</Label>
        <p className="text-sm text-grayscale-opacity-600">
          {description}
        </p>
      </div>
      <Switch id={id} defaultChecked={defaultChecked} />
    </div>
  );
}

export function SettingsScreen() {
  const manager = useMemo(
    () => createToastManager<ToasterToastData>(),
    [],
  );
  const [timezone, setTimezone] = useState<string | null>(
    'Asia/Taipei',
  );

  return (
    <ToastProvider toastManager={manager} position="top-right">
      <div className="w-full rounded-xl border border-grayscale-opacity-200 bg-grayscale-opacity-50 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-grayscale-opacity-900">
            帳號設定
          </h2>
          <p className="mt-1 text-sm text-grayscale-opacity-600">
            管理個人資料、通知與帳號安全。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>個人資料</CardTitle>
              <CardDescription>
                其他成員會看到這些資訊。
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <Avatar name="Arthur Lu" color="blue" size="lg" />
                <Button theme="default">更換頭像</Button>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="settings-name">
                    顯示名稱
                  </FieldLabel>
                  <Input
                    id="settings-name"
                    defaultValue="Arthur Lu"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="settings-email">
                    Email
                  </FieldLabel>
                  <Input
                    id="settings-email"
                    type="email"
                    defaultValue="arthur@example.com"
                  />
                  <FieldDescription>
                    用於通知與帳號復原。
                  </FieldDescription>
                </Field>
              </div>
              <Field>
                <FieldLabel>時區</FieldLabel>
                <Select
                  items={timezones}
                  value={timezone}
                  onValueChange={setTimezone}
                >
                  <SelectTrigger placeholder="選擇時區" />
                  <SelectContent>
                    {timezones.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <SelectItemText>{item.label}</SelectItemText>
                        <SelectItemCheck />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="settings-bio">
                  自我介紹
                </FieldLabel>
                <Textarea
                  id="settings-bio"
                  rows={3}
                  placeholder="簡單介紹你負責的領域"
                />
              </Field>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="text" theme="default">
                取消
              </Button>
              <Button
                theme="primary"
                onClick={() =>
                  manager.add({
                    type: 'success',
                    title: '已儲存變更',
                  })
                }
              >
                儲存
              </Button>
            </CardFooter>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>通知</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <SettingRow
                  id="settings-notify-assign"
                  title="指派給我"
                  description="有人把任務指派給你時。"
                  defaultChecked
                />
                <Separator />
                <SettingRow
                  id="settings-notify-due"
                  title="期限提醒"
                  description="任務到期前一天。"
                  defaultChecked
                />
                <Separator />
                <div className="flex flex-col gap-2">
                  <Label>摘要信頻率</Label>
                  <RadioGroup
                    defaultValue="weekly"
                    className="flex flex-row gap-4"
                  >
                    {[
                      ['daily', '每天'],
                      ['weekly', '每週'],
                      ['never', '不寄送'],
                    ].map(([value, label]) => (
                      <div
                        key={value}
                        className="flex items-center gap-2"
                      >
                        <RadioGroupItem
                          id={`settings-digest-${value}`}
                          value={value}
                        />
                        <Label
                          htmlFor={`settings-digest-${value}`}
                          className="font-normal"
                        >
                          {label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <AlertTitle>刪除帳號</AlertTitle>
              <AlertDescription>
                刪除後，你負責的任務會轉給專案管理者。
              </AlertDescription>
              <div className="mt-3">
                <Dialog>
                  <DialogTrigger
                    render={<Button theme="alarm">刪除帳號</Button>}
                  />
                  <DialogPortal>
                    <DialogBackdrop />
                    <DialogViewport>
                      <DialogPopup>
                        <DialogHeader>
                          <div className="space-y-1">
                            <DialogTitle>
                              確定要刪除帳號？
                            </DialogTitle>
                            <DialogDescription>
                              此動作無法復原。
                            </DialogDescription>
                          </div>
                          <DialogClose />
                        </DialogHeader>
                        <DialogBody>
                          你的 12
                          個任務會轉給專案管理者，個人設定會一併移除。
                        </DialogBody>
                        <DialogFooter>
                          <DialogClose
                            render={
                              <Button variant="text" theme="default">
                                取消
                              </Button>
                            }
                          />
                          <DialogClose
                            render={
                              <Button theme="alarm">刪除</Button>
                            }
                          />
                        </DialogFooter>
                      </DialogPopup>
                    </DialogViewport>
                  </DialogPortal>
                </Dialog>
              </div>
            </Alert>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
