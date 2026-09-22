
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ToDoDetails() {
  const { id } = useParams();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/todos/${id}`)
      .then((response) => {
        setTodo(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch todo");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Todo Details</h1>
      <p>ID: {todo.id}</p>
      <p>Title: {todo.title}</p>
      <p>Completed: {todo.completed ? "Yes" : "No"}</p>
    </div>
  );
}

export default ToDoDetails;