
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Card from "../component/Card";
import Button from "../component/Button";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/todos?_limit=10`)
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch todos");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Todo List</h1>

      {todos.map((todo) => (
        <Card key={todo.id}>
          <h3>{todo.title}</h3>

          <Link to={`/todos/${todo.id}`}>
            <Button>View Details</Button>
          </Link>
        </Card>
      ))}
    </div>
  );
}

export default ToDoList;