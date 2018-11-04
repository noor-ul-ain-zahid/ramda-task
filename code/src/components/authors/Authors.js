import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { addAuthor, deleteAuthor, updateAuthor, deleteBooks } from '../../actions/Actions';
import { notExisting } from '../../parser/helpers'
import AuthorsList from './AuthorsList'
import AuthorModal from './AuthorModal'

class Authors extends React.Component {
    constructor(props) {
        super(props)
        this.
            state = {
                showAuthorModal: false,
                action: '',
                error: '',
                lastId: 0
            }
    }
    toggleState = (action) => {
        this.setState({ showAuthorModal: !this.state.showAuthorModal, action: action });
    }

    showEditAuthorModal = (author) => {
        this.setState({
            selectedAuthor: author,
            showAuthorModal: !this.state.showAuthorModal,
            action: 'edit'
        })
    }

    addAuthor = (data) => {

        const author = { "id": this.state.lastId + 1, ...data },
            { authors, addAuthor } = this.props

        if (notExisting(authors, author)) {
            addAuthor(author)
            this.setState({ 
                lastId: author.id, 
                error: '',
                showAuthorModal: !this.state.showAuthorModal,
                action: '' })
        }
        else { this.setState({ error: 'error' }) }
    }

    updateAuthor = (author) => {
        const updatedData = { "id": this.state.selectedAuthor.id, ...author },
            { authors, updateAuthor } = this.props

        if (notExisting(authors, updatedData)) {
            updateAuthor(this.state.selectedAuthor, updatedData)
            this.toggleState('')
        }
        else { this.setState({ error: 'error' }) }
    }
    
    deleteAuthor = (author) => {
        this.setState({ selectedAuthor: author })
        this.props.deleteBooks('author', author.name)
        this.props.deleteAuthor( author)
    }

    render() {
        const { authors } = this.props,
            { showAuthorModal, action, selectedAuthor } = this.state
        return (
            <div>
                <h2>Authors</h2>
                <AuthorsList
                    authors={authors}
                    editData={this.showEditAuthorModal}
                    deleteData={this.deleteAuthor}
                />
                <button onClick={() => this.toggleState('add')}>Add Author</button>
                <AuthorModal
                    open={showAuthorModal}
                    action={action}
                    handleClose={this.toggleState}
                    actionType={action == 'add' ? this.addAuthor : this.updateAuthor}
                    author={selectedAuthor}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authors: state.authorReducer.authors
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addAuthor,
        updateAuthor,
        deleteAuthor,
        deleteBooks
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Authors);