import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'

import { Home } from "./pages/home";
import { GlobalStyle } from "./GlobalStyle";

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyle/>
        <Home/>
    </React.StrictMode>,
    document.getElementById('root')
);

