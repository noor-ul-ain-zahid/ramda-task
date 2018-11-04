import * as ActionType from '../actions/actionTypes'
import { edit, del } from '../parser/helpers'

export default function authorReducer(state = {authors:[]},action) {
switch (action.type) {
       
    case ActionType.ADD_AUTHOR: {
        return { ...state, authors: [...state.authors, action.payload] }
    }
    case ActionType.EDIT_AUTHOR_DETAILS: {
        const newData = edit(state.authors, action.payload.oldData, action.payload.data)
            return { ...state, authors: newData };
    }
    case ActionType.DELETE_AUTHOR: {
        const newData = del(state.authors, action.payload)
            return { ...state, authors: newData };
    }
    default: // need this for default case
    return state 
}
}