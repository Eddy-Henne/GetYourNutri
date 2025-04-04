import * as React from "react";
import './index.css';
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileLines} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


type Props = {
    categories: string[];
    selectedSort: string;
    setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
};

export default function Navigation(props: Props) {

    const [selectedOption, setSelectedOption] = useState<string>('name');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    const [formData, setFormData] = useState({
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

    // Funktion zum Bearbeiten der Formulardaten
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Funktion zum Speichern des neuen Objekts
    const handleCreateObject = async () => {
        try {
            const response = await axios.post("/api/nutri", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Erfolgreich gespeichert:", response.data);
            closeAddModal(); // Schließt das Modal nach dem Speichern
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

            <div className="radio-container">
                {/* Radiobuttons für Sortieroptionen */}

                    <input
                        type="radio"
                        name="sortOption"
                        id="name"
                        value="name"
                        checked={selectedOption === 'name'}
                        onChange={(e) => { props.setSelectedSort('name'); handleRadioChange(e); }}
                    />
                <label className="custom-radio" htmlFor="name">
                    <span>Name</span>
                </label>

                    <input
                        type="radio"
                        name="sortOption"
                        id="kategorie"
                        value="kategorie"
                        checked={selectedOption === 'kategorie'}
                        onChange={(e) => { props.setSelectedSort('kategorie'); handleRadioChange(e); }}
                    />
                <label className="custom-radio" htmlFor="kategorie">
                    <span>Kategorie</span>
                </label>

                    <input
                        type="radio"
                        name="sortOption"
                        id="barcode"
                        value="barcode"
                        checked={selectedOption === 'barcode'}
                        onChange={(e) => { props.setSelectedSort('barcode'); handleRadioChange(e); }}
                    />
                <label className="custom-radio" htmlFor="barcode">
                    <span>Barcode</span>
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
                        <FontAwesomeIcon icon={faFileLines} />{/* Zeigt den nach unten gerichteten Pfeil */}
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
                                    <input type="text" name="barcode" value={formData.barcode} onChange={handleChange} />
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                                    <input type="text" name="marke" value={formData.marke} onChange={handleChange} />
                                    <input type="text" name="supermarkt" value={formData.supermarkt} onChange={handleChange} />
                                    <input type="text" name="kategorie" value={formData.kategorie} onChange={handleChange} />
                                    <input type="text" name="essbar" value={formData.essbar} onChange={handleChange} />
                                    <input type="text" name="energie" value={formData.energie} onChange={handleChange} />
                                    <input type="text" name="fett" value={formData.fett} onChange={handleChange} />
                                    <input type="text" name="fettsaeuren" value={formData.fettsaeuren} onChange={handleChange} />
                                    <input type="text" name="kohlenhydrate" value={formData.kohlenhydrate} onChange={handleChange} />
                                    <input type="text" name="zucker" value={formData.zucker} onChange={handleChange} />
                                    <input type="text" name="eiweiss" value={formData.eiweiss} onChange={handleChange} />
                                </div>

                                {/* Dritte Spalte: Buttons */}
                                <div className="add-modal-buttons">
                                    <button onClick={handleCreateObject}>Erstellen</button>
                                    <button onClick={closeAddModal}>Schließen</button>
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