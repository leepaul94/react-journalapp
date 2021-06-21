import { db } from "../firebase/firebaseConfig"



export const loadNotes = async( uid ) => {

    const notesSnap = await db.collection(`${ uid }/journal/notes`)
                        .orderBy('date', 'desc')
                        .get(); // referencia a las notes. get() es un promesa que me resuelve la coleccion

    const notes = []; // lo que voy a retornar

    notesSnap.forEach( snapHijo => { // con la data del snapHijo y el for each para cada array de notes de firebase
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });


    return notes;
}

