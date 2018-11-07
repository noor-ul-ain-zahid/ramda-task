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
import { bookValidator as validate } from '../../validators/formValidator'
import { Field as renderField, renderSelect } from '../common/Field'

class BookModal extends React.Component {
    constructor(props) {
        super(props);
        this.resetValues = this.resetValues.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentWillUpdate(props) {
        if (props.action === 'edit') {
            this.props.change('name', props.book.name);
            this.props.change('author', props.book.author);
            this.props.change('publisher', props.book.publisher);
        }
    }
    resetValues = () => {
        this.props.reset('book');
        this.props.handleClose()
    }
    submit = values => this.props.handleSubmit(values)

    render() {
        const { pristine, submitting, authors, publishers, books } = this.props

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
                            Enter Book details to make changes in the system.
                        </DialogContentText>
                        <Field
                            name="name"
                            component={renderField}
                            label="Name"
                        />
                        <br />
                        <Field
                            name="author"
                            component={renderSelect}
                            data={authors}
                            label="Author"
                        />
                        <br />
                        <Field
                            name="publisher"
                            component={renderSelect}
                            data={publishers}
                            label="Publishers"
                        />
                        <br />
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
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        change,
    }, dispatch)
}
const afterSubmit = (result, dispatch) =>
    dispatch(reset('book'));

BookModal = reduxForm({
    form: 'book',
    validate,
    onSubmitSuccess: afterSubmit
})(BookModal);

export default connect(mapDispatchToProps)(BookModal);