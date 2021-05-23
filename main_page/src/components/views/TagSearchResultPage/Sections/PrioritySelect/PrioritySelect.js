import React, {useState} from 'react';
import { Select } from 'antd';

export default function PrioritySelect() {
  const { Option } = Select;
  const [priority, setPriority] = useState(1);

  const handleChange = (value) => {
    setPriority(value);
  };

  return (
    <Select defaultValue={1} style={{ width: 150 }} onChange={handleChange} className="PrioritySelect">
      <Option value={1}>Easy to start</Option>
      <Option value={2}>Cost-effective</Option>
      <Option value={3}>Schedule-flexible</Option>
      <Option value={4}>Good for health</Option>
      <Option value={5}>Safe</Option>
    </Select>
  );
}