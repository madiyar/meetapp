import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout, Typography, Row, Col, Card, Spin, Modal, Form, Input, Button, Switch, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getAllUsers } from '../redux/effects/users.effects';
import { createMeeting } from '../redux/effects/meetings.effects';
import { API_URL } from '../redux/types';

const { Meta } = Card;
const { Option } = Select;

function RoomList({dateTime, rooms, loading, users, getAllUsers, createMeeting}) {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [showModal, setShowModal] = useState(false);
    const [freeEntry, setFreeEntry] = useState(false);
    const [roomId, setRoomId] = useState(0);

    useEffect(() => {
        getAllUsers();
    }, [users]);

    const SelectRoom = id => {
        setShowModal(true);
        setRoomId(id);
    }

    const participansList = [];
    if(users) {
        users.map(user => {
            if(user.id !== currentUser.id) {
                participansList.push(<Option key={user.id}>{user.firstName} {user.lastName}</Option>);
            }
            return user;
        })
    }

    const onFinish = values => {
        setShowModal(false);
        const data = {
            meeting: {
                roomId: roomId,
                creatorId: currentUser.id,
                startDate: dateTime.startDate,
                endDate: dateTime.endDate,
                isCanceled: 0,
                title: values.title,
                description: values.description,
                freeEntry: (values.freeEntry) ? 1:0,
            },
            participans: values.participans
        }
        createMeeting(data);
        console.log('Success:', values);
        console.log('meeting', data);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        rooms ? (
            <Layout.Content className="RoomList">
                <Typography.Title level={1}><span role="img" aria-label="door">🚪</span> Rooms</Typography.Title>
                <Row gutter={24} className="Home__rooms">
                    {rooms.map(room => 
                    <Col span={6} key={room.id}>
                        <Card 
                            className="card"
                            cover={
                                <img
                                    alt={room.name}
                                    src={`${API_URL}/${room.photo ? room.photo : 'nophoto.png'}`}
                                />
                            }
                            actions={
                                [<div key="selectRoom" onClick={() => SelectRoom(room.id)}><PlusOutlined /> <span>Select</span></div>]
                            }
                        >
                            <Meta
                                title={room.name}
                                description={
                                    <ul className="room__description">
                                        <li className="info">Info: {room.description}</li>
                                        <li>Category: {room.category.name}</li>
                                        <li>Capacity: {room.category.capacity}</li>
                                    </ul>
                                }
                            />
                        </Card>
                    </Col>
                    )}
                </Row>
                <Modal
                    title={<Typography.Title level={1}>Create Meeting</Typography.Title>}
                    visible={showModal}
                    closable={true}
                    onCancel={() => setShowModal(false)}
                    footer={null}
                >
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="title"
                            rules={[{ required: true, message: 'Please input meeting\'s title!' }]}
                        ><Input placeholder="Title" /></Form.Item>

                        <Form.Item 
                            name="description" 
                            rules={[{ required: true, message: 'Please input meeting\'s description!' }]}
                        ><Input.TextArea placeholder="Description" /></Form.Item>

                        <Form.Item 
                            
                            label="Free entry" 
                            name="freeEntry"
                        ><Switch onChange={() => setFreeEntry(true)} /></Form.Item>

                        <Form.Item
                            name="participans"
                            label="Participans"
                            rules={[{ required: !freeEntry, message: 'Please select participans!' }]}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: '100%', marginBottom: '15px'}}
                                placeholder="Please select participan"
                            >
                                {participansList}
                            </Select>
                        </Form.Item>

                        <Form.Item><Button type="primary" htmlType="submit">Submit</Button></Form.Item>
                    </Form>
                </Modal>
            </Layout.Content>
        ) : (loading ? (<Layout.Content className="RoomList"><Spin size="large" /></Layout.Content>):''));
}

const mapStateToProps = state => ({
    rooms: state.rooms.freeRoomsData,
    loading: state.rooms.loading,
    users: state.users.usersData
});

export default connect(mapStateToProps, {getAllUsers, createMeeting})(RoomList);