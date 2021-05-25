import React, { useState, useEffect } from 'react'
import { Nav, Modal, Button, Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ActivityTags from '../../../TagSearchResultPage/Sections/ActivityTags/ActivityTags'
import './TopBar.scss'
import bg from '../imgs/hockey_world_1400.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import {db} from 'firebase.js';
import { useHistory } from 'react-router';

const TopBar = ({ userName, isSignedIn, docId, removeReview, submit, setSubmit, ongoing, setOngoing, complete, setComplete }) => {
    const history = useHistory();
    const [currentDoc, setCurrentDoc] = useState();
    
    const [cancel, setCancel] = useState(false)

    const clickCancel = () => setCancel(true);
    const clickCYes = () => {
        if (submit) {
            removeReview();
            setSubmit(false);
        }
        setOngoing(false);
        setCancel(false);
    }
    const clickCNo = () => setCancel(false);

    const clickComplete = () => setComplete(true);

    useEffect(() => {
        db.collection("Activities").doc(docId).get().then((doc) => {
            setCurrentDoc({
                name: doc.get("name"),
                tags: Object.keys(doc.get("tags")).map(x => ({name: x})),
                coverImg: doc.get("coverImg")
            })
        })
    }, []);

    const sendHistory = () => {
        history.push({
          pathname: '/info',
          state: {
            docId: docId
          }
        });
    }

    return (
        <div id="MPP-nav-container" style={{ backgroundImage: `url(${bg})` }}>
            <Pagination variant="success" id="MPP-label">
                <Pagination.Item id="MMP-info-label" variant="success" active={false}><div onClick={sendHistory} style={{color: "rgb(77, 163, 77)"}}>Activity Information</div></Pagination.Item>
                <Pagination.Item id="MMP-prog-label" variant="success" active={true}>My Progress</Pagination.Item>
            </Pagination>
            <div className="align-self-end">
                {isSignedIn ?
                    <Nav className="mt-3">
                        <Nav.Link className="mr-4"><span className="nav-text" id="nav-userName">{userName}</span></Nav.Link>
                        <Nav.Link className="mr-5"><span className="nav-text" id="nav-signOut">Sign Out</span></Nav.Link>
                    </Nav>
                    :
                    <Nav className="mt-3">
                        <Nav.Link className="mr-4"><Link to={"/login"}><span className="nav-text" id="nav-signIn" >Sign In</span></Link></Nav.Link>
                        <Link to={"/register"}><Button
                            variant="outline-dark"
                            className="mr-5"
                        > <span className="nav-text" id="nav-signUp">Sign Up</span>
                        </Button></Link>
                    </Nav>
                }
            </div>
            <div className="align-self-center" id="MPP-activity-name">
                {currentDoc && currentDoc.name}
            </div>
            <div className="align-self-start" id="MPP-tags">
                <div id="MPP-reltags">
                    <span >Related tags : </span>
                    {ongoing ?
                        currentDoc && <ActivityTags tags={currentDoc.tags} plusbutton={true}/>
                        :
                        currentDoc && <ActivityTags tags={currentDoc.tags} plusbutton={false}/>
                    }
                </div>
                {complete ?
                    <Button variant='success' id='MPP-topbar-complete' disabled style={{cursor:'default'}}>Complete<FontAwesomeIcon icon={faCheck} style={{marginLeft:'10px'}}/></Button>
                    :
                    <div>
                        <Button variant='success' id='MPP-topbar-complete' onClick={clickComplete}>Complete<FontAwesomeIcon icon={faCheck} style={{marginLeft:'10px'}}/></Button>
                        <Button variant='secondary' id='MPP-topbar-ongoing' onClick={clickCancel}>Ongoing<FontAwesomeIcon icon={faTimes} style={{marginLeft:'10px'}}/></Button>
                    </div>
                }
                
                {/* ongoing, see_info은 눌리면 activityinfopage로 이동*/}

                <Modal show={cancel} onHide={clickCNo}>
                    <Modal.Header closeButton>
                        <Modal.Title id="MPP-modal-title">Cancel Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{fontFamily:'arial', color:'black', fontSize:'18px', marginLeft:"0"}}>Are you sure you want to cancel?</p>
                        <p style={{fontFamily:'arial', color:'black', fontSize:'18px', marginLeft:"0"}}>(If you select 'Yes,' your review will be removed autometically.)</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={clickCYes}>
                            <Link to={"/info"} style={{color:"white"}}>Yes</Link>
                        </Button>
                        <Button variant="danger" onClick={clickCNo}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    )
}

export default TopBar
