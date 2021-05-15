import React from 'react';
import { ListGroup } from 'react-bootstrap'
import './InfoDocument.scss';

const InfoDocument = ({data}) => {
    /*const abcd = data.map((d) => 
    <ListGroup.Item>{d}</ListGroup.Item>
    );*/
    return (
        <div id="infodocument">
            <div id="numerics">
                <h2 >Numerics</h2>
                <ListGroup id="AIP-numerics-list" horizontal>
                    <ListGroup.Item>Easy to start: {data[0]}/10</ListGroup.Item>
                    <ListGroup.Item>Cost-effective: {data[1]}/10</ListGroup.Item>
                    <ListGroup.Item>Schedule-flexible: {data[2]}/10</ListGroup.Item>
                    <ListGroup.Item>Safe: {data[3]}/10</ListGroup.Item>
                    <ListGroup.Item>Good for health: {data[4]}/10</ListGroup.Item>
                </ListGroup>
            </div>
            <div id="images">
                <h2>Images</h2>
            </div>
            <div id="videos">
                <h2>Videos</h2>
                <p>asdfasdf</p>
                <p>asdfasdf</p>
                <p>asdfasdf</p>
                <p>asdfasdf</p>
                <p>asdfasdf</p>
                <p>asdfasdf</p>
                <p>asdfasdf</p>
                <p>asdfasdf</p>
                <p>asdfasdf</p>
                <p>asdfasdf</p>
                <p>asdfasdf</p>
            </div>
            <div id="description">
                <h2>Description</h2>
            </div>
            <div id="communities">
                <h2>Communities</h2>
            </div>
            <div id="requierments">
                <h2>Requierments</h2>
            </div>
            <div id="achievements">
                <h2>Achievements</h2>
            </div>
            <div id="reviews">
                <h2>Reviews</h2>
            </div>
            
        </div>
    )
}

export default InfoDocument;