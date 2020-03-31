import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const SideBar = () => {
    let href = window.location.href.split('/')[3];
    return (
        <Sider theme='light' className="Sider">
            <Link className="logo" to="/">MeetApp</Link>
            <Menu mode="inline" defaultSelectedKeys={['/'+href]} className="Menu">
                <Menu.Item key="/">
                    <Link to="/"><HomeOutlined /> Home</Link>
                </Menu.Item>
                <Menu.Item key="/rooms">
                    <Link to="/rooms"><AppstoreOutlined /> Rooms</Link>
                </Menu.Item>
                <Menu.Item key="/profile">
                    <Link to="/profile"><UserOutlined /> My Profile</Link>
                </Menu.Item>
                <Menu.Item onClick={() => {localStorage.removeItem('user');window.location.reload();}}>
                    <LogoutOutlined /> <span>Sign Out</span>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SideBar;