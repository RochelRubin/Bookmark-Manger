import React, { Component } from 'react';
import { Route } from 'react-router';
import { AuthContextComponent } from './AuthContext';

import PrivateRoute from './Components/PrivateRoute';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import MyBookmarks from './Pages/MyBookmarks';
import AddBookmark from './Pages/AddBookmark';
import Logout from './Pages/Logout';
import Layout from './Components/Layout';


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <AuthContextComponent>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/login' component={Login} />
                    <PrivateRoute exact path='/logout' component={Logout} />
                    <PrivateRoute exact path='/mybookmarks' component={MyBookmarks} />
                    <PrivateRoute exact path='/addbookmark' component={AddBookmark} />
                </Layout>
            </AuthContextComponent>
        );
    }
}