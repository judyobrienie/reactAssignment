import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Form from './contactUs';
import Login from './login';
import Cages from './cages';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import CageApp from './gallery';
import CageDetail from './cageDetail';
import logo from './header.jpg';
import { Link } from 'react-router';
import HomeApp from './home';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import CommentView from './commentPage';
import { SocialIcon } from 'react-social-icons';

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
                                <Link className="Menu" to={'/cages/'}>Cages Listing</Link>
                            </td>
                            <td>
                                <Link className="Menu" to={'/gallery/'}>Gallery</Link> 
                            </td>
                            <td>
                                <Link className="Menu" to={'/contact'}>Contact Us</Link> 
                            </td>
                            <td>
                                <Link className="Menu" to={'/login/'}>Login</Link>
                            </td>
                           
                        </tr>
                    </tbody>
               </table>
                {this.props.children}

                <footer>
                    <SocialIcon url="http://twitter.com/transcages" />
                    <SocialIcon url="https://www.facebook.com/transcagesireland/" />
                    <SocialIcon url="https://za.pinterest.com/transcagesirela/" />
                </footer>
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
            <Route path="/login" component={App}>
                <IndexRoute component={Login}/>
            </Route>
            <Route path="/cages" component={App} >
                <IndexRoute component={Cages} />
            </Route>
            <Route path="/gallery/" component={App} >
                <IndexRoute component={CageApp} />
                    <Route path="/cages/" component={CageApp} />      
                    <Route path="/cages/:id" component={CageDetail} />
            </Route>
            <Route path="/contact" component={App} >
                <IndexRoute component={Form} />
            </Route>
        </Router>
    ),
    document.getElementById('root')
);

