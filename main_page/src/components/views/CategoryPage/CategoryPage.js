import React, {useState, useEffect} from 'react'
import TopBar from './Sections/TopBar/TopBar'
import CardContainer from './Sections/CardContainer/CardContainer'
import Sidemenu from '../TagSearchPage/Sections/SideMenu/Sidemenu'
import img1 from './Sections/imgs/ice_hockey.jpg'
import {db} from 'firebase.js'

const CategoryPage = () => {
    
    const [cards, setCards] = useState([]);

    useEffect(() => {
        db.collection("Categories").orderBy("name").get().then(querySnapshot => {
            let result=[];
            querySnapshot.forEach(doc => {
                result.push({
                    title: doc.get("name"),
                    img: doc.get("img")
                })
            })
            setCards(result);
        });
    }, []);
    
    

    return (
        <div>
            <Sidemenu/>
            <TopBar tags={[{name: "Hi", isInclude: true},{name: "Bye", isInclude: false}]} isSignedIn={false} name={"Changhae"}/>
            <CardContainer cards={cards}/>
        </div>
    )
}

export default CategoryPage
