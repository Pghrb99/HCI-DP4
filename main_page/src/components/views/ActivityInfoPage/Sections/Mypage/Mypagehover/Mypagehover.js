import React, {useState, useEffect} from 'react';
import './Mypagehover.scss'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {db} from '../../../../../../firebase'


const Mypagehover = ({hoverdocId, userEmail}) => {

    const [countlength, setlength] = useState(0);
    const [countprogress, setprogress] = useState(0);
    const [countend, setend] = useState(0);
    const [textend, settextend] = useState([]);
    const [textprogress, settextprogress] = useState([]);

useEffect(() => {
    let temptextend =[];
    let temptextprogress =[];
    let tempcountend = 0;
    let tempcountprogress = 0;
    
    let snapshot3  = db.collection('UserInfo').doc(userEmail).collection('Activities').doc(hoverdocId);
    snapshot3.get().then((doc => {
        console.log(doc.get("achievement"))
        for(let i=0; i<doc.get("achievement").length;i++){
            if(doc.get("achievement")[i].finish == true){
                temptextend.push({ name:doc.get("achievement")[i].name, description: doc.get("achievement")[i].description})
                tempcountend++;
            }
            else{
                temptextprogress.push({ name:doc.get("achievement")[i].name, description: doc.get("achievement")[i].description})
                tempcountprogress++;
            }
        }
        settextend(temptextend);
        settextprogress(temptextprogress);
        setprogress(tempcountprogress);
        setend(tempcountend);
        setlength(doc.get("achievement").length);
        }))
        }, []);


    let context; 
    let context1=[]; 



    if(countend != countlength){
        context = <p>Remaining Achievements</p>
        for(let i=0; i<textprogress.length; i++){
                context1.push(<div> {textprogress[i].name} : {textprogress[i].description}</div>)
        }
    }
    
    else{
        context = <p>Achievements completed</p>
        for(let i=0; i<textend.length; i++){
            context1.push(<div> {textend[i].name} : {textend[i].description}</div>)
        }
    }
    


    return (    <div>
        <p>Achivement Progress</p>
        <ProgressBar now={(countend/countlength)*100} 
        // label={`${num}%`} 
        />
        <br/>

        {context}
        {context1}

        
        </div>
        
    )

}


export default Mypagehover