import { createStore, combineReducers, applyMiddleware, compose } from 'redux'; 
import thunk from 'redux-thunk'; // middleware

import { authReducer } from '../reducers/authReducer'; // reducers
import { notesReducer } from '../reducers/notesReducer'; // reducers
import { uiReducer } from '../reducers/uiReducer'; // reducers

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; 


const reducers = combineReducers({ 
    //se colocan los reducers que se van a utilizar
    auth: authReducer, 
    ui: uiReducer,
    notes: notesReducer
});

//el store se importa en journalApp

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk) //se aplica el middleware, acciones asincronas
    )
);

