import axios from "axios";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import './styles/LoginPage.css';

export default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);

        axios.post("api/users/login", formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            withCredentials: true // ← wichtig für Session-Cookie
        })
            .then(() => {
                setPassword("");
                setUsername("");
                navigate("/");
            })
            .catch(e => {
                setPassword("");
                console.error(e)
            });
    }

    return(
        <div className="login-page">
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    className="login-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={"Username"}
                    required
                />
                <input
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={"Password"}
                    type={"password"}
                    required
                />
                <button className="login-button">Login</button>
            </form>
        </div>
        </div>
    );
}