import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminLogin = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/admin-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({userName, password})
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Greska pri prijavi");
            }

            localStorage.setItem("token", data.token);
            navigate("/admin-dashboard");
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Admin Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Lozinka"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Prijavi se</button>
        </form>
    )
}

export default AdminLogin;