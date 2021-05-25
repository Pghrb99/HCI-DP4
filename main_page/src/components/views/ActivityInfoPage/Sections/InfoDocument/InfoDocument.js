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
import {db} from '../../../../../firebase'

const InfoDocument = ({ docId, activityname, achievlist, setAchievlist, data, reviewlist, addReview, removeReview, submit, setSubmit, ongoing, setOngoing }) => {
    
    const [resultdata, setresult] = useState([]);
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
                like: 0,
                photourl: imgs()
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
                like: 0,
                photourl: imgs()
            });
        }
    }
    
    const imgs = () => {
        const res = [];
        for (let j = 0; j < achievlist.length; j++) {
            if (achievlist[j]['isCompleted']) {
                res.push(achievlist[j]['photourl']);
            }
        }
        console.log(res);
        return res;
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

    let result=[];
    console.log(activityname);
    console.log(docId);


    useEffect(() => {

    let snapshot = db.collection('Activities').doc(docId);
    snapshot.get().then((doc => {
            if(activityname == doc.data().name){
                result.push({ 
                    description : doc.get("description"),
                    Communities : doc.get("Communities"),
                    imgs : doc.get("imgs"),
                    requirements : doc.get("requirements"),
                    videos : doc.get("videos")
                });
            }
            console.log(result[0])
            setresult(result);
            
            
        }))
    }, []);




    if(resultdata[0] != undefined){
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
                <ListGroup.Item><img src={ resultdata[0].imgs[0].src} class="AIP-images-img"></img></ListGroup.Item>
                    <ListGroup.Item><img src={ resultdata[0].imgs[1].src} class="AIP-images-img"></img></ListGroup.Item>
                    <ListGroup.Item><img src={ resultdata[0].imgs[2].src} class="AIP-images-img"></img></ListGroup.Item>
                </ListGroup>
            </div>
            <div id="AIP-videos" style={{ marginTop: '30px' }}>
                <h2>Videos</h2>
                <div id="AIP-videos-youtube">
                <iframe width="560" height="315" src={resultdata[0].videos[0].src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            <div id="AIP-description" style={{ marginTop: '30px' }}>
                <div style={{width:'100%', display:'inline-block'}}>
                    <h2 style={{float:'left'}}>Description</h2>
                    <Button id="AIP-edit-button" variant="success" onClick={clickReview} disabled={!ongoing}><FontAwesomeIcon icon={faEdit} style={{marginRight: "10px"}}/>Edit Description</Button>
                </div>
                <div class="AIP-article">
                {resultdata[0].description.text}
                </div>
                <a target="_blank" href={resultdata[0].description.links[0].src} class="AIP-article">{resultdata[0].description.links[0].title}</a>
                <a target="_blank" href={resultdata[0].description.links[1].src} class="AIP-article">{resultdata[0].description.links[1].title}</a>
            </div>
            <div id="AIP-requirments" style={{ marginTop: '30px' }}>
                <div style={{width:'100%', display:'inline-block'}}>
                    <h2 style={{float:'left'}}>Requirments</h2>
                    <Button id="AIP-edit-button" variant="success" onClick={clickReview} disabled={!ongoing}><FontAwesomeIcon icon={faEdit} style={{marginRight: "10px"}}/>Edit Requirments</Button>
                </div>
                <div class="AIP-article">{resultdata[0].requirements[0]}</div>
                <div class="AIP-article">{resultdata[0].requirements[1]}</div>
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
                                return <Review isPositive={true} isMe={true} name={review['name']} years={review['years']} achiev={review['achiev']} content={review['content']} data={review['data']} like={review['like']} photourl={imgs()} clickReview={clickReview} clickRemove={clickRemove}/>
                            }
                            else {
                                return <Review isPositive={true} isMe={false} name={review['name']} years={review['years']} achiev={review['achiev']} content={review['content']} data={review['data']} like={review['like']} photourl={review['photourl']}/>
                            }
                        }  
                    })}
                </div>
                <h3>Negative Opinions</h3>
                <div id="MMP-reviews-negative">
                    {/*issignedin => like button*/}
                    {reviewlist.map(review => {
                        if (!review['isPositive']) {
                            if (review['isMe']){
                                return <Review isPositive={false} isMe={true} name={review['name']} years={review['years']} achiev={review['achiev']} content={review['content']} data={review['data']} like={review['like']} photourl={imgs()} clickReview={clickReview} clickRemove={clickRemove}/>
                            }
                            else {
                                return <Review isPositive={false} isMe={false} name={review['name']} years={review['years']} achiev={review['achiev']} content={review['content']} data={review['data']} like={review['like']} photourl={review['photourl']}/>
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
                <a target="_blank" href={resultdata[0].Communities.link[0].src} class="AIP-article">{resultdata[0].Communities.link[0].title}</a>
                <a target="_blank" href={resultdata[0].Communities.link[1].src} class="AIP-article">{resultdata[0].Communities.link[1].title}</a>
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
                            <td>{resultdata[0].Communities.table[0].ClubName}</td>
                            <td>{resultdata[0].Communities.table[0].Region}</td>
                            <td>{resultdata[0].Communities.table[0].Contact}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>{resultdata[0].Communities.table[1].ClubName}</td>
                            <td>{resultdata[0].Communities.table[1].Region}</td>
                            <td>{resultdata[0].Communities.table[1].Contact}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>{resultdata[0].Communities.table[2].ClubName}</td>
                            <td>{resultdata[0].Communities.table[2].Region}</td>
                            <td>{resultdata[0].Communities.table[2].Contact}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
else return (<div>
    Can't find page
    </div>
    )
}

export default InfoDocument;