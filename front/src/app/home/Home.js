import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { DatePicker, TimePicker, Button, Row, Col, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getMeetings } from '../redux/effects/meetings.effects';
import { getFreeRooms } from '../redux/effects/rooms.effects';
import MeetingsList from './MeetingsList';
import RoomList from './RoomList';

const { RangePicker } = TimePicker;

const Home = ({ getMeetings, getFreeRooms }) => {
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [showRooms, setShowRooms] = useState(false);

    useEffect(() => {
        getMeetings();
    }, []);

    function dateOnChange(date, dateString) {
        setDate(dateString);
    }
    
    function timeOnChange(time, timeString) {
        setStartTime(timeString[0]);
        setEndTime(timeString[1]);
    }
    
    function findRoom() {
        if(date && startTime && endTime) {
            setShowRooms(true);
            getFreeRooms(`${date} ${startTime}`, `${date} ${endTime}`);
        } else {
            notification['error']({
                message: 'Fill all fields',
                description: 'Choose Date and Time'
            });
        }
    }

    return (
        <div className="Wrap">
            <div className="findRoom">
                <Row className="findRoom__form">
                    <Col span={8} className="col"><DatePicker onChange={dateOnChange} size="large" /></Col>
                    <Col span={8} className="col"><RangePicker onChange={timeOnChange} size="large" /></Col>
                    <Col span={8} className="col">
                        <Button
                            onClick={() => findRoom()} 
                            size="large" 
                            type="primary" 
                            icon={<SearchOutlined />}
                        >Find Room</Button>
                    </Col>
                </Row>
            </div>
            {showRooms ? <RoomList /> : ''}
            <MeetingsList />
        </div>
    )
}

export default connect(null, { getMeetings, getFreeRooms })(Home);