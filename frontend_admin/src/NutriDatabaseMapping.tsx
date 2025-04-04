import { NutriDatabase } from "./NutriDatabase.ts";
import NutriDatabaseCard from "./NutriDatabaseCard.tsx";

type Props = {
    filteredNutriDatabases: NutriDatabase[],
    selectedSort: string;
};

export default function NutriDatabaseMapping(props: Props) {
    // Hier wird das Mapping gemacht und in einer Variablen gespeichert
    const nutriDatabaseCards = props.filteredNutriDatabases.map((nutriItem) => (
        <NutriDatabaseCard key={nutriItem.id} nutriDatabase={nutriItem} selectedSort={props.selectedSort} />
    ));

    return(
        <>
            <div className="container">
            {nutriDatabaseCards}
            </div>
        </>
    )
}