import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { getOneRoom, getRoomsMeetings } from '../redux/effects/rooms.effects';
import { Layout, Spin, Typography, Breadcrumb, Row, Col, Carousel, List } from 'antd';
import { HomeOutlined, AppstoreOutlined, UserOutlined, ApartmentOutlined, InfoCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { green, red } from '@ant-design/colors';

const ViewRoom = ({ room, meetings, loading, getOneRoom, getRoomsMeetings }) => {
    const { roomId } = useParams();
    useEffect(() => {
        getOneRoom(roomId);
        getRoomsMeetings(roomId);
    },[]);
    return room && meetings ? (
        <div className="Wrap" style={{background: `linear-gradient(to top, ${(meetings.length > 0) ? red[2]+','+red[6] : green[2]+','+green[6]})`}}>
            <Layout.Content className="RoomView">
                <Typography.Title level={1}>{room.name}</Typography.Title>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/rooms"><AppstoreOutlined /> <span>Rooms</span></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{room.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{marginTop: '10px'}}>
                    <Col span={9}>
                        <Carousel className="img" nextArrow>
                            <img src={`http://localhost:8080/${(room.photo) ? room.photo : 'nophoto.png'}`} />
                            <img src={`http://localhost:8080/${(room.location) ? room.location : 'nophoto.png'}`} />
                        </Carousel>
                    </Col>
                    <Col span={15} style={{padding: '10px 20px'}}>
                        <Typography.Title level={3}><InfoCircleOutlined /> Description</Typography.Title>
                        {room.description}
                        <Typography.Title level={4}><ApartmentOutlined /> Category</Typography.Title>
                        {room.category.name}
                        <Typography.Title level={4}><UserOutlined /> Capacity</Typography.Title>
                        {room.category.capacity}
                    </Col>
                </Row>
                {meetings.length ? 
                    <List
                        size="large"
                        header={<Typography.Title level={3}>Meetings</Typography.Title>}
                        dataSource={meetings}
                        renderItem={item => 
                            (<List.Item style={{background:'#fff',padding:'20px'}}>
                                <Row justify="space-between" style={{width: '100%'}}>
                                    <Col span={4}>{item.title}</Col>
                                    <Col span={4}><ClockCircleOutlined /> {item.startDate} - {item.endDate}</Col>
                                    <Col span={4}><UserOutlined /> {item.creator.firstName} {item.creator.lastName}</Col>
                                </Row>
                            </List.Item>)}
                    />
                 : ''}
            </Layout.Content>
        </div>

    ) : (loading ? (<div className="Wrap"><Layout.Content className="RoomView"><Spin size="large" /></Layout.Content></div>):'');
}

const mapStateToProps = state => ({
    room: state.rooms.selectedRoom,
    meetings: state.rooms.roomsMeetings,
    loading: state.rooms.loading
});

export default connect(mapStateToProps, { getOneRoom, getRoomsMeetings })(ViewRoom);