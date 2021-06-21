/*
    {
        notes: [],
        active: null,
        active: {
            id: 'FSDFA4523FDSDFSDSA234A' PROVISTO POR EL FIREBASE
            title: '',
            body: '',
            imageUrl: '',
            date: 154235425235
        }
    }
*/

import { types } from "../types/types";


const initialState = {
    notes: [],
    active: null
};

export const notesReducer = ( state = initialState, action ) => {
  
    switch (action.type) {
        
        case types.notesActive: 
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        
        case types.notesAddNew: 
            return {
                ...state, 
                notes: [ action.payload, ...state.notes ] // lo agrego al principio y luego le copio las que ya estaban
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }

        case types.notesUpdate:
            return {
                ...state,
                notes: state.notes.map( 
                    note => note.id === action.payload.id 
                        ? action.payload.note
                        : note
                )
            };

        case types.notesDelete: 
            return {
                ...state, 
                active: null,
                notes: state.notes.filter(
                    note => note.id !== action.payload
                )
            }
        
        case types.notesLogoutCleaning: 
            return {
                ...state,
                active: null,
                notes: []
            }
    
        default:
            return state;
    }
}