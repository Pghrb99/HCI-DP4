import React from 'react'
import {Row, Col} from 'antd'
import ActivityCard from '../ActivityCard/ActivityCard'
import './CardContainer.scss'

const CardContainer = ({cards}) => {
    return (
        <div className="CardContainer">
            <Row>
                <Col lg={6} md={6} sm={6} xs={6} className="card-column">
                    {cards.map((card, index) => (
                            (index%4==0 &&
                            <ActivityCard 
                            key={card.key}
                            title={card.name} 
                            img={card.img}
                            tags={card.tags}
                            chartData={card.chartData}
                            />
                             )
                    ))}
                </Col>

                <Col lg={6} md={6} sm={6} xs={6} className="card-column">
                    {cards.map((card, index) => (
                            (index%4==1 &&
                            <ActivityCard 
                            key={card.key}
                            title={card.name} 
                            img={card.img}
                            tags={card.tags}
                            chartData={card.chartData}
                            />
                             )
                    ))}
                </Col>

                <Col lg={6} md={6} sm={6} xs={6} className="card-column">
                    {cards.map((card, index) => (
                            (index%4==2 &&
                            <ActivityCard 
                            key={card.key}
                            title={card.name} 
                            img={card.img}
                            tags={card.tags}
                            chartData={card.chartData}
                            />
                             )
                    ))}
                </Col>

                <Col lg={6} md={6} sm={6} xs={6} className="card-column">
                    {cards.map((card, index) => (
                            (index%4==3 &&
                            <ActivityCard 
                            key={card.key}
                            title={card.name} 
                            img={card.img}
                            tags={card.tags}
                            chartData={card.chartData}
                            />
                             )
                    ))}
                </Col>
            </Row>
        </div>
    )
}

export default CardContainer
