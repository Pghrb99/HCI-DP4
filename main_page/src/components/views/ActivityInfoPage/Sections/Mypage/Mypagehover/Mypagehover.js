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

    (async () => {  
        let actReffleftzz  = db.collection('UserInfo').doc(userEmail).collection('Activities').doc(hoverdocId).collection('Achievements');
        const snapshot3 = await actReffleftzz.get();
        snapshot3.forEach( (doc) => {
                if(doc.get("isSelected") == true){
                    if(doc.get("isCompleted") == true){
                        temptextend.push({ name:doc.get("name"), 
                        description: doc.get("explain")})
                        tempcountend++;
                    }
                    else{
                        temptextprogress.push({ name:doc.get("name"), 
                        description: doc.get("explain")})
                        tempcountprogress++;
                    }
            }
        })
        settextend(temptextend);
        settextprogress(temptextprogress);
        setprogress(tempcountprogress);
        setend(tempcountend);
        setlength(tempcountend + tempcountprogress);
    })();
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
        context = <p>Done Achievements</p>
        let num = 1;
        for(let i=0; i<textend.length; i++){
            context1.push(<div> {num}) {textend[i].name} </div>);
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