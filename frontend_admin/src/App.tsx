import {NutriDatabase} from "./NutriDatabase.ts";
import NutriDatabaseCard from "./NutriDatabaseCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Navigation from "./Navigation.tsx";
import './index.css';



function App() {

    const [nutriDatabases, setNutriDatabases] = useState<NutriDatabase[]>([]);

    const [selectedSort, setSelectedSort] = useState<string>('name');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        axios.get("/api/nutri")
            .then(response => {
                setNutriDatabases(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    if (nutriDatabases.length === 0) {
        return "Lade...";
    }


    const categories = nutriDatabases.length > 0
        ? Array.from(new Set(nutriDatabases.map(item => item.kategorie)))
        : [];


    const filteredData = nutriDatabases
        .filter(item => {
            // Filtere nach Kategorie
            if (selectedCategory && item.kategorie !== selectedCategory) return false;
            // Filtere nach Suchbegriff
            if (
                !item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !item.kategorie.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !item.barcode.includes(searchTerm)
            ) return false;
            return true;
        })
        .sort((a, b) => {
            // Sortierung basierend auf dem ausgewählten Wert (name, kategorie, barcode)
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
    <>

            <title>Get Your Nutri</title>


        <div>
            <Navigation
                categories={categories}
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
        </div>
        <div className="container">
            {nutriDatabases
                .filter(item => {
                    if (selectedCategory && item.kategorie !== selectedCategory) return false;
                    if (
                        !item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        !item.kategorie.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        !item.barcode.includes(searchTerm)
                    ) return false;
                    return true;
                })
                .map((nutriItem) => (
                    <NutriDatabaseCard key={nutriItem.id} nutriDatabase={nutriItem} selectedSort={selectedSort} />
                ))}
        </div>
    </>
    )
}

export default App
