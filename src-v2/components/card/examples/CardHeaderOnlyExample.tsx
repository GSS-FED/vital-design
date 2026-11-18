'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card/Card';

export function CardHeaderOnlyExample() {
  return (
    <Card className="w-90 max-w-full">
      <CardHeader>
        <CardTitle>Design review</CardTitle>
        <CardDescription>5 tasks</CardDescription>
      </CardHeader>
    </Card>
  );
}
