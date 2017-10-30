// JavaScript source code
import React from 'react';
import api from './test/stubAPI';
import buttons from './config/buttons';

class CageForm extends React.Component {
    //add a new cage
    handleAdd = (e) => {
        e.preventDefault();
        let id = document.getElementById("id").value.trim();
        let name = document.getElementById("name").value.trim();
        let imageUrl = document.getElementById("imageUrl").value.trim();
        let snippet = document.getElementById("snippet").value.trim();
        if (!id || !name || !imageUrl || !snippet) {
            return;
        }

        this.props.addHandler(id, name, imageUrl, snippet);
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("imageUrl").value = "";
        document.getElementById("snippet").value = "";
        this.setState({ status: '' })

    }
    render() {
        return (
            <tr>
                <td>
                    <input type="text" className="form-control" id="id" />
                </td>
                <td>
                    <input type="text" className="form-control" id="name" />
                </td>
                <td>
                    <input type="text" className="form-control" id="imageUrl" />
                </td>
                <td>
                    <input type="text" className="form-control" id="snippet" />
                </td>
                <td>
                    <input type="button" className="btn btn-primary" value="Add" onClick={this.handleAdd} />
                </td>
            </tr>
        )
    }
}


class Cage extends React.Component {
    state = {
        status: '',
        id: this.props.cage.id,
        name: this.props.cage.name,
        imageUrl: this.props.cage.imageUrl,
        snippet: this.props.cage.snippet,
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
           id, name, imageUrl, snippet);
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
            snippet: this.props.snippet
        });
    }.bind(this);    // Alternative to arrow function

    handleIdChange = (e) => this.setState({ id: e.target.value });

    handleNameChange = (e) => this.setState({ name: e.target.value });

    handleImageUrlChange = (e) => this.setState({ imageUrl: e.target.value });

    handleSnippetChange = (e) => this.setState({ snippet: e.target.value
    });


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
                <td key={'snippeet'}><input type="text" className="form-control"
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





class CageList extends React.Component {
    render() {
        let cageRows = this.props.cages.map((cage) => {
            return <Cage key={cage.id} cage={cage}
                updateHandler={this.props.updateHandler} deleteHandler={this.props.deleteHandler} />; 
        });
        return (
            <tbody >
                {cageRows}
                <CageForm addHandler={this.props.addHandler} />
            </tbody>
        );
    }
}


class CagesTable extends React.Component {
    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>ImageUrl</th>
                        <th>Snipet</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <CageList cages={this.props.cages}
                    updateHandler={this.props.updateHandler} addHandler={this.props.addHandler} deleteHandler={this.props.deleteHandler} />
            </table>
        );
    }
}

class Cages extends React.Component {
    updateCage = (key, id, n, i, s) => {
        api.update(key, id, n, i, s);
        this.setState({});
    };

    addCage = (id, n, i, s) => {
        api.add(id, n, i, s);
        this.setState({});

    }

    deleteCage = (k) => {
        api.delete(k);
        this.setState({});
    }
    render() {
        var cages = api.getAll(); 
        return (
            <div>
                <h1>Cage List.</h1>
                <CagesTable cages={cages}
                    updateHandler={this.updateCage} addHandler={this.addCage} deleteHandler={this.deleteCage} />


            </div>
        );
    }
}

export default Cages;
