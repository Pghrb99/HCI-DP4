import React, {useState} from 'react';
import { Select } from 'antd';

export default function PrioritySelect({onPriorityChange}) {
  const { Option } = Select;
  return (
    <Select defaultValue={0} style={{ width: 150 }} onChange={(val) => onPriorityChange(val)} className="PrioritySelect">
      <Option value={0}>Easy to start</Option>
      <Option value={1}>Cost-effective</Option>
      <Option value={2}>Schedule-flexible</Option>
      <Option value={3}>Good for health</Option>
      <Option value={4}>Safe</Option>
    </Select>
  );
}