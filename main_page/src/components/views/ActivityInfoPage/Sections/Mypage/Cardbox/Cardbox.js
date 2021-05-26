import React, {useState, useEffect} from 'react'
import {Col, Row, Container} from 'react-bootstrap'
import ActivityCard from '../ActivityCard/ActivityCard'
import './Cardbox.scss'
import Userinfo from './Userimfo/Userimfo'
// import Container from 'react-bootstrap'
import {db} from '../../../../../../firebase'

const Cardbox = (userName) => {
    
    const [progressCards, setprogressCard] = useState([]);
    const [endCards, setendCard] = useState([]);
    const [allprogressCards, setprogressCards] = useState([]);
    const [allendCards, setendCards] = useState([]);

    console.log("a0")
    useEffect(() => {

        console.log("a01")
        let progressCard =[];
        let endCard = [];

    async function first() {

        let actRef  = db.collection('UserInfo').doc(userName.userName).collection('Activities');
        const snapshot2 = await actRef.get();
        snapshot2.forEach(doc => {
            if(doc.data().state == true){
                endCard.push({
                    name:doc.data().name,
                    docId:doc.id
                });
                console.log("a1")
            }
            else{
                progressCard.push({
                name:doc.data().name,
                docId:doc.id
            });
            console.log("a2")
            }
        })
        console.log("a3")
        // await setprogressCard(progressCard);
            console.log("a3-1")  
            console.log(endCard)  
        // await setendCard(endCard);
    }
    first().then( () => {
    let progressresultCard =[];
    let endresultCard = []; 
    console.log(endCard) 
    console.log("a4")
    console.log(progressCard.length != 0)
    if(progressCard.length != 0){
        console.log("a4-1")
    let snapshota1 = db.collection('Activities');
    snapshota1.get().then((querySnapshot => {
        for (let i in querySnapshot.docs) {
            const doc = querySnapshot.docs[i];
            for(let j=0; j<progressCard.length; j++){
            if(progressCard[j].name == doc.get("name")){
                progressresultCard.push({ 
                    name:doc.get("name"),
                    tags : Object.keys(doc.get("tags")).map(x => ({name: x})),
                    img: doc.get("cardImg"),
                    key: doc.id,
                    docId:progressCard[j].docId
                });
                console.log("a5")
            }
            }
        }
        console.log("a6")
        setprogressCards(progressresultCard);
    }))
    }
    console.log(endCard)
    console.log(endCard.length != 0)
    if(endCard.length != 0){
        console.log(endCard)
    let snapshota2 = db.collection('Activities');
    snapshota2.get().then((querySnapshot => {
        for (let i in querySnapshot.docs) {
            const doc = querySnapshot.docs[i];
            for(let j=0; j<endCard.length; j++){
            if(endCard[j].name == doc.get("name")){
                
                endresultCard.push({ 
                    name:doc.get("name"),
                    tags : Object.keys(doc.get("tags")).map(x => ({name: x})),
                    img: doc.get("cardImg"),
                    key: doc.id,
                    docId:endCard[j].docId
                });
                console.log("a7")
            }
            }
        }
        console.log("a8")
        setendCards(endresultCard);
    }))
    }
    })
    console.log("a9")
    }, []);

    console.log("a10")

// if(allendCards.length != 0 || allprogressCards.length != 0){
    return (
    <div className="Cardbox">
    { console.log("a11")}
    {/* {console.log(endCards)} */}
        <div id="cardbox-left">
        <Userinfo userEmail={userName.userName}/>
        </div>

        <div id="cardbox-right">
                <div id="cardbox-right-up">


                    <Row xs={1} md={2}>
                    {allprogressCards.map((card) => (
                        
                        <Col lg="3" className="card-column">
                            
                            <ActivityCard 
                                userEmail={userName.userName}
                                key={card.key}
                                title={card.name} 
                                imgSrc={card.img.src}
                                tags={card.tags}
                                docId={card.docId}
                            />
                        </Col>
                        
                        ))}
                    </Row>

                </div>

                <div id="cardbox-right-down">
                    <Row xs={1} md={2}>
                    {allendCards.map((card) => (
                        
                        <Col lg="3" className="card-column">
                            
                            <ActivityCard 
                                userEmail={userName.userName}
                                key={card.key}
                                title={card.name} 
                                imgSrc={card.img.src}
                                tags={card.tags}
                                docId={card.docId}
                            />
                        </Col>
                        
                        ))}
                    </Row>
                </div>

        </div>

    </div>
    
    )
}

// else return (<div>
//     Can't find page
//     </div>
//     )
// }
export default Cardbox
