import React, { useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import './Review.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as solidthumbsup } from "@fortawesome/free-solid-svg-icons"
import { faThumbsUp as regularthumbsup } from "@fortawesome/free-regular-svg-icons";

const Review = ({isPositive, name, years, achiev, content, data, like}) => {
    const [ilikeit, setIlikeit] = useState(like);
    const [thumbsup, setThumbsup] = useState(regularthumbsup);
    // 나중에는 like 상속받아야 함
    function clickLike(event) {
        if (!event.currentTarget.className.includes("MMP-ilikeit")) {
            // Modal
            event.currentTarget.className += " MMP-ilikeit";
            setIlikeit(ilikeit + 1);
            setThumbsup(solidthumbsup);
        }
        else {
            event.currentTarget.className = "AIP-reviews-likes"
            setIlikeit(ilikeit - 1);
            setThumbsup(regularthumbsup);
        }
    }

    return (
        <div class="AIP-reviews-component">
            {isPositive ?
                <Card style={{backgroundColor:"#CBEDF4", border:"none"}}>
                    <Card.Body>
                        <Card.Title><FontAwesomeIcon icon={faUserCircle} /><span> {name}</span></Card.Title>
                        <Card.Subtitle>{years} years, completed {achiev} achievements</Card.Subtitle>
                        <Card.Text>{content}</Card.Text>
                        <div>
                            <div class="AIP-reviews-points"><Badge variant="dark">Easy to start: {data[0]}</Badge></div>
                            <div class="AIP-reviews-points"><Badge variant="dark">Cost of equipment: {data[1]}</Badge></div>
                            <div class="AIP-reviews-points"><Badge variant="dark">Schedule-flexible: {data[2]}</Badge></div>
                            <div class="AIP-reviews-points"><Badge variant="dark">Safe: {data[3]}</Badge></div>
                            <div class="AIP-reviews-points"><Badge variant="dark">Good for health: {data[4]}</Badge></div>
                            <div class="AIP-reviews-likes" onClick={clickLike}><FontAwesomeIcon icon={thumbsup} /><span> {ilikeit}</span></div>
                        </div>
                    </Card.Body>
                </Card>
                :
                <Card style={{backgroundColor:"#FFC6C6", border:"none"}}>
                    <Card.Body>
                        <Card.Title><FontAwesomeIcon icon={faUserCircle} /><span> {name}</span></Card.Title>
                        <Card.Subtitle>{years} years, completed {achiev} achievements</Card.Subtitle>
                        <Card.Text>{content}</Card.Text>
                        <div>
                            <div class="AIP-reviews-points"><Badge variant="dark">Easy to start: {data[0]}</Badge></div>
                            <div class="AIP-reviews-points"><Badge variant="dark">Cost of equipment: {data[1]}</Badge></div>
                            <div class="AIP-reviews-points"><Badge variant="dark">Schedule-flexible: {data[2]}</Badge></div>
                            <div class="AIP-reviews-points"><Badge variant="dark">Safe: {data[3]}</Badge></div>
                            <div class="AIP-reviews-points"><Badge variant="dark">Good for health: {data[4]}</Badge></div>
                            <div class="AIP-reviews-likes" onClick={clickLike}><FontAwesomeIcon icon={thumbsup} /><span> {ilikeit}</span></div>
                        </div>
                    </Card.Body>
                </Card>
            }
        </div>
    )
}

export default Review
