import { forwardRef } from 'react';

// as="input" | "textarea" — dùng chung 1 component cho cả 2 loại field
const Input = forwardRef(function Input(
  { label, error, as = 'input', className = '', id, ...props },
  ref
) {
  const Field = as;
  const fieldId = id || props.name;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <Field
        ref={ref}
        id={fieldId}
        rows={as === 'textarea' ? 3 : undefined}
        className={`rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
          ${error ? 'border-rose-400' : 'border-slate-300'} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-600">{error}</span>}
    </div>
  );
});

export default Input;