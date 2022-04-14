import { useSelector } from "react-redux";
import { JournalEntry } from "./JournalEntry";


export const JournalEntries = () => {

    const { notes } = useSelector( (state) => state.notes ); //se obtiene el state del reducer notes


    return (
        <div className="journal__entries">
            
            {
                notes.map( note => ( //se recorre el array de notas
                    <JournalEntry 
                        key={ note.id }  
                        { ...note } 
                    />
                ))
            }

        </div>
    )
}
