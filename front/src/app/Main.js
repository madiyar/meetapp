import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Layout } from 'antd';
import Home from './home/Home';
import Rooms from './rooms/Rooms';
import Profile from './user/Profile';
import ViewRoom from './rooms/ViewRoom';
import SideBar from './Sider';
import Auth from './Auth';

const { Content } = Layout;

function Main() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <Router>
            <Layout className="Main">
                {user ? <SideBar /> : ''}
                <Layout>
                    <Content className="Content">
                        <Switch>
                            <Route exact path="/">
                                {user ? <Home /> : <Auth />}
                            </Route>
                            <Route path="/rooms/:roomId">
                                <ViewRoom />
                            </Route>
                            <Route path="/rooms">
                                <div className="Wrap">
                                    <Rooms />
                                </div>
                            </Route>
                            <Route path="/profile">
                                {user ? 
                                    <div className="Wrap">
                                        <Profile />
                                    </div> : 
                                    <Redirect to="/" />
                                }
                            </Route>
                            <Route path="*">
                                <Redirect to="/" />
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}
export default connect()(Main);