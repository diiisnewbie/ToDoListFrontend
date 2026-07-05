import { forwardRef } from 'react';

const VARIANTS = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-indigo-600',
  secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus-visible:outline-slate-400',
  danger: 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 focus-visible:outline-rose-500',
  ghost: 'bg-transparent text-slate-500 hover:bg-slate-100 focus-visible:outline-slate-400',
};

const SIZES = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  icon: 'h-9 w-9 p-0',
};

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', className = '', children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors
        disabled:opacity-50 disabled:pointer-events-none
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;