import Header from './components/layout/Header';
import TodoForm from './features/todos/components/TodoForm';
import TodoList from './features/todos/components/TodoList';
import { useTodos } from './features/todos/hooks/useTodos';
import { TODO_STATUS } from './constants/todoStatus';
import { useState } from 'react';
import { useDebounce } from './features/todos/hooks/useDebounce';
import TodoFilter from './features/todos/components/TodoFilter';

export default function App() {
  const [searchInput, setSearchInput] = useState('');
const debouncedSearch = useDebounce(searchInput, 400);
const [statusFilter, setStatusFilter] = useState('ALL');
const { todos, loading, error, addTodo, updateTodo, toggleTodo, deleteTodo } = useTodos({ search: debouncedSearch, status: statusFilter });
const doneCount = todos.filter((t) => t?.status === TODO_STATUS.DONE).length;
  return (
    <div className="min-h-screen bg-slate-50">
      <Header total={todos.length} done={doneCount} />

      <main className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-8">
        <TodoForm mode="create" onSubmit={addTodo} />
        <TodoFilter
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          statusValue={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <TodoList
          todos={todos}
          loading={loading}
          error={error}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </main>
    </div>
  );
}


