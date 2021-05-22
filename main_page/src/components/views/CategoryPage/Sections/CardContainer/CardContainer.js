import React from 'react'
import {Col} from 'react-bootstrap'
import CategoryCard from '../CategoryCard/CategoryCard'
import './CardContainer.scss'

const CardContainer = ({cards}) => {
    return (
        <div className="CP-CardContainer">
            {cards.map((card, index) => (
                <Col lg={3} md={3} sm={4} xs={6} className="card-column">
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
