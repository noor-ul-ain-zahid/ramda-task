import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Field, reset, reduxForm, change } from 'redux-form';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { publisherValidator as validate } from '../../validators/formValidator'
import { Field as renderField } from '../common/Field'

class PublisherModal extends React.Component {
    constructor(props) {
        super(props);
        this.resetValues = this.resetValues.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentWillUpdate(props) {
        if (props.action === 'edit') {
            this.props.change('name', props.publisher.name);
            this.props.change('address', props.publisher.address);
            this.props.change('books', props.publisher.books);
        }
    }
    resetValues = () => {
        this.props.reset('publisher');
        this.props.handleClose()
    }
    submit = values => this.props.handleSubmit(values)

    render() {
        const { pristine, submitting} = this.props

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <form onSubmit={this.submit}>
                    <DialogContent>
                        <DialogContentText>
                            Enter Publisher details to make changes in the system.
                        </DialogContentText>
                        <Field
                            name="name"
                            component={renderField}
                            label="Publisher Name"
                        />
                        <br/>
                        <Field
                            name="books"
                            component={renderField}
                            label="Total Books"
                        />
                        <br/>
                        <Field
                            name="address"
                            component={renderField}
                            label="Address"
                        />
                        <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.resetValues} color="primary">Cancel</Button>
                        <Button type="submit" disabled={pristine || submitting} color="primary">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}
function mapStateToProps(state) {
    return {
        publishers: state.publisherReducer.publishers
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        change,
    }, dispatch)
}
const afterSubmit = (result, dispatch) =>
    dispatch(reset('publisher'));

PublisherModal = reduxForm({
    form: 'publisher',
    validate,
    onSubmitSuccess: afterSubmit
})(PublisherModal);

export default connect(mapStateToProps, mapDispatchToProps)(PublisherModal);