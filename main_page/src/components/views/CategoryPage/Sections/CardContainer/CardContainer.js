import React from 'react'
import {Col} from 'antd'
import CategoryCard from '../CategoryCard/CategoryCard'
import './CardContainer.scss'

const CardContainer = ({cards}) => {
    return (
        <div className="CP-CardContainer">
            {cards.map((card, index) => (
                <Col lg={6} md={6} sm={8} xs={12} className="card-column">
                <CategoryCard 
                    title={card.title} 
                    img={card.img}
                    key={index}
                />
                </Col>
            ))}
        </div>
    )
}

export default CardContainer
