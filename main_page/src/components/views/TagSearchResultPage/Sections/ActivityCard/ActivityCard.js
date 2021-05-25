import React, {useState} from 'react'
import {Card, Popover, Typography} from 'antd'
import RadarChart from '../RadarChart/RadarChart'
import ActivityTags from '../ActivityTags/ActivityTags'
import './ActivityCard.scss'
import { Link } from "react-router-dom";
import {useHistory} from "react-router";


const ActivityCard = ({docId, key, img, title, tags, chartData}) => {
  const history = useHistory();

  const { Meta } = Card;
  const { Title } = Typography;

  const radarChart = (
    <RadarChart name={title} chartData={chartData} />
  );

  const onTextPressEnter = () => {
    (() => {history.push({
        pathname: "/info",
        state: {docId:docId, name:title,tags:tags,chartData:chartData }
      })})();
};

  return (
    <Popover
    content={radarChart}
    title={<Title level={5} style={{textAlign: "left"}}>Activity Info</Title>}
    mouseEnterDelay={0.4}
    placement="rightTop"
    >

        <Card
        className="Card"
        hoverable
        cover={<img alt={img.alt} src={img.src} />}
        onClick={onTextPressEnter}
        >
          <Meta title={<Title level={4} ellipsis={true}>{title}</Title>}/>
          <ActivityTags tags={tags}/>
        </Card>
    </Popover>
  );
}

export default ActivityCard
