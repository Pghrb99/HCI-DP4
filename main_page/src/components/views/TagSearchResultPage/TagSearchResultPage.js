import React, {useState, useEffect} from 'react'
import TopBar from './Sections/TopBar/TopBar'
import CardContainer from './Sections/CardContainer/CardContainer'
import SearchOptions from './Sections/SearchOptions/SearchOptions'
import Sidemenu from '../TagSearchPage/Sections/SideMenu/Sidemenu'
import {Typography} from 'antd'
import { useLocation } from 'react-router'
import {db} from 'firebase.js'


const TagSearchResultPage = () => {
    const {Title} = Typography;
    const location = useLocation();
    const tags = location.state.tags;
    const [cards, setCards] = useState([]);
    const [noResults, setNoResults] = useState(false);

    const onPriorityChange = (value) => {
        setCards(prev => [...prev].sort((x,y) => (y.chartData[value]-x.chartData[value])));
    }

    useEffect(() => {
        let activityRef = db.collection('Activities');
        tags.forEach(tag => {
            if (tag.isInclude) {
                activityRef = activityRef.where(`tags.${tag.name}` , '==' , true);
            }
        });

        const excludeNames = tags.filter(x => !x.isInclude).map(x => x.name);
        let result = [];
        activityRef.get().then((querySnapshot => {
            docsfor: for (let i in querySnapshot.docs) {
                const doc = querySnapshot.docs[i]
                const tagObj = doc.get("tags");
                for (let excludeName of excludeNames) {
                    if(excludeName in tagObj) {
                        continue docsfor;
                    }
                }
                result.push( {
                    name: doc.get("name"),
                    img: doc.get("coverImg"),
                    tags: Object.keys(doc.get("tags")).map(x => ({name: x})),
                    chartData: doc.get("numerics"),
                    key: doc.id
                });
            }
            result.sort((x,y) => (y.chartData[0]-x.chartData[0]))
            setCards(result);
            if(result.length==0) {
                setNoResults(true);
            }
        }))
    }, []);

    return (
        <div>
            <Sidemenu/>
            <TopBar tags={tags} isSignedIn={false} name={"Changhae"}/>
            <SearchOptions onPriorityChange={onPriorityChange}/>
            {!noResults ? <CardContainer cards={cards}/>: <Title level={1}
            style={{
                textAlign: "center",
                marginTop: 100,
                color: "grey"
                }}>No Results Found</Title>}            
        </div>
    )
}

export default TagSearchResultPage
