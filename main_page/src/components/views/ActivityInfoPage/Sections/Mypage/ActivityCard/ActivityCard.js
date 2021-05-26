import React, {useState} from 'react'
import styled from 'styled-components'
import { Card, Popover, OverlayTrigger } from 'react-bootstrap'
import Mypagehover from '../Mypagehover/Mypagehover'
import Tags from '../../../../TagSearchResultPage/Sections/Tags/Tags'
import ActivityTags from '../../../../TagSearchResultPage/Sections/ActivityTags/ActivityTags'
import './ActivityCard.scss'
import { Link } from "react-router-dom";

const StyledPopover = styled(Popover)`
      min-width: 320px;
      height: 300px;
      padding: 0px;
      margin: 0px;
      opacity: 0.98;
`
const ActivityCard = ({docId, userEmail, imgSrc, title, tags, text, chartData}) => {
    const popover = (
        <StyledPopover className="popover-container">
          <StyledPopover.Title as="h3">Activity Info</StyledPopover.Title>
          <StyledPopover.Content>
            <Mypagehover  userEmail= {userEmail} hoverdocId= {docId} />
          </StyledPopover.Content>
        </StyledPopover>
      );
    return (
        <OverlayTrigger
        placement="auto"
        delay={{ show: 400, hide: 0 }}
        overlay={popover}
        > 
        <Link to={"/info"}>
            <Card style={{ width: '15rem' }} className="Card">
                <Card.Img variant="top" src={imgSrc} width={267} height={162}/>
                <Card.Body>
                    <Card.Title style={{color : 'black',  textAlign: 'left' }}>{title}</Card.Title>
                    {/* <Tags tags={tags}/> */}
                    <ActivityTags tags={tags}/>
                </Card.Body>
            </Card>
            </Link>
        </OverlayTrigger>
    )
}

export default ActivityCard
