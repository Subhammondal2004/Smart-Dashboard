import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={`input-field ${error ? 'border-destructive' : ''} ${className}`}
          {...props}
        />

        {error && (
          <div className="flex items-center gap-1 mt-2 text-destructive text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {helperText && !error && (
          <p className="text-muted-foreground text-sm mt-2">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
