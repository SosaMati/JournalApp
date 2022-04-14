import { types } from "../types/types"; 



const initialState = {  
    notes: [],  
    active: null 
};


export const notesReducer = (state = initialState, action) => { 
    
    switch( action.type ) {  //action.type es una propiedad que se obtiene de types
       
        case types.notesActive:  
            return { 
                ...state, 
                active: { 
                    ...action.payload
                }
            };

        case types.notesAddNew: //cuando se agrega una nueva nota
            return {
                ...state,
                notes: [
                    action.payload,
                    ...state.notes
                ]
            };

        case types.notesLoad:  //cuando se cargan las notas
            return {
                ...state, 
                notes: [...action.payload] 
            };

        case types.notesUpdated: //cuando se actualiza una nota
            return {
                ...state,
                notes: state.notes.map( 
                    note => note.id === action.payload.id 
                        ? action.payload.note
                        : note 
                )
            };

        case types.notesDelete: //cuando se elimina una nota
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload )
            };

        case types.notesLogoutCleaning: //cuando se cierra sesion
            return {
                ...state,
                notes: [],
                active: null
            };

        
        default: 
            return state;
    }
}
