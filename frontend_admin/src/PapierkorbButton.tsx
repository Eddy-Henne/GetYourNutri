import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import {Button} from "./components/ui/button.tsx";

interface Props {
    onClick: () => void;
}

export default function PapierkorbButton({ onClick }: Props) {
    const [isFull, setIsFull] = useState(false);

    useEffect(() => {
        fetch("/api/papierkorb")
            .then((res) => res.json())
            .then((data) => setIsFull(data.length > 0))
        .catch((err) => console.error("Papierkorb-Ladefehler:", err));
    }, []);

    return (
        <div>
        <Button onClick={onClick} variant="ghost">
            <FontAwesomeIcon
                icon={isFull ? faTrashAlt : faTrash}
                className={isFull ? "text-red-500" : ""}
            />
            <span className="ml-2">Papierkorb</span>
        </Button>
        </div>
    );
}
