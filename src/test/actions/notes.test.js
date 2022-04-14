 /**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store'; 
import thunk from 'redux-thunk';  

import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';


jest.mock('../../helpers/fileUpload', () => {
    return {
        fileUpload: () => {
            return Promise.resolve(
                "https://misfotos.com/photo.png"
            );
        },
    };
});


const middlewares = [thunk];  
const mockStore = configureStore(middlewares);  

const initialState = {
    auth: {
        uid: 'test'
    },
    notes: {
        active:{
            id: 'X4fiKfmsfuXZsKL10xHl',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}

let store = mockStore( initialState );


describe('Pruebas con las acciones de notes', () => {


    beforeEach( () => { //limpiamos la base de datos antes de cada prueba
        
        store = mockStore( initialState )//creamos un store
    });


    test('debe de crear una nueva nota starNewNote', async() => {

       await store.dispatch( startNewNote() );

        const action = store.getActions();

        expect(action[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect (action[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        //Borrar el doc creado
        const docId = action[0].payload.id;
        await db.doc(`/test/journal/notes/${docId}`).delete();
     
    });


    test('startLoadingNotes debe de cargar las notas', async() => {

        await store.dispatch( startLoadingNotes('test') ); 

        const actions = store.getActions();  //obtenemos las acciones

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect( actions[0].payload[0] ).toMatchObject( expected ); 

    });

    test('startSaveNote debe de actualizar la nota', async() => {
          
            const note = {
                id: 'X4fiKfmsfuXZsKL10xHl', //id de la nota
                title: 'title',
                body: 'body',
            }
    
            await store.dispatch( startSaveNote( note ) ); 
    
            const actions = store.getActions();  //obtenemos las acciones

            expect( actions[0].type ).toBe( types.notesUpdated );

            const docRef = await db.doc(`/test/journal/notes/${note.id}`).get();

            expect( docRef.data().title ).toBe( note.title );
           
    });

    test('startUploading debe de actualizar el url del entry', async() => {

        const file = [];  //creamos un arreglo vacio
 
        await store.dispatch( startUploading( file ) );  //dispatch es una funcion que se encarga de ejecutar las acciones
 
        const docRef = await db.doc(`/test/journal/notes/X4fiKfmsfuXZsKL10xHl`).get();  
 
        expect(docRef.data().url).toBe('https://misfotos.com/photo.png');   //comprobamos que el url de la nota sea igual al url que se obtiene de cloudinary   

    })
})