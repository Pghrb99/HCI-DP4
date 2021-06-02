import React, {useState, useEffect} from 'react'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import ActivityTag from '../ActivityTag/ActivityTag'
import './ActivityTags.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faTag } from "@fortawesome/free-solid-svg-icons";
import {firebase, db} from 'firebase.js';
import { useAuth } from 'contexts/AuthContext';

const ActivityTags = ({tags, docId, plusbutton}) => {

    const {currentUser} = useAuth();
    const userEmail = currentUser ? currentUser.email : 'none';

    const [currentTags, setCurrentTags] = useState([]);
    const [tagplus, setTagPlus] = useState(false);
    const [recommendTags, setRecommendTags] = useState([]); //recommend 란에 있는 태그
    const [customTags, setCustomTags] = useState([]); //custom 란에 있는 태그
    const [tagText, setTagText] = useState("");
    const activityDocRef = db.collection('Activities').doc(docId);
    const toLowerCase = String.prototype.toLowerCase.call.bind(String.prototype.toLowerCase);

    const initializeTags = async () => {
        const activityDoc = await activityDocRef.get();
        const userTagDoc = await activityDocRef.collection('UserTags').doc(userEmail).get();
        const activityTagNames = Object.keys(activityDoc.get("tags"));
        const userTagNames = userTagDoc.exists ? userTagDoc.get("tags") : [];
        setCustomTags(
            userTagNames
            .filter(x => (!activityTagNames.includes(x)))
            .map((x) => ({
                name: x, 
                name_lower: toLowerCase(x),
                isSelected: true
            }))
        );
        setRecommendTags(
            activityTagNames
            .map((x) => ({
                name: x,
                name_lower: toLowerCase(x),
                isSelected: userTagNames.includes(x)
            }))
        );
        setCurrentTags(activityTagNames);
    }

    useEffect(() => {
        if(docId != null) {
            initializeTags();
        }
    }, []);

    const clickTagplus = () => {
        initializeTags();
        setTagPlus(true);
    }

    const clickTPYes = async () => {
        const userTagDoc = await activityDocRef.collection('UserTags').doc(userEmail).get();
        const userTagNames = userTagDoc.exists ? userTagDoc.get("tags") : [];
        if(userTagNames.length != 0) {
            const querySnapshot = await activityDocRef.collection('Tags').where('name', 'in', userTagNames).get();
            querySnapshot.forEach((doc) => {
                if(doc.get('count') >= 2) {
                    doc.ref.update({
                        count: firebase.firestore.FieldValue.increment(-1),
                    })
                }
                else {
                    doc.ref.delete()
                }
            })
        }
        
        const addedRecommendNames = recommendTags.filter(x => x.isSelected).map(x => x.name);
        const addedCustomNames = customTags.filter(x => x.isSelected).map(x => x.name);

        const allAddedNames = [...new Set([...addedRecommendNames, ...addedCustomNames])];

        userTagDoc.ref.set({
            tags: allAddedNames
        });
        for(let tagName of allAddedNames) {
            const querySnapshot = await activityDocRef.collection('Tags').where('name', '==', tagName).get();
            if(querySnapshot.empty) {
                activityDocRef.collection('Tags').add({
                    name: tagName,
                    name_lower: tagName.toLowerCase(),
                    count: 1
                });
                continue;
            }
            querySnapshot.forEach((doc) => {
                doc.ref.update({
                    count: firebase.firestore.FieldValue.increment(1)
                })
            })
        }

        const top4QuerySnapshot = await activityDocRef.collection('Tags').orderBy('count', 'desc').limit(4).get();
        const finalTags = [];
        top4QuerySnapshot.forEach((doc) => {
            finalTags.push(doc.get("name"))
        })
        const obj = {};
        for (let tagName of finalTags) {
            obj[tagName] = true;
        }
        activityDocRef.update({
            tags: obj
        });

        setTagPlus(false);
        initializeTags();
    }
    
    const clickTPNo = () => {
        setTagPlus(false);
    }

    const pressEnter = (event) => {
        if (event.key == 'Enter') {
            clickAdd();
        }
    }

    const clickAdd = () => {
        const tagName = tagText;
        setTagText("");
        const copyRecommendTags = [...recommendTags];
        for (let tag of copyRecommendTags) {
            if (tag.name_lower === tagName.toLowerCase()) {
                tag.isSelected = true;
                setRecommendTags(copyRecommendTags);
                return;
            }
        }
        setCustomTags((prev) => (
            [...prev, 
                {
                name: tagName, 
                name_lower: tagName.toLowerCase(),
                isSelected: true
                }
            ]
        ));
    }

    const clickCandTag = (e) => {
        let changedIndex = parseInt(e.currentTarget.className.split('|')[1]);
        if(changedIndex < recommendTags.length) {
            setRecommendTags(
                recommendTags.map((tag, index) => (
                    index === changedIndex ?
                    {...tag, isSelected: !tag.isSelected} : tag
                ))
            );
        }
        else {
            changedIndex -= recommendTags.length;
            setCustomTags(
                customTags.map((tag, index) => (
                    index === changedIndex ?
                    {...tag, isSelected: !tag.isSelected} : tag
                ))
            );
        }
    }

    return (
        <ul className='ActivityTags'>
            {tags ? tags.map((tag, index) => (<ActivityTag name={tag.name} key={index}/>))
                :
                currentTags.map((tag, index) => (<ActivityTag name={tag} key={index}/>))
            }
            {plusbutton && <Button variant='success' id='tagplus' onClick={clickTagplus}><FontAwesomeIcon icon={faPlus} /></Button>}
            <Modal size='lg' show={tagplus} onHide={clickTPNo}>
                <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom:'5px'}}>
                    <Modal.Title style={{marginTop: '10px'}}>Edit Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', textAlign: 'center', paddingTop: '5px', paddingBottom: '0'}}>
                    <table style={{ width: '100%', textAlign: 'left', margin: '0 20px 0 20px'}}>
                        <thead>
                            <tr>
                                <th colspan={2} className="table-left" id="newtag-table-title">Tags not voted</th>
                                <th className="table-right" id="newtag-table-title">Tags you've voted</th>
                            </tr>
                            <tr>
                                <th id="newtag-table-subtitle">Popular Tags</th>
                                <th className="table-left" id="newtag-table-subtitle">Custom Tags</th>
                                {/* <th className="table-right" id="newtag-table-subtitle">Popular Tags</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <td>
                                {recommendTags.map((tag, i) => {
                                    if (!tag.isSelected) {
                                        return (<tr><Button variant='success' className={"|"+i+"|"} id='newtag-tag' onClick={clickCandTag} style={{height: "fit-content"}}><FontAwesomeIcon icon={faTag} style={{ marginRight: '10px'}} /><span className="newtagName">{tag.name}</span></Button></tr>);
                                    }
                                })}
                            </td>
                            <td className="table-left">
                                {customTags.map((tag, i) => {
                                    if (!tag.isSelected) {
                                        return (<tr><Button variant='success' className={"|"+(recommendTags.length+i)+"|"} id='newtag-tag' onClick={clickCandTag} style={{height: "fit-content"}}><FontAwesomeIcon icon={faTag} style={{ marginRight: '10px'}} /><span className="newtagName">{tag.name}</span></Button></tr>);
                                    }
                                })}
                            </td>
                            <td className="table-right">
                                {recommendTags.map((tag, i) => {
                                    if (tag.isSelected) {
                                        return (<tr><Button variant='success' className={"|"+i+"|"} id='newtag-tag' onClick={clickCandTag} style={{height: "fit-content"}}><FontAwesomeIcon icon={faTag} style={{ marginRight: '10px'}} /><span className="newtagName">{tag.name}</span></Button></tr>);
                                    }
                                })}
                                {customTags.map((tag, i) => {
                                    if (tag.isSelected) {
                                        return (<tr><Button variant='success' className={"|"+(recommendTags.length+i)+"|"} id='newtag-tag' onClick={clickCandTag} style={{height: "fit-content"}}><FontAwesomeIcon icon={faTag} style={{ marginRight: '10px'}} /><span className="newtagName">{tag.name}</span></Button></tr>);
                                    }
                                })}
                            </td>
                        </tbody>
                    </table>
                    <div style={{ float: 'right', width: '48%', margin:'20px 20px', textAlign: 'left' }}>
                        <InputGroup className="mb-3">
                            <FormControl id='newtag-input' value={tagText} placeholder="Enter a custom tag" aria-label="Enter a custom tag" onKeyPress={pressEnter}  onChange={(e) => setTagText(e.target.value)}/>
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
