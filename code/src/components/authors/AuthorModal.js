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
import { authorValidator as validate } from '../../validators/formValidator'
import { Field as renderField } from '../common/Field'

class AuthorModal extends React.Component {
    constructor(props) {
        super(props);
        this.resetValues = this.resetValues.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentWillUpdate(props) {
        if (props.action === 'edit') {
            this.props.change('name', props.author.name);
            this.props.change('dob', props.author.dob);
            this.props.change('books', props.author.books);
        }
    }
    resetValues = () => {
        this.props.reset('author');
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
                            Enter Author details to make changes in the system.
                        </DialogContentText>
                        <Field
                            name="name"
                            component={renderField}
                            label="Author Name"
                        />
                        <br/>
                        <Field
                            name="books"
                            component={renderField}
                            label="Total Books"
                        />
                        <br/>
                        <Field
                            name="dob"
                            component={renderField}
                            label="Date of birth"
                            type="date"
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
        authors: state.authorReducer.authors
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        change,
    }, dispatch)
}
const afterSubmit = (result, dispatch) =>
    dispatch(reset('author'));

AuthorModal = reduxForm({
    form: 'author',
    validate,
    onSubmitSuccess: afterSubmit
})(AuthorModal);

export default connect(mapStateToProps, mapDispatchToProps)(AuthorModal);