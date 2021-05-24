import React, {useState} from 'react'
import {Card, Popover, Typography} from 'antd'
import RadarChart from '../RadarChart/RadarChart'
import ActivityTags from '../ActivityTags/ActivityTags'
import './ActivityCard.scss'
import { Link } from "react-router-dom";

const ActivityCard = ({img, title, tags, chartData}) => {
  const { Meta } = Card;
  const { Title } = Typography;

  const radarChart = (
    <RadarChart name={title} chartData={chartData} />
  );

  return (
    <Popover
    content={radarChart}
    title={<Title level={5} style={{textAlign: "left"}}>Activity Info</Title>}
    mouseEnterDelay={0.4}
    placement="rightTop"
    >

      <Link to={"/info"}>
        <Card
        className="Card"
        hoverable
        cover={<img alt={img.alt} src={img.src} />}
        >
          <Meta title={<Title level={4}>{title}</Title>}/>
          <ActivityTags tags={tags}/>
        </Card>
      </Link>
    </Popover>
  );
}

export default ActivityCard
