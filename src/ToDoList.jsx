import React, {useEffect, useState} from "react";
import axios from "axios";

function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [newDescription, setNewDescription] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/todos")
            .then(response => {
                setTodos(response.data);
            });
        }, []);

    const addTodo = () => {
        axios.post("http://localhost:8080/todos", { text: newTodo, description: newDescription })
            .then(response => {
                setTodos([...todos, response.data]);
                setNewTodo("");
            });
        }

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:8080/todos/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
            });
        }
    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New to-do"
            />
            <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Description"
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.text} - {todo.description}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;