import React from 'react'
import {Col} from 'antd'
import ActivityCard from '../ActivityCard/ActivityCard'
import './CardContainer.scss'

const CardContainer = ({cards}) => {
    return (
        <div className="CardContainer">
            {cards.map((card, index) => (
                <Col lg={6} md={6} sm={8} xs={12} className="card-column">
                
                <ActivityCard 
                    key={index}
                    title={card.name} 
                    img={card.img}
                    tags={card.tags}
                    chartData={card.chartData}
                />
                </Col>
            ))}
        </div>
    )
}

export default CardContainer
