import Header from "./components/layout/Header";
import TodoForm from "./features/todos/components/TodoForm";
import TodoList from "./features/todos/components/TodoList";
import { useTodos } from "./features/todos/hooks/useTodos";
import { TODO_STATUS } from "./constants/todoStatus";
import { useState } from "react";
import { useDebounce } from "./features/todos/hooks/useDebounce";
import TodoFilter from "./features/todos/components/TodoFilter";
import TodoDetailModal from "./features/todos/components/TodoDetailModal";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 400);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const {
    todos,
    setTodos,
    loading,
    error,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    reorderTodos,
  } = useTodos({ search: debouncedSearch, status: statusFilter });
  const doneCount = todos.filter((t) => t?.status === TODO_STATUS.DONE).length;
  return (
    <div className="min-h-screen bg-slate-50">
      <Header total={todos.length} done={doneCount} />

      <main className="min-h-[calc(100vh-64px)] px-8 py-6">
        <TodoForm mode="create" onSubmit={addTodo} />
        <TodoFilter
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          statusValue={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          loading={loading}
          error={error}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          reorderTodos={reorderTodos}
        />
      </main>
    </div>
  );
}
