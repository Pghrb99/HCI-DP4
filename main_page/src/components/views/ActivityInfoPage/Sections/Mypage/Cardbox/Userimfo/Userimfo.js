import './Userimfo.scss'
import React, {useState, useEffect} from 'react';
import {db} from '../../../../../../../firebase'
import { Card } from 'antd';

const Userinfo = (userEmail) => {
const [userdata, setresult] = useState([]);
const [ongoingnum, setongoing] = useState(0);
const [endnum, setend] = useState(0);
let ongoingact = 0; 
let endact = 0; 
useEffect(() => {
console.log(userEmail.userEmail)

        let userinfo = []
        let snapshot1 = db.collection('UserInfo').doc(userEmail.userEmail);
        snapshot1.get().then((doc => {
                userinfo.push({ 
                        name : doc.get("name"),
                        phoneNumber : doc.get("phone"),
                        sex : doc.get("gender"),
                        email : doc.get("email"),
                        age : doc.get("age"),
                        birthday : doc.get("birthday"),
                        aboutMe: doc.get("aboutme")
                    });
                
                setresult(userinfo);
    }));


    (async () => {
        let actRef  = db.collection('UserInfo').doc(userEmail.userEmail).collection('Activities');
        const snapshot2 = await actRef.get();
        snapshot2.forEach(doc => {
            if(doc.data().isComplete == true){
                endact++;
            }
            else ongoingact++;
            })
            setongoing(ongoingact);
            setend(endact);
        })();  


        }, []);
    

    if(userdata[0] != undefined){
    return (
    <Card id="MP-userinfo-card"title="User Info" style={{ width: "100%" }} headStyle={{ fontSize: "30px" }} bodyStyle={{ fontSize: "20px", paddingLeft:'0', margin:'0' }}>
        <p> Name : {userdata[0].name} </p>
        <p> Birthday : {userdata[0].birthday} </p>
        <p> Age(Sex) : {userdata[0].age}({userdata[0].sex}) </p>
        <p> Phone-number : {userdata[0].phoneNumber} </p>
        <p> Email : {userdata[0].email} </p>
        <p> Hobbies in Progress : {ongoingnum} </p>
        <p> Completed Hobbies  : {endnum} </p>
        {/*<p> About Me : <br/> 
        <span>&nbsp;&nbsp;&nbsp;{userdata[0].aboutMe}</span> </p>*/}
        <p> About Me : {userdata[0].aboutMe}</p>
    </Card>
    
    )
}
else return (<div>
    Can't find userdata
    </div>
    )
}

export default Userinfo