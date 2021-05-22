import React from 'react'
import {Col, Row, Container} from 'react-bootstrap'
import ActivityCard from '../ActivityCard/ActivityCard'
import './Cardbox.scss'
import Userimfo from './Userimfo/Userimfo'
// import Container from 'react-bootstrap'

const Cardbox = ({cards}) => {
    return (
    <div className="Cardbox">

        <div id="cardbox-left">
        <Userimfo />
        </div>

        <div id="cardbox-right">
                <div id="cardbox-right-up">
                    <Row xs={1} md={2}>
                    {cards.map((card, index) => (
                        
                        <Col lg="3" className="card-column">
                            
                            <ActivityCard 
                                key={index}
                                title={card.name} 
                                imgSrc={card.imgSrc}
                                tags={card.tags}
                                chartData={card.chartData}
                            />
                        </Col>
                        
                        ))}
                    </Row>
                </div>

                <div id="cardbox-right-down">
                    <Row xs={1} md={2}>
                    {cards.map((card, index) => (
                        
                        <Col lg="3" className="card-column">
                            
                            <ActivityCard 
                                key={index}
                                title={"333"} 
                                imgSrc={card.imgSrc}
                                tags={card.tags}
                                chartData={card.chartData}
                            />
                        </Col>
                        
                        ))}
                    </Row>
                </div>

        </div>

    </div>
    
    )
}

export default Cardbox
