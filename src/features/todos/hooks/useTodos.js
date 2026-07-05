import { useState, useEffect, useCallback } from 'react';
import { todoApi } from '../api';
import { TODO_STATUS } from '../../../constants/todoStatus';

export function useTodos({ search, status } = {}) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todoApi.getAll({
        search: search || undefined,
        status: status && status !== 'ALL' ? status : undefined,
      });
      setTodos(data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (data) => {
    const newTodo = await todoApi.create(data); // { title, description }
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = async (id, data) => {
    const updated = await todoApi.update(id, data); // { title?, description?, status? }
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const toggleTodo = async (todo) => {
    const newStatus = todo.status === TODO_STATUS.DONE ? TODO_STATUS.TODO : TODO_STATUS.DONE;
    await updateTodo(todo.id, { status: newStatus });
  };

  const deleteTodo = async (id) => {
    await todoApi.remove(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return { todos, loading, error, addTodo, updateTodo, toggleTodo, deleteTodo, refetch: fetchTodos };
}