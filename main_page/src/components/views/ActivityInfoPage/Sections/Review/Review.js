import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, Modal } from 'react-bootstrap';
import './Review.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as solidthumbsup, faImages, faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { faThumbsUp as regularthumbsup } from "@fortawesome/free-regular-svg-icons";
import ProgressDocument from 'components/views/MyProgressPage/Sections/ProgressDocument/ProgressDocument';
import { LeftCircleFilled } from '@ant-design/icons';
import {db} from 'firebase.js';

const Review = ({ docId, username, isPositive, isMe, name, years, achiev, content, data, like, photourl, clickReview, clickRemove }) => {
    const [ilikeit, setIlikeit] = useState(like);
    const [images, setImages] = useState(false);
    const [isthumb, setIsthumb] = useState(false);
    const [thumbsup, setThumbsup] = useState(regularthumbsup);
    // 나중에는 like 상속받아야 함

    useEffect(() => {
        db.collection("Activities").doc(docId).collection('Reviews').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if (doc.get('name') == name) {
                    setIsthumb(doc.get('likeUsers').includes(username));
                }
            })
        });
    }, []);

    const clickLike = (event) => {
        if (username != name) {
            if (!event.currentTarget.className.includes("MMP-ilikeit")) {
                db.collection('Activities').doc(docId).collection('Reviews').get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {                    
                        if (doc.get('name') == name) {
                            var likelist = doc.get('likeUsers');
                            likelist.push(username);
                            var map = {like: ilikeit+1, likeUsers: likelist};
                            db.collection('Activities').doc(docId).collection('Reviews').doc(doc.id).update(map);
                        }
                    })
                });
                event.currentTarget.className += " MMP-ilikeit";
                setIlikeit(ilikeit + 1);
                setIsthumb(true);
            }
            else {
                db.collection('Activities').doc(docId).collection('Reviews').get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        if (doc.get('name') == name) {
                            var likelist = [];
                            doc.get('likeUsers').forEach(user => {
                                if (user != username) {
                                    likelist.push(user);
                                }
                            });
                            var map = {like: ilikeit-1, likeUsers: likelist};
                            db.collection('Activities').doc(docId).collection('Reviews').doc(doc.id).update(map);
                        }
                    })
                });
                event.currentTarget.className = "AIP-reviews-likes"
                setIlikeit(ilikeit - 1);
                setIsthumb(false);
            }
        }
    }

    const clickImages = () => {
        console.log("hallo");
        if (photourl.length == 0) {
            alert("No Photo!");
        }
        else {
            setImages(true);
        }
    }

    const clickINo = () => setImages(false);

    return (
        <div class="AIP-reviews-component">
            <Card style={isPositive ? { backgroundColor: "#CBEDF4", border: "none" } : { backgroundColor: "#FFC6C6", border: "none" }}>
                <Card.Body>
                    <Card.Title>
                        <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: '10px' }} />
                        {isMe ?
                            <span style={{ textDecoration: "underline" }}>
                                {name}
                                <FontAwesomeIcon icon={faImages} onClick={clickImages} style={{ marginLeft: '30px', cursor: 'pointer' }} />
                                <FontAwesomeIcon icon={faPencilAlt} onClick={clickReview} style={{ marginLeft: '15px', cursor: 'pointer' }} />
                                <FontAwesomeIcon icon={faTrashAlt} onClick={clickRemove} style={{ marginLeft: '15px', cursor: 'pointer' }} />
                            </span>
                            :
                            <span style={{ textDecoration: "none" }}>
                                {name}
                                <FontAwesomeIcon icon={faImages} onClick={clickImages} style={{ marginLeft: '30px', cursor: 'pointer' }} />
                            </span>
                        }
                    </Card.Title>
                    <Card.Subtitle>{years} years, completed {achiev} achievements</Card.Subtitle>
                    <Card.Text style={{ marginLeft: "10px" }}>{content}</Card.Text>
                    <div>
                        <div class="AIP-reviews-points"><Badge variant="dark">Easy to start: {data[0]}</Badge></div>
                        <div class="AIP-reviews-points"><Badge variant="dark">Cost-effective: {data[1]}</Badge></div>
                        <div class="AIP-reviews-points"><Badge variant="dark">Schedule-flexible: {data[2]}</Badge></div>
                        <div class="AIP-reviews-points"><Badge variant="dark">Safe: {data[3]}</Badge></div>
                        <div class="AIP-reviews-points"><Badge variant="dark">Good for health: {data[4]}</Badge></div>
                        {isthumb ?
                            <div className="AIP-reviews-likes MMP-ilikeit" onClick={clickLike}><FontAwesomeIcon icon={solidthumbsup} /><span> {ilikeit}</span></div>
                            :
                            <div className="AIP-reviews-likes" onClick={clickLike}><FontAwesomeIcon icon={regularthumbsup} /><span> {ilikeit}</span></div>
                        }
                    </div>
                </Card.Body>
            </Card>
            <Modal size='lg' show={images} onHide={clickINo} scrollable={true}>
                <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom:'5px'}}>
                    <Modal.Title>Images</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '5px', paddingBottom: '0'}}>
                    <div id="review-photo-container">
                        {photourl.map(photo => {
                            return (<img src={photo} style={{width:'90%'}}></img>);
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '0', paddingBottom: '10px'}}>
                        <Button variant="secondary" onClick={clickINo}>
                            Close
                        </Button>
                    </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Review
