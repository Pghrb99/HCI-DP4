import React, { useState } from 'react'
import { Nav, Modal, Button, Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Tags from '../../../TagSearchResultPage/Sections/Tags/Tags'
import './TopBar.scss'
import bg from '../imgs/hockey_world_1400.png'

const TopBar = ({ tags, isSignedIn, name }) => {
    const [cancel, setCancel] = useState(false);
    const [ongoing, setOngoing] = useState(false);

    const clickCancel = () => setCancel(true);
    const clickCYes = () => {
        setOngoing(false);
        setCancel(false);
    }
    const clickCNo = () => setCancel(false);

    return (
        <div id="MPP-nav-container" style={{ backgroundImage: `url(${bg})` }}>
            <Pagination id="MPP-label">
                <Pagination.Item id="MMP-info-label" variant="success" active={false}><Link to={"/info"} style={{color: "rgb(77, 163, 77)"}}>Activity Information</Link></Pagination.Item>
                <Pagination.Item id="MMP-prog-label" variant="success" active={true}>My Progress</Pagination.Item>
            </Pagination>
            <div className="align-self-end">
                {isSignedIn ?
                    <Nav className="mt-3">
                        <Nav.Link className="mr-4"><span className="nav-text" id="nav-userName">{name}</span></Nav.Link>
                        <Nav.Link className="mr-5"><span className="nav-text" id="nav-signOut">Sign Out</span></Nav.Link>
                    </Nav>
                    :
                    <Nav className="mt-3">
                        <Nav.Link className="mr-4"><span className="nav-text" id="nav-signIn" >Sign In</span></Nav.Link>
                        <Button
                            variant="outline-dark"
                            className="mr-5"
                        > <span className="nav-text" id="nav-signUp">Sign Up</span>
                        </Button>
                    </Nav>
                }
            </div>
            <div className="align-self-center" id="MPP-activity-name">
                Ice Hockey
            </div>
            <div className="align-self-start" id="MPP-tags">
                <div id="MPP-reltags">
                    <span >Related tags : </span>
                    <Tags tags={tags} />
                </div>
                <Button variant='secondary' id='MPP-topbar-button' onClick={clickCancel}>Ongoing | X</Button>
                {/* ongoing, see_info은 눌리면 activityinfopage로 이동*/}

                <Modal show={cancel} onHide={clickCNo}>
                    <Modal.Header closeButton>
                        <Modal.Title id="MPP-modal-title">Cancel Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{fontFamily:'arial', color:'black', fontSize:'18px', marginLeft:"0"}}>Are you sure you want to cancel?</p>
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
