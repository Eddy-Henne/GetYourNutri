import {NutriDatabase} from "./NutriDatabase.ts";
import NutriDatabaseCard from "./NutriDatabaseCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [nutriDatabase, setNutriDatabase] = useState<NutriDatabase[]>();

    useEffect(() => {
        axios.get("/api/nutri")
            .then(response => {setNutriDatabase(response.data)})
        }, []
    )

    if (!nutriDatabase) {
        return "Lade...";
    }

    return(
    <>
        <h1>Get Your Nutri - einkaufen, ernähren, Fitness</h1>
        {
            nutriDatabase.map(nutriDatabase=> <NutriDatabaseCard nutriDatabase={nutriDatabase} key={nutriDatabase.id} />)
        }
    </>
    )
}

export default App
