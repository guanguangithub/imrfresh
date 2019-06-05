import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './assets/js/flexible.js'
import './assets/fonts/iconfont.css'
import './assets/css/common.css'
import store from './store/index'
import { Provider } from 'react-redux'
ReactDOM.render(<Provider store={store}> <App /></Provider>, document.getElementById('root'));

