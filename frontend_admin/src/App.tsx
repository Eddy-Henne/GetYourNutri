import {NutriDatabase} from "./NutriDatabase.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import Navigation from "./Navigation.tsx";
import './index.css';
import {Route, Routes} from "react-router-dom";
import NutriDatabaseMapping from "./NutriDatabaseMapping.tsx";
import LoginPage from "./LoginPage.tsx";
import RegisterPage from "./RegisterPage.tsx";
import PapierkorbButton from "./PapierkorbButton.tsx";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();

    const [nutriDatabases, setNutriDatabases] = useState<NutriDatabase[]>([]);
    const [selectedView, setSelectedView] = useState<'Tabelle' | 'Rad'>('Tabelle');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [papierkorbCount, setPapierkorbCount] = useState<number>(0);

    // =======================
    // Nutzer-Session prüfen
    // =======================
    useEffect(() => {
        axios.get("/api/users/me", { withCredentials: true })
            .then(response => {
                if (!response.data?.username) {
                    navigate("/login");
                }
            })
            .catch(() => {
                navigate("/login");
            });
    }, [navigate]);

    // =======================
    // Daten abrufen (Haupt-Datenbank)
    // =======================
    const fetchNutris = () => {
        setIsLoading(true);

        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 800));
        const dataFetch = axios.get("/api/nutri", { withCredentials: true })
            .then(response => {
                setNutriDatabases(response.data);
            })
            .catch(() => {
                // Fehlerbehandlung: optional Logging-System hier einsetzen
            });
            Promise.all([minLoadingTime, dataFetch]).then(() => {
                setIsLoading(false);
        });
    };

    // =======================
    // Papierkorb-Daten zählen
    // =======================
    const fetchPapierkorbCount = () => {
        axios.get("/api/papierkorb", { withCredentials: true })
            .then(response => {
                setPapierkorbCount(response.data.length);
            })
            .catch(() => {
                // Fehlerbehandlung optional
            });
    };

    // =======================
    // Initiale Daten-Ladungen
    // =======================
    useEffect(() => {
        fetchNutris();
        fetchPapierkorbCount();
    }, []);

    // =======================
    // Kategorien + Filterung
    // =======================
    const categories = Array.from(new Set(nutriDatabases.map(item => item.kategorie)));

    const filteredNutriDatabases = nutriDatabases.filter(item => {
        if (selectedCategory && item.kategorie !== selectedCategory) return false;
        const lowerSearch = searchTerm.toLowerCase();
        return (
            item.name.toLowerCase().includes(lowerSearch) ||
            item.kategorie.toLowerCase().includes(lowerSearch) ||
            item.barcode.includes(searchTerm)
        );
    });

    // =======================
    // Ladeanzeige
    // =======================
    if (nutriDatabases.length === 0) {
        return "Lade...";
    }

    return(
    <Routes>
        <Route path={"/"} element={
            <>
                <PapierkorbButton count={papierkorbCount} onClick={() => {}} />

                <Navigation
                categories={categories}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                refreshNutris={fetchNutris}
                />
                {isLoading && (
                    <div className="overlay-backdrop">
                    <div className="loader-overlay">
                        <div className="loader-spinner">
                        </div>
                        <p>Bearbeiten...</p>
                    </div>
                    </div>)}
                <NutriDatabaseMapping
                    selectedView={selectedView}
                    filteredNutriDatabases={filteredNutriDatabases}
                    reloadData={fetchNutris}
                    refreshPapierkorb={fetchPapierkorbCount}
                    papierkorbCount={papierkorbCount}
                />
            </>
        }/>
        <Route path={"/login"} element={<LoginPage/>}/>
        <Route path={"/register"} element={<RegisterPage/>}/>
    </Routes>
    );
}

export default App