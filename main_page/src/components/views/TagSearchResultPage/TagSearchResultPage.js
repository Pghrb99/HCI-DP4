import React, {useState, useEffect} from 'react'
import TopBar from './Sections/TopBar/TopBar'
import CardContainer from './Sections/CardContainer/CardContainer'
import SearchOptions from './Sections/SearchOptions/SearchOptions'
import Sidemenu from '../SideMenu/Sidemenu'
import {Typography} from 'antd'
import { useLocation } from 'react-router'
import {db} from 'firebase.js'
import { useAuth } from '../../../contexts/AuthContext'


const TagSearchResultPage = () => {
    const {currentUser} = useAuth();
    const location = useLocation();
    const {Title} = Typography;
    const tags = location.state.tags;
    const category = location.state.category;
    const name = location.state.option;
    const [cards, setCards] = useState([]);
    const [noResults, setNoResults] = useState(false);

    const onPriorityChange = (value) => {
        setCards(prev => [...prev].sort((x,y) => (y.chartData[value]-x.chartData[value])));
    }

    useEffect(() => {
        if(typeof category !== 'undefined') {
            let activityRef = db.collection('Activities').where("categories", "array-contains", category);
            let result = [];
            activityRef.get().then((querySnapshot => {
                for (let i in querySnapshot.docs) {
                    const doc = querySnapshot.docs[i]
                    const tagObj = doc.get("tags");
                    result.push( {
                        name: doc.get("name"),
                        img: doc.get("cardImg"),
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
            }));
            return;
        }

        if(typeof tags !== 'undefined') {
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
                        img: doc.get("cardImg"),
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
            }));
        }

        if(typeof name !== 'undefined') {
            let namearray=[];
            let result = [];
            let addcard;
            console.log(name);

            for (let i=0; i<name.length; i++) namearray.push(name[i].value);

            let snapshot = db.collection('Activities');

            snapshot.get().then((querySnapshot => {
                for (let i in querySnapshot.docs) {
                    const doc = querySnapshot.docs[i];
                    if(namearray.indexOf(doc.data().name) != -1 ){
                        result.push({ 
                            name:doc.get("name"),
                            tags : Object.keys(doc.get("tags")).map(x => ({name: x})),
                            chartData: doc.get("numerics"),
                            img: doc.get("cardImg"),
                            key: doc.id
                        });
                    }
                }
                console.log(result);
                result.sort((x,y) => (y.chartData[0]-x.chartData[0]))
                setCards(result);
                // console.log(result);
                if(result.length==0) {
                    setNoResults(true);
                }
            }))
        }
    }, []);

    return (
        <div>
            <Sidemenu/>
            <TopBar tags={tags} category={category} userName={currentUser && currentUser.email} isSignedIn={currentUser}/>
            <SearchOptions onPriorityChange={onPriorityChange}/>
            {!noResults 
            ? <CardContainer cards={cards}/>
            : <Title level={1}
            style={{
                textAlign: "center",
                marginTop: 100,
                color: "grey"
                }}>No Results Found</Title>}            
        </div>
    )
}

export default TagSearchResultPage
