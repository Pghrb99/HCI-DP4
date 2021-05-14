import React from 'react'
import {Col} from 'react-bootstrap'
import ActivityCard from '../ActivityCard/ActivityCard'
import './CardContainer.scss'

const CardContainer = ({cards}) => {
    return (
        <div className="CardContainer">
            {cards.map((card, index) => (
                <Col lg={3} md={3} sm={4} xs={6} className="card-column">
                
                <ActivityCard 
                    key={index}
                    title={card.name} 
                    imgSrc={card.imgSrc}
                    tags={card.tags}
                    chartData={card.chartData}
                />
                </Col>
            ))}
        </div>
    )
}

export default CardContainer
