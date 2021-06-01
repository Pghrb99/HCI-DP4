import React, {useState} from 'react'
import styled from 'styled-components'

import {Card, Popover, Typography} from 'antd'

import Mypagehover from '../Mypagehover/Mypagehover'
import Tags from '../../../../TagSearchResultPage/Sections/Tags/Tags'
import ActivityTags from '../../../../TagSearchResultPage/Sections/ActivityTags/ActivityTags'
import './ActivityCard.scss'
import { Link } from "react-router-dom";
import {useHistory} from "react-router";

const StyledPopover = styled(Popover)`
      min-width: 320px;
      height: 300px;
      padding: 0px;
      margin: 0px;
      opacity: 0.98;
`
const ActivityCard = ({givedocId, docId, userEmail, img, title, tags, text, chartData}) => {
  const history = useHistory();

  const { Meta } = Card;
  const { Title } = Typography;
  
  const onClick = () => {
    history.push({
      pathname: '/info',
      state: {
        docId: givedocId
      }
    });
  }

    const popover = (
        <Mypagehover  userEmail= {userEmail} hoverdocId= {docId} />
      );
    return (
      <>
        <Popover
        content={popover}
        title={<Title level={5} style={{textAlign: "left"}}>Activity Info</Title>}
        mouseEnterDelay={0.4}
        placement="rightTop"
        >

            <Card
            className="Card"
            hoverable
            style={{ width: '15rem' }}
            cover={<img alt={img.alt} src={img.src} />}
            onClick={onClick}
            >
              <Meta title={<Title level={4} ellipsis={true} style={{ width: 267, height: 162 }}>{title}</Title>}/>
              <ActivityTags tags={tags}/>
            </Card>
        </Popover>
      </>
    )
}

export default ActivityCard
