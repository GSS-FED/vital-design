import { type Meta, type StoryObj } from '@storybook/react';
import { Button } from '../button/Button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';

type Story = StoryObj<typeof Card>;

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

export default meta;

export const Basic: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>專案儀表板</CardTitle>
        <CardDescription>
          這是一個基本的 Card 元件範例
        </CardDescription>
      </CardHeader>
      <CardContent>顯示主要內容區塊。</CardContent>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>填寫指標</CardTitle>
        <CardDescription>待覆核 3 項</CardDescription>
        <CardAction>
          <Button variant="ghost">檢視</Button>
        </CardAction>
      </CardHeader>
      <CardContent>主要內容。</CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader className="border-b border-grayscale-opacity-300">
        <CardTitle>申請表單</CardTitle>
      </CardHeader>
      <CardContent>請填寫表單欄位。</CardContent>
      <CardFooter className="justify-end border-t border-grayscale-opacity-300">
        <Button variant="ghost">取消</Button>
        <Button>送出</Button>
      </CardFooter>
    </Card>
  ),
};

export const HeaderOnly: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>群組標題</CardTitle>
        <CardDescription>5 項任務</CardDescription>
      </CardHeader>
    </Card>
  ),
};
