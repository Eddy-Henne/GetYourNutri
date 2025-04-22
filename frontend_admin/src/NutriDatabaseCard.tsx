import {NutriDatabase} from "./NutriDatabase.ts";
import {useEffect, useRef, useState} from "react";
import * as React from "react";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileLines} from '@fortawesome/free-solid-svg-icons';
import './styles/NutriDatabaseRadView.css';

type Props = {
    selectedView: 'Tabelle' | 'Rad';
    nutriDatabase: NutriDatabase;
    reloadData: () => void;
    onPapierkorbUpdate: () => void;
    nutriList: NutriDatabase[];
    onSelect: (nutri: NutriDatabase) => void;
};

export default function NutriDatabaseCard(props: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedNutri, setEditedNutri] = useState(props.nutriDatabase);
    const [inputField, setInputField] = useState(false);
    const [editingField, setEditingField] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);

    // Karussell-Parameter für Anzahl sichtbarer Objekte
    const visibleCount = 7;
    const offset = Math.floor(visibleCount / 2);

    // Pause zwischen Scrolls, Delay in Millisekunden
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const scrollDelay = 100;

    const getWrappedIndex = (index: number) => {
        return (index + props.nutriList.length) % props.nutriList.length;
    };

    const visibleNutris = Array.from({ length: visibleCount }, (_, i) => {
        const index = getWrappedIndex(activeIndex - offset + i);
        return props.nutriList[index];
    });

    const { nutriList, onSelect } = props;
    useEffect(() => {
        const selected = nutriList[activeIndex];
        if (selected) {
            props.onSelect(selected);
        }
    }, [activeIndex, nutriList, onSelect, props]);

    // Stellt Daten zur Verfügung in Abhängigkeit davon, ob das Layout Tabelle oder Rad aktiv ist
    useEffect(() => {
        if (props.selectedView === 'Tabelle' && props.nutriDatabase) {
            setEditedNutri(props.nutriDatabase);
        }
        if (props.selectedView === 'Rad' && props.nutriList[activeIndex]) {
            setEditedNutri(props.nutriList[activeIndex]);
        }
    }, [props.nutriDatabase, props.nutriList, activeIndex, props.selectedView]);

    // Stelle sicher, dass der Index innerhalb der Liste bleibt
    useEffect(() => {
        if (props.nutriList.length && activeIndex >= props.nutriList.length) {
            setActiveIndex(0);
        }
    }, [props.nutriList, activeIndex]);

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
        setEditingField(null);
    };

    const handleSaveClick = async () => {
        try {
             await axios.put(`/api/nutri/${editedNutri.id}`, editedNutri, {
                    headers: {'Content-Type': 'application/json'}
                });
            props.reloadData();
            closeInputField();
        } catch (error) {
            console.error('Fehler beim Update:', error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            const idToDelete = props.selectedView === 'Rad'
                    ? props.nutriList[activeIndex].id
                    : props.nutriDatabase.id;

            await axios.delete(`/api/nutri/${idToDelete}`);
            props.reloadData();
            props.onPapierkorbUpdate();

            // Schließen nach dem Löschen
            if (props.selectedView === 'Tabelle') {
                closeModal();
            } else {
                closeInputField();
            }
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
    const handleFocus = (field: keyof NutriDatabase) => {
        setEditedNutri((prev) => ({
            ...prev,
            [field]: "" // Nur das fokussierte Feld leeren
        }));
    };

    const handleBlur = (field: keyof NutriDatabase) => {
        const original = props.selectedView === "Tabelle"
            ? props.nutriDatabase[field]
            : props.nutriList[activeIndex][field];

        if (!editedNutri[field]) {
            setEditedNutri((prev) => ({
                ...prev,
                [field]: original
            }));
        }
    };
    
    // Tastatursteuerung für Karussell
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowUp") {
                setActiveIndex((prev) => getWrappedIndex(prev - 1));
            } else if (event.key === "ArrowDown") {
                setActiveIndex((prev) => getWrappedIndex(prev + 1));
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [props.nutriList.length]);


    // Maus-Rad-Steuerung für das Karussell
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        if (scrollTimeout.current) return; // noch im Cooldown

        if (e.deltaY > 0) {
            setActiveIndex((prev) => getWrappedIndex(prev + 1));
        } else {
            setActiveIndex((prev) => getWrappedIndex(prev - 1));
        }

        scrollTimeout.current = setTimeout(() => {
            scrollTimeout.current = null;
        }, scrollDelay);
    };

    return (
        <>
            <title>Get Your Nutri</title>

            {props.selectedView === 'Tabelle' && (
                <>

            <div className="nutriDatabase-card">
                <h2>{props.nutriDatabase.name}</h2>

                <button onClick={openModal} className="expand-button">
                    <FontAwesomeIcon icon={faFileLines}/>
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <h3>{props.nutriDatabase.name}</h3>

                        {/* Grid: 1. Spalte */}

                        <div className="edit-modal-labels">
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

                                    {inputField && isModalOpen && editingField === field && (
                                        <div className="modal-overlay2" onClick={handleOverlayClick2}>
                                            <div className="modal-content2">
                                                <div className="modal-save-label">
                                                    <h3>{field}</h3>
                                                </div>
                                                <div className="input-field">
                                                    <input
                                                        type="text"
                                                        value={editedNutri[field] ?? ""}
                                                        onChange={(e) => handleInputChange(e, field)}
                                                        onFocus={() => handleFocus(field)}
                                                        onBlur={() => handleBlur(field)}
                                                    />
                                                </div>
                                                <div className="modal-buttons2">
                                                    <button onClick={handleSaveClick} className="save-btn control-buttons">Speichern</button>
                                                    <button onClick={closeInputField} className="close-modal-btn control-buttons">Schließen</button>
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
                                onClick={handleDeleteClick} className="delete-btn control-buttons">Löschen
                            </button>
                            <button
                                onClick={closeModal} className="close-modal-btn control-buttons">Schließen
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </>)}

            {props.selectedView === 'Rad' && (
                <>
                    <div className="rad-wrapper">

                        <div className="rad-main-layout">
                            <div
                                className="rad-left-panel"
                                ref={containerRef}
                                onWheel={handleWheel}

                            >
                                {visibleNutris.map((entry, i) => {
                                    if (!entry) return null;
                                    const isActive = i === offset;
                                    const relativeIndex = i - offset; // z.B. -3, -2, -1, 0, 1, 2, 3

                                    // Skalierung je nach Abstand zur Mitte

                                    const scale = 1 - Math.abs(relativeIndex) * 0.07; // z.B. 1.0, 0.9, 0.8, 0.7
                                    const opacity = 1 - Math.abs(relativeIndex) * 0.15; // z.B. 1.0, 0.8, 0.6, 0.4

                                    return (
                                        <div
                                            key={`${entry.name}-${i}`}
                                            className={`nutriDatabase-card-rad ${isActive ? "active" : ""}`}
                                            onClick={() => {
                                                const index = getWrappedIndex(activeIndex - offset + i);
                                                setActiveIndex(index);

                                                if (entry) {
                                                    props.onSelect(entry);
                                                }
                                            }}

                                            style={{
                                                transform: `scale(${scale})`,
                                                opacity,
                                                zIndex: isActive ? 10 : 10 - Math.abs(relativeIndex),

                                            }}                    >

                                            {entry.name}
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Scroll-View */}

                            <div className="rad-right-panel">
                                <div className="modal-content-rad">

                                    <div className="edit-modal-labels-rad">
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

                                    <div className="editable-text-rad0">
                                        {(Object.keys(editedNutri) as (keyof NutriDatabase)[])
                                            .filter((field) => field !== "id")
                                            .map((field) => (
                                                <React.Fragment key={field}>
                                                    <div onClick={() => openInputField(field)} className="editable-text-rad">
                                                        <p>{props.nutriList[activeIndex]?.[field]}</p>
                                                    </div>

                                                    {editingField === field && editedNutri.id === props.nutriList[activeIndex].id && (
                                                        <div className="modal-overlay2-rad" onClick={handleOverlayClick2}>
                                                            <div className="modal-content2-rad">
                                                                <div className="modal-save-label-rad">
                                                                    <h3>{field}</h3>
                                                                </div>
                                                                <div className="input-field">
                                                                    <input
                                                                        type="text"
                                                                        value={editedNutri[field] ?? ""}
                                                                        onChange={(e) => handleInputChange(e, field)}
                                                                        onFocus={() => handleFocus(field)}
                                                                        onBlur={() => handleBlur(field)}
                                                                    />
                                                                </div>
                                                                <div className="modal-buttons2">
                                                                    <button onClick={handleSaveClick} className="save-btn control-buttons">Speichern</button>
                                                                    <button onClick={closeInputField} className="close-modal-btn control-buttons">Schließen</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                    </div>

                                    <div className="rad-einheiten">
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

                                    <div className="modal-buttons">
                                        <button onClick={handleDeleteClick} className="delete-btn control-buttons">Löschen</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </>)}
        </>);
}