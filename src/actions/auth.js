import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from "../types/types";
import { logoutNote } from './notes';
import { finishLoading, startLoading } from './ui';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword( email, password)
            .then( ({ user }) => {

                dispatch( 
                    login( user.uid, user.displayName)
                );

                dispatch( finishLoading() );// es indiferente ponerlo aca o antes del otro dispatch porque son tareas sincronas

            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error') // el primer argumento es el titulo del mensaje, el segundo el mensaje y el tercero el icono de error
            });
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return (dispatch) => { // tengo acceso a dispatch por thunk de middleware 

        firebase.auth().createUserWithEmailAndPassword( email, password ) // es una promesa
            .then( async({ user }) => { // para usar el await

                await user.updateProfile({ displayName: name }); // usamos await porque es una promesa el updateProfile, espero hasta que se termine de ejecutar
                
                dispatch( 
                    login( user.uid, user.displayName )
                );
            })
            .catch( e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error')
            });
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {

        firebase.auth().signInWithPopup( googleAuthProvider ) // esto va a retornar una promesa
            .then( ({ user }) => {
                dispatch( 
                    login( user.uid, user.displayName)
                )
            });

    }
}

export const login = (uid, displayName) => ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
});

export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() ); // dispatch del logout que va a borrar mi uid y el displayName del store 
                              // me retorna un objeto vacio cuando va al authreducer.
        dispatch( logoutNote() );

    }                         
}

export const logout = () => ({
    type: types.logout
});