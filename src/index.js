import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Form from './contactUs';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import CageApp from './gallery';
//import Cages from './Data';
import logo from './header.jpg';
import { Link } from 'react-router';
import HomeApp from './home';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import CommentView from './commentPage';

class App extends React.Component {

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
                                <Link className="Menu"to={'/'}>Home</Link> 
                            </td>
                            <td>
                                <Link className="Menu" to={'/gallery/'}>Gallery</Link> 
                            </td>
                            <td>
                                <Link className="Menu" to={'/contact'}>Contact Us</Link> 
                            </td>
                           
                        </tr>
                    </tbody>
                </table>
                {this.props.children}
            </div>

        );
    }
}




ReactDOM.render(
    (
        <Router history={browserHistory} >
            <Route path="/" component={App}>
                <IndexRoute component={HomeApp} />
                     <Route path="posts/:postId" component={CommentView} />
            </Route>
            <Route path="/gallery" component={App} >
                <IndexRoute component={CageApp} />
            </Route>
            <Route path="/contact" component={App} >
                <IndexRoute component={Form} />
            </Route>
        </Router>
    ),
    document.getElementById('root')
);