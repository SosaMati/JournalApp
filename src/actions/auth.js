import Swal from 'sweetalert2'; 

import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from "../types/types";
import { noteLogout } from './notes';
import { finishLoading, startLoading } from './ui';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch( startLoading() ); //inicia el loading
       
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login( user.uid, user.displayName ));

                dispatch( finishLoading() ); //finaliza el loading
            })
            .catch(err => {
                console.log(err);
                dispatch( finishLoading() ); //finaliza el loading si tiene un error 
                Swal.fire( 'Error', err.message, 'error' ); //muestra un mensaje de error
            });
    }

};

export const startRegisterEmailPassword = (name, email, password) => { 
    return (dispatch) => { 
        
        firebase.auth().createUserWithEmailAndPassword(email, password)  
            .then( async({ user }) => {  
            
                await user.updateProfile({ displayName: name });  
                dispatch( 
                    login(user.uid, name, email)   
                );
            })
            .catch( (err) => { 
                console.log(err);
                Swal.fire( 'Error', err.message, 'error' ); //muestra un mensaje de error
            });
    }
};



export const startLoginGoogle = () => {
    return ( dispatch ) => { 

        firebase.auth().signInWithPopup( googleAuthProvider ) //signInWithPopup() es una funcion de firebase que nos permite iniciar sesion con google
            .then( ({ user })  => {
                dispatch( 
                    login( user.uid, user.displayName )  //user.uid es el id del usuario 
                );
            })
    }
};
    

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
};

export const startLogout = () => { 
    return async ( dispatch) => { 
        await firebase.auth().signOut() //signOut() es una funcion de firebase que nos permite cerrar sesion
          
        dispatch( logout() ); 
        dispatch( noteLogout() );
    }
};

export const logout = () => { 
    return {
        type: types.logout 
    }
};


