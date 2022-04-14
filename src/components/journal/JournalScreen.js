import { useSelector } from "react-redux"; //es un Hook que nos permite extraer datos del store de Redux y usarlos en nuestro componente

import { NothingSelected } from "./NothingSelected";
import { NoteScreen } from "../notes/NoteScreen";
import { Sidebar } from "./Sidebar";


export const JournalScreen = () => {

    const { active } = useSelector(state => state.notes); //extraer el estado del store de Redux

    return (
        <div 
            className="journal__main-content animate__animated animate__fadeIn animate__faster">

            <Sidebar />

            <main>

                {
                    (active )  
                        ? (<NoteScreen />) 
                        : (<NothingSelected />) 
                }

            </main>

        </div>
    );
}