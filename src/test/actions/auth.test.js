import configureStore from 'redux-mock-store'; 
import thunk from 'redux-thunk';  


import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";


const middlewares = [thunk];  
const mockStore = configureStore(middlewares);  

const initialState = {};

let store = mockStore( initialState );  



describe('Pruebas con las acciones de auth', () => {

    beforeEach(() => {   
        store = mockStore( initialState );   // reset the store
    });  
    
    
    test('login y logout deben de crear la acción respectiva', () => {
            
            const action = login( '5435555', 'Matias' );  
            
            expect(action).toEqual({    
                type: types.login,
                payload: {
                    uid: '5435555',
                    displayName: 'Matias'
                }
            });
            
            const action2 = logout();
            
            expect(action2).toEqual({
                type: types.logout
            });

    });

    test('debe de realizar el logout', async() => {

        await store.dispatch( startLogout() );   

        const actions = store.getActions();  

        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });

    });

    test('debe de iniciar el startLoginEmailPassword', async() => {

        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') );    

        const actions = store.getActions();  

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'wdaDfJSBt0REbYBF2jFNrSmXT5F2',
                displayName: null
            }
        });

    })

    
})