import Header from "./components/layout/Header";
import TodoForm from "./features/todos/components/TodoForm";
import TodoList from "./features/todos/components/TodoList";
import { useTodos } from "./features/todos/hooks/useTodos";
import { TODO_STATUS } from "./constants/todoStatus";
import { useState } from "react";
import { useDebounce } from "./features/todos/hooks/useDebounce";
import TodoFilter from "./features/todos/components/TodoFilter";

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

      <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <TodoForm mode="create" onSubmit={addTodo} />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <TodoFilter
            searchValue={searchInput}
            onSearchChange={setSearchInput}
            statusValue={statusFilter}
            onStatusChange={setStatusFilter}
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
            <div className="w-full sm:max-w-[220px]">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              >
                <option value="POSITION">Position</option>
                <option value="TITLE">Title</option>
                <option value="PRIORITY">Priority</option>
                <option value="DUE_DATE">Due Date</option>
                <option value="CREATED_AT">Created At</option>
                <option value="UPDATED_AT">Updated At</option>
              </select>
            </div>

            <div className="w-full sm:max-w-[220px]">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Direction
              </label>
              <select
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              >
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
              </select>
            </div>
          </div>
        </section>

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
