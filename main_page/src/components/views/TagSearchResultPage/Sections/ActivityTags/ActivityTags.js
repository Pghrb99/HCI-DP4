import React, {useState, useEffect} from 'react'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import ActivityTag from '../ActivityTag/ActivityTag'
import './ActivityTags.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faTag } from "@fortawesome/free-solid-svg-icons";
import {db} from 'firebase.js';
import { useAuth } from 'contexts/AuthContext';

const ActivityTags = ({tags, docId, plusbutton}) => {

    const {currentUser} = useAuth();
    const userName = currentUser ? currentUser.email : 'none';

    const [taglist, setTaglist] = useState([]);
    const [tagplus, setTagPlus] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [newcands, setNewcands] = useState([]);
    const [isSelected, setIsSelected] = useState([]);
    const [tagtext, setTagtext] = useState("");

    const updateTags = () => {
        let temptaglist = [];
        db.collection('Activities').doc(docId).collection('Tags').get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                temptaglist.push({
                    name: doc.get('name'),
                    name_lower: doc.get('name_lower'),
                    maker: 'default'
                })
            })
        });
        db.collection('Activities').doc(docId).collection('UserTags').get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                temptaglist.push({
                    name: doc.get('name'),
                    name_lower: doc.get('name_lower'),
                    maker: doc.get('maker')
                })
            })
        });
        setTaglist(temptaglist);


        let temprecommendtags = [];
        db.collection('Activities').doc(docId).collection('RecommendTags').get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                temprecommendtags.push({
                    name: doc.get('name'),
                    name_lower: doc.get('name_lower'),
                    maker: 'none'
                })
            })
            setCandidates(temprecommendtags);
            setIsSelected(new Array(temprecommendtags.length).fill(false));
        })

        setNewcands([]);
    }

    useEffect(() => {
        updateTags();
    }, []);

    const clickTagplus = () => {
        updateTags();
        const tagname = taglist.map(tag => {return tag['name']});
        const temp = candidates.map(candidate => {
            return (tagname.includes(candidate));
        })
        setIsSelected(temp);
        setTagPlus(true);
    }

    const clickTPYes = () => {
        const tagname = taglist.map(tag => {return tag['name']});
        candidates.forEach((candidate, i) => {
            if (isSelected[i] && !tagname.includes(candidate['name'])) {
                const temp = taglist;
                const rev = {
                    name: candidate['name'],
                    name_lower: candidate['name_lower'],
                    maker: userName
                };
                db.collection('Activities').doc(docId).collection('UserTags').doc().set(rev);
                db.collection('Activities').doc(docId).collection('RecommendTags').get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (doc.get('name') == candidate['name']) {
                            db.collection('Activities').doc(docId).collection('RecommendTags').doc(doc.id).delete();
                        }
                    })
                });
                temp.push(rev);
                setTaglist(temp);
            }
        })
        newcands.forEach((candidate, i) => {
            if (isSelected[candidates.length+i] && !tagname.includes(candidate['name'])) {
                const temp = taglist;
                const rev = {
                    name: candidate['name'],
                    name_lower: candidate['name_lower'],
                    maker: candidate['maker']
                };
                db.collection('Activities').doc(docId).collection('UserTags').doc().set(rev);
                temp.push(rev);
                setTaglist(temp);
            }
        })

        setTagPlus(false);
    }
    
    const clickTPNo = () => setTagPlus(false);

    const pressEnter = (event) => {
        if (event.key == 'Enter') {
            clickAdd();
        }
    }

    const clickAdd = () => {
        const temp = newcands;
        temp.push({
            name: tagtext,
            name_lower: tagtext.toLowerCase(),
            maker: userName
        });
        setNewcands(temp);
        const temp2 = isSelected;
        temp2.push(true);
        setIsSelected(temp2);
        setTagtext("");
    }

    const clickCandTag = (e) => {
        const i = parseInt(e.currentTarget.className.split('|')[1]);
        const temp = [];
        for (let j = 0; j < isSelected.length; j++) {
            if (j == i) {
                temp.push(!isSelected[i]);
            }
            else {
                temp.push(isSelected[j])
            }
        }
        setIsSelected(temp);
    }

    return (
        <ul className='ActivityTags'>
            {tags ? tags.map(tag => (<ActivityTag name={tag.name}/>))
                :
                taglist.map(tag => (<ActivityTag name={tag.name} maker={tag.maker}/>))
            }
            {plusbutton && <Button variant='success' id='tagplus' onClick={clickTagplus}><FontAwesomeIcon icon={faPlus} /></Button>}
            <Modal size='lg' show={tagplus} onHide={clickTPNo}>
                <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom:'5px'}}>
                    <Modal.Title style={{marginTop: '10px'}}>Add Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', textAlign: 'center', paddingTop: '5px', paddingBottom: '0'}}>
                    <table style={{ width: '100%', textAlign: 'left', margin: '0 20px 0 20px' }}>
                        <thead>
                            <tr>
                                <th colspan={2} id="newtag-table-title">Tags you did not apply</th>
                                <th colspan={2} id="newtag-table-title">Tags you applied</th>
                            </tr>
                            <tr>
                                <th id="newtag-table-subtitle">Recommended Tags</th>
                                <th id="newtag-table-subtitle">Custom Tags</th>
                                <th id="newtag-table-subtitle">Recommended Tags</th>
                                <th id="newtag-table-subtitle">Custom Tags</th>
                            </tr>
                        </thead>
                        <tbody>
                            <td>
                                {candidates.map((candidate, i) => {
                                    if (!isSelected[i]) {
                                        return (<tr><Button variant='success' className={"|"+i+"|"} id='newtag-tag' onClick={clickCandTag}><FontAwesomeIcon icon={faTag} style={{ marginRight: '10px' }} /><span className="newtagName">{candidate['name']}</span></Button></tr>);
                                    }
                                })}
                            </td>
                            <td>
                                {newcands.map((candidate, i) => {
                                    if (!isSelected[candidates.length+i]) {
                                        return (<tr><Button variant='success' className={"|"+(candidates.length+i)+"|"} id='newtag-tag' onClick={clickCandTag}><FontAwesomeIcon icon={faTag} style={{ marginRight: '10px' }} /><span className="newtagName">{candidate['name']}</span></Button></tr>);
                                    }
                                })}
                            </td>
                            <td>
                                {candidates.map((candidate, i) => {
                                    if (isSelected[i]) {
                                        console.log("hallo");
                                        return (<tr><Button variant='success' className={"|"+i+"|"} id='newtag-tag' onClick={clickCandTag}><FontAwesomeIcon icon={faTag} style={{ marginRight: '10px' }} /><span className="newtagName">{candidate['name']}</span></Button></tr>);
                                    }
                                })}
                            </td>
                            <td>
                                {newcands.map((candidate, i) => {
                                    if (isSelected[candidates.length+i]) {
                                        return (<tr><Button variant='success' className={"|"+(candidates.length+i)+"|"} id='newtag-tag' onClick={clickCandTag}><FontAwesomeIcon icon={faTag} style={{ marginRight: '10px' }} /><span className="newtagName">{candidate['name']}</span></Button></tr>);
                                    }
                                })}
                            </td>
                        </tbody>
                    </table>
                    <div style={{ float: 'right', width: '48%', margin:'20px 20px', textAlign: 'left' }}>
                        <InputGroup className="mb-3">
                            <FormControl id='newtag-input' value={tagtext} placeholder="Enter a custom tag" aria-label="Enter a custom tag" onKeyPress={pressEnter}  onChange={(e) => setTagtext(e.target.value)}/>
                            <InputGroup.Append>
                                <Button variant='success' id='newtag-add' onClick={clickAdd}>Add</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '0', paddingBottom: '10px'}}>
                    <Button variant="primary" onClick={clickTPYes}>
                        Submit
                            </Button>
                    <Button variant="danger" onClick={clickTPNo}>
                        Cancel
                            </Button>
                </Modal.Footer>
            </Modal>
        </ul>
    )
}

export default ActivityTags
