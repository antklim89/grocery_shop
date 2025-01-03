'use client';
import { cn } from '@/lib/utils';
import { Root } from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';


const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

const Label = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> &
  VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <Root
    className={cn(labelVariants(), className)}
    ref={ref}
    {...props}
  />
));
Label.displayName = Root.displayName;

export { Label };
