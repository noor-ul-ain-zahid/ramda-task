import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { addPublisher, deletePublisher, updatePublisher, deleteBooks } from '../../actions/Actions';
import PublishersList from './PublishersList'
import PublisherModal from './PublisherModal'

class Publishers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPublisherModal: false,
            action: '',
            lastId: 0,
            selectedPublisher: {
                name: '',
                address: '',
                books: '',
                id: ''
            }
        }
    }
    toggleState = action => {
        this.setState({ showPublisherModal: !this.state.showPublisherModal, action: action });
    }

    showEditPublisherModal = publisher => {
        this.setState({
            selectedPublisher: publisher,
            showPublisherModal: !this.state.showPublisherModal,
            action: 'edit'
        })
    }

    addPublisher = data => {
        const publisher = { "id": this.state.lastId + 1, ...data }
            this.props.addPublisher(publisher)
            this.setState({
                lastId: publisher.id,
                showPublisherModal: !this.state.showPublisherModal,
                action: ''
            })
    }
    updatePublisher = publisher => {
        const updatedData = { "id": this.state.selectedPublisher.id, ...publisher }
        this.props.updatePublisher(this.state.selectedPublisher, updatedData)
        this.toggleState('')

    }
    deletePublisher = publisher => {
        this.setState({ selectedPublisher: publisher })
        this.props.deleteBooks('publisher', publisher.name)
        this.props.deletePublisher(publisher)
    }

    render() {
        const { publishers } = this.props,
            { showPublisherModal, action, selectedPublisher, error } = this.state
        return (
            <div>
                <h2>Publishers</h2>
                <PublishersList
                    publishers={publishers}
                    editData={this.showEditPublisherModal}
                    deleteData={this.deletePublisher}
                />
                <button onClick={() => this.toggleState('add')}>Add Publisher</button>
                <PublisherModal
                    open={showPublisherModal}
                    action={action}
                    handleClose={this.toggleState}
                    title={action === 'add' ? 'Add Publisher' : 'Edit Publisher Details'}
                    onSubmit={action === 'add' ? this.addPublisher : this.updatePublisher}
                    publisher={selectedPublisher}
                    error={error}
                    lastId={action === 'add' ? this.state.lastId + 1 : this.state.selectedPublisher.id}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        publishers: state.publisherReducer.publishers
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addPublisher,
        updatePublisher,
        deletePublisher,
        deleteBooks,
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Publishers);