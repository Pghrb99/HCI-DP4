import React, {useState, useEffect} from 'react';
import { ListGroup, Badge, Button, ButtonGroup, ToggleButton, Table, Modal, Form } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import './InfoDocument.scss';
import img1 from '../imgs/ice_hockey.jpg'
import img2 from '../imgs/ice_hockey2.png'
import img3 from '../imgs/ice_hockey3.png'
import Review from '../Review/Review'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faChevronCircleDown, faChevronCircleUp, faPencilAlt } from "@fortawesome/free-solid-svg-icons"

const InfoDocument = ({ achievlist, setAchievlist, data, reviewlist, addReview, removeReview, submit, setSubmit, ongoing, setOngoing }) => {
    
    const [review, setReview] = useState(false);
    const [text, setText] = useState(submit ? reviewlist[0]['content'] : "");
    const [recommend, setRecommend] = useState(submit ? reviewlist[0]['isPositive'] : true);
    const [range, setRange] = useState(submit ? reviewlist[0]['data'] : [5, 5, 5, 5, 5]);
    const [remove, setRemove] = useState(false);
    const [more, setMore] = useState(false);

    const calculateCompleted = () => {
        var cnt = 0;
        achievlist.forEach(achiev => {
            if (achiev['isCompleted']) {
                cnt++;
            }
        });
        return cnt;
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

    const clickReview = () => {
        setReview(true);
    }

    const clickRYes = () => {
        setSubmit(true);
        setReview(false);
        changeReviewList();
    }

    const clickRNo = () =>{
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

    const clickMore = () => {
        setMore(!more);
    }

    return (
        <div id="infodocument">
            <div id="AIP-numerics">
                <h2 >Numerics</h2>
                <ListGroup id="AIP-numerics-list" horizontal>
                    <ListGroup.Item>
                        <div class="AIP-numerics-subtitle">Easy to start</div>
                        <div class="AIP-numerics-numbers">{data[0]} / 10</div>
                        <div class="AIP-numerics-radius"></div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div class="AIP-numerics-subtitle">Cost-effective</div>
                        <div class="AIP-numerics-numbers">{data[1]} / 10</div>
                        <div class="AIP-numerics-radius"></div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div class="AIP-numerics-subtitle">Schedule-flexible</div>
                        <div class="AIP-numerics-numbers">{data[2]} / 10</div>
                        <div class="AIP-numerics-radius"></div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div class="AIP-numerics-subtitle">Safe</div>
                        <div class="AIP-numerics-numbers">{data[3]} / 10</div>
                        <div class="AIP-numerics-radius"></div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div class="AIP-numerics-subtitle">Good for health</div>
                        <div class="AIP-numerics-numbers">{data[4]} / 10</div>
                        <div class="AIP-numerics-radius"></div>
                    </ListGroup.Item>
                </ListGroup>
            </div>
            <div id="AIP-images" style={{ marginTop: '30px' }}>
                <h2>Images</h2>
                <ListGroup id="AIP-images-list" horizontal>
                    <ListGroup.Item><img src={img1} class="AIP-images-img"></img></ListGroup.Item>
                    <ListGroup.Item><img src={img2} class="AIP-images-img"></img></ListGroup.Item>
                    <ListGroup.Item><img src={img3} class="AIP-images-img"></img></ListGroup.Item>
                </ListGroup>
            </div>
            <div id="AIP-videos" style={{ marginTop: '30px' }}>
                <h2>Videos</h2>
                <div id="AIP-videos-youtube">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/HSUdZ9sOQRU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            <div id="AIP-description" style={{ marginTop: '30px' }}>
                <div style={{width:'100%', display:'inline-block'}}>
                    <h2 style={{float:'left'}}>Description</h2>
                    <Button id="AIP-edit-button" variant="success" onClick={clickReview} disabled={!ongoing}><FontAwesomeIcon icon={faEdit} style={{marginRight: "10px"}}/>Edit Description</Button>
                </div>
                <div class="AIP-article">
                    Ice hockey is a contact team sport played on ice, usually in an indoor or outdoor rink, in which two teams of skaters use their sticks to shoot a vulcanized rubber puck into their opponent's net to score goals. The sport is known to be fast-paced and physical, with teams usually fielding six players at a time: one goaltender to stop the puck from going into their own net, two defensemen, and three forwards who skate the span of the ice trying to control the puck and score goals against the opposing team.
                </div>
                <a target="_blank" href="https://en.wikipedia.org/wiki/Ice_hockey" class="AIP-article">Wikipedia</a>
                <a target="_blank" href="https://namu.wiki/w/%EC%95%84%EC%9D%B4%EC%8A%A4%ED%95%98%ED%82%A4" class="AIP-article">나무위키</a>
            </div>
            <div id="AIP-requirments" style={{ marginTop: '30px' }}>
                <div style={{width:'100%', display:'inline-block'}}>
                    <h2 style={{float:'left'}}>Requirments</h2>
                    <Button id="AIP-edit-button" variant="success" onClick={clickReview} disabled={!ongoing}><FontAwesomeIcon icon={faEdit} style={{marginRight: "10px"}}/>Edit Requirments</Button>
                </div>
                <div class="AIP-article">Supplies: Helmet, guards, skates, sticks, gloves</div>
                <div class="AIP-article">Number of people: 12 (each team consists of 6 players)</div>
            </div>
            <div id="AIP-achievements" style={{ marginTop: '30px' }}>
                <div style={{width:'100%', display:'inline-block'}}>
                    <h2 style={{float:'left'}}>Achievements</h2>
                    <Button id="AIP-edit-button" variant="success" onClick={clickReview} disabled={!ongoing}><FontAwesomeIcon icon={faEdit} style={{marginRight: "10px"}}/>Edit Achievements</Button>
                </div>
                <ListGroup id="AIP-achievements-list">
                    {achievlist.map((achiev, i) => {
                        if (i < 4 || more) {
                            return (
                                <ListGroup.Item>
                                    <Badge variant="secondary">{achiev['name']}</Badge> {achiev['explain']}
                                </ListGroup.Item>
                            );
                        }
                        else {
                            return null;
                        }
                    })}
                </ListGroup>
                <div style={{textAlign:'center'}}>
                    <Button id="AIP-achievements-more" variant="secondary" onClick={clickMore}><FontAwesomeIcon icon={more ? faChevronCircleUp : faChevronCircleDown}/></Button>
                </div>
            </div>
            <div id="AIP-reviews" style={{ marginTop: '30px' }}>
                <div style={{width:'100%', display:'inline-block'}}>
                    <h2 style={{float:'left'}}>Reviews</h2>
                    {submit ?
                        <div>
                            <Button id="AIP-reviews-remove" variant="danger" onClick={clickRemove}><FontAwesomeIcon icon={faPencilAlt} style={{marginRight: "10px"}}/>Remove your Review</Button>
                            <Button id="AIP-reviews-write" variant="success" onClick={clickReview}><FontAwesomeIcon icon={faPencilAlt} style={{marginRight: "10px"}}/>Modify your Review</Button>
                        </div>
                        :
                        <Button id="AIP-reviews-write" variant="success" onClick={clickReview} disabled={!ongoing}><FontAwesomeIcon icon={faPencilAlt} style={{marginRight: "10px"}}/>Write a Review</Button>
                    }
                    {/*ongoing disabled*/}
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
                                <Form.Label id="MMP-reviews-formlabel">Cost-effective</Form.Label>
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
                        <Modal.Title>Remove your Review</Modal.Title>
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
                    {console.log(reviewlist)}
                    {/*issignedin => like button*/}
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
            <div id="AIP-communities" style={{ marginTop: '30px' }}>
                <div style={{width:'100%', display:'inline-block'}}>
                    <h2 style={{float:'left'}}>Communities</h2>
                    <Button id="AIP-edit-button" variant="success" onClick={clickReview} disabled={!ongoing}><FontAwesomeIcon icon={faEdit} style={{marginRight: "10px"}}/>Edit Requirments</Button>
                </div>
                <a target="_blank" href="https://gall.dcinside.com/icehockey" class="AIP-article">dcinside.com</a>
                <a target="_blank" href="https://about.hockeycommunity.com/en-CA/" class="AIP-article">Hockey Community</a>
                <Table bordered hover id="AIP-communities-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Club Name</th>
                            <th>Region</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Hanwha Eagles</td>
                            <td>Daejeon, Korea</td>
                            <td>042-111-1111</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Lotte Giants</td>
                            <td>Busan, Korea</td>
                            <td>051-222-2222</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Samsung Lions</td>
                            <td>Daegu, Korea</td>
                            <td>053-333-3333</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default InfoDocument;