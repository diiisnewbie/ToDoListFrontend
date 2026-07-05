import { useState } from "react";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import StatusSelect from "./StatusSelect";
import TodoForm from "./TodoForm";
import { TODO_STATUS } from "../../../constants/todoStatus";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export default function Todoitem({ todo, onToggle, onUpdate, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: todo.id,
    });
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
      {...listeners}
      className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"
    >
      <button
        onClick={() => onToggle(todo)}
        aria-label={isDone ? "Đánh dấu chưa hoàn thành" : "Đánh dấu hoàn thành"}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors
          ${isDone ? "border-emerald-500 bg-emerald-500" : "border-slate-300 hover:border-indigo-400"}`}
      >
        {isDone && (
          <svg viewBox="0 0 12 12" className="h-3 w-3 fill-white">
            <path d="M4.5 8.5 1.8 5.8l1-1L4.5 6.5l4.7-4.7 1 1z" />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`truncate text-sm font-medium ${isDone ? "text-slate-400 line-through" : "text-slate-900"}`}
          >
            {todo.title}
          </h3>
          <Badge status={todo.status} />
        </div>
        {todo.description && (
          <p
            className={`mt-1 text-sm ${isDone ? "text-slate-400" : "text-slate-600"}`}
          >
            {todo.description}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <StatusSelect
          value={todo.status}
          onChange={(status) => onUpdate(todo.id, { status })}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setEditing(true)}
          aria-label="Sửa"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
            <path d="M14.7 2.3a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4L8.5 14.5l-3.2.7.7-3.2z" />
          </svg>
        </Button>
        <Button
          variant="danger"
          size="icon"
          onClick={() => onDelete(todo.id)}
          aria-label="Xóa"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
            <path d="M6 7h8l-.7 9.3a1 1 0 0 1-1 .9H7.7a1 1 0 0 1-1-.9L6 7Zm2-3h4l.5 1.5H15V7H5V5.5h1.5L8 4Z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
