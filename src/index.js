import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import routes from "./components/routes.jsx";
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
