import './Userimfo.scss'
import React, {useState, useEffect} from 'react';
import {db} from '../../../../../../../firebase'

const Userinfo = (userEmail) => {
const [userdata, setresult] = useState([]);
const [ongoingnum, setongoing] = useState([]);
const [endnum, setend] = useState([]);
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
            if(doc.data().state == true){
                ongoingact++;
            }
            else endact++;
            })
            setongoing(ongoingact);
            setend(endact);
        })();  


        }, []);


    if(userdata[0] != undefined){
    return (
    <div id = 'maincontext' >
        {/* <div style={image} > </div> */}
        <br/>
        <p id = 'userimfo' > User Info </p>
        <p> Name : {userdata[0].name} </p>
        <p> birthday : {userdata[0].birthday} </p>
        <p> Age(Sex) : {userdata[0].age}({userdata[0].sex}) </p>
        <p> Phone-number : {userdata[0].phoneNumber} </p>
        <p> Email : {userdata[0].email} </p>
        <p> Hobbies in Progress : {ongoingnum} </p>
        <p> completed Hobbies  : {endnum} </p>
        <p> About Me  : <br/> 
        {userdata[0].aboutMe} </p>
    </div>

    
    )
}
else return (<div>
    Can't find userdata
    </div>
    )
}

export default Userinfo