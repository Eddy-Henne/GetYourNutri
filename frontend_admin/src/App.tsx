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

function App() {

    const [nutriDatabases, setNutriDatabases] = useState<NutriDatabase[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>('name');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [papierkorbCount, setPapierkorbCount] = useState<number>(0);

    //              Items laden und aktualisieren

    const fetchNutris = () => {
        setIsLoading(true);
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 800));

        const dataFetch = axios.get("/api/nutri")
            .then(response => {
                setNutriDatabases(response.data);
            })
            .catch((error) => {
                console.error('Fehler beim Laden der Daten:', error);
            })
            Promise.all([minLoadingTime, dataFetch]).then(() => {
                setIsLoading(false);
        });
    };

    const fetchPapierkorbCount = () => {
        axios.get("/api/papierkorb")
            .then(response => {
                console.log("Papierkorb-Daten:", response.data);
                setPapierkorbCount(response.data.length); // 👈 hier wird gesetzt
            })
            .catch(error => {
                console.error("Fehler beim Laden des Papierkorb-Counts:", error);
            });
    };

    //                  Initiales Laden der Items

    useEffect(() => {
        fetchNutris();
    }, []);

    useEffect(() => {
        fetchPapierkorbCount();
    }, []);

    if (nutriDatabases.length === 0) {
        return "Lade...";
    }

    const categories = nutriDatabases.length > 0
        ? Array.from(new Set(nutriDatabases.map(item => item.kategorie)))
        : [];

    const filteredNutriDatabases = nutriDatabases
        .filter(item => {
            if (selectedCategory && item.kategorie !== selectedCategory) return false;
            return !(!item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !item.kategorie.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !item.barcode.includes(searchTerm));
        })
        .sort((a, b) => {
            if (selectedSort === 'name') {
                return a.name.localeCompare(b.name);
            }
            if (selectedSort === 'kategorie') {
                return a.kategorie.localeCompare(b.kategorie);
            }
            if (selectedSort === 'barcode') {
                return a.barcode.localeCompare(b.barcode);
            }
            return 0;
        });



    return(

    <Routes>
        <Route path={"/"} element={
            <>
                <PapierkorbButton count={papierkorbCount} onClick={() => console.log("Papierkorb öffnen")} />

                <Navigation
                categories={categories}
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
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
                selectedSort={selectedSort}
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
