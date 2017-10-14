import React, { Component } from 'react';
import logo from './header.jpg';
import './App.css';
import _ from 'lodash';



class Menu extends React.Component {

        handleChange = (e, type, value) => {
            e.preventDefault();
            this.props.onUserInput(type, value);
        };

        handleTextChange = (e) => {
            this.handleChange(e, 'search', e.target.value);
        };

        handleSortChange = (e) => {
            this.handleChange(e, 'sort', e.target.value);
        };

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
       
                 <div className="SearchBox">
                    <input type="text" placeholder="Search"
                        value={this.props.filterText}
                        onChange={this.handleTextChange} />
                    Sort by:
                    <select id="sort" value={this.props.order}
                        onChange={this.handleSortChange} >/>
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
                <p>Euro {this.props.cage.price}</p>
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

    state = { search: '', sort: 'name' };

    handleChange = (type, value) => {
        if (type === 'search') {
            this.setState({ search: value });
        } else {
            this.setState({ sort: value });
        }
    };
    render() {
        let list = this.props.cages.filter((p) => {
                return p.name.toLowerCase().search(
                    this.state.search.toLowerCase()) !== -1;
        });
       
        let filteredList = _.sortBy(list, this.state.sort);
        return (
            <div className="view-container">
                <div className="view-frame">
                    <div className="container-fluid">
                        <div className="row">
                            <Menu onUserInput={this.handleChange}
                                filterText={this.state.search}
                                sort={this.state.sort}/>
                            <FilteredCageList cages={filteredList} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CageApp;
