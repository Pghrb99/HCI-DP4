import React, { useState } from 'react'
import { Nav, Modal, Button, Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Tags from '../../../TagSearchResultPage/Sections/Tags/Tags'
import './TopBar.scss'
import bg from '../imgs/hockey_world_1400.png'

// 페이지 넘어갈 때마다 ongoing 정보 그대로 전달해줘야 함(prop 사용...?)

const TopBar = ({ tags, isSignedIn, name }) => {
    const [start, setStart] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [ongoing, setOngoing] = useState(false);
    
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

    return (
        <div id="AIP-nav-container" style={{backgroundImage: `url(${bg})`}}>
            <Pagination id="AIP-label">
                <Pagination.Item id="AIP-info-label" variant="success" active={true}>Activity Information</Pagination.Item>
                <Pagination.Item id="AIP-prog-label" variant="success" active={false}><Link to={"/myprogress"} style={{color: "rgb(77, 163, 77)"}}>My Progress</Link></Pagination.Item>
                {/*{(isSignedIn && ongoing) ?
                    <Pagination.Item id="AIP-prog-label" active={false}><Link to={"/myprogress"} style={{color: "rgb(77, 163, 77)"}}>My Progress</Link></Pagination.Item>
                    :
                    <Pagination.Item id="AIP-prog-label" active={false} disabled><Link to={"/myprogress"} style={{color: "rgb(77, 163, 77)"}}>My Progress</Link></Pagination.Item>
                }*/}
            </Pagination>
            <div className="align-self-end">
                {isSignedIn ?
                    <Nav className="mt-3">
                        <Nav.Link className="mr-4"><span className="nav-text" id="nav-userName">{name}</span></Nav.Link>
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
                Ice Hockey
            </div>
            <div className="align-self-start" id="AIP-tags">
                <div id="AIP-reltags">
                    <span >Related tags : </span>
                    <Tags tags={tags} />
                </div>
                { !ongoing && <Button id="AIP-topbar-button" onClick={clickStart}>Start!</Button> }
                { ongoing && <Button variant='secondary' id='AIP-topbar-button' onClick={clickCancel}>Ongoing | X</Button> }
                <Modal show={start} onHide={clickSNo}>
                    <Modal.Header closeButton>
                        <Modal.Title id="AIP-modal-title">Start Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{fontFamily:'arial', color:'black', fontSize:'18px', marginLeft:"0"}}>Are you sure you want to start?</p>
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
