import {FormEvent, useState} from "react";
import axios from "axios";

export default function RegisterPage () {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function register() {
        axios.post("api/users/register", {

            username: username,
            password: password
        })
            .then(() => {
                setPassword("");
                setUsername("");
                console.log("Registration successful");
            })
            .catch(e => {
                setUsername("")
                setPassword("");
                console.error(e)
            });
    }


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    register();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder={"Username"}/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"Password"} type={"password"}/>
            <button>New Registration</button>
        </form>

    );
}