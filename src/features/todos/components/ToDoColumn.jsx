import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function TodoColumn({ id, title, tasks, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`bg-slate-100 rounded-lg p-4 min-h-[500px] ${
        isOver ? "bg-blue-100" : ""
      }`}
    >
      <h2 className="text-lg font-bold mb-4">
        {title} ({tasks.length})
      </h2>

      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3">{children}</div>
      </SortableContext>
    </div>
  );
}
