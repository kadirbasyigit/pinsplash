import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full rounded-md border transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'h-9 border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:ring-1 focus-visible:ring-ring md:text-sm',
        search:
          'h-10 py-2 pl-10 pr-10 bg-form-background text-form-text-filled border-form-border placeholder:text-form-text-placeholder focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 focus:ring-offset-2 focus:ring-offset-white/50 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:hidden',
      },
      error: {
        true: 'border-border-error-subtle focus:border-error focus:ring-error/10',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      error: false,
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, error, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
