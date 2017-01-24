import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './containers/App';

const el = document.body;
const tree = <App />;

ReactDOM.render(tree, el);
