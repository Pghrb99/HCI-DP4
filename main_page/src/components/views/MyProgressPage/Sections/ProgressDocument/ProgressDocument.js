import { React, useState } from 'react';
import { ProgressBar, ListGroup, Badge, Modal, Button } from 'react-bootstrap'
import './ProgressDocument.scss';
import $ from 'jquery';
import Review from '../../../ActivityInfoPage/Sections/Review/Review';

const ProgressDocument = ({ c, t }) => {
    const [attain, setAttain] = useState(false);
    const [completed, setCompleted] = useState(c);
    const total = t;
    const percent = (completed / total * 100).toFixed(2);

    function clickLabel(event) {
        if (!event.currentTarget.className.includes("MMP-success")) {
            // Modal
            event.currentTarget.className += " MMP-success";
            setCompleted(completed + 1);
        }
        else {
            event.currentTarget.className = "badge badge-secondary"
            setCompleted(completed - 1);
        }
    }

    return (
        <div id="progressdocument">
            <div id="MMP-percentage">
                <h2>Progress Percentage</h2>
                <ProgressBar id="MMP-percentage-bar" variant="success" now={percent} label={`${percent}% (${completed}/${total})`} />
            </div>
            <div id="MMP-selectedachiev">
                <h2>Selected Achievements</h2>
                <ListGroup id="MMP-achievements-list">
                    <ListGroup.Item>
                        <Badge variant="secondary" onClick={clickLabel}>Getting into ice</Badge> Keep skating for 10 minutes.
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Badge variant="secondary" onClick={clickLabel}>Skating faster</Badge> Skate 400m in 1 minutes.
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Badge variant="secondary" onClick={clickLabel}>Skating for a long time</Badge> Skate more than 10 minutes.
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Badge variant="secondary" onClick={clickLabel}>Getting into shot</Badge> Score more than 5 out of 10 penalty shots.
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Badge variant="secondary" onClick={clickLabel}>Shooting precisely</Badge> Score a goal from one goal to the other.
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Badge variant="secondary" onClick={clickLabel}>Dribbling calmly</Badge> Circle the link with the puck.
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Badge variant="secondary" onClick={clickLabel}>Wall-passing</Badge> Wall-pass 5 times from each side of the enemy.
                    </ListGroup.Item>

                </ListGroup>
            </div>
            <div id="MMP-reviews">
                <h2>Reviews</h2>
                <h3>Positive Opinions</h3>
                <div class="AIP-reviews-positive">
                    <Review isPositive={true} name={"Harry Potter"} years={5} achiev={20} content="You'll find it super fun. I promise." data={[1, 2, 3, 4, 5]} like={31} />
                    <Review isPositive={true} name={"Harry Potter"} years={5} achiev={20} content="You'll find it super fun. I promise." data={[1, 2, 3, 4, 5]} like={31} />
                </div>
                <h3>Negative Opinions</h3>
                <div class="AIP-reviews-negative">
                    <Review isPositive={false} name={"Steven Yeun"} years={1} achiev={6} content="It's soooo dangerous. I've broken my leg :(" data={[5, 4, 3, 2, 1]} like={17} />
                </div>
            </div>
        </div>
    )
}

export default ProgressDocument;