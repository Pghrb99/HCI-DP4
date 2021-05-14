import React, {useState} from 'react'
import styled from 'styled-components'
import { Card, Popover, OverlayTrigger } from 'react-bootstrap'
import RadarChart from '../RadarChart/RadarChart'
import Tags from '../Tags/Tags'
import './ActivityCard.scss'

const StyledPopover = styled(Popover)`
      min-width: 320px;
      height: 300px;
      padding: 0px;
      margin: 0px;
      opacity: 0.98;
`
const ActivityCard = ({imgSrc, title, tags, text, chartData}) => {
    const popover = (
        <StyledPopover className="popover-container">
          <StyledPopover.Title as="h3">Activity Info</StyledPopover.Title>
          <StyledPopover.Content>
            <RadarChart name={title} chartData={chartData} />
          </StyledPopover.Content>
        </StyledPopover>
      );
    return (
        <OverlayTrigger
        placement="auto"
        // delay={{ show: 100, hide: 200 }}
        overlay={popover}
        >
            <Card style={{ width: '15rem' }} className="Card">
                <Card.Img variant="top" src={imgSrc} width={267} height={162}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Tags tags={tags}/>
                </Card.Body>
            </Card>
        </OverlayTrigger>
    )
}

export default ActivityCard
