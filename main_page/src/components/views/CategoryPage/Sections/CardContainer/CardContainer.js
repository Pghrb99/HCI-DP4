import React from 'react'
import {Row, Col} from 'antd'
import CategoryCard from '../CategoryCard/CategoryCard'
import './CardContainer.scss'

const CardContainer = ({cards}) => {
    return (
        <div className="CP-CardContainer">
            <Row>
                <Col lg={6} md={6} sm={6} xs={6} className="card-column">
                    {cards.map((card, index) => (
                            (index%4==0 &&
                            <CategoryCard 
                            title={card.title} 
                            img={card.img}
                            key={index}
                            />
                             )
                    ))}
                </Col>

                <Col lg={6} md={6} sm={6} xs={6} className="card-column">
                    {cards.map((card, index) => (
                            (index%4==1 &&
                            <CategoryCard 
                            title={card.title} 
                            img={card.img}
                            key={index}
                            />
                             )
                    ))}
                </Col>

                <Col lg={6} md={6} sm={6} xs={6} className="card-column">
                    {cards.map((card, index) => (
                            (index%4==2 &&
                            <CategoryCard 
                            title={card.title} 
                            img={card.img}
                            key={index}
                            />
                             )
                    ))}
                </Col>

                <Col lg={6} md={6} sm={6} xs={6} className="card-column">
                    {cards.map((card, index) => (
                            (index%4==3 &&
                            <CategoryCard 
                            title={card.title} 
                            img={card.img}
                            key={index}
                            />
                             )
                    ))}
                </Col>
            </Row>
            
            
        </div>
    )
}

export default CardContainer
