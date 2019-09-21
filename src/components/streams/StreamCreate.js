import React from 'react';
import { connect } from "react-redux";

import { Field, reduxForm } from "redux-form";
import { createStream } from "../../actions";

class StreamCreate extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return(
                <div className="ui error message">
                    <div className="header">{ error }</div>
                </div>
            )
        }
    }

    renderInput= ({ input, label, meta }) => {
        return (
            <div className="field">
                <label>{ label }</label>
                <input { ...input } />
                { this.renderError(meta) }
            </div>
            )
    };

    onSubmit = (formProps) => {
        this.props.createStream(formProps)
    };

    render() {
        return (
            <form onSubmit={ this.props.handleSubmit(this.onSubmit) } className="ui form error">
                <Field name="title" component={ this.renderInput } label="Enter Title" />
                <Field name="description" component={ this.renderInput } label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = formProps => {
    const errors = {};

    if (!formProps.title) {
        errors.title = 'A stream should have a title'
    }
    if (!formProps.description) {
        errors.description = 'A stream should have a description'
    }

    return errors
};

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped)