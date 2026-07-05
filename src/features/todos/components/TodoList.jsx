import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import TodoItem from "./Todoitem";
import TodoColumn from "./ToDoColumn";
import { todoApi } from "../api"; // ⚠️ nhớ chỉnh path đúng

export default function TodoList({
  todos,
  setTodos,
  loading,
  error,
  onToggle,
  onUpdate,
  onDelete,
  reorderTodos,
}) {
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

    if (!over) return;

    const activeTodo = todos.find((t) => t.id === active.id);
    const overTodo = todos.find((t) => t.id === over.id);

    if (!activeTodo || !overTodo) return;

    const sameColumn = activeTodo.status === overTodo.status;

    let updatedTodos = [...todos];

    // =========================
    // CASE 1: SAME COLUMN (reorder)
    // =========================
    if (sameColumn) {
      const columnTasks = todos.filter((t) => t.status === activeTodo.status);

      const oldIndex = columnTasks.findIndex((t) => t.id === active.id);
      const newIndex = columnTasks.findIndex((t) => t.id === over.id);

      const reorderedColumn = arrayMove(columnTasks, oldIndex, newIndex).map(
        (todo, index) => ({
          ...todo,
          position: index + 1,
        }),
      );

      updatedTodos = todos.map((t) => {
        const updated = reorderedColumn.find((r) => r.id === t.id);
        return updated ?? t;
      });

      setTodos(updatedTodos);

      const payload = reorderedColumn.map((t) => ({
        id: t.id,
        position: t.position,
      }));

      await todoApi.reorder(payload);
    }

    // =========================
    // CASE 2: MOVE BETWEEN COLUMNS
    // =========================
    else {
      updatedTodos = todos.map((t) =>
        t.id === active.id ? { ...t, status: overTodo.status } : t,
      );

      await onUpdate(active.id, {
        status: overTodo.status,
      });
    }

    setTodos(updatedTodos);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-6">
        <TodoColumn id="TODO" title="📋 To Do" tasks={getTasks("TODO")}>
          {getTasks("TODO").map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              {...{ onToggle, onUpdate, onDelete }}
            />
          ))}
        </TodoColumn>

        <TodoColumn
          id="IN_PROGRESS"
          title="🚀 In Progress"
          tasks={getTasks("IN_PROGRESS")}
        >
          {getTasks("IN_PROGRESS").map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              {...{ onToggle, onUpdate, onDelete }}
            />
          ))}
        </TodoColumn>

        <TodoColumn id="DONE" title="✅ Done" tasks={getTasks("DONE")}>
          {getTasks("DONE").map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              {...{ onToggle, onUpdate, onDelete }}
            />
          ))}
        </TodoColumn>
      </div>
    </DndContext>
  );
}
