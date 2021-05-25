import React, {useState} from 'react'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import ActivityTag from '../ActivityTag/ActivityTag'
import './ActivityTags.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTag } from "@fortawesome/free-solid-svg-icons";

const ActivityTags = ({tags, setTags, plusbutton}) => {
    const [tagplus, setTagPlus] = useState(false);
    const [candidates, setCandidates] = useState(["Cold", "White", "Canada", "Helmet"]);
    const [newcands, setNewcands] = useState([]);
    const [isSelected, setIsSelected] = useState(new Array(candidates.length).fill(false));
    const [tagtext, setTagtext] = useState("");

    const clickTagplus = () => {
        const tagname = tags.map(tag => {return tag['name']});
        const temp = candidates.map(candidate => {
            return (tagname.includes(candidate));
        })
        setIsSelected(temp);
        setTagPlus(true);
    }

    const clickTPYes = () => {
        const tagname = tags.map(tag => {return tag['name']});
        candidates.forEach((candidate, i) => {
            if (isSelected[i] && !tagname.includes(candidate)) {
                console.log(candidate);
                const temp = tags;
                temp.push({key:candidate, name: candidate});
                setTags(temp);
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
        temp.push(tagtext);
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
            {tags.map((tag) => (
                <ActivityTag 
                    key={tag.name}
                    name={tag.name}
                />
            ))}
            {plusbutton && <Button variant='success' id='tagplus' onClick={clickTagplus}><FontAwesomeIcon icon={faPlus} /></Button>}
            <Modal size='lg' show={tagplus} onHide={clickTPNo}>
                <Modal.Header closeButton style={{ backgroundColor: '#BBEDCA', color: '#356864', border: 'none', paddingTop:'10px', paddingBottom:'5px'}}>
                    <Modal.Title>Add Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#BBEDCA', color: '#356864', border: 'none', textAlign: 'center', paddingTop: '5px', paddingBottom: '0'}}>
                    <table style={{ width: '90%' }}>
                        <thead>
                            <tr>
                                <th colspan={2} style={{ width: '50%', fontSize: '24px', fontWeight: '600' }}>Related tags for this activity</th>
                                <th style={{ width: '50%', fontSize: '24px', fontWeight: '600' }}>Tags you applied</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'left' }}>
                            <td>
                                {candidates.map((candidate, i) => {
                                    if (!isSelected[i]) {
                                        return (<tr><Button variant='success' className={"|"+i+"|"} id='newtag-tag' onClick={clickCandTag}><FontAwesomeIcon icon={faTag} style={{ marginRight: '10px' }} /><span className="newtagName">{candidate}</span></Button></tr>);
                                    }
                                })}
                            </td>
                            <td>
                                {newcands.map((candidate, i) => {
                                    if (!isSelected[candidates.length+i]) {
                                        return (<tr><Button variant='success' className={"|"+(candidates.length+i)+"|"} id='newtag-tag' onClick={clickCandTag}><FontAwesomeIcon icon={faTag} style={{ marginRight: '10px' }} /><span className="newtagName">{candidate}</span></Button></tr>);
                                    }
                                })}
                            </td>
                            <td>
                                {candidates.map((candidate, i) => {
                                    if (isSelected[i]) {
                                        console.log("hallo");
                                        return (<tr><Button variant='success' className={"|"+i+"|"} id='newtag-tag' onClick={clickCandTag}><FontAwesomeIcon icon={faTag} style={{ marginRight: '10px' }} /><span className="newtagName">{candidate}</span></Button></tr>);
                                    }
                                })}
                                {newcands.map((candidate, i) => {
                                    if (isSelected[candidates.length+i]) {
                                        return (<tr><Button variant='success' className={"|"+(candidates.length+i)+"|"} id='newtag-tag' onClick={clickCandTag}><FontAwesomeIcon icon={faTag} style={{ marginRight: '10px' }} /><span className="newtagName">{candidate}</span></Button></tr>);
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
                <Modal.Footer style={{ backgroundColor: '#BBEDCA', color: '#356864', border: 'none', paddingTop: '0', paddingBottom: '10px'}}>
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
