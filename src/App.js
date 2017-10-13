import React, { Component } from 'react';
import logo from './header.jpg';
import './App.css';


class Menu extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Transcages Ireland</h1>
        </header>
        
                 <tr className="Menu">
                    <td>
                        <input type="text" className="Menu" value="Home" />
                    </td>
                    <td>
                        <input type="text" className="Menu" value="Gallery" o />
                    </td>
                    <td>
                        <input type="text" className="Menu" value="Contact Us" />
                    </td>
                   
                </tr>
                 <div className="SearchBox">
                     <input type="text" placeholder="Search" />
                     Sort by:
                     <select>
                         <option value="Name">Alphabetical</option>
                         <option value="Price">Price</option>
                     </select>
                 </div>      
           
    

      </div>
    );
  }
}

class CageItem extends React.Component {
    render() {
        let url = process.env.PUBLIC_URL + '/cageSpecs/' + this.props.cage.imageUrl;
        return (
            <li className="thumbnail cage-listing">
                <a href={'/cages/' + this.props.cage.id} className="thumb">
                    <img src={url}
                        alt={this.props.cage.name} />
                </a>
                <a href={'/cages/' + this.props.cage.id}> {this.props.cage.name}</a>
                <p>{this.props.cage.snippet}</p>
            </li>
        );
    }
}

class FilteredCageList extends React.Component {
    render() {
        var displayedCages = this.props.cages.map(function (cage) {
            return <CageItem key={cage.id} cage={cage} />;
        });
        return (
            <div className="col-md-10">
                <ul className="cages">
                    {displayedCages}
                </ul>
            </div>
        );
    }
}
  


class CageApp extends React.Component {
    render() {
        return (
            <div className="view-container">
                <div className="view-frame">
                    <div className="container-fluid">
                        <div className="row">
                            <Menu />
                                <FilteredCageList cages={this.props.cages} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CageApp;
