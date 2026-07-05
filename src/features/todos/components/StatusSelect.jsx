import { TODO_STATUS, STATUS_LABEL } from '../../../constants/todoStatus';

const STATUS_COLOR = {
  [TODO_STATUS.DONE]: 'border-green-300 bg-green-50 text-green-700 focus:ring-green-500/40 focus:border-green-500',
  [TODO_STATUS.IN_PROGRESS]: 'border-yellow-300 bg-yellow-50 text-yellow-700 focus:ring-yellow-500/40 focus:border-yellow-500',
  [TODO_STATUS.TODO]: 'border-orange-300 bg-orange-50 text-orange-700 focus:ring-orange-500/40 focus:border-orange-500',
};

export default function StatusSelect({ value, onChange, className = '' }) {
  const colorClass = STATUS_COLOR[value] || 'border-slate-300 bg-white text-slate-700 focus:ring-indigo-500/40 focus:border-indigo-500';

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-lg border px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 ${colorClass} ${className}`}
    >
      {Object.values(TODO_STATUS).map((status) => (
        <option key={status} value={status}>
          {STATUS_LABEL[status]}
        </option>
      ))}
    </select>
  );
}