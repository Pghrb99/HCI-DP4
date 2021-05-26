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
        for(let i=0; i<doc.get("achievement").length;i++){
            if(doc.get("achievement")[i].isSelected == true){
            if(doc.get("achievement")[i].isCompleted == true){
                temptextend.push({ name:doc.get("achievement")[i].name, description: doc.get("achievement")[i].explain})
                tempcountend++;
            }
            else{
                temptextprogress.push({ name:doc.get("achievement")[i].name, description: doc.get("achievement")[i].explain})
                tempcountprogress++;
            }
        }
        }

        settextend(temptextend);
        settextprogress(temptextprogress);
        setprogress(tempcountprogress);
        setend(tempcountend);
        setlength(tempcountend + tempcountprogress);
        }))
        }, []);


    let context; 
    let context1=[]; 


    if(countend != countlength){
        let num =1;
        context = <p>Remaining Achievements</p>
        for(let i=0; i<textprogress.length; i++){
                context1.push(<div> {num}) {textprogress[i].name} </div>);
                num++;
        }
    }
    
    else{
        context = <p>Achievements completed</p>
        let num = 1;
        for(let i=0; i<textend.length; i++){
            context1.push(<div> {num}. {textend[i].name} : {textend[i].description}</div>)
            num++;
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