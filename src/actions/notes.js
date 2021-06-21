import Swal from 'sweetalert2';

import { db } from "../firebase/firebaseConfig";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

// react-journal

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth; // asi obtengo el uid para luego grabarlo al firebase
        console.log( uid );
        const newNote = { // es la varible a guardar
            title: '',
            body: '',
            date: new Date().getTime()
        }
        // db es la referencia al database, llamo a collecion poniendo el path donde voy a guardar mi newNote con add()
        // el add es algo que regresa una promesa que resuelve el document reference
        const doc = await db.collection(`${uid}/journal/notes`).add( newNote )
        
        dispatch( activeNote( doc.id, newNote ) ); // lo grabo en el active
        dispatch( addNewNote( doc.id, newNote ) ); // hago que aparezca en la pantalla en el recuadro a la izquierda
    }
}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
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

        const notes = await loadNotes( uid ); // esto es para obtener las notas del usuario en concreto. Es una promesa.
                                                    // se hizo aca porque es donde por primera vez aparece el uid
        dispatch( setNotes(notes) ); // mando las notes para que los pueda tener en el store o que queden almacenadas

    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = ( note ) => { // tengo que recibir la nota
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if( !note.url ){ // Si no esta definido el url, entonces lo elimino porque no puedo subir algo de undefined
            delete note.url;
        }

        const noteToFirestore = { ...note }; // copio o clono el note asi elimino el id de la copia
        delete noteToFirestore.id; // elimino el id del objeto porque no lo necesito subir, solo requiero el title, body, date

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore ); // update para actualizar al firestore

        dispatch( refreshNote( note.id, noteToFirestore ));
        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdate,
    payload: {
        id,
        note: {
            id, // lo tengo que agregar porque la note que recibo es el noteToFirestore
            ...note
        }
    }
} )

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...', 
            text: 'Please wait...',
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl; // se lo estamos actualizando el url obtenido

        dispatch( startSaveNote( activeNote ))

        Swal.close();
    }
}

export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => { // para obtener el url que necesito borrar

        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete(); // lo elimino de firestore

        dispatch( deleteNote( id ) ); // ahora quiero eliminarlo de mi store


    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
})

export const logoutNote = () => ({
    type: types.notesLogoutCleaning,
})