export default function Header({ total = 0, done = 0 }) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <header className="border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm sm:px-6 sm:py-5">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            Việc cần làm
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {total === 0
              ? "Chưa có việc nào"
              : `${done}/${total} việc đã hoàn thành`}
          </p>
        </div>
        <div className="text-xl font-semibold text-indigo-600 sm:text-2xl">
          {percent}%
        </div>
      </div>
      <div className="mx-auto mt-4 h-1.5 max-w-7xl overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </header>
  );
}
