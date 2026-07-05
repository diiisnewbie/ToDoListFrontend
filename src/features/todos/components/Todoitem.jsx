import { useState } from "react";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import StatusSelect from "./StatusSelect";
import TodoForm from "./TodoForm";
import { TODO_STATUS } from "../../../constants/todoStatus";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export default function Todoitem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
  onClick,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [editing, setEditing] = useState(false);
  const isDone = todo.status === TODO_STATUS.DONE;

  if (editing) {
    return (
      <TodoForm
        mode="edit"
        initialValues={todo}
        onCancel={() => setEditing(false)}
        onSubmit={async (data) => {
          await onUpdate(todo.id, data);
          setEditing(false);
        }}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"
    >
      {/* DRAG HANDLE ONLY */}
      <div
        {...listeners}
        className="cursor-grab active:cursor-grabbing px-2 text-slate-400"
      >
        ⠿
      </div>

      {/* CLICK AREA (MODAL) */}
      <div
        className="flex-1 min-w-0"
        onClick={() => onClick?.(todo)}
      >
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`truncate text-sm font-medium ${
              isDone ? "text-slate-400 line-through" : "text-slate-900"
            }`}
          >
            {todo.title}
          </h3>
          <Badge status={todo.priority} />
        </div>

        {todo.description && (
          <p
            className={`mt-1 text-sm ${
              isDone ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {todo.description}
          </p>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex shrink-0 items-center gap-1.5">
        <StatusSelect
          value={todo.status}
          onChange={(status) => onUpdate(todo.id, { status })}
        />


        <Button
          variant="danger"
          size="icon"
          onClick={() => onDelete(todo.id)}
        >
          🗑️
        </Button>
      </div>
    </div>
  );
}