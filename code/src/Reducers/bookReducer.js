import * as ActionType from '../actions/actionTypes'
import { edit, del, deleteBooks } from '../parser/helpers'
export default function bookReducer(state = { books: [] }, action) {
    switch (action.type) {

        case ActionType.ADD_BOOK: {
            return { ...state, books: [...state.books, action.payload] }
        }
        case ActionType.EDIT_BOOK_DETAILS: {
            const newData = edit(state.books, action.payload.oldData, action.payload.data)
            return { ...state, books: newData };
        }
        case ActionType.DELETE_BOOK: {
            const newData = del(state.books, action.payload)
            return { ...state, books: newData };
        }
        case ActionType.DELETE_BOOKS: {
            const newbooks = deleteBooks(state.books, action.payload.type, action.payload.name)
            return { ...state, books: newbooks };
        }
        default: // need this for default case
            return state
    }
}