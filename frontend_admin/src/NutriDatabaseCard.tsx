import {NutriDatabase} from "./NutriDatabase.ts";

type Props ={
    nutriDatabase: NutriDatabase,
    }

export default function NutriDatabaseCard(props: Props) {
    return (
        <div>
            {props.nutriDatabase.name}
        </div>
    );
}

