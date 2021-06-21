import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppbar } from './NotesAppbar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector( state => state.notes ); // se desestructura y se renombra
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { title, body, id } = formValues;

    // Explicacion en las notas del curso
    // La idea es que solo se dispare si y solo si la nota cambio estableciendo la nueva nota activa para evitar un ciclo infinito
    const activeId = useRef( note.id ); // es el id de la nota actual seleccionada

    useEffect(() => {
        
        if( note.id !== activeId.current ) { // con esta condicion me cercioro de que si cambio el id me lo cambie
            reset( note );
            activeId.current = note.id;
        }

    }, [ note, reset ]);

    useEffect(() => {
        
        dispatch( activeNote( formValues.id, { ...formValues } ) );

    }, [ formValues, dispatch ]);
    
    const handleDelete = () => {
        dispatch( startDeleting( id ) ); // esta accion va a empezar la tarea asincrona de borrar
    }
    return (
        <div className="notes__main-content">
            
            <NotesAppbar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    (note.url) 
                    && (
                        <div className="notes__image">
                            <img
                                src={ note.url }
                                alt="imagen"
                            />
                        </div>
                    )
                }


            </div>
            
            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>
        </div>
    )
}
