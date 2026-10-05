import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://192.168.31.2:5000/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert("Registration successful");
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div>
            <h2>Register</h2>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleRegister}>
                Register
            </button>

            <button onClick={() => navigate("/")}>
                Back to Login
            </button>
        </div>
    );
}

export default Register;