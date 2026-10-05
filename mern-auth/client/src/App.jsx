import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import Register from "./pages/Register";
function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [user, setUser] = useState(null);

    const getProfile = async () => {
        const token = localStorage.getItem("token");

        const response = await axios.get(
            "http://192.168.31.2:5000/api/auth/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setUser(response.data.user);
    };

    useEffect(() => {
        getProfile();
    }, []);

    const getTasks = async () => {
        const token = localStorage.getItem("token");

        const response = await axios.get(
            "http://192.168.31.2:5000/api/tasks",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setTasks(response.data);
    };

    const addTask = async (e) => {
        e.preventDefault();

        if (title.trim() === "") {
            alert("Task title is required");
            return;
        }

        if (title.trim().length < 3) {
            alert("Task title must be at least 3 characters");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "http://192.168.31.2:5000/api/tasks",
                {
                    title: title,
                    completed: false
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTitle("");
            await getTasks();

        } catch (error) {
            alert("Failed to add task");
        }
    };

    const updateTask = async (task) => {
        const token = localStorage.getItem("token");

        const response = await axios.put(
            `http://192.168.31.2:5000/api/tasks/${task._id}`,
            {
                title: task.title,
                completed: !task.completed
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setTasks(
            tasks.map((item) =>
                item._id === task._id ? response.data : item
            )
        );
    };

    const deleteTask = async (id) => {
        const token = localStorage.getItem("token");

        await axios.delete(
            `http://192.168.31.2:5000/api/tasks/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setTasks(
            tasks.filter((task) => task._id !== id)
        );
    };

    return (
        <div>
            <nav>
                <h2>My App</h2>

                <p>
                    Logged in as:{" "}
                    <strong>
                        {user?.role === "admin" ? "ADMIN" : "USER"}
                    </strong>
                </p>

                <button onClick={() => {
                localStorage.removeItem("token");
                 window.location.href = "/";
                 }}>
                    Logout
                </button>
            </nav>

            <main>
                <h1>
                    {user?.role === "admin"
                        ? "Admin Dashboard"
                        : "My Tasks"}
                </h1>

                <p>
                    {user?.role === "admin"
                        ? "You can manage all tasks."
                        : "You can manage your own tasks."}
                </p>

                <form onSubmit={addTask}>
                    <input
                        type="text"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <button type="submit">
                        Add Task
                    </button>
                </form>

                <button onClick={getTasks}>
                    Get Tasks
                </button>

                {tasks.map((task) => (
                    <div key={task._id}>
                        <h3>{task.title}</h3>

                        <p>
                            {task.completed
                                ? "Completed"
                                : "Pending"}
                        </p>

                        <button className ="task-btn"
                            onClick={() => updateTask(task)}
                        >
                            Complete
                        </button>

                        <button className ="task-btn"
                            onClick={() => deleteTask(task._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </main>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                />
                <Route
                path="/register"
                element={<Register />}
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
export default App;