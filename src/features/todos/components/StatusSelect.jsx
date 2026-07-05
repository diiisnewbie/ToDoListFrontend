import { TODO_STATUS, STATUS_LABEL } from '../../../constants/todoStatus';

export default function StatusSelect({ value, onChange, className = '' }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 ${className}`}
    >
      {Object.values(TODO_STATUS).map((status) => (
        <option key={status} value={status}>
          {STATUS_LABEL[status]}
        </option>
      ))}
    </select>
  );
}