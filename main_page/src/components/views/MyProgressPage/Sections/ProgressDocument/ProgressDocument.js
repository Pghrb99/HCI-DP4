import React, { useState, useEffect } from 'react';
import { ProgressBar, ListGroup, Badge, Modal, Button, ButtonGroup, ToggleButton, Form } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';
import './ProgressDocument.scss';
import $ from 'jquery';
import Review from '../../../ActivityInfoPage/Sections/Review/Review';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { db } from '../../../../../firebase'

const ProgressDocument = ({ userName, docId, activityname, submit, setSubmit, setcompletebool, completebool }) => { 
    const username = userName;
    const [countend, setend] = useState(0);
    const [countlength, setlength] = useState(0);
    const [currentDoc, setCurrentDoc] = useState();
    const [resultdata, setresult] = useState([]);
    const [reviewlist, setReviewlist] = useState([]);
    const [achievlist, setachievlist] = useState([]);
    const [showachievlist, setshowachievlist] = useState([]);
    const [tempselect, setTempselect] = useState([]);
    const [modify, setModify] = useState(false);
    const [prove, setProve] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [attained, setAttained] = useState("");
    const [tempurl, setTempurl]= useState('');
    const [review, setReview] = useState(false);
    const [text, setText] = useState(""); // useState(submit ? reviewlist[0]['content'] : "");
    const [recommend, setRecommend] = useState(true); // useState(submit ? reviewlist[0]['isPositive'] : true);
    const [range, setRange] = useState([5, 5, 5, 5, 5]); // useState(submit ? reviewlist[0]['data'] : [5, 5, 5, 5, 5]);
    const [remove, setRemove] = useState(false);
    const [reloadtest, setreloadtest] = useState(false);

    useEffect(() => {
        db.collection("Activities").doc(docId).get().then((doc) => {
            setCurrentDoc({
                imgs: doc.get("imgs"),
                videos: doc.get("videos"),
                description: doc.get("description"),
                requirements: doc.get("requirements"),
                numerics: doc.get("numerics"),
                communities: doc.get("communities"),
                name: doc.get("name"),
            });
        });
        
        (async () => {
            let temparray = []
            let reloadtest1 = false;
            let actRefforthis  = db.collection('UserInfo').doc(username).collection('Activities').doc(docId)
            actRefforthis.get().then((doc) => {
                if(doc.get("achievement").length != 0){
                for(let i=0;i<doc.get("achievement").length;i++){
                temparray.push({
                    name: doc.get("achievement")[i].name,
                    explain: doc.get("achievement")[i].explain,
                    isCompleted: doc.get("achievement")[i].isCompleted,
                    isSelected: doc.get("achievement")[i].isSelected,
                    photourl : doc.get("achievement")[i].photourl
                })
            } 
                setTempselect(Array(temparray.length).fill(false));
                setachievlist(temparray);
            }
            else {
                reloadtest1= true;}

            if(reloadtest1){
            (async () => {
                let actRefforthis  = db.collection('Activities').doc(docId).collection('Achievements');
                const snapshotfor = await actRefforthis.get();
                let temparray = []
                snapshotfor.forEach(doc => {
                    temparray.push({
                        name: doc.data().name,
                        explain: doc.data().explain,
                        isCompleted: doc.data().isCompleted,
                        isSelected: doc.data().isSelected,
                        photourl : ''
                    })
                    })
                    setTempselect(Array(temparray.length).fill(false));
                    setachievlist(temparray);
    
                })();  
            }
                })   
            })();


        db.collection("Activities").doc(docId).collection('Reviews').onSnapshot((querySnapshot) => {
            db.collection('UserInfo').doc(username).get().then((doc) => {
                const name = doc.get("name");
                const tempReviewList = [];
                querySnapshot.forEach((reviewDoc) => {
                    tempReviewList.push({
                        isPositive: reviewDoc.get('isPositive'),
                        name: reviewDoc.get('name'),
                        days: reviewDoc.get('days'),
                        achiev: reviewDoc.get('achiev'),
                        content: reviewDoc.get('content'),
                        data: reviewDoc.get('data'),
                        like: reviewDoc.get('like'),
                        likeUsers: reviewDoc.get('likeUsers'),
                        photourl: reviewDoc.get('photourl'),
                        reviewId: reviewDoc.id
                    });
                    if(reviewDoc.get('name') == name) {
                        setSubmit(true);
                        setText(reviewDoc.get('content'));
                        setRecommend(reviewDoc.get('isPositive'));
                        setRange(reviewDoc.get('data'));
                    }
                });
                setReviewlist(tempReviewList);
            });
        });


    let tempcountend =0;
    (async () => {
        let snapshot3 = db.collection('UserInfo').doc(username).collection('Activities');
        const snapshot2 = await snapshot3.get();
        snapshot2.forEach(doc => {
            if(typeof currentDoc != 'undefined'){
            if(doc.data().name == currentDoc.name){
                if(doc.get("achievement").length != 0){
                for(let i=0; i<doc.get("achievement").length;i++){
                    if(doc.get("achievement")[i].finish == true){
                        tempcountend++;
                    }
                }
                setend(tempcountend);
                setlength(doc.get("achievement").length);
            }}
        }
            
        })
        })(); 




    }, []);

    const calculateTotal = () => {
        var cnt = 0;
        achievlist.forEach(achiev => {
            if (achiev['isSelected']) {
                cnt++;
            }
        });
        return cnt;
        // return countlength;
    }

    const calculateCompleted = () => {
        var cnt = 0;
        achievlist.forEach(achiev => {
            if (achiev['isCompleted']) {
                cnt++;
            }
        });
        return cnt;
        // return countend;
    }

    const calculatePercent = () => {
        if (calculateCompleted() > 0) {
            return (calculateCompleted() / calculateTotal() * 100).toFixed(2);
        }
        return 0;
    }

    const clickModify = () => {
        setTempselect(achievlist.map(achiev => {
            return achiev['isSelected'];
        }))
        setModify(true);
    }

    const clickMYes = () => {
        const temp = achievlist.map((achiev, i) => {
            return ({
                name: achiev['name'],
                explain: achiev['explain'],
                isSelected: tempselect[i],
                isCompleted: tempselect[i] ? achiev['isCompleted'] : false,
                photourl: achiev['photourl']
            })
        })
        setachievlist(temp);
        setTempselect(new Array(achievlist.length).fill(false));
        for (let j = 0; j < temp.length; j++) {
            if (temp[j]['isSelected'] && !temp[j]['isCompleted']) {
                // setComplete(false);
                (async () => {
                const cityRefforPyes = db.collection('UserInfo').doc(username).collection('Activities').doc(docId);
                await cityRefforPyes.update({ isComplete : false });
                 db.collection('UserInfo').doc(userName).collection('Activities').doc(docId).get().then((doc) => {setcompletebool(doc.get("isComplete"))}) 
                 console.log('false입니다')
                 console.log(completebool)
                })();
                break;
            }
            if (j == temp.length-1) {
                // setComplete(true);
                (async () => {
                const cityRefforPyes = db.collection('UserInfo').doc(username).collection('Activities').doc(docId);
                await cityRefforPyes.update({ isComplete : true });

        db.collection('UserInfo').doc(userName).collection('Activities').doc(docId).get().then((doc) => {setcompletebool(doc.get("isComplete"))}) 
        console.log('true입니다')
        console.log(completebool)
                })();
            }
        }
        setModify(false);

        let useractivity = [];

        for (let i=0; i<temp.length; i++){
            useractivity.push({
                name: temp[i].name,
                explain: temp[i].explain,
                isCompleted: temp[i].isCompleted,
                isSelected: temp[i].isSelected,
                photourl: ""
            })
        }
        console.log(useractivity)
        db.collection('UserInfo').doc(username).collection('Activities').doc(docId).update({
            achievement: useractivity
        });
}

    const clickMNo = () => {
        setTempselect(new Array(achievlist.length).fill(false));
        setModify(false);
    }


    const clickModifyLabel = (event) => {
        const s = event.currentTarget.className;
        const i = parseInt(event.currentTarget.className.split('|')[1]);
        const temp = [];
        for (let j = 0; j < achievlist.length; j++) {
            if (j == i) {
                temp.push(!tempselect[i]);
            }
            else {
                temp.push(tempselect[j]);
            }
        }
        setTempselect(temp);
        if (!event.currentTarget.className.includes("MMP-success")) {
            event.currentTarget.className = "MMP-success " + s;
        }
        else {
            event.currentTarget.className = "|" + i + "| badge badge-secondary";
        }
    }

    const addReview = () => {
        db.collection('UserInfo').doc(username).get().then((doc) => {
            const name = doc.get("name");
            db.collection('UserInfo').doc(username).collection('Activities').doc(docId).get().then((doc) => {
                const startTime = doc.get("startTime").toDate()
                const rev = {
                    isPositive: recommend,
                    name: name,
                    days: Math.round((new Date().getTime() - startTime.getTime())/(1000*60*60*24)),
                    achiev: calculateCompleted(),
                    content: text,
                    data: range,
                    like: 0,
                    likeUsers: [],
                    photourl: imgs()
                };
                db.collection('Activities').doc(docId).collection('Reviews').add(rev);
                const docRef = db.collection('Activities').doc(docId);
                return db.runTransaction((transaction) => {
                    return transaction.get(docRef).then((doc) => {
                        const newNumOfReviews = doc.get("numOfReviews") + 1;
                        const oldNumericsTotal = 
                            [0,1,2,3,4].map((index) => doc.get("numerics")[index]*doc.get("numOfReviews"));
                        const newNumerics = oldNumericsTotal.map((x, index) => (x+range[index])/newNumOfReviews);
                        transaction.update(docRef, {
                            numOfReviews: newNumOfReviews,
                            numerics: newNumerics
                        });
                    })
                })
            })
        })

    }

    const removeReview = () => {
        db.collection('UserInfo').doc(username).get().then((doc) => {
            const name = doc.get("name");
            db.collection('Activities').doc(docId).collection('Reviews').where('name', '==', name)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((reviewDoc) => reviewDoc.ref.delete())
            });
            const docRef = db.collection('Activities').doc(docId);
            return db.runTransaction((transaction) => {
                return transaction.get(docRef).then((doc) => {
                    const newNumOfReviews = doc.get("numOfReviews") - 1;
                    if (newNumOfReviews == 0) {
                        transaction.update(docRef, {
                            numOfReviews: 0,
                            numerics: [0, 0, 0, 0, 0]
                        });
                        return;
                    }
                    const oldNumericsTotal = [0,1,2,3,4].map((index) => doc.get("numerics")[index]*doc.get("numOfReviews"));
                    const newNumerics = oldNumericsTotal.map((x, index) => (x-range[index])/newNumOfReviews);
                    transaction.update(docRef, {
                        numOfReviews: newNumOfReviews,
                        numerics: newNumerics
                    });
                })
            })
        })
    }

    const updateReview = () => {
        db.collection('UserInfo').doc(username).get().then((doc) => {
            const name = doc.get("name");
            db.collection('UserInfo').doc(username).collection('Activities').doc(docId).get().then((doc) => {
                const startTime = doc.get("startTime").toDate();
                db.collection('Activities').doc(docId).collection('Reviews').where('name', '==', name)
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.update({
                            isPositive: recommend,
                            content: text,
                            data: range,
                            days: Math.round((new Date().getTime() - startTime.getTime())/(1000*60*60*24)),
                        });
                    });
                    const docRef = db.collection('Activities').doc(docId);
                    return db.runTransaction((transaction) => {
                        return transaction.get(docRef).then((doc) => {
                            const oldNumerics = doc.get("numerics");
                            const oldNumericsTotal = [0,1,2,3,4].map((index) => doc.get("numerics")[index]*doc.get("numOfReviews"));
                            const newNumerics = oldNumericsTotal.map((x, index) => 
                                (x-oldNumerics[index]+range[index])/doc.get("numOfReviews"));
                            transaction.update(docRef, {
                                numerics: newNumerics
                            });
                        })
                    })
                })
            });
        });
    }

    const selectImg = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let f = event.target.files[0];
        reader.onloadend = () => {
            setTempurl(reader.result);
        }
        reader.readAsDataURL(f);
    }

    const imgs = () => {
        const res = [];
        for (let j = 0; j < achievlist.length; j++) {
            if (achievlist[j]['isCompleted']) {
                res.push(achievlist[j]['photourl']);
            }
        }
        return res;
    }

    const clickLabel = (event) => {
        const i = parseInt(event.currentTarget.className.split('|')[1]);
        setAttained(event.currentTarget.className);
        event.currentTarget.className += " MMP-temp";
        if (!event.currentTarget.className.includes("MMP-success")) {
            setProve(true);
        }
        else {
            setTempurl(achievlist[i]['photourl']);
            event.currentTarget.className += " MMP-temp";
            setCancel(true);
        }
    }

    const clickPYes = () => {
        let useractivity = [];
        const i = parseInt(attained.split('|')[1]);
        if (tempurl !== '') {
            $(".MMP-temp").attr('class', "MMP-success " + attained);
            const temp = achievlist.map((achiev, j) => {
                if (j == i) {
                    useractivity.push({
                        name: achiev.name,
                        explain: achiev.explain,
                        isCompleted: true,
                        isSelected: achiev.isSelected,
                        photourl: 'tempurl'
                    })
                    return ({
                        name: achiev['name'],
                        explain: achiev['explain'],
                        isSelected: achiev['isSelected'],
                        isCompleted: true,
                        photourl: tempurl
                    });
                }
                else {
                    useractivity.push({
                        name: achiev.name,
                        explain: achiev.explain,
                        isCompleted: achiev.isCompleted,
                        isSelected: achiev.isSelected,
                        photourl: achiev.photourl
                    })
                    return achiev;
                }
            })
            // 여기에 review의 photourl에 tempurl을 추가하는 코드 넣어야 함
            const cityReffor = db.collection('UserInfo').doc(username).collection('Activities').doc(docId);
            cityReffor.update({
                achievement: useractivity
            });
            // db.collection('UserInfo').doc(username).collection('Activities').doc(docId).update({ achievement : temp });

            setTempurl('');
            setachievlist(temp);
            
            for (let j = 0; j < temp.length; j++) {
                if (temp[j]['isSelected'] && !temp[j]['isCompleted']) {
                    // setComplete(false);
                    (async () => {
                    const cityRefforPyes = db.collection('UserInfo').doc(username).collection('Activities').doc(docId);
                    await cityRefforPyes.update({ isComplete : false });
                    
                    db.collection('UserInfo').doc(userName).collection('Activities').doc(docId).get().then((doc) => {setcompletebool(doc.get("isComplete"))}) 
                    console.log('false입니다')
                    console.log(completebool)
                    })();
                
                    break;
                }
                if (j == temp.length-1) {
                    // setComplete(true);
                    (async () => {
                    const cityRefforPyes = db.collection('UserInfo').doc(username).collection('Activities').doc(docId);
                    await cityRefforPyes.update({ isComplete : true });
                    db.collection('UserInfo').doc(userName).collection('Activities').doc(docId).get().then((doc) => {setcompletebool(doc.get("isComplete"))}) 
                    console.log('true')
                    console.log(completebool)
                    })();

                }
            }
            setProve(false);
        }
        else {
            alert("No Photo!");
        }
    }

    const clickPNo = () => {
        $(".MMP-temp").attr('class', attained);
        setTempurl('');
        setProve(false);
    }

    const clickCYes = () => {
        let useractivity = [];
        const i = parseInt(attained.split('|')[1]);
        $(".MMP-temp").attr('class', attained.replace("MMP-success ", ''));
        const temp = achievlist.map((achiev, j) => {
            if (j == i) {
                useractivity.push({
                    name: achiev.name,
                    explain: achiev.explain,
                    isCompleted: false,
                    isSelected: achiev.isSelected,
                    photourl: tempurl
                })
                return ({
                    name: achiev['name'],
                    explain: achiev['explain'],
                    isSelected: achiev['isSelected'],
                    isCompleted: false,
                    photourl: ''
                })
            }
            else {
                useractivity.push({
                    name: achiev.name,
                    explain: achiev.explain,
                    isCompleted: achiev.isCompleted,
                    isSelected: achiev.isSelected,
                    photourl: achiev.photourl
                })
                return achiev;
            }
        })
        // 여기에 review의 photourl에 tempurl을 제거하는 코드 넣어야 함

        const cityReffor = db.collection('UserInfo').doc(username).collection('Activities').doc(docId);
        cityReffor.update({
            achievement: useractivity
        });

        db.collection('UserInfo').doc(username).collection('Activities').doc(docId).update({ achievement : temp });
        setTempurl('');
        setachievlist(temp);
        (async () => {
        const cityRefforPyes = db.collection('UserInfo').doc(username).collection('Activities').doc(docId);
        await cityRefforPyes.update({ isComplete : false });
        
        db.collection('UserInfo').doc(userName).collection('Activities').doc(docId).get().then((doc) => {setcompletebool(doc.get("isComplete"))})
        console.log('false입니다')
        console.log(completebool)        

        })();
        // setComplete(false);
        setCancel(false);
    }

    const clickCNo = () => {
        $(".MMP-temp").attr('class', attained);
        setTempurl('');
        setCancel(false);
    }

    const clickReview = () => {
        setReview(true);
    }

    const clickRYes = () => {
        setSubmit(true);
        setReview(false);
        if (submit) {
            updateReview();
        }
        else {
            addReview();
        }
    }

    const clickRNo = () => {
        setReview(false);
    }

    const clickRemove = () => {
        setRemove(true);
    }

    const clickXYes = () => {
        setText("");
        setRecommend(true);
        setRange([5, 5, 5, 5, 5]);
        setSubmit(false);
        setRemove(false);
        removeReview();
    }

    const clickXNo = () => {
        setRemove(false);
    }

    const emptyCheck = (arr) => {
        const temp = new Array(achievlist.length).fill(false);
        return ((temp.length == arr.length) && temp.every(function (element, index) {
            return element === arr[index];
        }));
    }

    return (
        <div id="progressdocument">
            <div id="MMP-percentage" >
                <h2>Progress Percentage</h2>
                <ProgressBar id="MMP-percentage-bar" variant="success" now={calculatePercent()} label={calculatePercent() + `% (${calculateCompleted()}/${calculateTotal()})`} />
            </div>
            <div id="MMP-selectedachiev" style={{ marginTop: '30px' }}>
                <div style={{ width: '100%', display: 'inline-block' }}>
                    <h2 style={{ float: 'left' }}>Selected Achievements</h2>
                    <Button id="MPP-achievements-modify" variant="success" onClick={clickModify}><FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />Modify Achievements</Button>
                </div>
                <Modal size='lg' show={modify} onHide={clickMNo}>
                    <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom:'5px'}}>
                        <Modal.Title>Modify Selected Achievements</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '5px', paddingBottom: '0'}}>
                        <ListGroup id="MMP-achievements-modallist">
                            {achievlist.map((achiev, i) => {
                                if (achiev['isSelected']) {
                                    return (
                                        <ListGroup.Item>
                                            <Badge variant="secondary" className={"MMP-success |" + i + "|"} onClick={clickModifyLabel}>{achiev['name']}</Badge> {achiev['explain']}
                                        </ListGroup.Item>
                                    )
                                }
                                else {
                                    return (
                                        <ListGroup.Item>
                                            <Badge variant="secondary" className={"|" + i + "|"} onClick={clickModifyLabel}>{achiev['name']}</Badge> {achiev['explain']}
                                        </ListGroup.Item>
                                    )
                                }
                            })}
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '0', paddingBottom: '10px'}}>
                        <Button variant="primary" onClick={clickMYes}>
                            Submit
                        </Button>
                        <Button variant="danger" onClick={clickMNo}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                        
                {(emptyCheck(achievlist.map(achiev => { return achiev['isSelected']; }))) ?
                
                    <div style={{ width: '100%', marginTop: '15px', textAlign: 'center', fontSize: '24px' }}>You have not selected achievements yet. </div>
                    
                    :
                    <ListGroup id="MMP-achievements-list">
                        {achievlist.map((achiev, i) => {
                            if (achiev['isSelected']) {
                                if (achiev['isCompleted']) {
                                    return (
                                        <ListGroup.Item>
                                            <Badge variant="secondary" className={"MMP-success |" + i + "|"} onClick={clickLabel}>{achiev['name']}</Badge> {achiev['explain']}
                                        </ListGroup.Item>
                                    )
                                }
                                else {
                                    return (
                                        <ListGroup.Item>
                                            <Badge variant="secondary" className={"|" + i + "|"} onClick={clickLabel}>{achiev['name']}</Badge> {achiev['explain']}
                                        </ListGroup.Item>
                                    )
                                }
                            }
                            else {
                                return null;
                            }
                        })}
                    </ListGroup>
                }
                <Modal show={prove} onHide={clickPNo} scrollable={true}>
                    <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom:'5px'}}>
                        <Modal.Title>Accomplish Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '5px', paddingBottom: '0'}}>
                        <p style={{fontFamily:'arial', color: 'black', fontSize:'20px', marginLeft:'20px', marginRight:'20px'}}>Are you sure you attained the activity? If it is true, please upload a proof photo.</p>
                        {/*<input type="file" name="file" id="file" class="inputfile" accept=".jpg, .jpeg, .png"/>*/}
                        <Form>
                            <Form.Group>
                                {/*<Form.File accept=".jpg, .jpeg, .png" id="exampleFormControlFile1" ref={(ref) => setFile(ref)} />*/}
                                <Form.File accept=".jpg, .jpeg, .png" id="exampleFormControlFile1" onChange={selectImg} style={{fontFamily:'arial', color: 'black', fontSize:'16px', marginLeft:'20px', marginRight:'20px'}}/>
                            </Form.Group>
                        </Form>
                        {(tempurl !== '') && <img id='MMP-photo' src={tempurl}></img>}
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '0', paddingBottom: '10px'}}>
                        <Button variant="primary" onClick={clickPYes}>
                            Yes
                        </Button>
                        <Button variant="danger" onClick={clickPNo}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={cancel} onHide={clickCNo} scrollable={true}>
                    <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom:'5px'}}>
                        <Modal.Title>Cancel Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '5px', paddingBottom: '0'}}>
                        <p style={{fontFamily:'arial', color: 'black', fontSize:'20px', marginLeft:'20px', marginRight:'20px'}}>Are you sure you cancel the activity?</p>
                        {(tempurl !== '') && <img id='MMP-photo' src={tempurl}></img>}
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
            <div id="MMP-reviews" style={{ marginTop: '30px' }}>
                <div style={{ width: '100%', display: 'inline-block' }}>
                    <h2 style={{ float: 'left' }}>Reviews</h2>
                    {submit ?
                        <div>
                            <Button id="MMP-reviews-remove" variant="danger" onClick={clickRemove}><FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "10px" }} />Remove your Review</Button>
                            <Button id="MMP-reviews-write" variant="success" onClick={clickReview}><FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "10px" }} />Modify your Review</Button>
                        </div>
                        :
                        <Button id="MMP-reviews-write" variant="success" onClick={clickReview}><FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "10px" }} />Write a Review</Button>
                    }
                </div>
                <Modal show={review} onHide={clickRNo}>
                    <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom:'5px'}}>
                        {submit ?
                            <Modal.Title>Modify your Review</Modal.Title>
                            :
                            <Modal.Title>Write a Review</Modal.Title>
                        }
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '5px', paddingBottom: '0'}}>
                        <Form style={{marginLeft: '20px', marginRight: '20px'}}>
                            <Form.Group controlId="MMP-text">
                                <Form.Label id="MMP-reviews-formlabel">Text</Form.Label>
                                <Form.Control as="textarea" rows={3} value={text} onChange={e => { setText(e.target.value) }} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label id="MMP-reviews-formlabel">Do you recommend this activity?</Form.Label>
                                <ButtonGroup toggle>
                                    <ToggleButton id="MMP-reviews-recommend" type="radio" variant="success" checked={recommend} onChange={() => setRecommend(true)} style={recommend ? { backgroundColor: "rgb(77, 163, 77)", border: "none" } : { backgroundColor: "#BBBBBB", border: "none" }}>
                                        Recommend
                                    </ToggleButton>
                                    <ToggleButton id="MMP-reviews-notrecommend" type="radio" variant="danger" checked={!recommend} onChange={() => setRecommend(false)} style={recommend ? { backgroundColor: "#BBBBBB", border: "none" } : { backgroundColor: "red", border: "none" }}>
                                        Not Recommend
                                    </ToggleButton>
                                </ButtonGroup>
                            </Form.Group>
                            <Form.Group controlId="MMP-range">
                            <Form.Label id="MMP-reviews-formlabel">Easy to start</Form.Label>
                                    <RangeSlider value={range[0]} max={10} step={1} variant='success' onChange={e => setRange([parseInt(e.target.value), range[1], range[2], range[3], range[4]])} />
                                    <Form.Label id="MMP-reviews-formlabel">Cost-effective</Form.Label>
                                    <RangeSlider value={range[1]} max={10} step={1} variant='success' onChange={e => setRange([range[0], parseInt(e.target.value), range[2], range[3], range[4]])} />
                                    <Form.Label id="MMP-reviews-formlabel">Schedule-flexible</Form.Label>
                                    <RangeSlider value={range[2]} max={10} step={1} variant='success' onChange={e => setRange([range[0], range[1], parseInt(e.target.value), range[3], range[4]])} />
                                    <Form.Label id="MMP-reviews-formlabel">Safe</Form.Label>
                                    <RangeSlider value={range[3]} max={10} step={1} variant='success' onChange={e => setRange([range[0], range[1], range[2], parseInt(e.target.value), range[4]])} />
                                    <Form.Label id="MMP-reviews-formlabel">Good for health</Form.Label>
                                    <RangeSlider value={range[4]} max={10} step={1} variant='success' onChange={e => setRange([range[0], range[1], range[2], range[3], parseInt(e.target.value)])} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '0', paddingBottom: '10px'}}>
                        <Button variant="primary" onClick={clickRYes}>
                            Submit
                        </Button>
                        <Button variant="danger" onClick={clickRNo}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={remove} onHide={clickXNo}>
                    <Modal.Header closeButton style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingBottom:'5px'}}>
                        <Modal.Title>Remove your Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '5px', paddingBottom: '0'}}>
                        <p style={{fontFamily:'arial', color: 'black', fontSize:'20px', marginLeft:'20px', marginRight:'20px'}}>Are you sure you remove your review?</p>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: '#eeeeee', color: 'black', border: 'none', paddingTop: '0', paddingBottom: '10px'}}>
                        <Button variant="danger" onClick={clickXYes}>
                            Remove
                        </Button>
                        <Button variant="secondary" onClick={clickXNo}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                <h3>Positive Opinions</h3>
                {!reviewlist.length ?
                <div style={{margin: "30px 20px", fontSize: "20px", color: "grey"}}>There is no positive review.</div>
                :
                <div id="MMP-reviews-positive">
                    {reviewlist.map(rev => {
                            if (rev['isPositive']) {
                                if (rev['name'] == username) {
                                    return <Review reviewId={rev['reviewId']} docId={docId} isPositive={true} isMe={true} name={rev['name']} years={rev['years']} achiev={rev['achiev']} content={rev['content']} data={rev['data']} like={rev['like']} photourl={imgs()} clickReview={clickReview} clickRemove={clickRemove} />
                                }
                                else {
                                    return <Review reviewId={rev['reviewId']} docId={docId} isPositive={true} isMe={false} name={rev['name']} years={rev['years']} achiev={rev['achiev']} content={rev['content']} data={rev['data']} like={rev['like']} photourl={rev['photourl']} />
                                }
                            }
                        })}
                </div>
                }
                <h3>Negative Opinions</h3>
                {!reviewlist.length ?
                <div style={{margin: "30px 20px", fontSize: "20px", color: "grey"}}>There is no negative review.</div>
                :
                <div id="MMP-reviews-negative">
                    {reviewlist.map(rev => {
                            if (!rev['isPositive']) {
                                if (rev['name'] == username) {
                                    return <Review reviewId={rev['reviewId']} docId={docId} isPositive={false} isMe={true} name={rev['name']} years={rev['years']} achiev={rev['achiev']} content={rev['content']} data={rev['data']} like={rev['like']} photourl={imgs()} clickReview={clickReview} clickRemove={clickRemove} />
                                }
                                else {
                                    return <Review reviewId={rev['reviewId']} docId={docId} isPositive={false} isMe={false} name={rev['name']} years={rev['years']} achiev={rev['achiev']} content={rev['content']} data={rev['data']} like={rev['like']} photourl={rev['photourl']} />
                                }
                            }
                        })}
                </div>
                }
            </div>
        </div>
    )
}

export default ProgressDocument;