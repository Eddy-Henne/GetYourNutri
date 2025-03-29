import {NutriDatabase} from "./NutriDatabase.ts";

type Props ={
    nutriDatabase: NutriDatabase,
    }

export default function NutriDatabaseCard(props: Props) {
    return (
        <div className="nutriDatabase-card">
            {props.nutriDatabase.name}
        </div>
    );
}

