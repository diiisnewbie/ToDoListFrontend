import TodoItem from './TodoItem';

export default function TodoList({ todos, loading, error, onToggle, onUpdate, onDelete }) {
  if (loading) {
    return <p className="py-10 text-center text-sm text-slate-400">Đang tải danh sách...</p>;
  }

  if (error) {
    return (
      <p className="py-10 text-center text-sm text-rose-600">
        Không tải được danh sách. Vui lòng thử lại.
      </p>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="py-14 text-center">
        <p className="text-sm text-slate-500">Chưa có việc nào. Thêm việc đầu tiên ở trên nhé.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {todos.filter(Boolean).map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}