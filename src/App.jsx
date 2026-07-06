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
  const [sortBy, setSortBy] = useState("POSITION");
  const [sortDirection, setSortDirection] = useState("ASC");
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
    moveTodo,
  } = useTodos({
    search: debouncedSearch,
    status: statusFilter,
    sortBy,
    sortDirection,
  });
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
        <div className="flex gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Sort By</label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="POSITION">Position</option>
              <option value="TITLE">Title</option>
              <option value="PRIORITY">Priority</option>
              <option value="DUE_DATE">Due Date</option>
              <option value="CREATED_AT">Created At</option>
              <option value="UPDATED_AT">Updated At</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Direction</label>

            <select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
        </div>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          loading={loading}
          error={error}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          reorderTodos={reorderTodos}
          moveTodo={moveTodo}
          sortBy={sortBy}
        />
      </main>
    </div>
  );
}
