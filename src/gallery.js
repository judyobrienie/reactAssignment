import React from 'react';
import './App.css';
import _ from 'lodash';
import Cages from './Data';
import { Link } from 'react-router';





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




        );
    }
}

class CageItem extends React.Component {
    render() {

        return (
            <li className="thumbnail cage-listing">
                <Link to={'/cages/' + this.props.cage.id} className="thumb">
                    <img src={"/cageSpecs/" + this.props.cage.imageUrl}
                        alt={this.props.cage.name} /> </Link>
                <Link to={'/cages/' + this.props.cage.id}> {this.props.cage.name}</Link>
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10"> </div>
                    <div className="col-md-10">
                        <ul className="cages">
                            {displayedCages}
                        </ul>


                    </div>
                </div>
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
        let list = Cages.filter((p) => {
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
                                sort={this.state.sort} />
                            <FilteredCageList cages={filteredList} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CageApp;
