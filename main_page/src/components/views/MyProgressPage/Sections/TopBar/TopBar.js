import React, { useState, useEffect } from 'react'
import { Nav, Modal, Button, Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ActivityTags from '../../../TagSearchResultPage/Sections/ActivityTags/ActivityTags'
import './TopBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import {db} from 'firebase.js';
import { useHistory } from 'react-router';
import { useAuth } from '../../../../../contexts/AuthContext'
import {firebase} from 'firebase.js';

const TopBar = ({ currentUser, docId}) => {    
    const history = useHistory();
    const [currentDoc, setCurrentDoc] = useState();
    const [activityName, setactivityName] = useState();
    const [cancel, setCancel] = useState(false);
    const [completebool, setcompletebool] = useState(false);
    const [ongoingbool, setongoingbool] = useState(false);

    useEffect(() => {

        db.collection("Activities").doc(docId).onSnapshot((doc) => {
            setactivityName(doc.get("name"))
        })
        if(currentUser){
            db.collection('UserInfo').doc(currentUser.email).collection('Activities').doc(docId).onSnapshot((doc) => {
                setongoingbool(doc.exists)
            })
            db.collection('UserInfo').doc(currentUser.email).collection('Activities').doc(docId).onSnapshot((doc) => {setcompletebool(doc.get("isComplete"))})
        }

        db.collection("Activities").doc(docId).get().then((doc) => {
            setCurrentDoc({
                name: doc.get("name"),
                tags: Object.keys(doc.get("tags")).map(x => ({name: x})),
                coverImg: doc.get("coverImg")
            })
        })
    }, []);

    const clickCancel = () => setCancel(true);

    const clickCYes = () => {
        (async () => {
            let actReffleft = db.collection('UserInfo').doc(currentUser.email).collection('Activities').doc(docId).collection('Achievements')
            const snapshot2 = await actReffleft.get();
                snapshot2.forEach(doc => {
                    console.log(doc.id)
                    db.collection('UserInfo').doc(currentUser.email).collection('Activities').doc(docId).collection('Achievements').doc(doc.id).delete();
            })
            db.collection('UserInfo').doc(currentUser.email).collection('Activities').doc(docId).delete();
        })();

        if(currentUser){
            const cityReffor11 = db.collection('Activities').doc(docId);
            cityReffor11.update({
                numOfUsers: firebase.firestore.FieldValue.increment(-1)
            });
        };  

        db.collection('UserInfo').doc(currentUser.email).collection('Activities').doc(docId).onSnapshot((doc) => {
            setongoingbool(doc.exists)
        })
        setCancel(false);
        history.push({
          pathname: '/info',
          state: {
            docId: docId
          }
        });
    }


    const clickCNo = () => setCancel(false);

    const sendHistory = () => {
        history.push({
          pathname: '/info',
          state: {
            docId: docId
          }
        });
    }
    const { logOut } = useAuth();
    async function handleLogout() {
        await logOut();
    }
    return (
        <div id="MPP-nav-container" style={currentDoc && {backgroundImage: `url(${currentDoc.coverImg.src})`}}>
            <div id="MPP-label">
            <span style={{marginRight:'10px', float:'left'}}>Page Radio Buttons</span>
            <Pagination variant="success">
                <Pagination.Item id="MMP-info-label" variant="success" active={false}><div onClick={sendHistory} style={{color: "rgb(77, 163, 77)"}}>Activity Information</div></Pagination.Item>
                <Pagination.Item id="MMP-prog-label" variant="success" active={true}>My Progress</Pagination.Item>
            </Pagination>
            </div>
            
            <div className="align-self-end">
                {currentUser ?
                    <Nav className="mt-3">
                        <Nav.Link className="mr-4"><Link to={"/mypage"}><span className="nav-text" id="nav-currentUser.email">{currentUser.email}</span></Link></Nav.Link>
                        <Nav.Link className="mr-5" ><span className="nav-text" id="nav-signOut" onClick={handleLogout}>Sign Out</span></Nav.Link>
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
                    {ongoingbool ?
                        currentDoc && <ActivityTags docId={docId} plusbutton={true}/>
                        :
                        currentDoc && <ActivityTags docId={docId} plusbutton={false}/>
                    }
                </div>
                {completebool ?
                    <Button variant='success' id='MPP-topbar-complete' active>Complete<FontAwesomeIcon icon={faCheck} style={{marginLeft:'10px'}}/></Button>
                    :
                    <Button variant='secondary' id='MPP-topbar-ongoing' onClick={clickCancel}>Ongoing<FontAwesomeIcon icon={faTimes} style={{marginLeft:'10px'}}/></Button>
                }
                <Modal show={cancel} onHide={clickCNo}>
                    <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom:'5px'}}>
                        <Modal.Title id="MPP-modal-title">Cancel Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '5px', paddingBottom: '0'}}>
                        <p style={{fontFamily:'arial', color: 'black', fontSize:'20px', marginLeft:'20px', marginRight:'20px'}}>Are you sure you want to cancel?</p>
                        <p style={{fontFamily:'arial', color: 'black', fontSize:'20px', marginLeft:'20px', marginRight:'20px'}}>(If you select 'Yes,' you can only remove your review)</p>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '0', paddingBottom: '10px'}}>
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
