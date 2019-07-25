import React, {useEffect, useState} from 'react';
import firebase from '../firebase';
import {CircularProgress} from '@material-ui/core';

import Dashboard from '../Dashboard';
import HomePage from '../HomePage';
import Login from '../Login';
import Register from '../Register';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

const theme = createMuiTheme()

function App(props){
    const [firebaseInitialized, setFirebaseInitialized] = useState(false)

    useEffect(() => {
        firebase.isInitialized().then(val => {
            setFirebaseInitialized(val)
        })
    })
    
    return firebaseInitialized !== false ? (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/dashboard' component={Dashboard} />
                </Switch>
            </Router>
        </MuiThemeProvider>
    )
    :
    <div id="loader"><CircularProgress/></div>
}

export default App