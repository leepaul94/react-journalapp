import { types } from "../types/types";
/* Objeto que se recibiria
    {
        uid: 'sdakjhsbduajhysbi4352345234',
        name: 'Paul'
    }
*/


export const authReducer = ( state = {}, action ) => {

    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        
        case types.logout:
            return { }
    
        default:
            return state;
    }
}