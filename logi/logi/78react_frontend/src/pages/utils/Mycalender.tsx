import { TextField } from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment';

function MyCalendar(props: any) {
  let today = moment(new Date()).format('yyyy-MM-DD');
  let year = moment(new Date()).format('yyyy');
  let month = moment(new Date()).format('MM');
  let monthFirstDay = year + '-' + month + '-01';
  const [startDate, setStartDate] = useState(monthFirstDay);
  const [endDate, setEndDate] = useState(today);
  const onChange = (e: any) => {
    e.target.id === 'startDate' ? setStartDate(e.target.value) : setEndDate(e.target.value);
    if (props.onChangeDate !== undefined) {
      props.onChangeDate(e);
    }
  };
  if (props.basicInfo !== undefined) {
    props.basicInfo(startDate, endDate);
  }
  return (
    <>
      <TextField id="startDate" label="시작일" onChange={onChange} type={'date'} style={{ marginRight: '1vw' }} value={startDate} />
      <TextField id="endDate" label="종료일" onChange={onChange} type={'date'} style={{ marginRight: '1vw' }} value={endDate} />
    </>
  );
}
export default MyCalendar;
