import React from 'react'
import './Mypagehover.scss'
import ProgressBar from 'react-bootstrap/ProgressBar'

const Mypagehover = ({progress, Achievement}) => {

    const num = 60;

    let Achievements = {prgress:100, Achievement:[{content:'abd',complete:0},{content:'asdvwra',complete:0},{content:'wetery',complete:1}]}
    
    let context; 
    let context1=[]; 

    if(Achievements.prgress != 100){
        context = <p>Remaining Achievements</p>
        let num = 1;
        for(let i=0; i<Achievements.Achievement.length; i++){
            if(Achievements.Achievement[i].complete==0){
                context1.push(<div> {num}:{Achievements.Achievement[i].content}</div>)
                num++;
            }
        }
    }
    else{
        context = <p>Achievements completed</p>
        let num = 1;
        for(let i=0; i<Achievements.Achievement.length; i++){
            context1.push(<div>{num} : {Achievements.Achievement[i].content}</div>)
            num++;
        }
    }
    


    return (    <div>
        <p>Achivement Progress</p>
        <ProgressBar now={num} label={`${num}%`} />
        <br/>

        {context}
        {context1}

        
        </div>
        
    )

}


export default Mypagehover