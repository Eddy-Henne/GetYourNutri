import { useEffect, useState } from "react";
import "@/styles/papierkorbModal.css";
import './styles/papierkorbModal.css';

interface PapierkorbNutri {
    id: string;
    barcode: string;
    name: string;
    marke: string;
    supermarkt: string;
    kategorie: string;
    essbar: string;
    energie: string;
    fett: string;
    fettsaeuren: string;
    kohlenhydrate: string;
    zucker: string;
    eiweiss: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onRestore: () => void;
}

export default function PapierkorbModal({ isOpen, onClose, onRestore }: Props) {
    const [entries, setEntries] = useState<PapierkorbNutri[]>([]);
    const [entriesToDelete, setEntriesToDelete] = useState<string[]>([]);
    const [selectedEntry, setSelectedEntry] = useState<PapierkorbNutri | null>(null);

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

    const markForDeletion = (id: string) => {
        setEntriesToDelete((prev) => [...prev, id]);
        setEntries((prev) => prev.filter((entry) => entry.id !== id));
    };

    const handleClearPapierkorb = async () => {
        await fetch("/api/papierkorb/clear", { method: "DELETE" });
        onRestore(); // Aktualisiert die Liste
        }

    const handleClose = async () => {
        if (entriesToDelete.length > 0) {
            // Nur wenn etwas markiert wurde, löschen & aktualisieren
            for (const id of entriesToDelete) {
                await fetch(`/api/papierkorb/${id}`, { method: "DELETE" });
            }
            setEntriesToDelete([]);
            onRestore(); // Liste nur dann aktualisieren
        }
        onClose(); // Modal schließen – unabhängig davon
    };

    const showDetails = (entry: PapierkorbNutri) => {
        setSelectedEntry(entry);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay-papierkorb">
            <div className="modal-wrapper">
                {/* Linke Spalte */}
                <div className="modal-content-papierkorb modal-left">
                    <h2 className="modal-title">Papierkorb</h2>
                    <button className="modal-clear" onClick={handleClearPapierkorb}>Papierkorb leeren</button>
                    <button className="modal-close" onClick={handleClose}>&times;</button>

                    {entries.length === 0 ? (
                        <p className="text-gray-500">Der Papierkorb ist leer.</p>
                    ) : (
                        <div className="space-y-2">
                            {entries.map((entry) => (
                                <div key={entry.id} className="papierkorb-entry">
                                    <div className="papierkorb-inline">
                                        <h4 className="standard-font">{entry.name}</h4>
                                        <div className="papierkorb-buttons">
                                            <button
                                                onClick={() => restore(entry.id)}
                                                className="papierkorb-restore-button"
                                            >
                                                Wiederherstellen
                                            </button>
                                            <button
                                                onClick={() => markForDeletion(entry.id)}
                                                className="papierkorb-delete-button"
                                            >
                                                Löschen
                                            </button>
                                            <button
                                                className="papierkorb-detail-button"
                                                onClick={() => showDetails(entry)}
                                            >
                                                i
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Rechte Spalte */}
                <div className="modal-content-papierkorb modal-right">
                    <h2 className="modal-title">Details</h2>
                    {selectedEntry ? (
                        <div className="details-grid">
                            <div className="edit-modal-labels-papierkorb">
                                <p><strong>Barcode</strong></p>
                                <p><strong>Name</strong></p>
                                <p><strong>Marke</strong></p>
                                <p><strong>Supermarkt</strong></p>
                                <p><strong>Kategorie</strong></p>
                                <p><strong>Essbar</strong></p>
                                <p><strong>Energie</strong></p>
                                <p><strong>Fett</strong></p>
                                <p><strong>Fettsäuren</strong></p>
                                <p><strong>Kohlenhydrate</strong></p>
                                <p><strong>Zucker</strong></p>
                                <p><strong>Eiweiß</strong></p>
                            </div>
                            <div className="edit-modal-values-papierkorb">
                                <p>{selectedEntry.barcode}</p>
                                <p>{selectedEntry.name}</p>
                                <p>{selectedEntry.marke}</p>
                                <p>{selectedEntry.supermarkt}</p>
                                <p>{selectedEntry.kategorie}</p>
                                <p>{selectedEntry.essbar}</p>
                                <p>{selectedEntry.energie}</p>
                                <p>{selectedEntry.fett}</p>
                                <p>{selectedEntry.fettsaeuren}</p>
                                <p>{selectedEntry.kohlenhydrate}</p>
                                <p>{selectedEntry.zucker}</p>
                                <p>{selectedEntry.eiweiss}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">Keine Details ausgewählt.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
