import { useEffect, useState } from "react";
import {Button} from "./components/ui/button.tsx";

interface PapierkorbNutri {
    id: string;
    name: string;
    marke: string;
    kategorie: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onRestore: () => void;
}

export default function PapierkorbModal({ isOpen, onClose, onRestore }: Props) {
    const [entries, setEntries] = useState<PapierkorbNutri[]>([]);

    useEffect(() => {
        if (isOpen) {
            fetch("/api/papierkorb")
                .then((res) => res.json())
                .then(setEntries);
        }
    }, [isOpen]);

    const restore = async (id: string) => {
        await fetch(`/api/papierkorb/restore/${id}`, { method: "POST" });
        onRestore();
    };

    const removeForever = async (id: string) => {
        await fetch(`/api/papierkorb/${id}`, { method: "DELETE" });
        onRestore();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl relative">
                <h2 className="text-xl font-bold mb-4">Papierkorb</h2>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                >
                    &times;
                </button>

                {entries.length === 0 ? (
                    <p className="text-gray-500">Der Papierkorb ist leer.</p>
                ) : (
                    <div className="space-y-3">
                        {entries.map((entry) => (
                            <div
                                key={entry.id}
                                className="flex items-center justify-between border p-2 rounded-xl shadow-sm"
                            >
                                <div>
                                    <p className="font-semibold">{entry.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {entry.marke} · {entry.kategorie}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => restore(entry.id)}
                                        variant="outline"
                                        className="text-green-600 border-green-400"
                                    >
                                        Wiederherstellen
                                    </Button>
                                    <Button
                                        onClick={() => removeForever(entry.id)}
                                        variant="destructive"
                                    >
                                        Endgültig löschen
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
