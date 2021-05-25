import React,{useState, useEffect} from 'react'
import TopBar from './Sections/TopBar/TopBar'
import CardContainer from '../TagSearchResultPage/Sections/CardContainer/CardContainer'
import Sidemenu from '../SideMenu/Sidemenu'
import img1 from './Sections/imgs/ice_hockey.jpg'
import { Divider, Tabs, Typography } from 'antd'
import { useAuth } from '../../../contexts/AuthContext'
import {db} from 'firebase.js'
import './HotActivityPage.scss'

const HotActivityPage = () => {
    const { Title } = Typography;
    const { TabPane } = Tabs;
    const {currentUser} = useAuth();
    const [priority, setPriority] = useState(0);
    const [cards, setCards] = useState([]);
    const [popularCards, setPopularCards] = useState([]);
    const [allCards, setAllCards] = useState([]);
   
    
    useEffect(() => {
        db.collection('Activities').get().then(querySnapshot => {
            let result = [];
            for (let i in querySnapshot.docs) {
                const doc = querySnapshot.docs[i];
                result.push({
                    name: doc.get("name"),
                    img: doc.get("cardImg"),
                    tags: Object.keys(doc.get("tags")).map(x => ({name: x})),
                    chartData: doc.get("numerics"),
                    key: doc.id,
                    docId: doc.id,
                    numOfUsers: doc.numOfUsers
                });
            }
            setAllCards(result);
            setCards(topFourNumericCards(result, 0));
            setPopularCards(topFourPopularCards(result));
        });
        
    }, []);

    const topFourNumericCards = (allCards, priority) => {
        const sortedCards = [...allCards].sort((x,y) => (y.chartData[priority]-x.chartData[priority]));
        const n = allCards.length < 4 ? allCards : 4;
        return sortedCards.slice(0, n);
    }


    const topFourPopularCards = (allCards) => {
        const sortedCards = [...allCards].sort((x,y) => (y.numOfUsers-x.numOfUsers));
        const n = allCards.length < 4 ? allCards : 4;
        return sortedCards.slice(0, n);
    }

    const onChange = (value) => {
        setCards(topFourNumericCards(allCards, value));
    }


    return (
        <div className="HAP">
            <Sidemenu/>
            <TopBar userName={currentUser && currentUser.email} isSignedIn={currentUser}/>
            <Title className="section-title" level={2}>Top Rated</Title>
            <Tabs
            className="Tabs" 
            tabBarGutter={20}
            size={"large"}
            onChange={onChange}
            defaultActiveKey={0}> 
                <TabPane tab="Easy to Start" key={0} className="TabPane">
                </TabPane>
                <TabPane tab="Cost-effective" key={1} className="TabPane">
                </TabPane>
                <TabPane tab="Schedule-flexible" key={2} className="TabPane">
                </TabPane>
                <TabPane tab="Safe" key={3} className="TabPane">
                </TabPane>
                <TabPane tab="Good for health" key={4} className="TabPane">
                </TabPane>
            </Tabs>
            <CardContainer cards={cards}/>
            <Divider />
            <Title className="section-title" level={2}>Popular</Title>
            <CardContainer cards={popularCards}/>
        </div>
    )
}

export default HotActivityPage
