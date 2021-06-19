import React, {useState} from 'react'
import { Col } from 'react-bootstrap'
import { Nav, Navbar, Modal, Form, FormControl, Button } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import logo from '../../imgs/logo.svg'
import './TopBar.scss'
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../../../../../../contexts/AuthContext';
import { db } from 'firebase.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";

const TopBar = ({ userName }) => {
    const [addact, setAddact] = useState(false);
    const [actname, setActname] = useState("");
    const [actcardimg, setActcardimg] = useState("");
    const [actcoverimg, setActcoverimg] = useState("");
    const [actcat, setActcat] = useState([]);
    const [actcatt, setActcatt] = useState("");
    const [acttag, setActtag] = useState([]);
    const [acttagt, setActtagt] = useState("");
    const [actnum, setActnum] = useState([5, 5, 5, 5, 5]);
    const [actimg, setActimg] = useState([]);
    const [actimgt, setActimgt] = useState("");
    const [actvid, setActvid] = useState("");
    const [actdes1, setActdes1] = useState("");
    const [actdes2, setActdes2] = useState([]);
    const [actdes2t1, setActdes2t1] = useState("");
    const [actdes2t2, setActdes2t2] = useState("");
    const [actreq, setActreq] = useState("");
    const [actcom1, setActcom1] = useState([]);
    const [actcom1t1, setActcom1t1] = useState("");
    const [actcom1t2, setActcom1t2] = useState("");
    const [actcom2, setActcom2] = useState([]);
    const [actcom2t1, setActcom2t1] = useState("");
    const [actcom2t2, setActcom2t2] = useState("");
    const [actcom2t3, setActcom2t3] = useState("");

    const { logOut } = useAuth();
    async function handleLogout() {
        await logOut();
    }

    const initForm = () => {
        setActname("");
        setActcardimg("");
        setActcoverimg("");
        setActcat([]);
        setActcatt("");
        setActtag([]);
        setActtagt("");
        setActnum([5, 5, 5, 5, 5]);
        setActimg([]);
        setActimgt("");
        setActvid("");
        setActdes1("");
        setActdes2([]);
        setActdes2t1("");
        setActdes2t2("");
        setActreq("");
        setActcom1([]);
        setActcom1t1("");
        setActcom1t2("");
        setActcom2([]);
        setActcom2t1("");
        setActcom2t2("");
        setActcom2t3("");
    }

    const clickAddAct = () => {
        setAddact(true);
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const clickAAYes = () => {
        if (actname && actcardimg && actcoverimg && actcat.length && acttag.length && actimg.length && actvid && actdes1 && actdes2.length && actreq && actcom1.length && actcom2.length) {
            var tagdict = {};
            acttag.forEach(tag => {
                tagdict[tag] = true;
            })
            
            const act = {
                name: actname,
                name_lower: actname.toLowerCase(),
                numerics: actnum,
                imgs: actimg.map((src, i) => {return ({alt: actname+" image "+String(i+1), src: src})}),
                videos: [{alt: actname+" Video", src: actvid}],
                description: {
                    text: actdes1,
                    links: actdes2.map(link => {return ({title: link[0], src: link[1]})})
                },
                requirements: actreq.split('\n'),
                communities: {
                    links: actcom1.map(link => {return ({title: link[0], src: link[1]})}),
                    table: actcom2.map(club => {return ({clubName: club[0], contact: club[1], region: club[2]})})
                },
                cardImg: {
                    alt: actname+" Card Image",
                    src: actcardimg
                },
                coverImg: {
                    alt: actname+" Cover Image",
                    src: actcoverimg
                },
                categories: actcat,
                tags: tagdict,
                numOfReviews: 0,
                numOfUsers: 0
            };
            var genid = actname;
            db.collection('Activities').doc(String(getRandomInt(0, 100))+genid.replace(/ /gi, "")+String(getRandomInt(0, 100))).set(act);
            initForm();
            setAddact(false);
        }
        else {
            alert("Please fill in the contents");
        }
    }

    const clickAANo = () => {
        initForm();
        setAddact(false);
    }

    const clickCatAdd = () => {
        if (actcatt) {
            setActcat(actcat.concat([actcatt]));
            setActcatt("");
        }
        else {
            alert("Please fill in the contents");
        }
    }

    const clickTagAdd = () => {
        if (acttagt) {
            setActtag(acttag.concat([acttagt]));
            setActtagt("");
        }
        else {
            alert("Please fill in the contents");
        }
    }

    const clickImgAdd = () => {
        if (actimgt) {
            setActimg(actimg.concat([actimgt]));
            setActimgt("");
        }
        else {
            alert("Please fill in the contents");
        }
    }

    const clickDes2Add = () => {
        if (actdes2t1 && actdes2t2) {
            setActdes2(actdes2.concat([[actdes2t1, actdes2t2]]));
            setActdes2t1("");
            setActdes2t2("");
        }
        else {
            alert("Please fill in all contents");
        }
    }

    const clickCom1Add = () => {
        if (actcom1t1 && actcom1t2) {
            setActcom1(actcom1.concat([[actcom1t1, actcom1t2]]));
            setActcom1t1("");
            setActcom1t2("");
        }
        else {
            alert("Please fill in all contents");
        }
    }

    const clickCom2Add = () => {
        if (actcom2t1 && actcom2t2 && actcom2t3) {
            setActcom2(actcom2.concat([[actcom2t1, actcom2t2, actcom2t3]]));
            setActcom2t1("");
            setActcom2t2("");
            setActcom2t3("");
        }
        else {
            alert("Please fill in all contents");
        }
    }

    const catEnter = (e) => {
        if (e.key === 'Enter') {
            clickCatAdd();
        }
    }

    const tagEnter = (e) => {
        if (e.key === 'Enter') {
            clickTagAdd();
        }
    }

    const imgEnter = (e) => {
        if (e.key === 'Enter') {
            clickImgAdd();
        }
    }

    const des2Enter = (e) => {
        if (e.key === 'Enter') {
            clickDes2Add();
        }
    }

    const com1Enter = (e) => {
        if (e.key === 'Enter') {
            clickCom1Add();
        }
    }

    const com2Enter = (e) => {
        if (e.key === 'Enter') {
            clickCom2Add();
        }
    }

    return (
        <div id="MP-nav-container">
            <div className="align-self-end">
                <Nav className="mt-3">
                    <Nav.Link className="me-4"><span className="nav-text" id="nav-userName">{userName}</span></Nav.Link>
                    <Nav.Link className="me-5"><Link to={"/"} onClick={handleLogout}><span className="nav-text" id="nav-signOut">Sign Out</span></Link></Nav.Link>
                </Nav>

                {/* // <Nav className="mt-3">
                //     <Nav.Link  className="me-4"><span className="nav-text"id="nav-signIn" >Sign In</span></Nav.Link>
                //     <Button 
                //         variant="outline-dark"
                //         className="me-5"
                //     > <span className="nav-text" id="nav-signUp">Sign Up</span>
                //     </Button>
                // </Nav> */}

            </div>
            <div className="mypage-center">
                  My page
            </div>
            {/* <div className="align-self-start" id="tags">   
                <span>Tags applied : </span><Tags tags={tags}/>
            </div> */}
            <div className="align-self-start" id="MP-bottom">
                <span style={{float:'left', marginTop:'2%', fontSize:'16px'}}><FontAwesomeIcon icon={faAsterisk} style={{ marginRight: '6px' }}/> If you click a card, then you will go to its MyProgressPage.</span>
                <Button variant='success' id="MP-actadd" onClick={clickAddAct}>Add Activity</Button>
            </div>
            <Modal size='lg' show={addact} onHide={clickAANo}>
                <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom: '5px' }}>
                    <Modal.Title>Add a New Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '5px', paddingBottom: '0' }}>
                    <Form style={{ marginLeft: '20px', marginRight: '20px' }}>
                            <Form.Group>
                                <Form.Label id="MP-addact-formlabel">Name</Form.Label>
                                <Form.Control as="input" value={actname} onChange={e => { setActname(e.target.value) }} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label id="MP-addact-formlabel">Card Image</Form.Label>
                                <Form.Control as="input" placeholder="Image URL (We recommend a square image)" value={actcardimg} onChange={e => { setActcardimg(e.target.value) }} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label id="MP-addact-formlabel">Cover Image</Form.Label>
                                <Form.Control as="input" placeholder="Image URL (We recommend a horizontally long image)" value={actcoverimg} onChange={e => { setActcoverimg(e.target.value) }} />
                            </Form.Group>
                            <Form.Group>
                                <div><Form.Label id="MP-addact-formlabel">Categories{actcat.map((cat, i) => {
                                    if (i == 0) {
                                        return ": "+cat;
                                    }
                                    else {
                                        return ", "+cat;
                                    }
                                })}</Form.Label></div>
                                <div>
                                    <Form.Control id="MP-list-input" as="input" value={actcatt} onChange={e => {setActcatt(e.target.value)}} onKeyPress={catEnter}/>
                                    {/*<Form.Control as='select'>
                                        <option>1</option>
                                        <option>2</option>
                                    </Form.Control>*/}
                                    <Button variant="dark" onClick={() => {setActcat(actcat.slice(0, actcat.length-1));}} id="MP-form-undo" disabled={!(actcat.length)}>Undo</Button>
                                    <Button variant="info" onClick={clickCatAdd} id="MP-form-add">Add</Button>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <div style={{visibility:'hidden', fontSize:'1px'}}>oooo</div>
                                <div><Form.Label id="MP-addact-formlabel">Tags{acttag.map((tag, i) => {
                                    if (i == 0) {
                                        return ": "+tag;
                                    }
                                    else {
                                        return ", "+tag;
                                    }
                                })}</Form.Label></div>
                                <div>
                                    <Form.Control id="MP-list-input" as="input" placeholder="Short Word" value={acttagt} onChange={e => {setActtagt(e.target.value)}} onKeyPress={tagEnter}/>
                                    <Button variant="dark" onClick={() => {setActtag(acttag.slice(0, acttag.length-1));}} id="MP-form-undo" disabled={!(acttag.length)}>Undo</Button>
                                    <Button variant="info" onClick={clickTagAdd} id="MP-form-add">Add</Button>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label id="MP-addact-formlabel">Numerics - Easy to start</Form.Label>
                                <RangeSlider value={actnum[0]} max={10} step={1} variant='success' onChange={e => setActnum([parseInt(e.target.value), actnum[1], actnum[2], actnum[3], actnum[4]])} />
                                <Form.Label id="MP-addact-formlabel">Numerics - Cost-effective</Form.Label>
                                <RangeSlider value={actnum[1]} max={10} step={1} variant='success' onChange={e => setActnum([actnum[0], parseInt(e.target.value), actnum[2], actnum[3], actnum[4]])} />
                                <Form.Label id="MP-addact-formlabel">Numerics - Schedule-flexible</Form.Label>
                                <RangeSlider value={actnum[2]} max={10} step={1} variant='success' onChange={e => setActnum([actnum[0], actnum[1], parseInt(e.target.value), actnum[3], actnum[4]])} />
                                <Form.Label id="MP-addact-formlabel">Numerics - Safe</Form.Label>
                                <RangeSlider value={actnum[3]} max={10} step={1} variant='success' onChange={e => setActnum([actnum[0], actnum[1], actnum[2], parseInt(e.target.value), actnum[4]])} />
                                <Form.Label id="MP-addact-formlabel">Numerics - Good for health</Form.Label>
                                <RangeSlider value={actnum[4]} max={10} step={1} variant='success' onChange={e => setActnum([actnum[0], actnum[1], actnum[2], actnum[3], parseInt(e.target.value)])} />
                            </Form.Group>
                            <Form.Group>
                                <div><Form.Label id="MP-addact-formlabel">Images: {actimg.length}</Form.Label></div>
                                <div>
                                    <Form.Control id="MP-list-input" as="input" placeholder="Image URL" value={actimgt} onChange={e => {setActimgt(e.target.value)}} onKeyPress={imgEnter}/>
                                    <Button variant="dark" onClick={() => {setActimg(actimg.slice(0, actimg.length-1));}} id="MP-form-undo" disabled={!(actimg.length)}>Undo</Button>
                                    <Button variant="info" onClick={clickImgAdd} id="MP-form-add">Add</Button>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <div style={{visibility:'hidden', fontSize:'1px'}}>oooo</div>
                                <div style={{display:'block'}}><Form.Label id="MP-addact-formlabel">Videos</Form.Label></div>
                                <Form.Control as="input" placeholder="Video URL" value={actvid} onChange={e => { setActvid(e.target.value) }} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label id="MP-addact-formlabel">Description - Text</Form.Label>
                                <Form.Control as="textarea" rows={3} value={actdes1} onChange={e => { setActdes1(e.target.value) }} />
                            </Form.Group>
                            <Form.Group>
                                <div><Form.Label id="MP-addact-formlabel">Description - Links{actdes2.map((link, i) => {
                                    if (i == 0) {
                                        return ": "+link[0];
                                    }
                                    else {
                                        return ", "+link[0];
                                    }
                                })}</Form.Label></div>
                                <Form.Control id="MP-list-input2" as="input" placeholder="Site Name" value={actdes2t1} onChange={e => {setActdes2t1(e.target.value)}} onKeyPress={des2Enter}/>
                                <Form.Control id="MP-list-input2" as="input" placeholder="Site URL" value={actdes2t2} onChange={e => {setActdes2t2(e.target.value)}} onKeyPress={des2Enter}/>
                                <Button variant="dark" onClick={() => {setActdes2(actdes2.slice(0, actdes2.length-1));}} id="MP-form-undo" disabled={!(actdes2.length)}>Undo</Button>
                                <Button variant="info" onClick={clickDes2Add} id="MP-form-add">Add</Button>
                            </Form.Group>
                            <Form.Group>
                                <div style={{visibility:'hidden', fontSize:'1px'}}>oooo</div>
                                <Form.Label id="MP-addact-formlabel">Requirements</Form.Label>
                                <Form.Control as="textarea" rows={2} value={actreq} onChange={e => { setActreq(e.target.value) }} />
                            </Form.Group>
                            <Form.Group>                       
                                <div><Form.Label id="MP-addact-formlabel">Communities - Links{actcom1.map((link, i) => {
                                    if (i == 0) {
                                        return ": "+link[0];
                                    }
                                    else {
                                        return ", "+link[0];
                                    }
                                })}</Form.Label></div>
                                <Form.Control id="MP-list-input2" as="input" placeholder="Site Name" value={actcom1t1} onChange={e => {setActcom1t1(e.target.value)}} onKeyPress={com1Enter}/>
                                <Form.Control id="MP-list-input2" as="input" placeholder="Site URL" value={actcom1t2} onChange={e => {setActcom1t2(e.target.value)}} onKeyPress={com1Enter}/>
                                <Button variant="dark" onClick={() => {setActcom1(actcom1.slice(0, actcom1.length-1));}} id="MP-form-undo" disabled={!(actcom1.length)}>Undo</Button>
                                <Button variant="info" onClick={clickCom1Add} id="MP-form-add">Add</Button>
                            </Form.Group>
                            <Form.Group>
                                <div><Form.Label id="MP-addact-formlabel">Communities - Clubs{actcom2.map((club, i) => {
                                    if (i == 0) {
                                        return ": "+club[0];
                                    }
                                    else {
                                        return ", "+club[0];
                                    }
                                })}</Form.Label></div>
                                <Form.Control id="MP-list-input3" as="input" placeholder="Club Name" value={actcom2t1} onChange={e => {setActcom2t1(e.target.value)}} onKeyPress={com2Enter}/>
                                <Form.Control id="MP-list-input3" as="input" placeholder="Region" value={actcom2t2} onChange={e => {setActcom2t2(e.target.value)}} onKeyPress={com2Enter}/>
                                <Form.Control id="MP-list-input3" as="input" placeholder="Contact" value={actcom2t3} onChange={e => {setActcom2t3(e.target.value)}} onKeyPress={com2Enter}/>
                                <Button variant="dark" onClick={() => {setActcom2(actcom2.slice(0, actcom2.length-1));}} id="MP-form-undo" disabled={!(actcom2.length)}>Undo</Button>
                                <Button variant="info" onClick={clickCom2Add} id="MP-form-add">Add</Button>
                            </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '20px', paddingBottom: '10px' }}>
                    <Button variant="primary" onClick={clickAAYes}>
                        Submit
                    </Button>
                    <Button variant="danger" onClick={clickAANo}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TopBar
