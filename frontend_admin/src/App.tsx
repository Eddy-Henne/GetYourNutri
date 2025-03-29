import {NutriDatabase} from "./NutriDatabase.ts";
import NutriDatabaseCard from "./NutriDatabaseCard.tsx";

function App() {

    const nutriDatabase: NutriDatabase[] = [
        {
            id: 1,
            name: 'Pão de queijo',
            calories: 200,
            proteins: 10,
            fats: 5,
            carbohydrates: 30
        },
        {
            id: 2,
            name: 'Coxinha',
            calories: 300,
            proteins: 20,
            fats: 10,
            carbohydrates: 40
        },
        {
            id: 3,
            name: 'Bolo de cenoura',
            calories: 400,
            proteins: 30,
            fats: 15,
            carbohydrates: 50
        },
        {
            id: 4,
            name: 'Brigadeiro',
            calories: 500,
            proteins: 40,
            fats: 20,
            carbohydrates: 60
        },
        {
            id: 5,
            name: 'Café',
            calories: 100,
            proteins: 5,
            fats: 2,
            carbohydrates: 15
        }
    ]
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
