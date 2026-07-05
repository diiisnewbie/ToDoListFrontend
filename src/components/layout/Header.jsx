export default function Header({ total = 0, done = 0 }) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <header className="border-b border-slate-200 bg-white px-6 py-5">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">Việc cần làm</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {total === 0 ? 'Chưa có việc nào' : `${done}/${total} việc đã hoàn thành`}
          </p>
        </div>
        <div className="text-2xl font-semibold text-indigo-600">{percent}%</div>
      </div>
      <div className="mx-auto mt-4 h-1.5 max-w-2xl overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </header>
  );
}