// JavaScript source code
import React from 'react';
import logo from './header.jpg';
import './App.css';
import Field from './config/Field';
import Button from './config/buttonsConfig';




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
            <div className= "App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Transcages Ireland</h1>
                </header>
                <table>
                    <tbody>
                        <tr className="Menu">
                            <td>
                                <input type="text" className="Menu" value="Home" />
                            </td>
                            <td>
                                <input type="text" className="Menu" value="Gallery" />
                            </td>
                            <td>
                                <input type="text" className="Menu" value="Contact Us" />
                            </td>

                        </tr>
                    </tbody>
                </table>


                {/*Contact Form*/}


                {/* Name field*/}
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
