import React, {useState, useEffect} from 'react'
import TopBar from './Sections/TopBar/TopBar'
import CardContainer from './Sections/CardContainer/CardContainer'
import Sidemenu from '../SideMenu/Sidemenu'
import img1 from './Sections/imgs/ice_hockey.jpg'
import {db} from 'firebase.js'
import { useHistory } from 'react-router'
import { useAuth } from '../../../contexts/AuthContext'


const CategoryPage = () => {
    
    const {currentUser} = useAuth();
    const [cards, setCards] = useState([]);
    const history = useHistory();
    const onClick = (category) => {
      history.push({
        pathname: '/result',
        state: {
          category: category
        }
      })
    }

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
            <TopBar tags={[{name: "Hi", isInclude: true},{name: "Bye", isInclude: false}]} userName={currentUser && currentUser.email} isSignedIn={currentUser}/>
            <CardContainer cards={cards} onClick={onClick}/>
        </div>
    )
}

export default CategoryPage
