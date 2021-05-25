import React, {useState} from 'react';
import { Select , Typography} from 'antd';

export default function PrioritySelect({onPriorityChange}) {
  const { Title } = Typography;
  const { Option } = Select;
  return (
    <div  className="PrioritySelect">
    <Title level={5} style={{marginRight: 10, textAlign: "right"}}>Priority</Title>
    <Select defaultValue={0} style={{ width: 150 }} onChange={(val) => onPriorityChange(val)}>
      <Option value={0}>Easy to start</Option>
      <Option value={1}>Cost-effective</Option>
      <Option value={2}>Schedule-flexible</Option>
      <Option value={3}>Safe</Option>
      <Option value={4}>Good for health</Option>
    </Select>
    </div>
  );
}