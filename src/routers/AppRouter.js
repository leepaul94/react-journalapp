// Sistema de rutas principal
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { firebase } from '../firebase/firebaseConfig';

import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Solo se ejecuta una sola vez porque firebase.auth().onAuthStateChanged es un observable que va a estar pendiente de los cambios de la autenticacion de mi usuario. Solo se va a ejecutar cuando cambia la autenticacion o sea el uid que siempre es el mismo para determinado usuario y diferente de otro (usuario)
    useEffect(() => {
        // Firebase me va a decir algo cuando la autenticacion cambia que es una funcion que se ejecuta cada vez que el estado de autenticacion cambia. Es un firebase.auth().onAuthStateChanged. Tambien se usa use effect.
        firebase.auth().onAuthStateChanged( async(user) => { // firebase.auth().onAuthStateChanged va a crear un observable que es un tipo de objeto especial que se puede disparar mas de una vez. Cuando la autenticacion cambia, se va a disparar.

            if( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn(true); // esta loggeado

                dispatch( startLoadingNotes( user.uid ) ); // para que se carguen las notas que estan cargadas en el fireStore
            } else {
                setIsLoggedIn(false); // no esta loggeado. Es para que podamos luego validar si puede ir a determinada ruta o no.
            }

            setChecking(false); // significa que ya se checkeo al usuario si esta autenticado o no

        });
        
    }, [dispatch, setChecking, setIsLoggedIn]); // Como "podria" cambiar el usedispatch, lo tengo que poner como dependencia sin embargo nunca nos va a cambiar el dispatch por fuera del useEffect. Lo pongo para que no hay un warning

    if( checking ) {
        return (
            <h1>Please, wait...</h1>
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth" 
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute 
                        exact
                        path="/" 
                        component={ JournalScreen }
                        isAuthenticated={ isLoggedIn }
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
