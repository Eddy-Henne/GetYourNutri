import { NutriDatabase } from "./NutriDatabase.ts";
import NutriDatabaseCard from "./NutriDatabaseCard.tsx";
import {useState} from "react";
import PapierkorbButton from "./PapierkorbButton.tsx";
import PapierkorbModal from "./PapierkorbModal.tsx";

type Props = {
    filteredNutriDatabases: NutriDatabase[],
    selectedSort: string;
    reloadData: () => void;
    refreshPapierkorb: () => void;
    papierkorbCount: number;
};

export default function NutriDatabaseMapping(props: Props) {
    // Hier wird das Mapping gemacht und in einer Variablen gespeichert
    const nutriDatabaseCards = props.filteredNutriDatabases.map((nutriItem) => (
        <NutriDatabaseCard key={nutriItem.id} nutriDatabase={nutriItem} selectedSort={props.selectedSort} reloadData={props.reloadData} onPapierkorbUpdate={props.refreshPapierkorb}/>
    ));

    const [isPapierkorbOpen, setIsPapierkorbOpen] = useState(false);

    return(
        <>
            <div className="container">
            {nutriDatabaseCards}
            </div>

            <div className="flex items-center gap-4">
                {/* Deine bestehenden Buttons */}
                <PapierkorbButton onClick={() => setIsPapierkorbOpen(true)} count={props.papierkorbCount} />

                <PapierkorbModal
                    isOpen={isPapierkorbOpen}
                    onClose={() => setIsPapierkorbOpen(false)}
                    onRestore={() => {
                        // Aktualisieren der Listen – optional abhängig von Struktur
                        setIsPapierkorbOpen(false);
                        window.location.reload(); // oder state neu laden
                    }}
                />
                </div>
        </>
    )
}