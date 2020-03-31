import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout, Typography, Divider, Button, List, Radio, Spin } from "antd"
import { MailOutlined, PhoneOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';
import { getCreatedMeetings, getVisitedMeetings } from '../redux/effects/meetings.effects';

const { Content } = Layout;

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const Profile = ({ createdMeetings, visitedMeetings, loading, getCreatedMeetings, getVisitedMeetings }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [selected, setSelected] = useState('visited');
    useEffect(() => {
        getCreatedMeetings();
        getVisitedMeetings();
    }, [selected]);
    function selectData(data) {
        setSelected(data.target.value);
    }
    let listData = (selected === 'created') ? createdMeetings : visitedMeetings;
    return (
        <Content className="Profile">
            <Typography.Title level={1}><span role="img" aria-label="user">🧒</span> {user.firstName} {user.lastName}</Typography.Title>
            <Button type="link"><UserOutlined /> {user.username}</Button>
            <Button href={'mailto:'+user.email} type="link"><MailOutlined /> {user.email}</Button>
            <Button href={'tel:'+user.phone} type="link"><PhoneOutlined /> {user.phone}</Button>
            <Divider />
            <Typography.Title level={2}><span role="img" aria-label="calendar">📅</span> Meetings</Typography.Title>

            <Radio.Group defaultValue="visited" size="large" onChange={selectData} >
                <Radio.Button value="visited">Where I'm participan</Radio.Button>
                <Radio.Button value="created">Created by me</Radio.Button>
            </Radio.Group>

            {listData ? 
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{pageSize: 3}}
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            key={<Typography.Title level={2}>{item.title}</Typography.Title>}
                            actions={[
                                <IconText icon={CloseOutlined} text="Cancel" key="list-vertical-like-o" />,
                                <IconText icon={UserOutlined} text="12" key="list-vertical-message" />,
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src={`http://localhost:8080/${(item.room.photo)?item.room.photo:'nophoto.png'}`}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={item.title}
                                description={item.room.name}
                            />
                            {item.description}
                        </List.Item>
                    )}
                /> : (loading ? <div style={{padding:'25px'}}><Spin size="large" /></div>:'')
            }
        </Content>
    );
}

const mapStateToProps = state => ({
    createdMeetings: state.meetings.createdMeetings,
    visitedMeetings: state.meetings.visitedMeetings,
    loading: state.meetings.loading
});

export default connect(mapStateToProps, { getCreatedMeetings, getVisitedMeetings })(Profile);