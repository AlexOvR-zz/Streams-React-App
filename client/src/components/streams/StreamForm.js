import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    renderError( { error , touched } ) {
        if(touched && error){
            return (
                <div className="ui pointing red basic label">
                    <div>{error}</div>
                </div>
            );
        }
    }

    renderInput = ( { input , label , meta } ) => {
        const errorClass = `${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={`field ${errorClass}`}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = formValues => {
        this.props.onSubmit(formValues);       
    }

    render () {
        return (
            <div>
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)} > 
                    <Field name="title" component={this.renderInput} label="Enter Title" />
                    <Field name="description" component={this.renderInput} label="Enter Description"/>
                    <button className="ui button primary">Submit</button>
                </form>
            </div>
        )
    }

};

const validate = (formValues) => {
    const errors = {};

    if(!formValues.title) {
        errors.title = "Must enter a title";
    }

    if(!formValues.description) {
        errors.description = "Must enter a description";
    }

    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);