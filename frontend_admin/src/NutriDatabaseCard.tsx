import {NutriDatabase} from "./NutriDatabase.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';


type Props = {
    nutriDatabase: NutriDatabase;
    selectedSort: string;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedData: NutriDatabase) => void;
};

export default function NutriDatabaseCard(props: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedNutri, setEditedNutri] = useState(props.nutriDatabase);
    const [inputField, setInputField] = useState(false);
    const [editingField, setEditingField] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    const username = 'admin';  // Dein Benutzername
    const password = 'admin';  // Dein Passwort
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

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
                `/api/nutri/${editedNutri.id}`,  // Die URL für den PUT-Request
                editedNutri,  // Die zu aktualisierenden Daten
                {
                    headers: {
                        'Authorization': authHeader,  // Basic Auth Header
                        'Content-Type': 'application/json',  // Den Content-Type für JSON
                    },
                }
            );
            console.log('Update erfolgreich:', response.data);
            props.onUpdate(editedNutri.id, editedNutri);  // Optional: Daten nach Update verarbeiten
        } catch (error) {
            console.error('Fehler beim Update:', error);
        }
    };
    const handleDeleteClick = () => {
        props.onDelete(props.nutriDatabase.id);  // Löschen des Objekts
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
        <div className="nutriDatabase-card">
            <h2>{displayValue}</h2>

            <button onClick={openModal} className="expand-button">
                <FontAwesomeIcon icon={faFileLines} />{/* Zeigt den nach unten gerichteten Pfeil */}
            </button>

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
                            <div
                                onClick={() => openInputField("barcode")}
                                className="editable-text">
                                <p>{props.nutriDatabase.barcode}</p>
                            </div>

                                {inputField && editingField === "barcode" && (
                                <div className="modal-overlay2" onClick={handleOverlayClick2}>
                                    <div className="modal-content2">
                                        <div className="input-field">
                                            <input
                                            type="text"
                                            value={editedNutri.barcode}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            onChange={(e) => handleInputChange(e, "barcode")}
                                            />
                                    </div>
                                        <div className="modal-buttons2">
                                            <button
                                                onClick={handleSaveClick} className="save-btn">Speichern
                                            </button>
                                            <button
                                                onClick={closeInputField} className="close-modal-btn">Schließen
                                            </button>
                                        </div>
                                    </div>
                                </div>)}


                            <div
                                onClick={() =>openInputField("name")}
                                className={"editable-text"}>
                                <p>{props.nutriDatabase.name}</p>
                            </div>

                            {inputField && editingField === "name" && (
                                <div className="modal-overlay2" onClick={handleOverlayClick2}>
                                    <div className="modal-content2">
                                        <div className="input-field">
                                        <input
                                            type="text"
                                            value={editedNutri.name}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            onChange={(e) => handleInputChange(e, "name")}
                                        />
                                        </div>
                                        <div className="modal-buttons2">
                                            <button
                                                onClick={handleSaveClick} className="save-btn">Speichern
                                            </button>
                                            <button
                                                onClick={closeInputField} className="close-modal-btn">Schließen
                                            </button>
                                        </div>
                                    </div>
                                </div>)}

                            <div
                                onClick={() =>openInputField("marke")}
                                className={"editable-text"}>
                                <p>{props.nutriDatabase.marke}</p>
                            </div>

                            {inputField && editingField === "marke" && (
                                <div className="modal-overlay2" onClick={handleOverlayClick2}>
                                    <div className="modal-content2">
                                        <div className="input-field">
                                            <input
                                                type="text"
                                                value={editedNutri.marke}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                onChange={(e) => handleInputChange(e, "marke")}
                                            />
                                        </div>
                                        <div className="modal-buttons2">
                                            <button
                                                onClick={handleSaveClick} className="save-btn">Speichern
                                            </button>
                                            <button
                                                onClick={closeInputField} className="close-modal-btn">Schließen
                                            </button>
                                        </div>
                                    </div>
                                </div>)}

                            <div
                                onClick={() =>openInputField("supermarkt")}
                                className={"editable-text"}>
                                <p>{props.nutriDatabase.supermarkt}</p>
                            </div>

                            {inputField && editingField === "supermarkt" && (
                                <div className="modal-overlay2" onClick={handleOverlayClick2}>
                                    <div className="modal-content2">
                                        <div className="input-field">
                                            <input
                                                type="text"
                                                value={editedNutri.supermarkt}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                onChange={(e) => handleInputChange(e, "supermarkt")}
                                            />
                                        </div>
                                        <div className="modal-buttons2">
                                            <button
                                                onClick={handleSaveClick} className="save-btn">Speichern
                                            </button>
                                            <button
                                                onClick={closeInputField} className="close-modal-btn">Schließen
                                            </button>
                                        </div>
                                    </div>
                                </div>)}

                            <div
                                onClick={() =>openInputField("kategorie")}
                                className={"editable-text"}>
                                <p>{props.nutriDatabase.kategorie}</p>
                            </div>

                            {inputField && editingField === "kategorie" && (
                                <div className="modal-overlay2" onClick={handleOverlayClick2}>
                                    <div className="modal-content2">
                                        <div className="input-field">
                                            <input
                                                type="text"
                                                value={editedNutri.kategorie}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                onChange={(e) => handleInputChange(e, "kategorie")}
                                            />
                                        </div>
                                        <div className="modal-buttons2">
                                            <button
                                                onClick={handleSaveClick} className="save-btn">Speichern
                                            </button>
                                            <button
                                                onClick={closeInputField} className="close-modal-btn">Schließen
                                            </button>
                                        </div>
                                    </div>
                                </div>)}

                            <div
                                onClick={() =>openInputField("essbar")}
                                className={"editable-text"}>
                                <p>{props.nutriDatabase.essbar}</p>
                            </div>

                            {inputField && editingField === "essbar" && (
                                <div className="modal-overlay2" onClick={handleOverlayClick2}>
                                    <div className="modal-content2">
                                        <div className="input-field">
                                            <input
                                                type="text"
                                                value={editedNutri.essbar}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                onChange={(e) => handleInputChange(e, "essbar")}
                                            />
                                        </div>
                                        <div className="modal-buttons2">
                                            <button
                                                onClick={handleSaveClick} className="save-btn">Speichern
                                            </button>
                                            <button
                                                onClick={closeInputField} className="close-modal-btn">Schließen
                                            </button>
                                        </div>
                                    </div>
                                </div>)}

                            <div
                                onClick={() =>openInputField("energie")}
                                className={"editable-text"}>
                                <p>{props.nutriDatabase.energie}</p>
                            </div>

                            {inputField && editingField === "energie" && (
                                <div className="modal-overlay2" onClick={handleOverlayClick2}>
                                    <div className="modal-content2">
                                        <div className="input-field">
                                            <input
                                                type="text"
                                                value={editedNutri.energie}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                onChange={(e) => handleInputChange(e, "energie")}
                                            />
                                        </div>
                                        <div className="modal-buttons2">
                                            <button
                                                onClick={handleSaveClick} className="save-btn">Speichern
                                            </button>
                                            <button
                                                onClick={closeInputField} className="close-modal-btn">Schließen
                                            </button>
                                        </div>
                                    </div>
                                </div>)}

                            <div
                                onClick={() =>openInputField("fett")}
                                className={"editable-text"}>
                                <p>{props.nutriDatabase.fett}</p>
                            </div>

                            {inputField && editingField === "fett" && (
                                <div className="modal-overlay2" onClick={handleOverlayClick2}>
                                    <div className="modal-content2">
                                        <div className="input-field">
                                            <input
                                                type="text"
                                                value={editedNutri.fett}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                onChange={(e) => handleInputChange(e, "fett")}
                                            />
                                        </div>
                                        <div className="modal-buttons2">
                                            <button
                                                onClick={handleSaveClick} className="save-btn">Speichern
                                            </button>
                                            <button
                                                onClick={closeInputField} className="close-modal-btn">Schließen
                                            </button>
                                        </div>
                                    </div>
                                </div>)}

                            <div
                                onClick={() =>openInputField("fettsaeuren")}
                                className={"editable-text"}>
                                <p>{props.nutriDatabase.fettsaeuren}</p>
                            </div>

                            {inputField && editingField === "fettsaeuren" && (
                                <div className="modal-overlay2" onClick={handleOverlayClick2}>
                                    <div className="modal-content2">
                                        <div className="input-field">
                                            <input
                                                type="text"
                                                value={editedNutri.fettsaeuren}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                onChange={(e) => handleInputChange(e, "fettsaeuren")}
                                            />
                                        </div>
                                        <div className="modal-buttons2">
                                            <button
                                                onClick={handleSaveClick} className="save-btn">Speichern
                                            </button>
                                            <button
                                                onClick={closeInputField} className="close-modal-btn">Schließen
                                            </button>
                                        </div>
                                    </div>
                                </div>)}

                            <div
                                onClick={() =>openInputField("kohlenhydrate")}
                                className={"editable-text"}>
                                <p>{props.nutriDatabase.kohlenhydrate}</p>
                            </div>

                            {inputField && editingField === "kohlenhydrate" && (
                                <div className="modal-overlay2" onClick={handleOverlayClick2}>
                                    <div className="modal-content2">
                                        <div className="input-field">
                                            <input
                                                type="text"
                                                value={editedNutri.kohlenhydrate}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                onChange={(e) => handleInputChange(e, "kohlenhydrate")}
                                            />
                                        </div>
                                        <div className="modal-buttons2">
                                            <button
                                                onClick={handleSaveClick} className="save-btn">Speichern
                                            </button>
                                            <button
                                                onClick={closeInputField} className="close-modal-btn">Schließen
                                            </button>
                                        </div>
                                    </div>
                                </div>)}

                            <div
                                onClick={() =>openInputField("zucker")}
                                className={"editable-text"}>
                                <p>{props.nutriDatabase.zucker}</p>
                            </div>

                            {inputField && editingField === "zucker" && (
                                <div className="modal-overlay2" onClick={handleOverlayClick2}>
                                    <div className="modal-content2">
                                        <div className="input-field">
                                            <input
                                                type="text"
                                                value={editedNutri.zucker}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                onChange={(e) => handleInputChange(e, "zucker")}
                                            />
                                        </div>
                                        <div className="modal-buttons2">
                                            <button
                                                onClick={handleSaveClick} className="save-btn">Speichern
                                            </button>
                                            <button
                                                onClick={closeInputField} className="close-modal-btn">Schließen
                                            </button>
                                        </div>
                                    </div>
                                </div>)}

                            <div
                                onClick={() =>openInputField("eiweiss")}
                                className={"editable-text"}>
                                <p>{props.nutriDatabase.eiweiss}</p>
                            </div>

                            {inputField && editingField === "eiweiss" && (
                                <div className="modal-overlay2" onClick={handleOverlayClick2}>
                                    <div className="modal-content2">
                                        <div className="input-field">
                                            <input
                                                type="text"
                                                value={editedNutri.eiweiss}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                onChange={(e) => handleInputChange(e, "eiweiss")}
                                            />
                                        </div>
                                        <div className="modal-buttons2">
                                            <button
                                                onClick={handleSaveClick} className="save-btn">Speichern
                                            </button>
                                            <button
                                                onClick={closeInputField} className="close-modal-btn">Schließen
                                            </button>
                                        </div>
                                    </div>
                                </div>)}

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
        </div>
    );
}

    /*
    return (
        <div className="nutriDatabase-card">
            {props.nutriDatabase.name}
        </div>
    );

     */



