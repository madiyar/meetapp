import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRooms } from '../redux/effects/rooms.effects';
import { Layout, Typography, Row, Col, Card, Spin } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { green, red } from '@ant-design/colors';
import { Link } from 'react-router-dom';
import { API_URL } from '../redux/types';

const { Meta } = Card;

const Rooms = ({ rooms, loading, getRooms }) => {
    useEffect(() => {
        getRooms();
    }, [rooms]);
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
                            <div className="roomImg">
                                <img
                                    alt={room.name}
                                    src={`${API_URL}/${room.photo ? room.photo : 'nophoto.png'}`}
                                />
                                <div className="info">
                                    {
                                        (room.startDate) ? 
                                        `Occupied ${room.startDate} - ${room.endDate}` :
                                        'Free all day'
                                    }
                                </div>
                            </div>
                        }
                        actions={[<Link to={`/rooms/${room.id}`}><EyeOutlined /> <span>View</span></Link>]}
                        style={{background: (room.startDate) ? red[1] : green[1]}}
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
    rooms: state.rooms.roomsData,
    loading: state.rooms.loading
});

export default connect(mapStateToProps, { getRooms })(Rooms);