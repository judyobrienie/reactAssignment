import React from 'react';
import './App.css';
import _ from 'lodash';
import Cages from './Data';
import { Link } from 'react-router';
import buttons from './config/buttons';
import api from './test/stubAPI' 





class Menu extends React.Component {

    //add a new cage
    handleAdd = (e) => {
        e.preventDefault();
        let id = document.getElementById("id").value.trim();
        let name = document.getElementById("name").value.trim();
        let imageUrl = document.getElementById("image").value.trim();
        let snippet = document.getElementById("snippet").value.trim();
        if (!id || !name || !imageUrl || !snippet) {
            return;
        }

        this.props.addHandler(id, name, imageUrl);
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("imageUrl").value = "";
        document.getElementById("snippet").value = "";
        this.setState({ status: '' })

    }
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
    state = {
        status: '',
        id: this.props.cage.id,
        name: this.props.cage.name,
        imageUrl: this.props.cage.imageUrl,
        snippet:this.props.cage.snippet
    };

    handleEdit = () => this.setState({ status: 'edit' });

    handleSave = (e) => {
        e.preventDefault();
        let id = this.state.id.trim();
        let name = this.state.name.trim();
        let imageUrl = this.state.imageUrl.trim();
        let snippet = this.state.snippet.trim();
        if (!id || !name || !imageUrl || !snippet) {
            return;
        }
        this.setState({ status: '' })
        this.props.updateHandler(this.props.cage.id,
            name, imageUrl, snippet);
    };

    handleDelete = (e) => this.setState({ status: 'delete' });

    handleUndo = (e) => this.setState({ status: '' })




    handleConfirm = (e) => {
        e.preventDefault();
        this.setState({ status: '' })
        this.props.deleteHandler(this.props.cage.id);

    };


    handleCancel = function () {
        this.setState({
            status: '',
            id: this.props.cage.id,
            name: this.props.cage.name,
            imageUrl: this.props.cage.imageUrl,
            snippet: this.props.cage.snippet
        });
    }.bind(this);    // Alternative to arrow function

    handleIdChange = (e) => this.setState({ id: e.target.value });

    handleNameChange = (e) => this.setState({ name: e.target.value });

    handleImageUrlChange = (e) => this.setState({ imageUrl: e.target.value });

    handleSnippetChange = (e) => this.setState({ snippet: e.target.value });


    render() {
        let activeButtons = buttons.normal;
        let leftButtonHandler = this.handleEdit;
        let rightButtonHandler = this.handleDelete;
        let fields = [
            <td key={'id'} >{this.state.id}</td>,
            <td key={'name'}>{this.state.name}</td>,
            <td key={'imageUrl'}>{this.state.imageUrl}</td>,
            <td key={'snippet'}>{this.state.snippet}</td>
        ];

        if (this.state.status === 'edit') {
            activeButtons = buttons.edit;
            leftButtonHandler = this.handleSave;
            rightButtonHandler = this.handleCancel;
            fields = [
                <td key={'id'}><input type="text" className="form-control"
                    value={this.state.id}
                    onChange={this.handleIdChange} /> </td>,
                <td key={'name'}><input type="text" className="form-control"
                    value={this.state.name}
                    onChange={this.handleNameChange} /> </td>,
                 <td key={'imageUrl'}><input type="text" className="form-control"
                    value={this.state.imageUrl}
                    onChange={this.handleImageUrlChange} /> </td>,
                 <td key={'snippet'}><input type="text" className="form-control"
                    value={this.state.snippet}
                    onChange={this.handleSnippetChange} /> </td>,
            ];
        }

        if (this.state.status === 'delete') {
            activeButtons = buttons.delete;
            leftButtonHandler = this.handleUndo;
            rightButtonHandler = this.handleConfirm;
        }

        return (
            <div>
                <div>
                <li className="thumbnail cage-listing">
                <Link to={'/cages/' + this.props.cage.id} className="thumb">
                    <img src={"/cageSpecs/" + this.props.cage.imageUrl}
                        alt={this.props.cage.name} /> </Link>
                <Link to={'/cages/' + this.props.cage.id}> {this.props.cage.name}</Link>
                <p>{this.props.cage.snippet}</p>
                <p>Euro {this.props.cage.price}</p>
                </li>
                </div>
           
                 <tr>
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
             </div>
        );
    }
}


class FilteredCageList extends React.Component {
    render() {
        var displayedCages = this.props.cages.map((cage) =>{
            return <CageItem key={cage.id} cage={cage}
                updateHandler={this.props.updateHandler} addHandler={this.props.addHandler} deleteHandler={this.props.deleteHandler}/>;
              
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

    updateCage = (key, n, i, s) => {
        api.update(key, n, i, s);
        this.setState({});
    };

    addCage = (n, i,s) => {
        api.add(n, i, s);
        this.setState({});

    }

    deleteCage = (k) => {
        api.delete(k);
        this.setState({});
    }

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
                            <FilteredCageList cages={filteredList}
                                updateHandler={this.updateCage} addHandler={this.addCage} deleteHandler={this.deleteCage} />
                    
                        </div>
                    </div>
                </div>
            </div>
          
        );
    }
}
export default CageApp;
