import React from 'react'
import {Col} from 'antd'
import ActivityCard from '../../../TagSearchResultPage/Sections/ActivityCard/ActivityCard'
import './SectionContainer.scss'

const SectionContainer = ({sectionName, cards}) => {
    return (
        <div className="HAP-section">
            <div className="HAP-sectionName">{sectionName}</div>
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
        </div>
    )
}

export default SectionContainer
