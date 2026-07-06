import { useState, useEffect, useCallback } from "react";
import { todoApi } from "../api";
import { TODO_STATUS } from "../../../constants/todoStatus";

export function useTodos({ search, status, sortBy, sortDirection } = {}) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todoApi.getAll({
        search: search || undefined,
        status: status && status !== "ALL" ? status : undefined,
        sortBy: sortBy || undefined,
        sortDirection: sortDirection || undefined,
      });
      setTodos(data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [search, status, sortBy, sortDirection]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (data) => {
    const newTodo = await todoApi.create(data); // { title, description }
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = async (id, data) => {
    try {
      const res = await todoApi.update(id, data);
      console.log("UPDATE SUCCESS - res:", res); // 👈 thêm dòng này
      setTodos((prev) => prev.map((t) => (t.id === id ? res : t)));
      return res;
    } catch (err) {
      console.log("UPDATE ERROR - err:", err); // 👈 thêm dòng này
      console.log("UPDATE ERROR - err.response:", err.response);
      console.log("UPDATE ERROR - err.response?.data:", err.response?.data);
      throw err.response?.data;
    }
  };

  const toggleTodo = async (todo) => {
    const newStatus =
      todo.status === TODO_STATUS.DONE ? TODO_STATUS.TODO : TODO_STATUS.DONE;
    await updateTodo(todo.id, { status: newStatus });
  };

  const deleteTodo = async (id) => {
    await todoApi.remove(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const reorderTodos = async (reordered) => {
    setTodos(reordered);

    const payload = reordered.map((todo, index) => ({
      id: todo.id,
      position: index + 1,
    }));

    await todoApi.reorder(payload);
  };

  const moveTodo = async (id, targetStatus, targetPosition) => {
    await todoApi.move(id, {
      targetStatus,
      targetPosition,
    });

    await fetchTodos();
  };

  return {
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
    refetch: fetchTodos,
  };
}
