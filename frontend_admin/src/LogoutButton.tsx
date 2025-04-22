import { LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();

    function handleLogout() {
        axios.post("/api/users/logout", { withCredentials: true })
            .then(() => {
                navigate("/login"); // oder wohin du den Nutzer schicken willst
            })
            .catch((e) => console.error("Logout fehlgeschlagen", e));
    }

    return (
        <div className="nav-container">
        <button className="logout-button" onClick={handleLogout}>
            <LogOut size={20} className="logout-icon" />
            <span>Logout</span>
        </button>
        </div>
            );
}
