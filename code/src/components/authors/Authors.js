import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { addAuthor, deleteAuthor, updateAuthor, deleteBooks } from '../../actions/Actions';
import AuthorsList from './AuthorsList'
import AuthorModal from './AuthorModal'

class Authors extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAuthorModal: false,
            action: '',
            lastId: 0,
            selectedAuthor: {
                name: '',
                dob: '',
                books: '',
                id: ''
            }
        }
    }
    toggleState = action => {
        this.setState({ showAuthorModal: !this.state.showAuthorModal, action: action });
    }

    showEditAuthorModal = author => {
        this.setState({
            selectedAuthor: author,
            showAuthorModal: !this.state.showAuthorModal,
            action: 'edit'
        })
    }

    addAuthor = data => {
        const author= { "id": this.state.lastId + 1, ...data }
            this.props.addAuthor(author)
            this.setState({
                lastId: author.id,
                showAuthorModal: !this.state.showAuthorModal,
                action: ''
            })
    }
    updateAuthor = author => {
        const updatedData = { "id": this.state.selectedAuthor.id, ...author }
        this.props.updateAuthor(this.state.selectedAuthor, updatedData)
        this.toggleState('')

    }
    deleteAuthor = author => {
        this.setState({ selectedAuthor: author })
        this.props.deleteBooks('publisher', author.name)
        this.props.deleteAuthor(author)
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
                    title={action === 'add' ? 'Add Author' : 'Edit Author Details'}
                    onSubmit={action === 'add' ? this.addAuthor: this.updateAuthor}
                    author={selectedAuthor}
                    lastId={action === 'add' ? this.state.lastId + 1 : this.state.selectedAuthor.id}
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
        deleteBooks,
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Authors);