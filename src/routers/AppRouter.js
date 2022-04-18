import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import { firebase } from '../firebase/firebase-config';

import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { startLoadingNotes } from "../actions/notes";


export const AppRouter = () => {
    
    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true); //para que no se renderice la pantalla de carga antes de que se haya autenticado
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);     



    useEffect( () => {

        firebase.auth().onAuthStateChanged( async(user) => { //es una funcion que se ejecuta cuando el usuario se loguea o se desloguea, permite que el usuario siga activo cuando se recarga la pagina
            if (user?.uid) { //si el usuario existe
                dispatch( login( user.uid, user.displayName ) ); //dispatch es una funcion que se ejecuta en el reducer
                setIsLoggedIn( true ); //se cambia el estado de isLoggedIn a true
                dispatch( startLoadingNotes( user.uid ) ); //dispatch es una funcion que se ejecuta en el reducer

            } else {
                setIsLoggedIn( false ); //se cambia el estado de isLoggedIn a false
            }
            
            setChecking(false); //cuando se haya autenticado, se puede renderizar la pantalla de carga
            
        });

    }, [ dispatch, setChecking, setIsLoggedIn ] );  

    if (checking) { //si se esta autenticando
        return (
            <h1>Wait...</h1>
        ) //no se renderiza nada
    }


    return (  
        <BrowserRouter basename="/React">
            <Routes>
                <Route path="/auth/*" element={ 
                    <PublicRoute isAuth={isLoggedIn}>
                        <AuthRouter />
                    </PublicRoute>
                    } 
                />

                <Route path="/" element={ 
                    <PrivateRoute isAuth={isLoggedIn}>
                        <JournalScreen />
                    </PrivateRoute>
                    } 
                />

                <Route path="/*" element={
                    <Navigate replace to="/auth/login" />
                    } 
                />

            </Routes>
        </BrowserRouter>
    );
}