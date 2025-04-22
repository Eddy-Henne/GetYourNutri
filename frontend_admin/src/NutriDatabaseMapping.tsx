import { NutriDatabase } from "./NutriDatabase.ts";
import NutriDatabaseCard from "./NutriDatabaseCard.tsx";
import {useState} from "react";
import PapierkorbButton from "./PapierkorbButton.tsx";
import PapierkorbModal from "./PapierkorbModal.tsx";

type Props = {
    filteredNutriDatabases: NutriDatabase[],
    selectedView: 'Tabelle' | 'Rad';
    reloadData: () => void;
    refreshPapierkorb: () => void;
    papierkorbCount: number;
};

export default function NutriDatabaseMapping(props: Props) {
    const [isPapierkorbOpen, setIsPapierkorbOpen] = useState(false);

    return(
        <>
            {/* Hauptcontainer für Tebellen-Darstellung */}
            <div className="container">
                {props.selectedView === "Tabelle" && (
                    props.filteredNutriDatabases.map((nutriItem) => (
                        <NutriDatabaseCard
                            key={nutriItem.id}
                            nutriDatabase={nutriItem}
                            selectedView={props.selectedView}
                            reloadData={props.reloadData}
                            onPapierkorbUpdate={props.refreshPapierkorb}
                            nutriList={props.filteredNutriDatabases}
                            onSelect={() => {}}
                        />
                    ))
                )}

                {/* Hauptcontainer für Karussell-Darstellung */}
                {props.selectedView === "Rad" && (
                    // 👉 Hier nur **einmal** das Rad mit allen Items
                    <NutriDatabaseCard
                        nutriDatabase={props.filteredNutriDatabases[0]} // Platzhalter
                        selectedView={props.selectedView}
                        reloadData={props.reloadData}
                        onPapierkorbUpdate={props.refreshPapierkorb}
                        nutriList={props.filteredNutriDatabases}
                        onSelect={() => {}}
                    />
                )}
            </div>

            {/* Papierkorb-Bereich mit Button und Modal */}
            <div className="flex items-center gap-4">
                <PapierkorbButton
                    onClick={() => setIsPapierkorbOpen(true)}
                    count={props.papierkorbCount}
                />

                <PapierkorbModal
                    isOpen={isPapierkorbOpen}
                    onClose={() => setIsPapierkorbOpen(false)}
                    onRestore={() => {
                        // Nach Wiederherstellung Liste und Zähler aktualisieren
                        setIsPapierkorbOpen(false);
                        props.reloadData();
                        props.refreshPapierkorb();
                    }}
                />
            </div>
        </>
    )
}