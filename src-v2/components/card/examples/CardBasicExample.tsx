'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card/Card';

export function CardBasicExample() {
  return (
    <Card className="w-90 max-w-full">
      <CardHeader>
        <CardTitle>Project dashboard</CardTitle>
        <CardDescription>Last updated 2 days ago.</CardDescription>
      </CardHeader>
      <CardContent>
        Track progress, owners, and review status in one place.
      </CardContent>
    </Card>
  );
}
