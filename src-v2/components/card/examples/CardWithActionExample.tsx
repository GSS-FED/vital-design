'use client';

import { Button } from '@/components/button/Button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card/Card';

export function CardWithActionExample() {
  return (
    <Card className="w-90 max-w-full">
      <CardHeader>
        <CardTitle>Quarterly review</CardTitle>
        <CardDescription>3 items to review</CardDescription>
        <CardAction>
          <Button variant="ghost">View</Button>
        </CardAction>
      </CardHeader>
      <CardContent>Owners must submit by Friday.</CardContent>
    </Card>
  );
}
