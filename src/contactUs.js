// JavaScript source code
import React from 'react';
import './App.css';
import Field from './config/Field';
import Button from './config/buttonsConfig';
//import { Form, Field } from 'simple-react-forms';




class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            message: "",
        };
    
        this.updateField = this.updateField.bind(this); //to ensure 'this' refers to forma d not field
    }

    //field can be 'name' etc whatever the user type into field
    updateField(field, value){
        this.setState({ [field]: value });

    }
    render(){
        return (
            <div>
                <h1> Contact Form</h1>

                <Field
                    label="Name"
                    onChange={(event) => this.updateField('name', event.target.value)}
                    value={this.state.name} />
               
                {/* Email field*/}
                <Field
                    label="Email"
                    onChange={(event) => this.updateField('email', event.target.value)}
                    value={this.state.email} />

                {/* Message textarea*/}
                <Field
                    label="Message"
                    onChange={(event) => this.updateField('message', event.target.value)}
                    textarea={true}
                    value={this.state.message} />
               
                {/* Message textarea*/}
                <Button
                    email="judyobrienie@gmail.com"
                    formValues={this.state}
                />

          </div> 

        );
    }
}

export default Form;
