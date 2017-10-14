// JavaScript source code
import React, { Component } from 'react';
import logo from './header.jpg';
import './App.css';
import _ from 'lodash';
import api from './test/stubAPI' //new
import buttons from './config/buttonsConfig';


class Menu extends React.Component {

    

    render() {
        return (
            <div className="App">
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

            </div>

        );
    }
}




class ContactForm extends React.Component {
    //add a new person
    handleAdd = (e) => {
        e.preventDefault();
        let name = document.getElementById("name").value.trim();
        let address = document.getElementById("address").value.trim();
        let phone_number = document.getElementById("phone_number").value.trim();
        if (!name || !address || !phone_number) {
            return;
        }
       
        this.props.addHandler(name,address, phone_number);
        document.getElementById("name").value = "";
        document.getElementById("address").value ="";
        document.getElementById("phone_number").value= "";
        this.setState({ status: '' })

    }
    render() {
        return (
            <tr>
                <td>
                    <input type="text" className="form-control" id="name" />
                </td>
                <td>
                    <input type="text" className="form-control" id="address" />
                </td>
                <td>
                    <input type="text" className="form-control"id="phone_number" />
                </td>
                <td>
                    <input type="button" className="btn btn-primary" value="Add" onClick={this.handleAdd}/>
                </td>
            </tr>
        )
    }
}


class Contact extends React.Component {
    state = {
        status: '',
        name: this.props.contact.name,
        address: this.props.contact.address,
        phone_number: this.props.contact.phone_number
    };

    handleEdit = () => this.setState({ status: 'edit' });

    handleSave = (e) => {
        e.preventDefault();
        let name = this.state.name.trim();
        let address = this.state.address.trim();
        let phone_number = this.state.phone_number.trim();
        if (!name || !address || !phone_number) {
            return;
        }
        this.setState({ status: '' })
        this.props.updateHandler(this.props.contact.phone_number,
            name, address, phone_number);
    };      

    handleDelete = (e) => this.setState({ status: 'delete' });
  
    handleUndo = (e) => this.setState({ status: '' })

   


    handleConfirm = (e) => {
        e.preventDefault();
        this.setState({ status: '' })
        this.props.deleteHandler(this.props.contact.phone_number);

    };
        

    handleCancel = function () {
        this.setState({
            status: '',
            name: this.props.contact.name,
            address: this.props.contact.address,
            phone_number: this.props.contact.phone_number
        });
    }.bind(this);    // Alternative to arrow function

    handleNameChange = (e) => this.setState({ name: e.target.value });

    handleAddressChange = (e) => this.setState({ address: e.target.value });

    handlePhoneNumChange = (e) => this.setState({ phone_number: e.target.value });


    render() {
        let activeButtons = buttons.normal;
        let leftButtonHandler = this.handleEdit;
        let rightButtonHandler = this.handleDelete;
        let fields = [
            <td key={'name'} >{this.state.name}</td>,
            <td key={'address'}>{this.state.address}</td>,
            <td key={'phone_number'}>{this.state.phone_number}</td>
        ];

        if (this.state.status === 'edit') {
            activeButtons = buttons.edit;
            leftButtonHandler = this.handleSave;
            rightButtonHandler = this.handleCancel;
            fields = [
                <td key={'name'}><input type="text" className="form-control"
                    value={this.state.name}
                    onChange={this.handleNameChange} /> </td>,
                <td key={'address'}><input type="text" className="form-control"
                    value={this.state.address}
                    onChange={this.handleAddressChange} /> </td>,
                <td key={'phone_number'}><input type="text" className="form-control"
                    value={this.state.phone_number}
                    onChange={this.handlePhoneNumChange} /> </td>,
            ];
        }

        if (this.state.status === 'delete') {
            activeButtons = buttons.delete;
            leftButtonHandler = this.handleUndo;
            rightButtonHandler = this.handleConfirm;
        }

        

        return (
            <tr >
                {fields}
                <td>
                    <input type="button" className={'btn ' + activeButtons.leftButtonColor}
                        value={activeButtons.leftButtonVal}
                        onClick={leftButtonHandler} />
                </td>
                <td>
                    <input type="button" className={'btn ' + activeButtons.rightButtonColor}
                        value={activeButtons.rightButtonVal}
                        onClick={rightButtonHandler} />
                </td>
            </tr>
        );
    }
}





class ContactList extends React.Component {
    render() {
        let contactRows = this.props.contacts.map((c) => {
            return <Contact key={c.phone_number} contact={c}
                updateHandler={this.props.updateHandler} deleteHandler={this.props.deleteHandler} />; // CHANGE 
        });
        return (
            <tbody >
                {contactRows}
                <ContactForm addHandler={this.props.addHandler}/>
            </tbody>
        );
    }
}


class ContactsTable extends React.Component {
    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>   
                        <th></th>
                        <th></th>
                        
                    </tr>
                </thead>
                <ContactList contacts={this.props.contacts}
                    updateHandler={this.props.updateHandler} addHandler={this.props.addHandler} deleteHandler={this.props.deleteHandler}/>
            </table>
        );
    }
}

class ContactsApp extends React.Component {
    updateContact = (key, n, a, p) => {
        api.update(key, n, a, p);
        this.setState({});
    };

    addContact = (n, a, p)=>{
        api.add(n, a, p);
        this.setState({});
       
    }

    deleteContact =(k)=>{
        api.delete(k);
        this.setState({});
    }
    render() {
        var contacts = api.getAll(); //new
        return (
            <div>
                <Menu/>
                <h1>Contact List.</h1>
                <ContactsTable contacts={contacts}
                    updateHandler={this.updateContact} addHandler={this.addContact} deleteHandler={this.deleteContact} /> 
                    
                
            </div>
        );
    }
}

export default ContactsApp;
