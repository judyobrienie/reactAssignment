import React, { Component } from 'react';
import logo from './header.jpg';
import './App.css';
import _ from 'lodash';



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

class HomeApp extends React.Component {

   
    render() {
       
        return (
            <div className="view-container">
                <div className="view-frame">
                    <div className="container-fluid">
                        <div className="row">
                            <Menu  />
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeApp;
