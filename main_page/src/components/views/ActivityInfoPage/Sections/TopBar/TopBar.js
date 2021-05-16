import React, {useState} from 'react'
import { Col } from 'react-bootstrap'
import { Nav, Modal, ModalHeader, Navbar, Form, FormControl, Button } from 'react-bootstrap'
import logo from '../imgs/logo.svg'
import Tags from '../../../TagSearchPage/Sections/Tags/Tags'
import './TopBar.scss'
import $ from 'jquery';


const TopBar = ({ tags, isSignedIn, name}) => {
    const [start, setStart] = useState(false);
    const [cancle, setCancle] = useState(false);
    const [ongoing, setOngoing] = useState(false);
    
    const clickStart = () => setStart(true);
    const clickSYes = () => {
        setOngoing(true);
        setStart(false);
    }
    const clickSNo = () => setStart(false);

    const clickCancle = () => setCancle(true);
    const clickCYes = () => {
        setOngoing(false);
        setCancle(false);
    }
    const clickCNo = () => setCancle(false);


    return (
        <div id="AIP-nav-container">
            <div className="align-self-end">
                {isSignedIn ?
                    <Nav className="mt-3">
                        <Nav.Link className="me-4"><span className="nav-text" id="nav-userName">{name}</span></Nav.Link>
                        <Nav.Link className="me-5"><span className="nav-text" id="nav-signOut">Sign Out</span></Nav.Link>
                    </Nav>
                    :
                    <Nav className="mt-3">
                        <Nav.Link className="me-4" href="/login"><span className="nav-text" id="nav-signIn" >Sign In</span></Nav.Link>
                        <Button
                            variant="outline-dark"
                            className="me-5"
                            href="/register"
                        > <span className="nav-text" id="nav-signUp">Sign Up</span>
                        </Button>
                    </Nav>
                }
            </div>
            <div className="align-self-center" id="search-result">
                Ice Hockey
            </div>
            <div className="align-self-start" id="AIP-tags">
                <div id="AIP-reltags">
                    <span >Related tags : </span>
                    <Tags tags={tags} />
                </div>
                { !ongoing && <Button id="AIP-start" onClick={clickStart}>Start!</Button> }
                { ongoing && <Button variant='secondary' id='AIP-ongoing' onClick={clickCancle}>Ongoing</Button> }
                <Modal show={start} onHide={clickSNo}>
                    <Modal.Header closeButton>
                        <Modal.Title id="AIP-modal-title">Start Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to start?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={clickSYes}>
                            Yes
                        </Button>
                        <Button variant="danger" onClick={clickSNo}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={cancle} onHide={clickCNo}>
                    <Modal.Header closeButton>
                        <Modal.Title id="AIP-modal-title">Cancle Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to cancle?</Modal.Body>
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
