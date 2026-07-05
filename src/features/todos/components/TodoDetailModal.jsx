import { useState, useEffect } from "react";

export default function TodoDetailModal({ todo, onClose, onSave }) {
  const [form, setForm] = useState(todo);
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setForm({
      ...todo,
      dueDate: todo?.dueDate ? todo.dueDate.slice(0, 10) : "",
    });
  }, [todo]);

  const normalizeDate = (value) => {
    if (!value) return "";
    return value.toString().slice(0, 10);
  };

  if (!todo) return null;

  const validate = (data) => {
    const err = {};

    if (!data.title || data.title.trim().length === 0) {
      err.title = "Title is required";
    }

    if (!data.priority) {
      err.priority = "Priority is required";
    }

    if (!data.dueDate) {
      err.dueDate = "Due date is required";
    }

    return err;
  };

  const handleChange = (key, value) => {
    const newForm = { ...form, [key]: value };
    setForm(newForm);

    // realtime clear error khi user sửa
    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  const handleSave = async () => {
    try {
      setErrors({});

      await onSave(todo.id, form);

      onClose();
    } catch (err) {
      if (err?.code === 1003 && err?.result) {
        setErrors(err.result); // 👈 backend map thẳng vào UI
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-[500px] p-6 rounded-xl space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold">Task Detail</h2>

        {/* TITLE */}
        <div>
          <h3>Title</h3>
          <input
            value={form.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            className={`border p-2 w-full ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <h3>Description</h3>
          <textarea
            value={form.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        {/* PRIORITY */}
        <div>
          <h3>Priority</h3>
          <select
            value={form.priority || ""}
            onChange={(e) => handleChange("priority", e.target.value)}
            className={`border p-2 w-full ${
              errors.priority ? "border-red-500" : ""
            }`}
          >
            <option value="">Select priority</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-sm">{errors.priority}</p>
          )}
        </div>

        {/* DUE DATE */}
        <div>
          <h3>Due Date</h3>
          <input
            type="date"
            min={today}
            value={form.dueDate || ""}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            className={`border p-2 w-full ${
              errors.dueDate ? "border-red-500" : ""
            }`}
          />

          {errors.dueDate && (
            <p className="text-red-500 text-sm">{errors.dueDate}</p>
          )}
        </div>

        {/* CREATED */}
        <p className="text-xs text-gray-400">Created: {todo.createdAt}</p>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
