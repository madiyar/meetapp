import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Form, Input, Button, Typography, Alert } from "antd";
import { LockOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { API_URL } from './redux/types';

const Auth = () => {
    const [authFailed, setAuthFailed] = useState(false);
    const onFinish = values => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: values.username, password: values.password })
        };
        fetch(`${API_URL}/users/auth`, options)
            .then(response => response.json())
            .then(user => {
                if (!user) {
                    setAuthFailed(true);
                    return;
                }
                localStorage.setItem('user', JSON.stringify(user));
                window.location.reload();
            });
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Layout className="Main">
            <Row>
                <Col span={8} offset={8} className="Auth">
                    <Typography.Title level={1}><span role="img" aria-label="smile">😉</span> Authorization</Typography.Title>
                    <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        {authFailed ? <Alert message="Authorization failed. Try later" type="error" showIcon style={{marginBottom: '10px'}}/> : ''}
                        <Form.Item
                            name="username"
                            rules={[{
                                required: true,
                                message: 'Please input your username!',
                            }]}
                        >
                            <Input
                                placeholder="Username"
                                name="username"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{
                                required: true,
                                message: 'Please input your password!',
                            }]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                name="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit"><LoginOutlined /> Sign in</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Layout>
    )
}

export default connect()(Auth);