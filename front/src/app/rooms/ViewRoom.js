import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { getOneRoom } from '../redux/effects/rooms.effects';
import { Layout, Spin, Typography, Breadcrumb, Row, Col } from 'antd';
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons';

const ViewRoom = ({ room, loading, getOneRoom }) => {
    const { roomId } = useParams();
    useEffect(() => {
        getOneRoom(roomId);
    },[]);
    return room ? (
        <Layout.Content className="RoomView">
            <Typography.Title level={1}>{room.name}</Typography.Title>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/rooms"><AppstoreOutlined /> <span>Rooms</span></Link></Breadcrumb.Item>
                <Breadcrumb.Item>{room.name}</Breadcrumb.Item>
                <Row>
                    <Col span={4}>
                        Img
                    </Col>
                    <Col span={20}>
                        Info
                    </Col>
                </Row>
                {/* <img src={`http://localhost:8080/${(room.photo) ? room.photo : 'nophoto.png'}`} /> */}
            </Breadcrumb>
        </Layout.Content>
    ) : (loading ? (<Layout.Content className="RoomView"><Spin size="large" /></Layout.Content>):'');
}

const mapStateToProps = state => ({
    room: state.rooms.selectedRoom,
    loading: state.rooms.loading
});

export default connect(mapStateToProps, { getOneRoom })(ViewRoom);