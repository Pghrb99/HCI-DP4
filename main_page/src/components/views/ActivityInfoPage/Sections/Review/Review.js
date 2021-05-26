import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, Modal } from 'react-bootstrap';
import './Review.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as solidthumbsup, faImages, faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { faThumbsUp as regularthumbsup } from "@fortawesome/free-regular-svg-icons";
import ProgressDocument from 'components/views/MyProgressPage/Sections/ProgressDocument/ProgressDocument';
import { LeftCircleFilled } from '@ant-design/icons';
import {firebase, db} from 'firebase.js';
import { useAuth } from 'contexts/AuthContext'

const Review = ({ reviewId, docId, isPositive, isMe, name, years, achiev, content, data, like, photourl, clickReview, clickRemove }) => {
    const [numOfLike, setNumOfLike] = useState(like);
    const [images, setImages] = useState(false);
    const [isthumb, setIsThumb] = useState(false);
    const {currentUser} = useAuth();

    useEffect(() => {
        const reviewRef = db.collection("Activities").doc(docId).collection("Reviews").doc(reviewId);
        reviewRef.get().then((reviewDoc) => {
            console.log(reviewDoc.get('achiev'));
            if(currentUser && reviewDoc.get("likeUsers").includes(currentUser.email)) {
                setIsThumb(reviewDoc.get('likeUsers').includes(currentUser.email));
            }
        });
    }, []);

    const clickLike = (event) => {
        if (currentUser) {
            const reviewRef = db.collection("Activities").doc(docId).collection("Reviews").doc(reviewId);
            if (!event.currentTarget.className.includes("MMP-numOfLike")) {
                reviewRef.update({
                    like: firebase.firestore.FieldValue.increment(1),
                    likeUsers: firebase.firestore.FieldValue.arrayUnion(currentUser.email)
                });
                event.currentTarget.className += " MMP-numOfLike";
                setNumOfLike(numOfLike + 1);
                setIsThumb(true);
            }
            else {
                reviewRef.update({
                    like: firebase.firestore.FieldValue.increment(-1),
                    likeUsers: firebase.firestore.FieldValue.arrayRemove(currentUser.email)
                });
                event.currentTarget.className = "AIP-reviews-likes"
                setNumOfLike(numOfLike - 1);
                setIsThumb(false);
            }
        }
    }

    const clickImages = () => {
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
                            <div className="AIP-reviews-likes MMP-numOfLike" onClick={clickLike}><FontAwesomeIcon icon={solidthumbsup} /><span> {numOfLike}</span></div>
                            :
                            <div className="AIP-reviews-likes" onClick={clickLike}><FontAwesomeIcon icon={regularthumbsup} /><span> {numOfLike}</span></div>
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
