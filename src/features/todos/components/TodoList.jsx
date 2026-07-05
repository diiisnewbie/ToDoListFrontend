import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";

import TodoItem from "./Todoitem";
import TodoColumn from "./ToDoColumn";
import TodoDetailModal from "./TodoDetailModal";
import { todoApi } from "../api";

export default function TodoList({
  todos,
  setTodos,
  loading,
  error,
  onToggle,
  onUpdate,
  onDelete,
}) {
  const [selectedTodo, setSelectedTodo] = useState(null);

  if (loading) {
    return (
      <p className="py-10 text-center text-sm text-slate-400">Đang tải...</p>
    );
  }

  if (error) {
    return (
      <p className="py-10 text-center text-sm text-rose-600">Lỗi tải dữ liệu</p>
    );
  }

  const getTasks = (status) =>
    todos
      .filter((t) => t.status === status)
      .sort((a, b) => a.position - b.position);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeTodo = todos.find((t) => t.id === active.id);
    const overTodo = todos.find((t) => t.id === over.id);

    if (!activeTodo || !overTodo) return;

    if (activeTodo.status !== overTodo.status) return;

    // 🔥 lấy list theo position (SOURCE OF TRUTH)
    const columnTasks = todos
      .filter((t) => t.status === activeTodo.status)
      .sort((a, b) => a.position - b.position);

    const activeIndex = columnTasks.findIndex((t) => t.id === active.id);
    const overIndex = columnTasks.findIndex((t) => t.id === over.id);

    if (activeIndex === -1 || overIndex === -1) return;

    const reordered = arrayMove(columnTasks, activeIndex, overIndex).map(
      (item, index) => ({
        ...item,
        position: index + 1,
      }),
    );

    // 🔥 merge lại toàn bộ todos
    const newTodos = todos.map((t) => {
      const updated = reordered.find((r) => r.id === t.id);
      return updated ?? t;
    });

    setTodos(newTodos);

    await todoApi.reorder(
      reordered.map((t) => ({
        id: t.id,
        position: t.position,
      })),
    );
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-6">
        {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
          <TodoColumn
            key={status}
            id={status}
            title={status}
            tasks={getTasks(status)}
          >
            {getTasks(status).map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onClick={() => setSelectedTodo(todo)}
              />
            ))}
          </TodoColumn>
        ))}
      </div>

      {/* ✅ MOVE MODAL OUTSIDE GRID */}
      {selectedTodo && (
        <TodoDetailModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
          onSave={onUpdate}
        />
      )}
    </DndContext>
  );
}
