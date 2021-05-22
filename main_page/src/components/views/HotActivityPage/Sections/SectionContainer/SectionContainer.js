import React from 'react'
import {Col} from 'react-bootstrap'
import ActivityCard from '../../../TagSearchResultPage/Sections/ActivityCard/ActivityCard'
import './SectionContainer.scss'

const SectionContainer = ({sectionName, cards}) => {
    return (
        <div className="HAP-section">
            <div className="HAP-sectionName">{sectionName}</div>
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
            <hr  style={{
                color: 'black',
                backgroundColor: 'black',
                borderColor : 'black'
            }}/>
        </div>
    )
}

export default SectionContainer
