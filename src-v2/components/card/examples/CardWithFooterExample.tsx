'use client';

import { Button } from '@/components/button/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/card/Card';

export function CardWithFooterExample() {
  return (
    <Card className="w-90 max-w-full">
      <CardHeader className="border-b border-grayscale-opacity-300">
        <CardTitle>Leave request</CardTitle>
      </CardHeader>
      <CardContent>Fill in the dates and a short reason.</CardContent>
      <CardFooter className="justify-end border-t border-grayscale-opacity-300">
        <Button variant="ghost">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}
