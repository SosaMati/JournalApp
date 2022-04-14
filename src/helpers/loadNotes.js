import { db } from "../firebase/firebase-config";


export const loadNotes = async( uid ) => {
    
        const notes = []; 
    
        const notesSnap = await db.collection(`${ uid }/journal/notes`).get();  //db.collection() es una funcion de firebase que nos permite crear una coleccion en la base de datos, con el parametro ${ uid } le decimos que coleccion queremos obtener y con .get() obtenemos los datos de la coleccion
    
        notesSnap.forEach( snapHijo => { //snapHijo es una propiedad que se obtiene de notesSnap 
            notes.push({  
                id: snapHijo.id,  
                ...snapHijo.data()  //data() es una funcion de firebase que nos permite obtener los datos de la coleccion
            });
        });
    
        return notes; 
    
};


