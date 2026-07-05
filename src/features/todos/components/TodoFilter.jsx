import { TODO_STATUS, STATUS_LABEL } from '../../../constants/todoStatus';

export default function TodoFilter({ searchValue, onSearchChange, statusValue, onStatusChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <svg
          viewBox="0 0 20 20"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-slate-400"
        >
          <path d="M13 12.5a5.5 5.5 0 1 1 1-1l3.4 3.4-1 1zM9 12.5A3.5 3.5 0 1 0 9 5.5a3.5 3.5 0 0 0 0 7z" />
        </svg>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm theo tiêu đề..."
          className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm text-slate-900
            placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
        />
      </div>

      <select
        value={statusValue}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 sm:w-44"
      >
        <option value="ALL">Tất cả trạng thái</option>
        {Object.values(TODO_STATUS).map((status) => (
          <option key={status} value={status}>
            {STATUS_LABEL[status]}
          </option>
        ))}
      </select>
    </div>
  );
}