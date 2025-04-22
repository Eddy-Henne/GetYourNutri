import * as React from "react";
import './index.css';
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileLines} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import LogoutButton from './LogoutButton';

type FormField =
    | 'barcode'
    | 'name'
    | 'marke'
    | 'supermarkt'
    | 'kategorie'
    | 'essbar'
    | 'energie'
    | 'fett'
    | 'fettsaeuren'
    | 'kohlenhydrate'
    | 'zucker'
    | 'eiweiss';

type Props = {
    categories: string[];
    selectedView: 'Tabelle' | 'Rad';
    setSelectedView: React.Dispatch<React.SetStateAction<'Tabelle' | 'Rad'>>;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    refreshNutris: () => void;
};

export default function Navigation(props: Props) {
    const [focusedField, setFocusedField] = useState<FormField | ''>('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [formData, setFormData] = useState<Record<FormField, string>>({
        barcode: '',
        name: '',
        marke: '',
        supermarkt: '',
        kategorie: '',
        essbar: '',
        energie: '',
        fett: '',
        fettsaeuren: '',
        kohlenhydrate: '',
        zucker: '',
        eiweiss: ''
    });

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    const isFilled = (fieldName: FormField) => {
        return formData[fieldName]?.trim() !== '' && focusedField !== fieldName;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreateObject = async () => {
        const cleanedFormData = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [
                key,
                value === "" ? "kein Eintrag" : value,
            ])
        );

        try {
            await axios.post("/api/nutri", cleanedFormData, {
                headers: { "Content-Type": "application/json" }
            });

            setFormData({
                barcode: '',
                name: '',
                marke: '',
                supermarkt: '',
                kategorie: '',
                essbar: '',
                energie: '',
                fett: '',
                fettsaeuren: '',
                kohlenhydrate: '',
                zucker: '',
                eiweiss: ''
            });

            closeAddModal();
            props.refreshNutris();
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
        }
    };

    return (
        <>
        <div className="nav-container-wrapper">
            <div className="header-container">
                <h1 style={{ fontFamily: 'Dancing Script, cursive', fontSize: '4rem', color: 'white' }}>
                Get Your Nutri - einkaufen, ernähren, Fitness
                </h1>
            </div>

            <div className="nav-container">
                <LogoutButton />

                <div className="radio-container">

                {/* Radiobuttons für Layoutoptionen */}
                    <input
                        type="radio"
                        name="sortOption"
                        id="tabelle"
                        value="Tabelle"
                        checked={props.selectedView === 'Tabelle'}
                        onChange={() => props.setSelectedView('Tabelle')}
                    />
                <label className="custom-radio" htmlFor="tabelle">
                    <span>Tabelle</span>
                </label>

                    <input
                        type="radio"
                        name="sortOption"
                        id="rad"
                        value="Rad"
                        checked={props.selectedView === 'Rad'}
                        onChange={() => props.setSelectedView('Rad')}
                    />
                <label className="custom-radio" htmlFor="rad">
                    <span>Karussell</span>
                </label>
            </div>

            {/* Kategorie-Auswahl */}
            <div className="Kategorieauswahl">
                <select
                    value={props.selectedCategory}
                    onChange={(e) => props.setSelectedCategory(e.target.value)}
                >
                    <option value="">Alle Kategorien</option>
                    {props.categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Suchfeld */}
            <div>
                <input
                    type="text"
                    placeholder="Suche..."
                    value={props.searchTerm}
                    onChange={(e) => props.setSearchTerm(e.target.value)}
                />
            </div>
                <div>
                    <div className="neues-objekt-navigation-container">
                    <button onClick={openAddModal} className="neues-objekt-button">
                        <FontAwesomeIcon icon={faFileLines} />
                    </button>
                        <div className="neues-objekt-text">
                    <p>Neues Objekt erstellen</p>
                        </div>
                    </div>
                    {isAddModalOpen && (
                        <div className="add-modal-overlay">
                            <div className="add-modal-content">
                                <h2>Neues Objekt erstellen</h2>
                                <div className="add-modal-form">


                                {/* Erste Spalte: Labels */}
                                <div className="add-modal-labels">
                                    <label htmlFor="barcode">Barcode</label>
                                    <label htmlFor="name">Name</label>
                                    <label htmlFor="marke">Marke</label>
                                    <label htmlFor="supermarkt">Supermarkt</label>
                                    <label htmlFor="kategorie">Kategorie</label>
                                    <label htmlFor="essbar">Essbar</label>
                                    <label htmlFor="energie">Energie</label>
                                    <label htmlFor="fett">Fett</label>
                                    <label htmlFor="fettsaeuren">Fettsäuren</label>
                                    <label htmlFor="kohlenhydrate">Kohlenhydrate</label>
                                    <label htmlFor="zucker">Zucker</label>
                                    <label htmlFor="eiweiss">Eiweiß</label>
                                </div>

                                {/* Zweite Spalte: Eingabefelder */}
                                    <div className="add-modal-inputs">
                                        {[
                                            'barcode',
                                            'name',
                                            'marke',
                                            'supermarkt',
                                            'kategorie',
                                            'essbar',
                                            'energie',
                                            'fett',
                                            'fettsaeuren',
                                            'kohlenhydrate',
                                            'zucker',
                                            'eiweiss',
                                        ].map((field) => (
                                            <input
                                                key={field}
                                                type="text"
                                                name={field}
                                                value={formData[field as FormField]}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField(field as FormField)}
                                                onBlur={() => setFocusedField('')}
                                                className={isFilled(field as FormField) ? 'filled' : ''}
                                            />
                                        ))}
                                    </div>

                                {/* Dritte Spalte: Buttons */}
                                <div className="control-buttons-create-container">
                                    <button className="control-buttons" onClick={handleCreateObject}>Erstellen</button>
                                    <button className="control-buttons" onClick={closeAddModal}>Schließen</button>
                                    <button className="control-buttons" onClick={() => setFormData({
                                        barcode: '',
                                        name: '',
                                        marke: '',
                                        supermarkt: '',
                                        kategorie: '',
                                        essbar: '',
                                        energie: '',
                                        fett: '',
                                        fettsaeuren: '',
                                        kohlenhydrate: '',
                                        zucker: '',
                                        eiweiss: ''
                                    })}>
                                        Zurücksetzen
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
        </div>
    </div>
        </>);
}