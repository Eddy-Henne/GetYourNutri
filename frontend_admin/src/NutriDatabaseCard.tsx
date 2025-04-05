import {NutriDatabase} from "./NutriDatabase.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileLines} from '@fortawesome/free-solid-svg-icons';

type Props = {
    selectedSort: string;
    nutriDatabase: NutriDatabase;
    reloadData: () => void;
};

export default function NutriDatabaseCard(props: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedNutri, setEditedNutri] = useState(props.nutriDatabase);
    const [inputField, setInputField] = useState(false);
    const [editingField, setEditingField] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    const displayValue = props.selectedSort === 'name'
        ? props.nutriDatabase.name
        : props.selectedSort === 'kategorie'
            ? props.nutriDatabase.kategorie
            : props.nutriDatabase.barcode;

    useEffect(() => {
        if (inputField) {
            setEditedNutri(props.nutriDatabase);
        }
    }, [props.nutriDatabase, inputField]);

    const handleOverlayClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };
    const handleOverlayClick2 = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            closeInputField();
        }
    };
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const openInputField = (field: string) => {
        setInputField(true);
        setEditingField(field);
    };
    const closeInputField = () => {
        setInputField(false);
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put(
                `/api/nutri/${editedNutri.id}`,
                editedNutri,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Update erfolgreich:', response.data);
            props.reloadData();
            closeInputField();
        } catch (error) {
            console.error('Fehler beim Update:', error);
        }
    };

    const handleDeleteClick = async () => {
        console.log("🗑 Löschen wurde ausgelöst!");
        try {
            await axios.delete(`/api/nutri/${props.nutriDatabase.id}`, {
            });
            props.reloadData();
            closeModal();
        } catch (error) {
            console.error("Fehler beim Löschen:", error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setEditedNutri({
            ...editedNutri,
            [field]: event.target.value,
        });
    };
    const handleFocus = () => {
        setIsFocused(true); // Fokus setzen
        setEditedNutri((prev) => ({
            ...prev,
            barcode: "", // Leere den Barcode-Wert beim Fokussieren
        }));
    };

    const handleBlur = () => {
        setIsFocused(false); // Fokus entfernen
        // Wenn der Barcode leer bleibt (d.h. keine Eingabe), setze den alten Wert zurück
        if (!editedNutri.barcode) {
            setEditedNutri((prev) => ({
                ...prev,
                barcode: props.nutriDatabase.barcode, // Setze den ursprünglichen Barcode-Wert zurück
            }));
        }
    };

    return (
        <>
            <title>Get Your Nutri</title>

            <div className="nutriDatabase-card">
                <h2>{displayValue}</h2>

                <button onClick={openModal} className="expand-button">
                    <FontAwesomeIcon icon={faFileLines}/>
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <h3>{props.nutriDatabase.name}</h3>

                        {/* Grid: 1. Spalte */}
                        <div>
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

                        {/* Grid: 2. Spalte */}

                        <div>
                            {(Object.keys(editedNutri) as (keyof NutriDatabase)[])
                                .filter((field) => field !== "id")
                                .map((field) => (
                                <React.Fragment key={field}>
                                    <div onClick={() => openInputField(field)} className="editable-text">
                                        <p>{props.nutriDatabase[field]}</p>
                                    </div>

                                    {inputField && editingField === field && (
                                        <div className="modal-overlay2" onClick={handleOverlayClick2}>
                                            <div className="modal-content2">
                                                <div className="input-field">
                                                    <input
                                                        type="text"
                                                        value={editedNutri[field] ?? ""}
                                                        onChange={(e) => handleInputChange(e, field)}
                                                        onFocus={field === "barcode" ? handleFocus : undefined}
                                                        onBlur={field === "barcode" ? handleBlur : undefined}
                                                    />
                                                </div>
                                                <div className="modal-buttons2">
                                                    <button onClick={handleSaveClick} className="save-btn">Speichern</button>
                                                    <button onClick={closeInputField} className="close-modal-btn">Schließen</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                                ))}
                        </div>


                        {/* Gird: 3. Spalte */}

                        <div>
                            <p>-</p>
                            <p>-</p>
                            <p>-</p>
                            <p>-</p>
                            <p>-</p>
                            <p>-</p>
                            <p>kcal</p>
                            <p>g</p>
                            <p>g</p>
                            <p>g</p>
                            <p>g</p>
                            <p>g</p>
                        </div>


                        {/* Gird: 4. Spalte */}

                        <div className="modal-buttons">
                            <button
                                onClick={handleDeleteClick} className="delete-btn">Löschen
                            </button>
                            <button
                                onClick={closeModal} className="close-modal-btn">Schließen
                            </button>
                        </div>


                    </div>
                </div>


            )}

        </>);
}

/*
return (
    <div className="nutriDatabase-card">
        {props.nutriDatabase.name}
    </div>
);

 */



