import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ActivityCard from '../components/ActivityCard'
import img1 from '../imgs/hockey_world_1400.jpg'

const TagSearchResultPage = () => {
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col sm={4}>
                        <img src={img1} />
                    </Col>
                    <Col sm={4}>
                        <img src={img1} />
                    </Col>
                    <Col sm={4}> 
                        <img src={img1} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TagSearchResultPage
