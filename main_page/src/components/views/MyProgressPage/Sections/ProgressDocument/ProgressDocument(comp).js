import React from 'react';
import { ProgressBar, ListGroup, Badge, Modal, Button, Form} from 'react-bootstrap'
import './ProgressDocument.scss';
import $ from 'jquery';
import Review from '../../../ActivityInfoPage/Sections/Review/Review';
// import bsCustomFileInput from 'bs-custom-file-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

class ProgressDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prove: false,
            cancel: false,
            completed: 0,
            fileName: "Upload a photo"
        }
        /*
        const [prove, setProve] = useState(false);
        const [cancel, setCancel] = useState(false);
        const [attain, setAttain] = useState(false);
        const [completed, setCompleted] = useState(0);
        const total = 7;
        const percent = (completed / total * 100).toFixed(2);*/
    }


    clickLabel = (event) => {
        event.currentTarget.className += " MMP-temp";
        if (!event.currentTarget.className.includes("MMP-success")) {
            this.setState(() => { return { prove: true }; });
        }
        else {
            event.currentTarget.className += " MMP-temp";
            this.setState(() => { return { cancel: true }; });
        }
    }

    clickPYes = () => {
        $(".MMP-temp").attr('class', "badge badge-secondary MMP-success");
        this.setState(() => { return { completed: this.state.completed + 1 }; });
        this.setState(() => { return { prove: false }; });
    }

    clickPNo = () => {
        $(".MMP-temp").attr('class', "badge badge-secondary");
        this.setState(() => { return { prove: false }; });
    }

    clickCYes = () => {
        $(".MMP-temp").attr('class', "badge badge-secondary");
        this.setState(() => { return { completed: this.state.completed - 1 }; });
        this.setState(() => { return { cancel: false }; });
    }

    clickCNo = () => {
        $(".MMP-temp").attr('class', "badge badge-secondary MMP-success");
        this.setState(() => { return { cancel: false }; });
    }

    render() {
        bsCustomFileInput.init();
        const total = 7;
        const percent = (this.state.completed / total * 100).toFixed(2);
        return (
            <div id="progressdocument">
                <div id="MMP-percentage">
                    <h2>Progress Percentage</h2>
                    <ProgressBar id="MMP-percentage-bar" variant="success" now={percent} label={`${percent}% (${this.state.completed}/${total})`} />
                </div>
                <div id="MMP-selectedachiev">
                    <h2>Selected Achievements</h2>
                    <ListGroup id="MMP-achievements-list">
                        <ListGroup.Item>
                            <Badge variant="secondary" onClick={this.clickLabel}>Getting into ice</Badge> Keep skating for 10 minutes.
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Badge variant="secondary" onClick={this.clickLabel}>Skating faster</Badge> Skate 400m in 1 minutes.
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Badge variant="secondary" onClick={this.clickLabel}>Skating for a long time</Badge> Skate more than 10 minutes.
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Badge variant="secondary" onClick={this.clickLabel}>Getting into shot</Badge> Score more than 5 out of 10 penalty shots.
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Badge variant="secondary" onClick={this.clickLabel}>Shooting precisely</Badge> Score a goal from one goal to the other.
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Badge variant="secondary" onClick={this.clickLabel}>Dribbling calmly</Badge> Circle the link with the puck.
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Badge variant="secondary" onClick={this.clickLabel}>Wall-passing</Badge> Wall-pass 5 times from each side of the enemy.
                        </ListGroup.Item>
                    </ListGroup>
                    <Button id="MPP-achievements-modify"><FontAwesomeIcon icon={faPlusSquare} style={{marginRight: "10px"}}/>Modify Achievements</Button>
                    <Modal show={this.state.prove} onHide={this.clickPNo}>
                        <Modal.Header closeButton>
                            <Modal.Title id="AIP-modal-title">Accomplish Activity</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: "18px" }}>
                            <p style={{fontFamily:'arial', color:'black', fontSize:'18px'}}>Are you sure you attained the activity? If it is true, please upload a proof photo.</p>
                            <Form>
                                {/*<Form.File id="custom-file" accept=".jpg, .jpeg, .png" label={this.state.fileName} onChange={(e) => this.setState(() => {return {fileName: e.target.files[0].name} })} style={{cursor:'pointer'}} custom />*/}
                                <Form.Group>
                                    <Form.File accept=".jpg, .jpeg, .png" id="exampleFormControlFile1"/>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.clickPYes}>
                                Yes
                            </Button>
                            <Button variant="danger" onClick={this.clickPNo}>
                                No
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.cancel} onHide={this.clickCNo}>
                        <Modal.Header closeButton>
                            <Modal.Title id="AIP-modal-title">Accomplish Activity</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><p style={{fontFamily:'arial', color:'black', fontSize:'18px'}}>Are you sure you cancel the activity?</p></Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.clickCYes}>
                                Yes
                            </Button>
                            <Button variant="danger" onClick={this.clickCNo}>
                                No
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div id="MMP-reviews">
                    <h2>Reviews</h2>
                    <Button id="MMP-reviews-write"><FontAwesomeIcon icon={faPencilAlt} style={{marginRight: "10px"}}/>Write a Review</Button>
                    <h3>Positive Opinions</h3>
                    <div class="AIP-reviews-positive">
                        <Review isPositive={true} name={"Harry Potter"} years={5} achiev={20} content="You'll find it super fun. I promise." data={[1, 2, 3, 4, 5]} like={31} />
                        <Review isPositive={true} name={"Harry Potter"} years={5} achiev={20} content="You'll find it super fun. I promise." data={[1, 2, 3, 4, 5]} like={31} />
                    </div>
                    <h3>Negative Opinions</h3>
                    <div class="AIP-reviews-negative">
                        <Review isPositive={false} name={"Steven Yeun"} years={1} achiev={6} content="It's soooo dangerous. I've broken my leg :(" data={[5, 4, 3, 2, 1]} like={17} />
                    </div>
                </div>
            </div>
        )
    }
}


export default ProgressDocument;