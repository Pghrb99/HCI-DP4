import React, { useState } from 'react';
import { ProgressBar, ListGroup, Badge, Modal, Button, ButtonGroup, ToggleButton, Form } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';
import './ProgressDocument.scss';
import $ from 'jquery';
import Review from '../../../ActivityInfoPage/Sections/Review/Review';
// import bsCustomFileInput from 'bs-custom-file-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const ProgressDocument = ({ achievlist, setAchievlist, reviewlist, addReview, removeReview, submit, setSubmit }) => {
    
    const [tempselect, setTempselect] = useState(new Array(achievlist.length).fill(false));
    const [modify, setModify] = useState(false);
    const [prove, setProve] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [attained, setAttained] = useState("");
    const [file, setFile] = useState(null);
    const [review, setReview] = useState(false);
    const [text, setText] = useState(submit ? reviewlist[0]['content'] : "");
    const [recommend, setRecommend] = useState(submit ? reviewlist[0]['isPositive'] : true);
    const [range, setRange] = useState(submit ? reviewlist[0]['data'] : [5, 5, 5, 5, 5]);
    const [remove, setRemove] = useState(false);

    const calculateTotal = () => {
        var cnt = 0;
        achievlist.forEach(achiev => {
            if (achiev['isSelected']) {
                cnt++;
            }
        });
        return cnt;
    }

    const calculateCompleted = () => {
        var cnt = 0;
        achievlist.forEach(achiev => {
            if (achiev['isCompleted']) {
                cnt++;
            }
        });
        return cnt;
    }

    const calculatePercent = () => {
        if (calculateCompleted() > 0) {
            return (calculateCompleted() / calculateTotal() * 100).toFixed(2);
        }
        return 0;
    }

    const clickModify = () => {
        setTempselect(achievlist.map(achiev => {
            return achiev['isSelected'];
        }))
        setModify(true);
    }

    const clickMYes = () => {
        const temp = achievlist.map((achiev, i) => {
            return ({
                name: achiev['name'],
                explain: achiev['explain'],
                isSelected: tempselect[i],
                isCompleted: achiev['isCompleted']
            })
        })
        setAchievlist(temp);
        setTempselect(new Array(achievlist.length).fill(false));
        setModify(false);
    }

    const clickMNo = () => {
        setTempselect(new Array(achievlist.length).fill(false));
        setModify(false);
    }

    const clickModifyLabel = (event) => {
        const s = event.currentTarget.className;
        const i = parseInt(event.currentTarget.className.split('|')[1]);
        console.log(i + s);
        const temp = [];
        for (let j = 0; j < achievlist.length; j++) {
            if (j == i) {
                temp.push(!tempselect[i]);
            }
            else {
                temp.push(tempselect[j]);
            }
        }
        setTempselect(temp);
        if (!event.currentTarget.className.includes("MMP-success")) {
            event.currentTarget.className = "MMP-success " + s;
        }
        else {
            event.currentTarget.className = "|" + i + "| badge badge-secondary";
        }
        console.log(event.currentTarget.className);
    }

    const changeReviewList = () => {
        if (submit) {
            const ach = reviewlist[0]['achiev'];
            removeReview();
            addReview({
                isPositive: recommend,
                isMe: true,
                name: "Changhae Lee",
                years: 1,
                achiev: ach,
                content: text,
                data: range,
                like: 0
            });
        }
        else {
            addReview({
                isPositive: recommend,
                isMe: true,
                name: "Changhae Lee",
                years: 1,
                achiev: calculateCompleted(),
                content: text,
                data: range,
                like: 0
            });
        }
    }

    const clickLabel = (event) => {
        setAttained(event.currentTarget.className);
        event.currentTarget.className += " MMP-temp";
        if (!event.currentTarget.className.includes("MMP-success")) {
            setProve(true);
        }
        else {
            event.currentTarget.className += " MMP-temp";
            setCancel(true);
        }
    }

    const clickPYes = () => {
        const i = parseInt(attained.split('|')[1]);
        console.log(typeof (file.files[0]))
        if (!(typeof (file.files[0]) == 'undefined')) {
            $(".MMP-temp").attr('class', "MMP-success " + attained);
            const temp = achievlist.map((achiev, j) => {
                if (j == i) {
                    return ({
                        name: achiev['name'],
                        explain: achiev['explain'],
                        isSelected: achiev['isSelected'],
                        isCompleted: true
                    })
                }
                else {
                    return ({
                        name: achiev['name'],
                        explain: achiev['explain'],
                        isSelected: achiev['isSelected'],
                        isCompleted: achiev['isCompleted']
                    })
                }
            })
            setAchievlist(temp);
            setProve(false);
        }
        else {
            alert("No Photo!");
        }
    }

    const clickPNo = () => {
        $(".MMP-temp").attr('class', attained);
        setProve(false);
    }

    const clickCYes = () => {
        const i = parseInt(attained.split('|')[1]);
        $(".MMP-temp").attr('class', attained.replace("MMP-success ", ''));
        const temp = achievlist.map((achiev, j) => {
            if (j == i) {
                return ({
                    name: achiev['name'],
                    explain: achiev['explain'],
                    isSelected: achiev['isSelected'],
                    isCompleted: false
                })
            }
            else {
                return ({
                    name: achiev['name'],
                    explain: achiev['explain'],
                    isSelected: achiev['isSelected'],
                    isCompleted: achiev['isCompleted']
                })
            }
        })
        setAchievlist(temp);
        setCancel(false);
    }

    const clickCNo = () => {
        $(".MMP-temp").attr('class', attained);
        setCancel(false);
    }

    const clickReview = () => {
        setReview(true);
    }

    const clickRYes = () => {
        setSubmit(true);
        setReview(false);
        changeReviewList();
    }

    const clickRNo = () => {
        setReview(false);
    }

    const clickRemove = () => {
        setRemove(true);
    }

    const clickXYes = () => {
        setText("");
        setRecommend(true);
        setRange([5, 5, 5, 5, 5]);
        setSubmit(false);
        setRemove(false);
        removeReview();
    }

    const clickXNo = () => {
        setRemove(false);
    }

    const emptyCheck = (arr) => {
        const temp = new Array(achievlist.length).fill(false);
        return ((temp.length == arr.length) && temp.every(function (element, index) {
            return element === arr[index];
        }));
    }

    return (
        <div id="progressdocument">
            <div id="MMP-percentage" >
                <h2>Progress Percentage</h2>
                <ProgressBar id="MMP-percentage-bar" variant="success" now={calculatePercent()} label={calculatePercent() + `% (${calculateCompleted()}/${calculateTotal()})`} />
            </div>
            <div id="MMP-selectedachiev" style={{ marginTop: '30px' }}>
                <div style={{ width: '100%', display: 'inline-block' }}>
                    <h2 style={{ float: 'left' }}>Selected Achievements</h2>
                    <Button id="MPP-achievements-modify" variant="success" onClick={clickModify}><FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />Modify Achievements</Button>
                </div>
                <Modal size='lg' show={modify} onHide={clickMNo}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modify Selected Achievements</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup id="MMP-achievements-modallist">
                            {achievlist.map((achiev, i) => {
                                if (achiev['isSelected']) {
                                    return (
                                        <ListGroup.Item>
                                            <Badge variant="secondary" className={"MMP-success |" + i + "|"} onClick={clickModifyLabel}>{achiev['name']}</Badge> {achiev['explain']}
                                        </ListGroup.Item>
                                    )
                                }
                                else {
                                    return (
                                        <ListGroup.Item>
                                            <Badge variant="secondary" className={"|" + i + "|"} onClick={clickModifyLabel}>{achiev['name']}</Badge> {achiev['explain']}
                                        </ListGroup.Item>
                                    )
                                }
                            })}
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={clickMYes}>
                            Submit
                        </Button>
                        <Button variant="danger" onClick={clickMNo}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

                {(emptyCheck(achievlist.map(achiev => { return achiev['isSelected']; }))) ?
                    <div style={{ width: '100%', marginTop: '15px', textAlign: 'center', fontSize: '24px' }}>You have not selected achievements yet.</div>
                    :
                    <ListGroup id="MMP-achievements-list">
                        {achievlist.map((achiev, i) => {
                            if (achiev['isSelected']) {
                                if (achiev['isCompleted']) {
                                    return (
                                        <ListGroup.Item>
                                            <Badge variant="secondary" className={"MMP-success |" + i + "|"} onClick={clickLabel}>{achiev['name']}</Badge> {achiev['explain']}
                                        </ListGroup.Item>
                                    )
                                }
                                else {
                                    return (
                                        <ListGroup.Item>
                                            <Badge variant="secondary" className={"|" + i + "|"} onClick={clickLabel}>{achiev['name']}</Badge> {achiev['explain']}
                                        </ListGroup.Item>
                                    )
                                }
                            }
                            else {
                                return null;
                            }
                        })}
                    </ListGroup>
                }
                <Modal show={prove} onHide={clickPNo}>
                    <Modal.Header closeButton>
                        <Modal.Title id="AIP-modal-title">Accomplish Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontSize: "18px" }}>
                        <p style={{ fontFamily: 'arial', color: 'black', fontSize: '18px', marginLeft: "0" }}>Are you sure you attained the activity? If it is true, please upload a proof photo.</p>
                        {/*<input type="file" name="file" id="file" class="inputfile" accept=".jpg, .jpeg, .png"/>*/}
                        <Form>
                            <Form.Group>
                                <Form.File accept=".jpg, .jpeg, .png" id="exampleFormControlFile1" ref={(ref) => setFile(ref)} />
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
                        <p style={{ fontFamily: 'arial', color: 'black', fontSize: '18px', marginLeft: "0" }}>Are you sure you cancel the activity?</p>
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
            <div id="MMP-reviews" style={{ marginTop: '30px' }}>
                <div style={{ width: '100%', display: 'inline-block' }}>
                    <h2 style={{ float: 'left' }}>Reviews</h2>
                    {submit ?
                        <div>
                            <Button id="MMP-reviews-remove" variant="danger" onClick={clickRemove}><FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "10px" }} />Remove your Review</Button>
                            <Button id="MMP-reviews-write" variant="success" onClick={clickReview}><FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "10px" }} />Modify your Review</Button>
                        </div>
                        :
                        <Button id="MMP-reviews-write" variant="success" onClick={clickReview}><FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "10px" }} />Write a Review</Button>
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
                                <Form.Control as="textarea" rows={3} value={text} onChange={e => { setText(e.target.value) }} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label id="MMP-reviews-formlabel">Do you recommend this activity?</Form.Label>
                                <ButtonGroup toggle>
                                    <ToggleButton id="MMP-reviews-recommend" type="radio" variant="success" checked={recommend} onChange={() => setRecommend(true)} style={recommend ? { backgroundColor: "rgb(77, 163, 77)", border: "none" } : { backgroundColor: "#BBBBBB", border: "none" }}>
                                        Recommend
                                    </ToggleButton>
                                    <ToggleButton id="MMP-reviews-notrecommend" type="radio" variant="danger" checked={!recommend} onChange={() => setRecommend(false)} style={recommend ? { backgroundColor: "#BBBBBB", border: "none" } : { backgroundColor: "red", border: "none" }}>
                                        Not Recommend
                                    </ToggleButton>
                                </ButtonGroup>
                            </Form.Group>
                            <Form.Group controlId="MMP-range">
                                <Form.Label id="MMP-reviews-formlabel">Easy to start</Form.Label>
                                <RangeSlider value={range[0]} max={10} step={1} variant='success' onChange={e => setRange([e.target.value, range[1], range[2], range[3], range[4]])} />
                                <Form.Label id="MMP-reviews-formlabel">Cost-effective</Form.Label>
                                <RangeSlider value={range[1]} max={10} step={1} variant='success' onChange={e => setRange([range[0], e.target.value, range[2], range[3], range[4]])} />
                                <Form.Label id="MMP-reviews-formlabel">Schedule-flexible</Form.Label>
                                <RangeSlider value={range[2]} max={10} step={1} variant='success' onChange={e => setRange([range[0], range[1], e.target.value, range[3], range[4]])} />
                                <Form.Label id="MMP-reviews-formlabel">Safe</Form.Label>
                                <RangeSlider value={range[3]} max={10} step={1} variant='success' onChange={e => setRange([range[0], range[1], range[2], e.target.value, range[4]])} />
                                <Form.Label id="MMP-reviews-formlabel">Good for health</Form.Label>
                                <RangeSlider value={range[4]} max={10} step={1} variant='success' onChange={e => setRange([range[0], range[1], range[2], range[3], e.target.value])} />
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
                        <p style={{ fontFamily: 'arial', color: 'black', fontSize: '18px', marginLeft: "0" }}>Are you sure you remove your review?</p>
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
                            if (review['isMe']) {
                                return <Review isPositive={true} isMe={true} name={review['name']} years={review['years']} achiev={review['achiev']} content={review['content']} data={review['data']} like={review['like']} clickReview={clickReview} clickRemove={clickRemove} />
                            }
                            else {
                                return <Review isPositive={true} isMe={false} name={review['name']} years={review['years']} achiev={review['achiev']} content={review['content']} data={review['data']} like={review['like']} />
                            }
                        }
                    })}
                </div>
                <h3>Negative Opinions</h3>
                <div id="MMP-reviews-negative">
                    {reviewlist.map(review => {
                        if (!review['isPositive']) {
                            if (review['isMe']) {
                                return <Review isPositive={false} isMe={true} name={review['name']} years={review['years']} achiev={review['achiev']} content={review['content']} data={review['data']} like={review['like']} clickReview={clickReview} clickRemove={clickRemove} />
                            }
                            else {
                                return <Review isPositive={false} isMe={false} name={review['name']} years={review['years']} achiev={review['achiev']} content={review['content']} data={review['data']} like={review['like']} />
                            }
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProgressDocument;