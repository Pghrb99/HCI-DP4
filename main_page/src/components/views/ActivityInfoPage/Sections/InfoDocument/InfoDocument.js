import React, { useState, useEffect } from 'react';
import { ListGroup, Badge, Button, ButtonGroup, ToggleButton, Table, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import './InfoDocument.scss';
import Review from '../Review/Review'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faInfo, faChevronCircleDown, faChevronCircleUp, faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { db } from 'firebase.js'
import { UndoOutlined } from '@material-ui/icons';
import { useAuth } from 'contexts/AuthContext'

const InfoDocument = ({ userName, isSignedIn, docId, achievlist, submit, setSubmit, ongoing }) => {
    const username = userName;
    const {currentUser}  = useAuth();
    const [countend, setend] = useState(0);
    const [currentDoc, setCurrentDoc] = useState();
    const [review, setReview] = useState(false);
    const [achievement, setAchievements] = useState(false);
    const [reviewlist, setReviewlist] = useState([]);
    const [text, setText] = useState(""); // useState(submit ? reviewlist[0]['content'] : "");
    const [achivetext1, setachivetext1] = useState(" ");
    const [achivetext2, setachivetext2] = useState(" ");
    const [recommend, setRecommend] = useState(true); // useState(submit ? reviewlist[0]['isPositive'] : true);
    const [range, setRange] = useState([5, 5, 5, 5, 5]); // useState(submit ? reviewlist[0]['data'] : [5, 5, 5, 5, 5]);
    const [remove, setRemove] = useState(false);
    const [more, setMore] = useState(false);
    const [numInfo, setNumInfo] = useState(false);




    useEffect(() => {
        db.collection("Activities").doc(docId).onSnapshot((doc) => {
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

        db.collection("Activities").doc(docId).collection('Reviews').onSnapshot((querySnapshot) => {
            const name = currentUser ? currentUser.displayName : "";
            const tempReviewList = [];
            querySnapshot.forEach((reviewDoc) => {
                tempReviewList.push({
                    isPositive: reviewDoc.get('isPositive'),
                    name: reviewDoc.get('name'),
                    days: reviewDoc.get('days'),
                    achiev: reviewDoc.get('achiev'),
                    content: reviewDoc.get('content'),
                    data: reviewDoc.get('data'),
                    like: reviewDoc.get('like'),
                    likeUsers: reviewDoc.get('likeUsers'),
                    photourl: reviewDoc.get('photourl'),
                    reviewId: reviewDoc.id
                });
                if(reviewDoc.get('name') == name) {
                    setSubmit(true);
                    setText(reviewDoc.get('content'));
                    setRecommend(reviewDoc.get('isPositive'));
                    setRange(reviewDoc.get('data'));
                }
            });
            setReviewlist(tempReviewList);
        });
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
        db.collection('UserInfo').doc(username).get().then((doc) => {
            const name = doc.get("name");
            db.collection('UserInfo').doc(username).collection('Activities').doc(docId).get().then((doc) => {
                const startTime = doc.get("startTime").toDate()
                const rev = {
                    isPositive: recommend,
                    name: name,
                    days: Math.round((new Date().getTime() - startTime.getTime())/(1000*60*60*24)),
                    achiev: calculateCompleted(),
                    content: text,
                    data: range,
                    like: 0,
                    likeUsers: [],
                    photourl: imgs()
                };
                db.collection('Activities').doc(docId).collection('Reviews').add(rev);
                const docRef = db.collection('Activities').doc(docId);
                return db.runTransaction((transaction) => {
                    return transaction.get(docRef).then((doc) => {
                        const newNumOfReviews = doc.get("numOfReviews") + 1;
                        const oldNumericsTotal = 
                            [0,1,2,3,4].map((index) => doc.get("numerics")[index]*doc.get("numOfReviews"));
                        const newNumerics = oldNumericsTotal.map((x, index) => (x+range[index])/newNumOfReviews);
                        transaction.update(docRef, {
                            numOfReviews: newNumOfReviews,
                            numerics: newNumerics
                        });
                    })
                })
            })
        })

    }

    const removeReview = () => {
        db.collection('UserInfo').doc(username).get().then((doc) => {
            const name = doc.get("name");
            db.collection('Activities').doc(docId).collection('Reviews').where('name', '==', name)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((reviewDoc) => reviewDoc.ref.delete())
            });
            const docRef = db.collection('Activities').doc(docId);
            return db.runTransaction((transaction) => {
                return transaction.get(docRef).then((doc) => {
                    const newNumOfReviews = doc.get("numOfReviews") - 1;
                    if (newNumOfReviews <= 0) {
                        transaction.update(docRef, {
                            numOfReviews: 0,
                            numerics: [0, 0, 0, 0, 0]
                        });
                        return;
                    }
                    const oldNumericsTotal = [0,1,2,3,4].map((index) => doc.get("numerics")[index]*doc.get("numOfReviews"));
                    const newNumerics = oldNumericsTotal.map((x, index) => (x-range[index])/newNumOfReviews);
                    transaction.update(docRef, {
                        numOfReviews: newNumOfReviews,
                        numerics: newNumerics
                    });
                })
            })
        })
    }

    const updateReview = () => {
        db.collection('UserInfo').doc(username).get().then((doc) => {
            const name = doc.get("name");
            db.collection('UserInfo').doc(username).collection('Activities').doc(docId).get().then((doc) => {
                const startTime = doc.get("startTime").toDate();
                db.collection('Activities').doc(docId).collection('Reviews').where('name', '==', name)
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.update({
                            isPositive: recommend,
                            content: text,
                            data: range,
                            days: Math.round((new Date().getTime() - startTime.getTime())/(1000*60*60*24)),
                        });
                    });
                    const docRef = db.collection('Activities').doc(docId);
                    return db.runTransaction((transaction) => {
                        return transaction.get(docRef).then((doc) => {
                            const oldNumerics = doc.get("numerics");
                            const oldNumericsTotal = [0,1,2,3,4].map((index) => doc.get("numerics")[index]*doc.get("numOfReviews"));
                            const newNumerics = oldNumericsTotal.map((x, index) => 
                                (x-oldNumerics[index]+range[index])/doc.get("numOfReviews"));
                            transaction.update(docRef, {
                                numerics: newNumerics
                            });
                        })
                    })
                })
            });
        });
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

    const clickAchievement = () => {
        setAchievements(true);
    }
    const clickAchievements = () => {
        if(achivetext1 != " "){
            let achivdata = {
                name : achivetext1,
                explain : achivetext2,
                isCompleted : false,
                isSelected : false,
                photourl : ""
            }
            db.collection('Activities').doc(docId).collection('Achievements').doc().set(achivdata);
            }

    setAchievements(false);

    }
    const clickAchNo = () => {
        setAchievements(false);
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

    const clickNumInfo = () => setNumInfo(true);

    const clickINo = () => setNumInfo(false);

    if (isSignedIn) {
        let tempcountend = 0;
        (async () => {
            let snapshot3 = db.collection('UserInfo').doc(username).collection('Activities');
            const snapshot2 = await snapshot3.get();
            snapshot2.forEach(doc => {
                if (typeof currentDoc != 'undefined') {
                    if (doc.data().name == currentDoc.name) {
                        if (doc.get("achievement").length != 0) {
                            for (let i = 0; i < doc.get("achievement").length; i++) {
                                if (doc.get("achievement")[i].finish == true) {
                                    tempcountend++;
                                }
                            }
                            setend(tempcountend);
                        }
                    }
                }

            })
        })();
    }

    if (typeof currentDoc != 'undefined') {
        return (
            <div id="infodocument">
                <div id="AIP-numerics">
                    <div style={{ width: '100%', display: 'inline-block' }}>
                        <h2 style={{ float: 'left' }}>Numerics</h2>
                        <Button id="AIP-numerics-info" variant="success" onClick={clickNumInfo}><FontAwesomeIcon icon={faInfo} style={{ marginRight: "10px" }} />Numerics Information</Button>
                    </div>
                    <Modal size='lg' show={numInfo} onHide={clickINo}>
                        <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom: '5px' }}>
                            <Modal.Title>More information about numerics</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '5px', paddingBottom: '0' }}>
                            <p style={{ fontFamily: 'arial', color: 'black', fontSize: '20px', fontWeight: '600', paddingTop: '15px', marginLeft: '20px', marginRight: '20px' }}>Easy to start</p>
                            <p style={{ fontFamily: 'arial', color: 'black', fontSize: '16px', marginLeft: '20px', marginRight: '20px' }}>It means difficulty of learning the activity. To be specific, an activity which everyone can learn and master in a few hours would has 10 for this figure. (e.g. Walking) In contrast, an activity which is very hard to learn would has 0 for this figure. (e.g. Boxing)</p>
                            <p style={{ fontFamily: 'arial', color: 'black', fontSize: '20px', fontWeight: '600', marginLeft: '20px', marginRight: '20px' }}>Cost-effective</p>
                            <p style={{ fontFamily: 'arial', color: 'black', fontSize: '16px', marginLeft: '20px', marginRight: '20px' }}>It means the amount of money expected to spend in order to have requirements and lessons. To be specific, an activity which does not have any requirement would has 10 for this figure. (e.g. Morning gym) In contrast, an activity which has a very expensive requirement would has 0 for this figure. (e.g. Horse riding)</p>
                            <p style={{ fontFamily: 'arial', color: 'black', fontSize: '20px', fontWeight: '600', marginLeft: '20px', marginRight: '20px' }}>Schedule-flexible</p>
                            <p style={{ fontFamily: 'arial', color: 'black', fontSize: '16px', marginLeft: '20px', marginRight: '20px' }}>It means how much time spend while doing the activity. To be specific, an activity which a user can do anytime would has 10 for this figure. (e.g. Jogging) In contrast, an activity which takes long travel times and activity time would has 0 for this figure. (e.g. Climbing real cliff)</p>
                            <p style={{ fontFamily: 'arial', color: 'black', fontSize: '20px', fontWeight: '600', marginLeft: '20px', marginRight: '20px' }}>Safe</p>
                            <p style={{ fontFamily: 'arial', color: 'black', fontSize: '16px', marginLeft: '20px', marginRight: '20px' }}>It means the safety of the activity. To be specific, an activity which has almost zero probability of getting hurt would has 10 for this figure. (e.g. Yoga) In contrast, an activity which makes a user injured very easily would has 0 for this figure. (e.g. Base jumping)</p>
                            <p style={{ fontFamily: 'arial', color: 'black', fontSize: '20px', fontWeight: '600', marginLeft: '20px', marginRight: '20px' }}>Good for health</p>
                            <p style={{ fontFamily: 'arial', color: 'black', fontSize: '16px', marginLeft: '20px', marginRight: '20px' }}>It means how much the activity is good for health. To be specific, an activity which must make people healthy would has 10 for this figure. (e.g. Pilates) In contrast, an activity which actually not good for health would has 0 for this figure. (e.g. Billiards)</p>
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '0', paddingBottom: '10px' }}>
                            <Button variant="secondary" onClick={clickINo}>
                                Close
                                </Button>
                        </Modal.Footer>
                    </Modal>
                    <ListGroup id="AIP-numerics-list" horizontal>
                        <ListGroup.Item>
                            <OverlayTrigger placement="top" overlay={<Tooltip>{"Boxing < Walking"}</Tooltip>}>
                                <div class="AIP-numerics-subtitle">Easy to start</div>
                            </OverlayTrigger>
                            <div class="AIP-numerics-numbers">{currentDoc.numerics[0].toFixed(1)} / 10</div>
                            <div class="AIP-numerics-radius"></div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <OverlayTrigger placement="top" overlay={<Tooltip>{"Badminton < Horse riding"}</Tooltip>}>
                                <div class="AIP-numerics-subtitle">Cost-effective</div>
                            </OverlayTrigger>
                            <div class="AIP-numerics-numbers">{currentDoc.numerics[1].toFixed(1)} / 10</div>
                            <div class="AIP-numerics-radius"></div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <OverlayTrigger placement="top" overlay={<Tooltip>{"Climbing Everest < Jogging"}</Tooltip>}>
                                <div class="AIP-numerics-subtitle">Schedule-flexible</div>
                            </OverlayTrigger>
                            <div class="AIP-numerics-numbers">{currentDoc.numerics[2].toFixed(1)} / 10</div>
                            <div class="AIP-numerics-radius"></div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <OverlayTrigger placement="top" overlay={<Tooltip>{"Bullfighting < Yoga"}</Tooltip>}>
                                <div class="AIP-numerics-subtitle">Safe</div>
                            </OverlayTrigger>
                            <div class="AIP-numerics-numbers">{currentDoc.numerics[3].toFixed(1)} / 10</div>
                            <div class="AIP-numerics-radius"></div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <OverlayTrigger placement="top" overlay={<Tooltip>{"Billiards < Pilates"}</Tooltip>}>
                                <div class="AIP-numerics-subtitle">Good for health</div>
                            </OverlayTrigger>
                            <div class="AIP-numerics-numbers">{currentDoc.numerics[4].toFixed(1)} / 10</div>
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
                        <Button id="AIP-edit-button" variant="success" onClick={clickAchievement} disabled={!ongoing || !isSignedIn}><FontAwesomeIcon icon={faEdit} style={{ marginRight: "10px" }} />Add Achievement</Button>
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
                                { ongoing &&
                                    <Button id="AIP-reviews-write" variant="success" onClick={clickReview}><FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "10px" }} />Modify your Review</Button>
                                }
                            </div>
                            :
                            <Button id="AIP-reviews-write" variant="success" onClick={clickReview} disabled={!ongoing || !isSignedIn}><FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "10px" }} />Write a Review</Button>
                        }
                        {/*ongoing disabled*/}
                    </div>
                    <Modal show={achievement} onHide={clickAchNo}>
                        <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom: '5px' }}>
                            {
                                <Modal.Title>Add new achievement</Modal.Title>
                            }
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '5px', paddingBottom: '0' }}>
                            <Form style={{ marginLeft: '20px', marginRight: '20px' }}>
                                <Form.Group controlId="MMP-text">
                                    <Form.Label id="MMP-reviews-formlabel">Achievement Name(Title)</Form.Label>
                                    <Form.Control as="input" value={achivetext1} onChange={e => { setachivetext1(e.target.value)}} />
                                    <Form.Label id="MMP-reviews-formlabel">Achievement Explain</Form.Label>
                                    <Form.Control as="input" value={achivetext2} onChange={e => { setachivetext2(e.target.value)}} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '0', paddingBottom: '10px' }}>
                            <Button variant="primary" onClick={clickAchievements}>
                                Submit
                        </Button>
                            <Button variant="danger" onClick={clickAchNo}>
                                Cancel
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={review} onHide={clickRNo}>
                        <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom: '5px' }}>
                            {submit ?
                                <Modal.Title>Modify your Review</Modal.Title>
                                :
                                <Modal.Title>Write a Review</Modal.Title>
                            }
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '5px', paddingBottom: '0' }}>
                            <Form style={{ marginLeft: '20px', marginRight: '20px' }}>
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
                        <Modal.Footer style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '0', paddingBottom: '10px' }}>
                            <Button variant="primary" onClick={clickRYes}>
                                Submit
                        </Button>
                            <Button variant="danger" onClick={clickRNo}>
                                Cancel
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={remove} onHide={clickXNo}>
                        <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom: '5px' }}>
                            <Modal.Title>Remove your Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '5px', paddingBottom: '0' }}>
                            <p style={{ fontFamily: 'arial', color: 'black', fontSize: '20px', marginLeft: '20px', marginRight: '20px' }}>Are you sure you remove your review?</p>
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '0', paddingBottom: '10px' }}>
                            <Button variant="danger" onClick={clickXYes}>
                                Remove
                                </Button>
                            <Button variant="secondary" onClick={clickXNo}>
                                Cancel
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <h3>Positive Opinions</h3>
                        {!reviewlist.length ?
                        <div style={{margin: "30px 20px", fontSize: "20px", color: "grey"}}>There is no positive review.</div>
                        :
                        <div id="MMP-reviews-positive">
                            {reviewlist.map(rev => {
                                if (rev['isPositive']) {
                                    if (rev['name'] == username) {
                                        return <Review reviewId={rev['reviewId']} docId={docId} isPositive={true} isMe={true} name={rev['name']} days={rev['days']}  content={rev['content']} data={rev['data']} like={rev['like']} photourl={imgs()} clickReview={clickReview} clickRemove={clickRemove} />
                                    }
                                    else {
                                        return <Review reviewId={rev['reviewId']} docId={docId} isPositive={true} isMe={false} name={rev['name']} days={rev['days']}  content={rev['content']} data={rev['data']} like={rev['like']} photourl={rev['photourl']} />
                                    }
                                }
                            })}
                        </div>
                        }
                        <h3>Negative Opinions</h3>
                        {!reviewlist.length ?
                        <div style={{margin: "30px 20px", fontSize: "20px", color: "grey"}}>There is no negative review.</div>
                        :
                        <div id="MMP-reviews-negative">
                            {reviewlist.map(rev => {
                                if (!rev['isPositive']) {
                                    if (rev['name'] == username) {
                                        return <Review reviewId={rev['reviewId']} docId={docId} isPositive={false} isMe={true} name={rev['name']} days={rev['days']} achiev={rev['achiev']} content={rev['content']} data={rev['data']} like={rev['like']} photourl={imgs()} clickReview={clickReview} clickRemove={clickRemove} />
                                    }
                                    else {
                                        return <Review reviewId={rev['reviewId']} docId={docId} isPositive={false} isMe={false} name={rev['name']} days={rev['days']} achiev={rev['achiev']} content={rev['content']} data={rev['data']} like={rev['like']} photourl={rev['photourl']} />
                                    }    
                                }})
                            }
                        </div>
                        }
                </div>
                <div id="AIP-communities" style={{ marginTop: '30px' }}>
                    <div style={{ width: '100%', display: 'inline-block' }}>
                        <h2 style={{ float: 'left' }}>Communities</h2>
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