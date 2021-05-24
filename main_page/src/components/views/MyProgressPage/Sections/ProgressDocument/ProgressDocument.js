import React, { useState } from 'react';
import { ProgressBar, ListGroup, Badge, Modal, Button, ButtonGroup, ToggleButton, Form} from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';
import './ProgressDocument.scss';
import $ from 'jquery';
import Review from '../../../ActivityInfoPage/Sections/Review/Review';
// import bsCustomFileInput from 'bs-custom-file-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const ProgressDocument = ({ c, t, reviewlist, addReview, removeReview, submit, setSubmit }) => {
    const [prove, setProve] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [completed, setCompleted] = useState(c);
    const [file, setFile] = useState(null);
    const [review, setReview] = useState(false);
    const [text, setText] = useState(submit ? reviewlist[0]['content'] : "");
    const [recommend, setRecommend] = useState(submit ? reviewlist[0]['isPositive'] : true);
    const [range, setRange] = useState(submit ? reviewlist[0]['data'] : [5, 5, 5, 5, 5]);
    const [remove, setRemove] = useState(false);
    const total = t;
    const percent = (completed / total * 100).toFixed(2);

    function changeReviewList(achievdiff) {
        if (submit) {
            removeReview();
        }
        addReview({
            isPositive: recommend,
            isMe: true,
            name: "Changhae Lee",
            years: 1,
            achiev: completed+achievdiff,
            content: text,
            data: range,
            like: 0
        });
    }

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
            changeReviewList(1);
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
        changeReviewList(-1);
    }

    function clickCNo() {
        $(".MMP-temp").attr('class', "badge badge-secondary MMP-success");
        setCancel(false);
    }

    function clickReview() {
        setReview(true);
    }

    function clickRYes() {
        setSubmit(true);
        setReview(false);
        changeReviewList(0);
    }

    function clickRNo() {
        setReview(false);
    }

    function clickRemove() {
        setRemove(true);
    }

    function clickXYes() {
        setText("");
        setRecommend(true);
        setRange([5, 5, 5, 5, 5]);
        setSubmit(false);
        setRemove(false);
        removeReview();
    }

    function clickXNo() {
        setRemove(false);
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
            <div id="MMP-reviews" style={{marginTop:'30px'}}>
                <div style={{width:'100%', display:'inline-block'}}>
                <h2 style={{float:'left'}}>Reviews</h2>
                {submit ?
                    <div>
                        <Button id="MMP-reviews-remove" variant="danger" onClick={clickRemove}><FontAwesomeIcon icon={faPencilAlt} style={{marginRight: "10px"}}/>Remove your Review</Button>
                        <Button id="MMP-reviews-write" variant="success" onClick={clickReview}><FontAwesomeIcon icon={faPencilAlt} style={{marginRight: "10px"}}/>Modify your Review</Button>
                    </div>
                    :
                    <Button id="MMP-reviews-write" variant="success" onClick={clickReview}><FontAwesomeIcon icon={faPencilAlt} style={{marginRight: "10px"}}/>Write a Review</Button>
                }
                </div>
                <Modal show={review} onHide={clickRNo}>
                    <Modal.Header closeButton>
                        {submit ?
                            <Modal.Title>Modify your Review</Modal.Title>
                            :
                            <Modal.Title>Write a Review</Modal.Title>
                        }
                    </Modal.Header>
                    <Modal.Body>
                        
                        <Form>
                            <Form.Group controlId="MMP-text">
                                <Form.Label id="MMP-reviews-formlabel">Text</Form.Label>
                                <Form.Control as="textarea" rows={3} value={text} onChange={e => {setText(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label id="MMP-reviews-formlabel">Do you recommend this activity?</Form.Label>
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
                                <RangeSlider value={range[0]} max={10} step={1} variant='success' onChange={e => setRange([e.target.value, range[1], range[2], range[3], range[4]])}/>
                                <Form.Label id="MMP-reviews-formlabel">Cost of equipment</Form.Label>
                                <RangeSlider value={range[1]} max={10} step={1} variant='success' onChange={e => setRange([range[0], e.target.value, range[2], range[3], range[4]])}/>
                                <Form.Label id="MMP-reviews-formlabel">Schedule-flexible</Form.Label>
                                <RangeSlider value={range[2]} max={10} step={1} variant='success' onChange={e => setRange([range[0], range[1], e.target.value, range[3], range[4]])}/>
                                <Form.Label id="MMP-reviews-formlabel">Safe</Form.Label>
                                <RangeSlider value={range[3]} max={10} step={1} variant='success' onChange={e => setRange([range[0], range[1], range[2], e.target.value, range[4]])}/>
                                <Form.Label id="MMP-reviews-formlabel">Good for health</Form.Label>
                                <RangeSlider value={range[4]} max={10} step={1} variant='success' onChange={e => setRange([range[0], range[1], range[2], range[3], e.target.value])}/>
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
                <Modal show={remove} onHide={clickXNo}>
                    <Modal.Header closeButton>
                        <Modal.Title id="AIP-modal-title">Remove your Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontSize: "18px" }}>
                        <p style={{fontFamily:'arial', color:'black', fontSize:'18px', marginLeft:"0"}}>Are you sure you remove your review?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={clickXYes}>
                            Remove
                        </Button>
                        <Button variant="secondary" onClick={clickXNo}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                <h3>Positive Opinions</h3>
                <div id="MMP-reviews-positive">
                    {reviewlist.map(review => {
                        if (review['isPositive']) {
                            if (review['isMe']){
                                return <Review isPositive={true} isMe={true} name={review['name']} years={review['years']} achiev={review['achiev']} content={review['content']} data={review['data']} like={review['like']} clickReview={clickReview} clickRemove={clickRemove}/>
                            }
                            else {
                                return <Review isPositive={true} isMe={false} name={review['name']} years={review['years']} achiev={review['achiev']} content={review['content']} data={review['data']} like={review['like']}/>
                            }
                        }  
                    })}
                </div>
                <h3>Negative Opinions</h3>
                <div id="MMP-reviews-negative">
                    {reviewlist.map(review => {
                        if (!review['isPositive']) {
                            if (review['isMe']){
                                return <Review isPositive={false} isMe={true} name={review['name']} years={review['years']} achiev={review['achiev']} content={review['content']} data={review['data']} like={review['like']} clickReview={clickReview} clickRemove={clickRemove}/>
                            }
                            else {
                                return <Review isPositive={false} isMe={false} name={review['name']} years={review['years']} achiev={review['achiev']} content={review['content']} data={review['data']} like={review['like']}/>
                            }
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProgressDocument;