import React, { useState, useEffect } from 'react'
import { Nav, Modal, Button, Pagination } from 'react-bootstrap';
import { Link} from "react-router-dom";
import ActivityTags from '../../../TagSearchResultPage/Sections/ActivityTags/ActivityTags'
import './TopBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import {db} from 'firebase.js';
import { useHistory } from 'react-router';

const TopBar = ({docId, isSignedIn, userName, removeReview, submit, setSubmit, ongoing, setOngoing, complete, setComplete}) => {
    const history = useHistory();
    const [currentDoc, setCurrentDoc] = useState();

    const [start, setStart] = useState(false);
    const [cancel, setCancel] = useState(false);
    
    const clickStart = () => setStart(true);
    const clickSYes = () => {
        setOngoing(true);
        setStart(false);
    }
    const clickSNo = () => setStart(false);

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
          pathname: '/myprogress',
          state: {
            docId: docId
          }
        });
    }

    return (
        <div id="AIP-nav-container" style={currentDoc && {backgroundImage: `url(${currentDoc.coverImg.src})`}}>
            <Pagination variant="success" id="AIP-label">
                <Pagination.Item id="AIP-info-label" variant="success" active={true}>Activity Information</Pagination.Item>
                <Pagination.Item id="AIP-prog-label" variant="success" active={false} disabled={!ongoing}><div onClick={sendHistory} style={{color: "rgb(77, 163, 77)"}}>My Progress</div></Pagination.Item>
                {/*isSignedIn && 추가 필요*/}
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
            <div className="align-self-center" id="AIP-activity-name">
                {currentDoc && currentDoc.name}
            </div>
            <div className="align-self-start" id="AIP-tags">
                <div id="AIP-reltags" style={{width:'50%'}}>
                    <span >Related tags : </span>
                    {ongoing ?
                        currentDoc && <ActivityTags docId={docId} plusbutton={true}/>
                        :
                        currentDoc && <ActivityTags docId={docId} plusbutton={false}/>
                    }
                </div>
                { !ongoing && <Button id="AIP-topbar-start" onClick={clickStart}>Start!</Button> }
                { ongoing && !complete && 
                    <div>
                        <Button variant='success' id='AIP-topbar-complete' onClick={clickComplete}>Complete<FontAwesomeIcon icon={faCheck} style={{marginLeft:'10px'}}/></Button>
                        <Button variant='secondary' id='AIP-topbar-ongoing' onClick={clickCancel}>Ongoing<FontAwesomeIcon icon={faTimes} style={{marginLeft:'10px'}}/></Button>
                    </div>
                }
                { ongoing && complete && <Button variant='success' id='AIP-topbar-complete' disabled style={{cursor:'default'}}>Complete<FontAwesomeIcon icon={faCheck} style={{marginLeft:'10px'}}/></Button>}
                <Modal show={start} onHide={clickSNo}>
                    <Modal.Header closeButton>
                        <Modal.Title>Start Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{fontFamily:'arial', color:'black', fontSize:'18px', marginLeft:"0"}}>Are you sure you want to start?</p>
                        <p style={{fontFamily:'arial', color:'black', fontSize:'18px', marginLeft:"0"}}>(If you want to cancel the activity, click the 'Ongoing' button which will be created.)</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={clickSYes}>
                            Yes
                        </Button>
                        <Button variant="danger" onClick={clickSNo}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={cancel} onHide={clickCNo}>
                    <Modal.Header closeButton>
                        <Modal.Title id="AIP-modal-title">Cancel Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{fontFamily:'arial', color:'black', fontSize:'18px', marginLeft:"0"}}>Are you sure you want to cancel?</p>
                        <p style={{fontFamily:'arial', color:'black', fontSize:'18px', marginLeft:"0"}}>(If you select 'Yes,' your review will be removed autometically.)</p>
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

        </div>
    )
}

export default TopBar
