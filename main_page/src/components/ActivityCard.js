import React from 'react'
import { Card, Button } from 'react-bootstrap'

const ActivityCard = ({imgSrc, title, text}) => {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={imgSrc} width={267} height={162}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {text}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ActivityCard
