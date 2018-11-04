import { combineReducers } from 'redux';

import books from './bookReducer';
import authors from './authorReducer';
import publishers from './publisherReducer'
const reducer=combineReducers ({
    bookReducer:books,
    authorReducer:authors,
    publisherReducer:publishers});
export default reducer;
