import { types } from "../types/types"


describe('Pruebas en types', () => { 

    test('debe de retornar los types', () => { 

        expect(types).toEqual({
            login: '[Auth] Login', 
            logout: '[Auth] Logout', 
        
            uiSetError: '[UI] Set Error',   
            uiRemoveError: '[UI] Remove Error',  
        
            uiStartLoading: '[UI] Start Loading',  
            uiFinishLoading: '[UI] Finish Loading',
        
            notesAddNew: '[Notes] New Note',
            notesActive: '[Notes] Set Active Note',   
            notesLoad: '[Notes] Load Notes',  
            notesUpdated: '[Notes] Update Note',
            notesFileUrl: '[Notes] Update Image URL',
            notesDelete: '[Notes] Delete Note',
            notesLogoutCleaning: '[Notes] Logout Cleaning',
        
        });

    })
})