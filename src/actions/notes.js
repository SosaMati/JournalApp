import Swal from "sweetalert2";

import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types"; 



export const startNewNote = () => { 
   

    return async( dispatch, getState ) => { 
          
        const { uid } = getState().auth;  //uid es una propiedad del state que se obtiene de auth
        
        const newNote = { 
            title: '', 
            body: '', 
            date: new Date().getTime(), //getTime() es una funcion de javascript que nos permite obtener el tiempo en milisegundos
        };

        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote); //db.collection() es una funcion de firebase que nos permite crear una coleccion en la base de datos

        dispatch( activeNote( doc.id, newNote )); //dispatch es una funcion que nos permite disparar acciones
        dispatch( addNewNote( doc.id, newNote )); //addNewNote es una funcion que nos permite agregar una nueva nota
    };
};

export const activeNote = ( id, note ) => ({ 
    type: types.notesActive,  //type es una propiedad que se obtiene de types
    payload: {  
        id,   
        ...note 
    }
});

export const addNewNote = ( id, note ) => ({ 
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {

        const notes =  await loadNotes ( uid ); //loadNotes es una funcion que se ejecuta en el helper para obtener las notas del usuario que se logueo y se guardan en el state de notes en el reducer notesReducer
    
        dispatch( setNotes( notes ) ); //dispatch es una funcion que se ejecuta en el reducer
    };
};

export const setNotes = ( notes ) => ({  
    type: types.notesLoad, 
    payload: notes 
});


export const startSaveNote = ( note ) => {  //note es una propiedad que se obtiene del state de notes
    return async( dispatch, getState ) => {  //getState es una funcion que se ejecuta en el reducer

        const { uid } = getState().auth;  //uid es una propiedad del state que se obtiene de auth

        if( !note.url){
            delete note.url;
        }

        const noteToFirestore = { ...note }; 
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );  //db.doc() es una funcion de firebase que nos permite actualizar un documento en la base de datos

        dispatch( refreshNote( note.id, noteToFirestore ) ); //dispatch es una funcion que se ejecuta en el reducer
        Swal.fire('Saved', note.title, 'success');
    };
};

export const refreshNote = ( id, note ) => ({  
    type: types.notesUpdated,  
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
});



export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active: activeNote } = getState().notes;  //active es una propiedad del state que se obtiene de notes

        Swal.fire({   
            title: 'Uploading...',
            text: 'Please wait',
            showConfirmButton: false,
            allowOutsideClick: false,

            willOpen: () => {
                Swal.showLoading(); 
            }
        });

        const fileUrl = await fileUpload( file ); //fileUpload es una funcion que se ejecuta en el helper para subir un archivo a cloudinary
        activeNote.url = fileUrl;   

        dispatch( startSaveNote( activeNote ) ); //dispatch es una funcion que se ejecuta en el reducer

        Swal.close();

    };
};


export const startDeleting = ( id ) => {  

    return async( dispatch, getState ) => { 

        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();
        
        dispatch( deleteNote( id ) );


    };

};

export const deleteNote = (id) => {  
    return {
        type: types.notesDelete,
        payload: id
    };
};

export const noteLogout = () => {
    return {
        type: types.notesLogoutCleaning 
    };
}
 