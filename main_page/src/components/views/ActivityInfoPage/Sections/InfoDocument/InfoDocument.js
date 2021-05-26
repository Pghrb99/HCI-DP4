import React, { useState, useEffect } from 'react';
import { ListGroup, Badge, Button, ButtonGroup, ToggleButton, Table, Modal, Form } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import './InfoDocument.scss';
import Review from '../Review/Review'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faChevronCircleDown, faChevronCircleUp, faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { db } from 'firebase.js'
import { useAuth } from '../../../../../contexts/AuthContext'
import { UndoOutlined } from '@material-ui/icons';


const InfoDocument = ({ userName, isSignedIn, docId, achievlist, submit, setSubmit, ongoing }) => {
    const {currentUser} = useAuth();
    const username = userName;
    const [countend, setend] = useState(0);
    const [currentDoc, setCurrentDoc] = useState();
    const [review, setReview] = useState(false);
    const [reviewlist, setReviewlist] = useState([]);
    const [text, setText] = useState(""); // useState(submit ? reviewlist[0]['content'] : "");
    const [recommend, setRecommend] = useState(true); // useState(submit ? reviewlist[0]['isPositive'] : true);
    const [range, setRange] = useState([5, 5, 5, 5, 5]); // useState(submit ? reviewlist[0]['data'] : [5, 5, 5, 5, 5]);
    const [remove, setRemove] = useState(false);
    const [more, setMore] = useState(false);

    useEffect(() => {
        db.collection("Activities").doc(docId).get().then((doc) => {
            setCurrentDoc({
                imgs: doc.get("imgs"),
                videos: doc.get("videos"),
                description: doc.get("description"),
                requirements: doc.get("requirements"),
                numerics: doc.get("numerics"),
                communities: doc.get("communities"),
                name: doc.get("name"),
            });
        })

        let tempreviews = [];
        db.collection('Activities').doc(docId).collection('Reviews').get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                tempreviews.push({
                    isPositive: doc.get('isPositive'),
                    name: doc.get('name'),
                    years: doc.get('years'),
                    achiev: doc.get('achiev'),
                    content: doc.get('content'),
                    data: doc.get('data'),
                    like: doc.get('like'),
                    likeUsers: doc.get('likeUsers'),
                    photourl: doc.get('photourl')
                })
                if (doc.get('name') == username) {
                    setSubmit(true);
                    setText(doc.get('content'));
                    setRecommend(doc.get('isPositive'));
                    setRange(doc.get('data'));
                }
            })
            setReviewlist(tempreviews);
        })
    }, []);

    const calculateCompleted = () => {
        // var cnt = 0;
        // achievlist.forEach(achiev => {
        //     if (achiev['isCompleted']) {
        //         cnt++;
        //     }
        // });
        // return cnt;
        return countend;
    }

    const addReview = () => {
        const rev = {
            isPositive: recommend,
            name: username,
            years: 1,
            achiev: calculateCompleted(),
            content: text,
            data: range,
            like: 0,
            likeUsers: [],
            photourl: imgs()
        };
        db.collection('Activities').doc(docId).collection('Reviews').doc().set(rev);

        let tempreviews = [];
        db.collection('Activities').doc(docId).collection('Reviews').get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                tempreviews.push({
                    isPositive: doc.get('isPositive'),
                    name: doc.get('name'),
                    years: doc.get('years'),
                    achiev: doc.get('achiev'),
                    content: doc.get('content'),
                    data: doc.get('data'),
                    like: doc.get('like'),
                    likeUsers: doc.get('likeUsers'),
                    photourl: doc.get('photourl')
                })
            })
            setReviewlist(tempreviews);

        });
    }

    const removeReview = () => {
        let tempreviews = [];
        db.collection('Activities').doc(docId).collection('Reviews').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if (doc.get('name') == username) {
                    db.collection('Activities').doc(docId).collection('Reviews').doc(doc.id).delete();
                }
                else {
                    tempreviews.push({
                        isPositive: doc.get('isPositive'),
                        name: doc.get('name'),
                        years: doc.get('years'),
                        achiev: doc.get('achiev'),
                        content: doc.get('content'),
                        data: doc.get('data'),
                        like: doc.get('like'),
                        likeUsers: doc.get('likeUsers'),
                        photourl: doc.get('photourl')
                    })
                }
            })
            setReviewlist(tempreviews);
        })
    }

    const updateReview = () => {
        let tempreviews = [];
        let tempachiev = 0;
        db.collection('Activities').doc(docId).collection('Reviews').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if (doc.get('name') == username) {
                    tempachiev = calculateCompleted();
                    db.collection('Activities').doc(docId).collection('Reviews').doc(doc.id).delete();
                    const rev = {
                        isPositive: recommend,
                        name: username,
                        years: 1,
                        achiev: tempachiev,
                        content: text,
                        data: range,
                        like: 0,
                        likeUsers: [],
                        photourl: imgs()
                    };
                    tempreviews.push(rev)
                    db.collection('Activities').doc(docId).collection('Reviews').doc().set(rev);
                }
                else {
                    tempreviews.push({
                        isPositive: doc.get('isPositive'),
                        name: doc.get('name'),
                        years: doc.get('years'),
                        achiev: doc.get('achiev'),
                        content: doc.get('content'),
                        data: doc.get('data'),
                        like: doc.get('like'),
                        likeUsers: doc.get('likeUsers'),
                        photourl: doc.get('photourl')
                    })
                }
            })
            setReviewlist(tempreviews);
        })
    }

    const imgs = () => {
        const res = [];
        for (let j = 0; j < achievlist.length; j++) {
            if (achievlist[j]['isCompleted']) {
                res.push(achievlist[j]['photourl']);
            }
        }
        return res;
    }

    const clickReview = () => {
        setReview(true);
    }

    const clickRYes = () => {
        setSubmit(true);
        setReview(false);
        if (submit) {
            updateReview();
        }
        else {
            addReview();
        }
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

    const clickMore = () => {
        setMore(!more);
    }

    if(currentUser){
    let tempcountend =0;
    (async () => {
        let snapshot3 = db.collection('UserInfo').doc(userName).collection('Activities');
        const snapshot2 = await snapshot3.get();
        snapshot2.forEach(doc => {
            if(typeof currentDoc != 'undefined'){
            if(doc.data().name == currentDoc.name){
                if(doc.get("achievement").length != 0){
                for(let i=0; i<doc.get("achievement").length;i++){
                    if(doc.get("achievement")[i].finish == true){
                        tempcountend++;
                    }
                }
                setend(tempcountend);
            }}
        }
            
        })
        })(); 
    }



    if (typeof currentDoc != 'undefined') {
        return (
            <div id="infodocument">
                <div id="AIP-numerics">
                    <h2 >Numerics</h2>
                    <ListGroup id="AIP-numerics-list" horizontal>
                        <ListGroup.Item>
                            <div class="AIP-numerics-subtitle">Easy to start</div>
                            <div class="AIP-numerics-numbers">{currentDoc.numerics[0]} / 10</div>
                            <div class="AIP-numerics-radius"></div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div class="AIP-numerics-subtitle">Cost-effective</div>
                            <div class="AIP-numerics-numbers">{currentDoc.numerics[1]} / 10</div>
                            <div class="AIP-numerics-radius"></div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div class="AIP-numerics-subtitle">Schedule-flexible</div>
                            <div class="AIP-numerics-numbers">{currentDoc.numerics[2]} / 10</div>
                            <div class="AIP-numerics-radius"></div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div class="AIP-numerics-subtitle">Safe</div>
                            <div class="AIP-numerics-numbers">{currentDoc.numerics[3]} / 10</div>
                            <div class="AIP-numerics-radius"></div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div class="AIP-numerics-subtitle">Good for health</div>
                            <div class="AIP-numerics-numbers">{currentDoc.numerics[4]} / 10</div>
                            <div class="AIP-numerics-radius"></div>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                <div id="AIP-images" style={{ marginTop: '30px' }}>
                    <h2>Images</h2>
                    <ListGroup id="AIP-images-list" horizontal>
                        {currentDoc.imgs.map((img, index) =>
                            <ListGroup.Item key={index}>
                                <img src={img.src} alt={img.alt} class="AIP-images-img" />
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </div>
                <div id="AIP-videos" style={{ marginTop: '30px' }}>
                    <h2>Videos</h2>
                    <div id="AIP-videos-youtube">
                        <iframe width="560" height="315"
                            src={currentDoc.videos[0].src}
                            alt={currentDoc.videos[0].alt}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                        </iframe>
                    </div>
                </div>
                <div id="AIP-description" style={{ marginTop: '30px' }}>
                    <h2>Description</h2>
                    <div className="AIP-article">
                        {currentDoc.description.text}
                    </div>
                    {currentDoc.description.links.map((link, index) => {
                        return (
                            <a
                                key={index}
                                target="_blank"
                                href={link.src}
                                class="AIP-article">
                                {link.title}
                            </a>
                        )
                    })}
                </div>
                <div id="AIP-requirments" style={{ marginTop: '30px' }}>
                    <div style={{ width: '100%', display: 'inline-block' }}>
                        <h2 style={{ float: 'left' }}>Requirments</h2>
                        <Button id="AIP-edit-button" variant="success" onClick={clickReview} disabled={!ongoing && !isSignedIn}><FontAwesomeIcon icon={faEdit} style={{ marginRight: "10px" }} />Edit Requirments</Button>
                    </div>
                    <ul>
                    {currentDoc.requirements.map((content, index) => (
                        <li class="AIP-article">{content}</li>
                    ))}
                    </ul>
                    
                </div>

                    <div id="AIP-achievements" style={{ marginTop: '30px' }}>
                        <div style={{ width: '100%', display: 'inline-block' }}>
                            <h2 style={{ float: 'left' }}>Achievements</h2>
                            <Button id="AIP-edit-button" variant="success" onClick={clickReview} disabled={!ongoing && !isSignedIn}><FontAwesomeIcon icon={faEdit} style={{ marginRight: "10px" }} />Edit Achievements</Button>
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
                        <div style={{ textAlign: 'center' }}>
                            <Button id="AIP-achievements-more" variant="secondary" onClick={clickMore}><FontAwesomeIcon icon={more ? faChevronCircleUp : faChevronCircleDown} /></Button>
                        </div>
                    </div>
                    <div id="AIP-reviews" style={{ marginTop: '30px' }}>
                        <div style={{ width: '100%', display: 'inline-block' }}>
                            <h2 style={{ float: 'left' }}>Reviews</h2>
                            {submit ?
                                <div>
                                    <Button id="AIP-reviews-remove" variant="danger" onClick={clickRemove}><FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "10px" }} />Remove your Review</Button>
                                    <Button id="AIP-reviews-write" variant="success" onClick={clickReview}><FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "10px" }} />Modify your Review</Button>
                                </div>
                                :
                                <Button id="AIP-reviews-write" variant="success" onClick={clickReview} disabled={!ongoing && !isSignedIn}><FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "10px" }} />Write a Review</Button>
                            }
                            {/*ongoing disabled*/}
                        </div>
                        <Modal show={review} onHide={clickRNo}>
                            <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom:'5px'}}>
                                {submit ?
                                    <Modal.Title>Modify your Review</Modal.Title>
                                    :
                                    <Modal.Title>Write a Review</Modal.Title>
                                }
                            </Modal.Header>
                            <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '5px', paddingBottom: '0'}}>
                                <Form style={{marginLeft: '20px', marginRight: '20px'}}>
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
                                        <RangeSlider value={range[0]} max={10} step={1} variant='success' onChange={e => setRange([parseInt(e.target.value), range[1], range[2], range[3], range[4]])} />
                                        <Form.Label id="MMP-reviews-formlabel">Cost-effective</Form.Label>
                                        <RangeSlider value={range[1]} max={10} step={1} variant='success' onChange={e => setRange([range[0], parseInt(e.target.value), range[2], range[3], range[4]])} />
                                        <Form.Label id="MMP-reviews-formlabel">Schedule-flexible</Form.Label>
                                        <RangeSlider value={range[2]} max={10} step={1} variant='success' onChange={e => setRange([range[0], range[1], parseInt(e.target.value), range[3], range[4]])} />
                                        <Form.Label id="MMP-reviews-formlabel">Safe</Form.Label>
                                        <RangeSlider value={range[3]} max={10} step={1} variant='success' onChange={e => setRange([range[0], range[1], range[2], parseInt(e.target.value), range[4]])} />
                                        <Form.Label id="MMP-reviews-formlabel">Good for health</Form.Label>
                                        <RangeSlider value={range[4]} max={10} step={1} variant='success' onChange={e => setRange([range[0], range[1], range[2], range[3], parseInt(e.target.value)])} />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '0', paddingBottom: '10px'}}>
                                <Button variant="primary" onClick={clickRYes}>
                                    Submit
                        </Button>
                                <Button variant="danger" onClick={clickRNo}>
                                    Cancel
                        </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={remove} onHide={clickXNo}>
                            <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom:'5px'}}>
                                <Modal.Title>Remove your Review</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '5px', paddingBottom: '0'}}>
                                <p style={{fontFamily:'arial', color: 'black', fontSize:'20px', marginLeft:'20px', marginRight:'20px'}}>Are you sure you remove your review?</p>
                            </Modal.Body>
                            <Modal.Footer style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '0', paddingBottom: '10px'}}>
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
                            {reviewlist.map(rev => {
                                if (rev['isPositive']) {
                                    if (rev['name'] == username) {
                                        return <Review isPositive={true} isMe={true} name={rev['name']} years={rev['years']}  content={rev['content']} data={rev['data']} like={rev['like']} photourl={imgs()} clickReview={clickReview} clickRemove={clickRemove} />
                                    }
                                    else {
                                        return <Review isPositive={true} isMe={false} name={rev['name']} years={rev['years']}  content={rev['content']} data={rev['data']} like={rev['like']} photourl={rev['photourl']} />
                                    }
                                }
                            })}
                        </div>
                        <h3>Negative Opinions</h3>
                        <div id="MMP-reviews-negative">
                            {/*issignedin => like button*/}
                            {reviewlist.map(rev => {
                                if (!rev['isPositive']) {
                                    if (rev['name'] == username) {
                                        return <Review docId={docId} username={username} isPositive={false} isMe={true} name={rev['name']} years={rev['years']} achiev={rev['achiev']} content={rev['content']} data={rev['data']} like={rev['like']} photourl={imgs()} clickReview={clickReview} clickRemove={clickRemove} />
                                    }
                                    else {
                                        return <Review docId={docId} username={username} isPositive={false} isMe={false} name={rev['name']} years={rev['years']} achiev={rev['achiev']} content={rev['content']} data={rev['data']} like={rev['like']} photourl={rev['photourl']} />
                                    }
                                }
                            })}
                        </div>
                    </div>
                    <div id="AIP-communities" style={{ marginTop: '30px' }}>
                        <div style={{ width: '100%', display: 'inline-block' }}>
                            <h2 style={{ float: 'left' }}>Communities</h2>
                            <Button id="AIP-edit-button" variant="success" onClick={clickReview} disabled={!ongoing && !isSignedIn}><FontAwesomeIcon icon={faEdit} style={{ marginRight: "10px" }} />Edit Requirments</Button>
                        </div>
                        {currentDoc.communities.links.map((link, index) => (
                            <a
                                key={index}
                                target="_blank"
                                href={link.src}
                                class="AIP-article">
                                {link.title}
                            </a>
                        ))}
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
                                {currentDoc.communities.table.map(({ clubName, region, contact }, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{clubName}</td>
                                            <td>{region}</td>
                                            <td>{contact}</td>
                                        </tr>
                                    )
                                })}
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