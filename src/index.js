import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CageApp from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import Cages from './Data';

ReactDOM.render(
    <CageApp cages={Cages}/>,
    document.getElementById('root')
);

