import {NutriDatabase} from "./NutriDatabase.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import Navigation from "./Navigation.tsx";
import './index.css';
import {Route, Routes} from "react-router-dom";
import NutriDatabaseMapping from "./NutriDatabaseMapping.tsx";
import LoginPage from "./LoginPage.tsx";
import RegisterPage from "./RegisterPage.tsx";


function App() {

    const [nutriDatabases, setNutriDatabases] = useState<NutriDatabase[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>('name');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        axios.get("/api/nutri", {
            withCredentials: true
        })
            .then(response => {
                setNutriDatabases(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    if (!Array.isArray(nutriDatabases) || nutriDatabases.length === 0) {
        return <p>Lade...</p>;
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
            <Navigation
                categories={categories}
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <NutriDatabaseMapping
                selectedSort={selectedSort}
                filteredNutriDatabases={filteredNutriDatabases}
            />
            </>
        }/>
        <Route path={"/login"} element={<LoginPage/>}/>
        <Route path={"/register"} element={<RegisterPage/>}/>

    </Routes>

            );
}

export default App
