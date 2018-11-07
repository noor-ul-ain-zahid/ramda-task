import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import books from './bookReducer';
import authors from './authorReducer';
import publishers from './publisherReducer'
const reducer = combineReducers({
    bookReducer: books,
    authorReducer: authors,
    publisherReducer: publishers,
    form: reduxFormReducer
});
export default reducer;
