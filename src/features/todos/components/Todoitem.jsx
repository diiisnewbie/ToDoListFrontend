import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import StatusSelect from "./StatusSelect";
import TodoForm from "./TodoForm";
import { TODO_STATUS } from "../../../constants/todoStatus";

export default function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
  onClick,
  dragDisabled,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
    disabled: dragDisabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
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
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:p-4"
      onClick={() => onClick?.(todo)}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-3">
        {/* Drag Handle */}
        <div
          {...(!dragDisabled ? attributes : {})}
          {...(!dragDisabled ? listeners : {})}
          className={`shrink-0 text-slate-400 ${
            dragDisabled
              ? "cursor-not-allowed opacity-40"
              : "cursor-grab active:cursor-grabbing hover:text-slate-700"
          }`}
        >
          ☰
        </div>

        {/* Check */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(todo);
          }}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 sm:h-5 sm:w-5 ${
            isDone ? "border-emerald-500 bg-emerald-500" : "border-slate-300"
          }`}
        >
          {isDone && (
            <svg viewBox="0 0 12 12" className="h-3 w-3 fill-white">
              <path d="M4.5 8.5 1.8 5.8l1-1L4.5 6.5l4.7-4.7 1 1z" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`break-words font-medium ${
                isDone ? "line-through text-slate-400" : ""
              }`}
            >
              {todo.title}
            </h3>

            <Badge status={todo.priority} />
          </div>

          {todo.description && (
            <p className="mt-1 break-words text-sm text-slate-500">
              {todo.description}
            </p>
          )}

          {dragDisabled && (
            <p className="mt-1 text-[11px] text-slate-400">
              Chỉ có thể kéo khi đang sắp xếp theo Position.
            </p>
          )}
        </div>

        {/* Actions */}
        <div
          className="flex flex-wrap items-center gap-2 sm:justify-end"
          onClick={(e) => e.stopPropagation()}
        >
          <StatusSelect
            value={todo.status}
            onChange={(status) =>
              onUpdate(todo.id, {
                status,
              })
            }
            className="w-full sm:w-auto"
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
    </div>
  );
}
