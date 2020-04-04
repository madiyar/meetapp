import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Layout, Typography, Calendar, Badge, Empty, Modal, List } from 'antd';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { getMeetings } from '../redux/effects/meetings.effects';
import { API_URL } from '../redux/types';

function MeetingsList({meetings, getMeetings}) {

    useEffect(() => {
        getMeetings();
    }, [meetings]);

    const [modalShow, setModalShow] = useState(false);
    const [meetingList, setMeetingList] = useState("");

    function cellRender(value) {
        let listData = [];
        meetings.map(meeting => {
            const startDate = new Date(Date.parse(meeting.startDate));
            let status = (meeting.freeEntry) ? 'success' : 'processing';
            status = (meeting.isCanceled) ? 'error' : status;
            status = (Date.now() > Date.parse(meeting.endDate)) ? 'default': status;
            if (startDate.getFullYear() === value.year() && 
                startDate.getMonth() === value.month() &&
                startDate.getDate() === value.date()
            ) {
                listData.push({...meeting, status})
            }
            return meeting;
        });
        return (
            <ul className="meetingInCell">
                {listData.map(item => (
                    <li key={item.id}>
                        <Badge status={item.status} text={item.title} />
                    </li>
                ))}
            </ul>
        )
    }

    const dataSelect = (data) => {
        let dayData = [];
        meetings.map(item => {
            const startDate = new Date(Date.parse(item.startDate));
            if (startDate.getFullYear() === data.year() && 
                startDate.getMonth() === data.month() &&
                startDate.getDate() === data.date()
            ) {
                dayData.push(item);
            }
        });
        setModalShow(true);
        setMeetingList(dayData);
    }

    return meetings ? (
        <Layout.Content className="MeetingsList">
            <Typography.Title level={1}><span role="img" aria-label="calendar">📅</span> Meetings</Typography.Title>
            <Calendar dateCellRender={cellRender} onSelect={dataSelect} />
            <Modal
                title="Meetings"
                visible={modalShow}
                onCancel={() => setModalShow(false)}
                footer={null}
                width={800}
            >
                {meetingList.length ? 
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={meetingList}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                extra={<img width={272} alt={item.title} src={`${API_URL}/${(item.room.photo)?item.room.photo:'nophoto.png'}`} />}
                                actions={[
                                    'Test'
                                ]}
                            >
                                <List.Item.Meta
                                    title={<a href={item.id}>{item.title}</a>}
                                    description={<span><AppstoreOutlined /> {item.room.name} <UserOutlined /> {item.creator.firstName} {item.creator.lastName}</span>}
                                />{item.description}
                            </List.Item>)}
                    /> : <Empty />
                }
            </Modal>
        </Layout.Content>
    ) : <Layout.Content className="MeetingsList"><Empty /></Layout.Content>;
}

const mapStateToProps = state => ({
    meetings: state.meetings.meetingsData
});

export default connect(mapStateToProps, {getMeetings})(MeetingsList);