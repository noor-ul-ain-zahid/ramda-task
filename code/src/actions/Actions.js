import * as ActionType from './actionTypes'

export const addBook = (newBook) => {
    return {
        type: ActionType.ADD_BOOK,
        payload: newBook

    };
}

export const updateBook = (oldData, data) => {
    return {
        type: ActionType.EDIT_BOOK_DETAILS,
        payload: {
            data,
            oldData
        }
    };
}
export const deleteBook = (book) => {
    return {
        type: ActionType.DELETE_BOOK,
        payload: book

    };
}

export const addAuthor = (newPublisher) => {
    return {
        type: ActionType.ADD_AUTHOR,
        payload: newPublisher

    };
}

export const updateAuthor = (oldData, data) => {
    return {
        type: ActionType.EDIT_AUTHOR_DETAILS,
        payload: {
            data,
            oldData
        }
    };
}

export const deleteAuthor = (author) => {
    return {
        type: ActionType.DELETE_AUTHOR,
        payload: author

    };
}

export const addPublisher = (newPublisher) => {
    return {
        type: ActionType.ADD_PUBLISHER,
        payload: newPublisher
    };
}

export const updatePublisher = (oldData, data) => {
    return {
        type: ActionType.EDIT_PUBLISHER_DETAILS,
        payload: {
            data,
            oldData
        }

    };
}


export const deletePublisher = (publisher) => {
    return {
        type: ActionType.DELETE_PUBLISHER,
        payload: publisher

    };
}

export const deleteBooks = (type, name) => {
    return {
        type: ActionType.DELETE_BOOKS,
        payload: {
            type,
            name
        }
    };
}

