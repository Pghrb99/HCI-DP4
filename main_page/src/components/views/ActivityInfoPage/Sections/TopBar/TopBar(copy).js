import React, {useState} from 'react'
import { Nav, Modal, Button } from 'react-bootstrap'
import Tags from '../../../TagSearchResultPage/Sections/Tags/Tags'
import './TopBar.scss'
import bg from '../imgs/hockey_world_1400.png'

// 새로운 horibar, progressdocument 만들어야 함

const TopBar = ({ tags, isSignedIn, name }) => {
    const [start, setStart] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [ongoing, setOngoing] = useState(false);
    const [isInfo, setIsInfo] = useState(true);
    
    const clickStart = () => setStart(true);
    const clickSYes = () => {
        setOngoing(true);
        setStart(false);
    }
    const clickSNo = () => setStart(false);

    const clickCancel = () => setCancel(true);
    const clickCYes = () => {
        setOngoing(false);
        setCancel(false);
    }
    const clickCNo = () => setCancel(false);

    const clickSeeProgress = () => {
        setTimeout(function() {
            setIsInfo(false);
        }, 300)
    }
    const clickSeeInfo = () => {
        setTimeout(function() {
            setIsInfo(true);
        }, 300)
    }

    return (
        <div id="AIP-nav-container" style={{backgroundImage: `url(${bg})`}}>
            {isInfo && <span id="AIP-label">Activity Information</span>}
            {!isInfo && <span id="AIP-label">My Progress</span>}
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
            <div className="align-self-center" id="AIP-activity-name">
                Ice Hockey
            </div>
            <div className="align-self-start" id="AIP-tags">
                <div id="AIP-reltags">
                    <span >Related tags : </span>
                    <Tags tags={tags} />
                </div>
                { !ongoing && <Button id="AIP-topbar-button" onClick={clickStart}>Start!</Button> }
                { ongoing && <Button variant='secondary' id='AIP-topbar-button' onClick={clickCancel}>Ongoing | X</Button> }
                { ongoing && isInfo && <Button variant='info' id='AIP-topbar-button' onClick={clickSeeProgress}>See Progress</Button> }
                { ongoing && !isInfo && <Button variant='info' id='AIP-topbar-button' onClick={clickSeeInfo}>See Info</Button> }
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
                <Modal show={cancel} onHide={clickCNo}>
                    <Modal.Header closeButton>
                        <Modal.Title id="AIP-modal-title">Cancel Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to cancel?</Modal.Body>
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
