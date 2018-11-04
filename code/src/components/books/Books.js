import React from "react"
import { connect } from "react-redux"
import { addBook, updateBook, deleteBook } from '../../actions/Actions'
import { bindActionCreators } from 'redux'
import { notExisting } from '../../parser/helpers'
import BookList from './BookList'
import BookModal from './BookModal'
class Books extends React.Component {
    constructor(props) {
        super(props)
        this.
            state = {
                showBookModal: false,
                action: '',
                error: '',
                lastId: 0
            }
    }

    toggleState = (action) => {
        this.setState({ showBookModal: !this.state.showBookModal, action: action });
    }

    showEditBookModal = (book) => {
        this.setState({
            selectedBook: book,
            showBookModal: !this.state.showPublisherModal,
            action: 'edit'
        })
    }

    addBook = (data) => {
        const book = { "id": this.state.lastId + 1, ...data },
            { books, addBook } = this.props

        if (notExisting(books, book)) {
            addBook(book)
            this.setState({
                lastId: book.id,
                error: '',
                showBookModal: !this.state.showBookModal,
                action: ''
            })
        }
        else { this.setState({ error: 'error' }) }
    }

    updateBook = (book) => {
        const updatedData = { "id": this.state.selectedBook.id, ...book },
            { books, updateBook } = this.props

        if (notExisting(books, updatedData)) {
            updateBook(this.state.selectedBook, updatedData)
            this.toggleState('')
        }
        else { this.setState({ error: 'error' }) }
    }

    deleteBook = (book) => {
        this.setState({ selectedBook: book })
        this.props.deleteBook(this.props.books, book)
    }

    render() {
        const { books, authors, publishers } = this.props,
            { showBookModal, action, selectedBook, error } = this.state
        return (
            <div>
                <h2>Books</h2>
                <BookList
                    data={books}
                    editData={this.showEditBookModal}
                    deleteData={this.deleteBook}
                />
                {
                    authors.length > 0 && publishers.length > 0 ?
                        <button onClick={() => this.toggleState('add')} >Add book</button>
                        : <p>No Authors or publishers exist</p>
                }
                <BookModal
                    open={showBookModal}
                    action={action}
                    handleClose={() => this.toggleState('')}
                    actionType={action == 'add' ? this.addBook : this.updateBook}
                    authors={authors}
                    error={error}
                    data={selectedBook}
                    publishers={publishers}
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