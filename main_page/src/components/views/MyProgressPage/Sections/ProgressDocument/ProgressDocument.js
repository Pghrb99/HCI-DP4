import { React, useState } from 'react';
import { ProgressBar, ListGroup, Badge, Modal, Button, ButtonGroup, ToggleButton, Form} from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';
import './ProgressDocument.scss';
import $ from 'jquery';
import Review from '../../../ActivityInfoPage/Sections/Review/Review';
// import bsCustomFileInput from 'bs-custom-file-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const ProgressDocument = ({ c, t }) => {
    const [prove, setProve] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [completed, setCompleted] = useState(c);
    const [file, setFile] = useState(null);
    const [review, setReview] = useState(false);
    const [recommend, setRecommend] = useState(true);
    const [range1, setRange1] = useState(5);
    const [range2, setRange2] = useState(5);
    const [range3, setRange3] = useState(5);
    const [range4, setRange4] = useState(5);
    const [range5, setRange5] = useState(5);
    const total = t;
    const percent = (completed / total * 100).toFixed(2);

    function clickLabel(event) {
        event.currentTarget.className += " MMP-temp";
        if (!event.currentTarget.className.includes("MMP-success")) {
            setProve(true);
        }
        else {
            event.currentTarget.className += " MMP-temp";
            setCancel(true);
        }
    }

    function clickPYes() {
        console.log(typeof(file.files[0]))
        if (!(typeof(file.files[0]) == 'undefined')) {
            $(".MMP-temp").attr('class', "badge badge-secondary MMP-success");
            setCompleted(completed + 1);
            setProve(false);
        }
        else {
            alert("No Photo!")
        }
    }

    function clickPNo() {
        $(".MMP-temp").attr('class', "badge badge-secondary");
        setProve(false);
    }

    function clickCYes() {
        $(".MMP-temp").attr('class', "badge badge-secondary");
        setCompleted(completed - 1);
        setCancel(false);
    }

    function clickCNo() {
        $(".MMP-temp").attr('class', "badge badge-secondary MMP-success");
        setCancel(false);
    }

    function clickReview() {
        setReview(true);
    }

    function clickRYes() {
        setReview(false);
    }

    function clickRNo() {
        setReview(false);
    }

    function clickRecommend() {
        console.log($('#MMP-reviews-recommend').attr("class"));
        $('#MMP-reviews-recommend').toggleClass("MMP-reviews-clicked");
        $('#MMP-reviews-notrecommend').removeClass("MMP-reviews-clicked");
        console.log($('#MMP-reviews-recommend').attr("class"));
    }

    function clickNotrecommend() {
        $('#MMP-reviews-recommend').removeClass("MMP-reviews-clicked");
        $('#MMP-reviews-notrecommend').toggleClass("MMP-reviews-clicked");
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
                <Button id="MPP-achievements-modify" variant="success"><FontAwesomeIcon icon={faPlusSquare} style={{marginRight: "10px"}}/>Modify Achievements</Button>
                <Modal show={prove} onHide={clickPNo}>
                    <Modal.Header closeButton>
                        <Modal.Title id="AIP-modal-title">Accomplish Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontSize: "18px" }}>
                        <p style={{fontFamily:'arial', color:'black', fontSize:'18px', marginLeft:"0"}}>Are you sure you attained the activity? If it is true, please upload a proof photo.</p>
                        {/*<input type="file" name="file" id="file" class="inputfile" accept=".jpg, .jpeg, .png"/>*/}
                        <Form>
                            <Form.Group>
                                <Form.File accept=".jpg, .jpeg, .png" id="exampleFormControlFile1" ref={(ref) => setFile(ref)}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={clickPYes}>
                            Yes
                        </Button>
                        <Button variant="danger" onClick={clickPNo}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={cancel} onHide={clickCNo}>
                    <Modal.Header closeButton>
                        <Modal.Title id="AIP-modal-title">Accomplish Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{fontFamily:'arial', color:'black', fontSize:'18px', marginLeft:"0"}}>Are you sure you cancel the activity?</p>
                        {/*img tag 추가*/}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={clickCYes}>
                            Yes
                        </Button>
                        <Button variant="danger" onClick={clickCNo}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div id="MMP-reviews">
                <h2>Reviews</h2>
                <Button id="MMP-reviews-write" variant="success" onClick={clickReview}><FontAwesomeIcon icon={faPencilAlt} style={{marginRight: "10px"}}/>Write a Review</Button>
                <Modal show={review} onHide={clickRNo}>
                    <Modal.Header closeButton>
                        <Modal.Title id="AIP-modal-title">Write a Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="MMP-text">
                                <Form.Label id="MMP-reviews-formlabel">Text</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label id="MMP-reviews-formlabel">Do you recommend this activity?</Form.Label>
                                {/*<div className="mb-3">
                                    <Form.Check inline label="Recommend" style={{fontSize:"20px"}}/>
                                    <Form.Check inline label="Not Recommend"/>
                                </div>*/}
                                <ButtonGroup toggle>
                                    <ToggleButton id="MMP-reviews-recommend" type="radio" variant="success" checked={recommend} onChange={() => setRecommend(true)} style={recommend ? {backgroundColor:"rgb(77, 163, 77)", border:"none"} : {backgroundColor:"#BBBBBB", border:"none"}}>
                                        Recommend
                                    </ToggleButton>
                                    <ToggleButton id="MMP-reviews-notrecommend" type="radio" variant="danger" checked={!recommend} onChange={() => setRecommend(false)} style={recommend ? {backgroundColor:"#BBBBBB", border:"none"} : {backgroundColor:"red", border:"none"}}>
                                        Not Recommend
                                    </ToggleButton>
                                </ButtonGroup>
                            </Form.Group>
                            <Form.Group controlId="MMP-range">
                                <Form.Label id="MMP-reviews-formlabel">Easy to start</Form.Label>
                                <RangeSlider value={range1} max={10} step={1} variant='success' onChange={e => setRange1(e.target.value)}/>
                                <Form.Label id="MMP-reviews-formlabel">Cost of equipment</Form.Label>
                                <RangeSlider value={range2} max={10} step={1} variant='success' onChange={e => setRange2(e.target.value)}/>
                                <Form.Label id="MMP-reviews-formlabel">Schedule-flexible</Form.Label>
                                <RangeSlider value={range3} max={10} step={1} variant='success' onChange={e => setRange3(e.target.value)}/>
                                <Form.Label id="MMP-reviews-formlabel">Safe</Form.Label>
                                <RangeSlider value={range4} max={10} step={1} variant='success' onChange={e => setRange4(e.target.value)}/>
                                <Form.Label id="MMP-reviews-formlabel">Good for health</Form.Label>
                                <RangeSlider value={range5} max={10} step={1} variant='success' onChange={e => setRange5(e.target.value)}/>
                                {/*
                                <Form.Label>Easy to start</Form.Label>
                                <Form.Control type="range" variant="secondary" custom />
                                <Form.Label>Cost of equipment</Form.Label>
                                <Form.Control type="range" custom />
                                <Form.Label>Schedule-flexible</Form.Label>
                                <Form.Control type="range" custom />
                                <Form.Label>Safe</Form.Label>
                                <Form.Control type="range" custom />
                                <Form.Label>Good for health</Form.Label>
                                <Form.Control type="range" custom />
                                */}
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={clickRYes}>
                            Submit
                        </Button>
                        <Button variant="danger" onClick={clickRNo}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
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