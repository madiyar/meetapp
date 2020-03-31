import React from 'react';
import { connect } from 'react-redux';
import { Layout, Typography, Row, Col, Card, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Meta } = Card;

function RoomList({rooms, loading}) {
    const SelectRoom = id => {
        console.log(id);
        alert(id);
    }
    return (
        rooms ? (
            <Layout.Content className="RoomList">
                <Typography.Title level={1}><span role="img" aria-label="door">🚪</span> Rooms</Typography.Title>
                <Row gutter={24} className="Home__rooms">
                    {rooms.map(room => 
                    <Col span={6}>
                        <Card 
                            className="card"
                            cover={
                                <img
                                    alt={room.name}
                                    src={`http://localhost:8080/${room.photo ? room.photo : 'nophoto.png'}`}
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
            </Layout.Content>
        ) : (loading ? (<Layout.Content className="RoomList"><Spin size="large" /></Layout.Content>):''));
}

const mapStateToProps = state => ({
    rooms: state.rooms.freeRoomsData,
    loading: state.rooms.loading
});

export default connect(mapStateToProps)(RoomList);