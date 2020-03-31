import React from 'react';
import { connect } from 'react-redux';
import { Layout, Typography, Calendar, Badge, Empty } from 'antd';

function MeetingsList({meetings}) {

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

    return meetings ? (
        <Layout.Content className="MeetingsList">
            <Typography.Title level={1}><span role="img" aria-label="calendar">📅</span> Meetings</Typography.Title>
            <Calendar dateCellRender={cellRender} />
        </Layout.Content>
    ) : <Layout.Content className="MeetingsList"><Empty /></Layout.Content>;
}

const mapStateToProps = state => ({
    meetings: state.meetings.meetingsData
});

export default connect(mapStateToProps)(MeetingsList);