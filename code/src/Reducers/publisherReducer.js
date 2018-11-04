import * as ActionType from '../actions/actionTypes'
import { edit, del } from '../parser/helpers'

export default function publisherReducer(state = { publishers: [] }, action) {
    switch (action.type) {
        case ActionType.ADD_PUBLISHER: {
            return { ...state, publishers: [...state.publishers, action.payload] }
        }
        case ActionType.EDIT_PUBLISHER_DETAILS: {
            const newData = edit(state.publishers, action.payload.oldData, action.payload.data)
            return { ...state, publishers: newData };
        }
        case ActionType.DELETE_PUBLISHER: {
            const newData = del(state.publishers, action.payload)
            return { ...state, publishers: newData };
        }
        default: // need this for default case
            return state
    }
}