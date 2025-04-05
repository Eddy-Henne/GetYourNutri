import NutriDatabaseCard from './NutriDatabaseCard';
import {NutriDatabase} from "./NutriDatabase.ts";
import {useEffect, useState} from "react";
import axios from "axios";

const NutriDatabaseList = () => {
    const [nutriDatabases, setNutriDatabases] = useState<NutriDatabase[]>([]);

    useEffect(() => {
        axios.get('/api/nutri')
            .then(response => setNutriDatabases(response.data))
            .catch(error => console.error("Fehler beim Laden der Daten:", error));
    }, []);

    return (
        <div>
            {nutriDatabases.map(nutriDatabase => (
                <NutriDatabaseCard
                    key={nutriDatabase.id}
                    nutriDatabase={nutriDatabase}
                    reloadData={() => {
                        axios.get('/api/nutri')
                            .then(response => setNutriDatabases(response.data))
                            .catch(error => console.error("Fehler beim Nachladen:", error));
                    }}
                />
            ))}
        </div>
    );
};

export default NutriDatabaseList;
