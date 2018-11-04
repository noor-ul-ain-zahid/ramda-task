import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { addPublisher, deletePublisher, updatePublisher, deleteBooks } from '../../actions/Actions';
import {notExisting} from '../../parser/helpers'
import PublishersList from './PublishersList'
import PublisherModal from './PublisherModal'

class Publishers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPublisherModal: false,
            action: '',
            error: '',
            lastId: 0
        }
    }
    toggleState = (action) => {
        this.setState({ showPublisherModal: !this.state.showPublisherModal, action: action });
    }

    showEditPublisherModal = (publisher) => {
        this.setState({ 
            selectedPublisher: publisher,
            showPublisherModal: !this.state.showPublisherModal,
            action:'edit'
         })
    }

    addPublisher = (data) => {
        const publisher = { "id":  this.state.lastId+1, ...data },
            { publishers, addPublisher } = this.props

        if (notExisting(publishers, publisher)) {
            addPublisher(publisher)
            this.setState({
                lastId: publisher.id,
                error: '',
                showPublisherModal: !this.state.showPublisherModal,
                action:''
            })
        }
        else { this.setState({ error: 'error' }) }
    }
    updatePublisher = (publisher) => {
        const updatedData = { "id": this.state.selectedPublisher.id, ...publisher },
            { publishers, updatePublisher } = this.props

        if (notExisting(publishers,updatedData)) {
            updatePublisher(this.state.selectedPublisher, updatedData)
            this.toggleState('')
        }
        else { this.setState({ error: 'error' }) }
    }
    deletePublisher = (publisher) => {
        this.setState({ selectedPublisher: publisher })
        this.props.deleteBooks('publisher',publisher.name)
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
                    actionType={action == 'add' ? this.addPublisher : this.updatePublisher}
                    publisher={selectedPublisher}
                    error={error}
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
        deleteBooks
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Publishers);