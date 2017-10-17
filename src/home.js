import React, { Component } from 'react';
import logo from './header.jpg';
import './App.css';
import _ from 'lodash';
import api from './test/stub_API';
import { SocialIcon } from 'react-social-icons';



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






class Form extends React.Component {
state = { title: '', link: '' };

handleAdd = (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value.trim();
    let link = document.getElementById("link").value.trim();
    if (!title || !link) {
        return;
    }

    this.props.addHandler(title, link);
    document.getElementById("title").value = "";
    document.getElementById("link").value = "";
    this.setState({ status: '' })

}



render() {
    return (
        <form style={{ marginTop: '30px' }}>
            <h3>Add a new post</h3>
            <div className="form-group">
                <input type="text"
                    className="form-control" placeholder="Title"
                    id="title"
                    onChange={this.handleTitleChange}
                ></input>

            </div>
            <div className="form-group">
                <input type="text"
                    className="form-control" placeholder="Link"
                    id="link"
                    onChange={this.handleLinkChange}
                ></input>

            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleAdd}>Post </button>

        </form>
    );


}
};

class NewsItem extends React.Component {
    state = {
        status: '',
        title: this.props.post.title,
        link: this.props.post.link
    };

    handleVote = () => this.props.upvoteHandler(this.props.post.id);
    handleDownVote = () => this.props.downvoteHandler(this.props.post.id);

    handleTitleChange = (e) => this.setState({ title: e.target.value });

    handleLinkChange = (e) => this.setState({ link: e.target.value });


    render() {



        let lineStyle = {
            fontSize: '20px', marginLeft: '10px'
        };
        let cursor = { cursor: 'pointer' };
        let line;
        if (this.props.post.link) {
            line = <a href={this.props.post.link} >
                {this.props.post.title} </a>;
        } else {
            line = <span>{this.props.post.title} </span>;
        }
        return (

            <div >

                <span className="glyphicon glyphicon-thumbs-up"
                    style={cursor}
                    onClick={this.handleVote} ></span>
                {this.props.post.upvotes}

                <span className="glyphicon glyphicon-thumbs-down"
                    style={cursor}
                    onClick={this.handleDownVote} ></span>
                {this.props.post.downvotes}

                <span style={lineStyle} >{line}<span>
                    <a href={'#/posts/' + this.props.post.id}>Comments</a>
                    <span className="glyphicon glyphicon-thumbs-down"
                        style={cursor}
                        onClick={this.handleDownVote} ></span>
                      {this.props.post.downvotes}
                   
                </span>
                </span>

        

            </div>

        );
    }
}

class NewsList extends React.Component {
    render() {
        let items = this.props.posts.map((post, index) => {
            return <NewsItem key={index}
                post={post}
                upvoteHandler={this.props.upvoteHandler} addHandler={this.props.addHandler} downvoteHandler={this.props.downvoteHandler} />

        })
        return (
            <div>
                {items}


            </div>
        );
    }
}

class  HomeApp extends React.Component {
    incrementUpvote = (id) => {
        api.upvote(id);
        this.setState({});
    };

    decrementUpvote = (id) => {
        api.downvote(id);
        this.setState({});
    };

    add = (t, l) => {
        api.add(t, l);
        this.setState({});

    };
    render() {
        let posts = _.sortBy(api.getAll(), function (post) {
            return - post.upvotes;
        }
        );
        return (
            <div className="view-container">
                <Menu />
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="page-header">
                           
                            <h1>Greyhound Racing Blog</h1>
                            <NewsList posts={posts}
                                upvoteHandler={this.incrementUpvote} downvoteHandler={this.decrementUpvote} />

                            <Form addHandler={this.add} />


                            <SocialIcon url="http://twitter.com/transcages" />
                            <SocialIcon url="https://www.facebook.com/transcagesireland/" />
                            <SocialIcon url="https://za.pinterest.com/transcagesirela/"/>
                            

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeApp;
