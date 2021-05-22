import React from 'react'
import TopBar from './Sections/TopBar/TopBar'
import SectionContainer from './Sections/SectionContainer/SectionContainer'
import Sidemenu from '../TagSearchPage/Sections/SideMenu/Sidemenu'
import img1 from './Sections/imgs/ice_hockey.jpg'

const HotActivityPage = () => {
    
    const cards = {
        topRated: [
        {
            name: "Ice Hockey",
            imgSrc: img1,
            tags:[{name: "Soccer"},{name : "Ice Hockey"},{name: "Soccer"},{name: "Soccer"},{name: "Soccer"}],
            chartData:[1,2,3,4,5]
    
        },
        {
            name: "Ice Hockey",
            imgSrc: img1,
            tags:[{name: "Soccer"},{name : "Ice Hockey"},{name: "Soccer"},{name: "Soccer"},{name: "Soccer"}],
            chartData:[5,7,5.6,9,10]
    
        },
        {
            name: "Ice Hockey",
            imgSrc: img1,
            tags:[{name: "Soccer"},{name : "Ice Hockey"},{name: "Soccer"},{name: "Soccer"},{name: "Soccer"}],
            chartData:[1.2,9,3,4.6,10]
    
        },
        {
            name: "Ice Hockey",
            imgSrc: img1,
            tags:[{name: "Soccer"},{name : "Ice Hockey"},{name: "Soccer"},{name: "Soccer"},{name: "Soccer"}],
            chartData:[10,2.5,6,8,10]
    
        }],

        trending: [
            {
                name: "Ice Hockey",
                imgSrc: img1,
                tags:[{name: "Soccer"},{name : "Ice Hockey"},{name: "Soccer"},{name: "Soccer"},{name: "Soccer"}],
                chartData:[1,2,3,4,5]
        
            },
            {
                name: "Ice Hockey",
                imgSrc: img1,
                tags:[{name: "Soccer"},{name : "Ice Hockey"},{name: "Soccer"},{name: "Soccer"},{name: "Soccer"}],
                chartData:[5,7,5.6,9,10]
        
            },
            {
                name: "Ice Hockey",
                imgSrc: img1,
                tags:[{name: "Soccer"},{name : "Ice Hockey"},{name: "Soccer"},{name: "Soccer"},{name: "Soccer"}],
                chartData:[1.2,9,3,4.6,10]
        
            },
            {
                name: "Ice Hockey",
                imgSrc: img1,
                tags:[{name: "Soccer"},{name : "Ice Hockey"},{name: "Soccer"},{name: "Soccer"},{name: "Soccer"}],
                chartData:[10,2.5,6,8,10]
        
            }],
        
        recommendations: [
            {
                name: "Ice Hockey",
                imgSrc: img1,
                tags:[{name: "Soccer"},{name : "Ice Hockey"},{name: "Soccer"},{name: "Soccer"},{name: "Soccer"}],
                chartData:[1,2,3,4,5]
        
            },
            {
                name: "Ice Hockey",
                imgSrc: img1,
                tags:[{name: "Soccer"},{name : "Ice Hockey"},{name: "Soccer"},{name: "Soccer"},{name: "Soccer"}],
                chartData:[5,7,5.6,9,10]
        
            },
            {
                name: "Ice Hockey",
                imgSrc: img1,
                tags:[{name: "Soccer"},{name : "Ice Hockey"},{name: "Soccer"},{name: "Soccer"},{name: "Soccer"}],
                chartData:[1.2,9,3,4.6,10]
        
            },
            {
                name: "Ice Hockey",
                imgSrc: img1,
                tags:[{name: "Soccer"},{name : "Ice Hockey"},{name: "Soccer"},{name: "Soccer"},{name: "Soccer"}],
                chartData:[10,2.5,6,8,10]
        
            }],
    
    };


    return (
        <div>
            <Sidemenu/>
            <TopBar tags={[{name: "Hi", isInclude: true},{name: "Bye", isInclude: false}]} isSignedIn={false} name={"Changhae"}/>
            <SectionContainer sectionName={"Top Rated"} cards={cards.topRated}/>
            <SectionContainer sectionName={"Trending"} cards={cards.trending}/>
            <SectionContainer sectionName={"Recommendations"} cards={cards.recommendations}/>
        </div>
    )
}

export default HotActivityPage
