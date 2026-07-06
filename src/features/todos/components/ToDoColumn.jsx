import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function TodoColumn({ id, title, tasks, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[280px] rounded-2xl border p-3 transition-all sm:p-4 md:min-h-[520px] ${
        isOver ? "border-blue-500 bg-blue-100" : "border-slate-200 bg-slate-50"
      }`}
    >
      <h2 className="mb-3 text-base font-bold text-slate-800 sm:text-lg">
        {title} ({tasks.length})
      </h2>

      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex min-h-[220px] flex-col gap-3 md:min-h-[440px]">
          {children}
        </div>
      </SortableContext>
    </div>
  );
}
