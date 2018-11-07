import React from "react"
import { connect } from "react-redux"
import { addBook, updateBook, deleteBook } from '../../actions/Actions'
import { bindActionCreators } from 'redux'
import BookList from './BookList'
import BookModal from './BookModal'

class Books extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showBookModal: false,
            action: '',
            lastId: 0,
            selectedBook: {
                name: '',
                author: '',
                publisher: '',
                id: ''
            }
        }
    }

    toggleState = action => {
        this.setState({ showBookModal: !this.state.showBookModal, action: action });
    }

    showEditBookModal = book => {
        this.setState({
            selectedBook: book,
            showBookModal: !this.state.showBookModal,
            action: 'edit'
        })
    }

    addBook = data => {
        const book = { "id": this.state.lastId + 1, ...data }
        this.props.addBook(book)
        this.setState({
            lastId: book.id,
            showBookModal: !this.state.showBookModal,
            action: ''
        })
    }

    updateBook = book => {
        const updatedData = { "id": this.state.selectedBook.id, ...book }
        this.props.updateBook(this.state.selectedBook, updatedData)
        this.toggleState('')
    }

    deleteBook = book => {
        this.setState({ selectedBook: book })
        this.props.deleteBook(book)
    }

    render() {
        const { books, authors, publishers } = this.props,
            { showBookModal, action, selectedBook } = this.state
        return (
            <div>
                <h2>Books</h2>
                <BookList
                    data={books}
                    editData={this.showEditBookModal}
                    deleteData={this.deleteBook}
                />
                {
                    authors.length > 0 && publishers.length > 0
                        ?
                        <button onClick={() => this.toggleState('add')} >Add book</button>
                        : <p>No Authors or publishers exist</p>
                }
                <BookModal
                    open={showBookModal}
                    action={action}
                    handleClose={this.toggleState}
                    title={action === 'add' ? 'Add Book' : 'Edit Book Details'}
                    onSubmit={action === 'add' ? this.addBook : this.updateBook}
                    book={selectedBook}
                    books={books}
                    authors={authors}
                    publishers={publishers}
                    lastId={action === 'add' ? this.state.lastId + 1 : this.state.selectedBook.id}
                />
            </div>
        )
    }
}
function mapStateToProps(state, ownProps) {
    return {
        books: state.bookReducer.books,
        authors: state.authorReducer.authors,
        publishers: state.publisherReducer.publishers
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addBook,
        updateBook,
        deleteBook,
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Books);