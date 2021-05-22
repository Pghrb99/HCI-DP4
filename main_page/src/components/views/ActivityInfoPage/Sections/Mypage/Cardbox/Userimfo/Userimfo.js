import React from 'react'
import './Userimfo.scss'
import hockey_world_1400 from '../../../imgs/hockey_world_1400.png'
const Userimfo = (imfo) => {

    const image = {
        backgroundPosition :"center",
        backgroundImage: 'url(' + hockey_world_1400 +')',
    //    height : "75vh";
    //    width : "100vw";
       height : "130px",
       width : "250px",
    // backgroundColor: 'aqua',
    // backgroundRepeat: no-repeat;
    backgroundPosition: 'center',
    backgroundSize: 'cover',
        // opacity : "0.7"
        marginTop : '100px',
        marginLeft: '50px'
    }

    return (
    <div id = 'maincontext' >
        {/* <div style={image} > </div> */}
        <br/>
        <p id = 'userimfo' > User Imfo </p>
        <p> Name : Kimminseok </p>
        <p> Age(Sex) : 23(M) </p>
        <p> Phone-number : 010-1234-5678 </p>
        <p> Email : kaist@kaist.ac.kr </p>
        <p> Favorite Tags : Soccer.. </p>
        <p> Hobbies in Progress : 4 </p>
        <p> completed Hobbies  : 2 </p>
        <p> About Me  :  <br/>
        
         </p>
        {/* <p> Name : imfo.name </p>
        <p> Age(Sex) : imfo.age(imfo.sex) </p>
        <p> Phone-number : imfo.phonenumber </p>
        <p> Email : imfo.email </p>
        <p> Favorite Tags : imfo.tags </p>
        <p> Hobbies in Progress : imfo.Progresshobbies </p>
        <p> completed Hobbies  : imfo.completedHobbies </p> 
        <p> About Me  :  <br/>
        imfo.content  </p>
         */}


        



    </div>

    
    )
}




export default Userimfo