import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TopBar from './Sections/TopBar/TopBar'
import CardContainer from './Sections/CardContainer/CardContainer'
import img1 from './Sections/imgs/ice_hockey.jpg'
import SearchOptions from './Sections/SearchOptions/SearchOptions'
import Sidemenu from '../TagSearchPage/Sections/SideMenu/Sidemenu'


const TagSearchResultPage = () => {
    const cards = [
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
        chartData:[1,2,3,4,5]

    },
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
        chartData:[1,2,3,4,5]

    },
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
        chartData:[1,2,3,4,5]

    },
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
        chartData:[1,2,3,4,5]

    },
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
        chartData:[1,2,3,4,5]

    },
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
        chartData:[1,2,3,4,5]

    },
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
        chartData:[1,2,3,4,5]

    },
    ]
    return (
        <div>

            <Sidemenu/>
            <TopBar tags={[{name: "Hi", isInclude: true},{name: "Bye", isInclude: false}]} isSignedIn={false} name={"Changhae"}/>
            <SearchOptions />
            <CardContainer cards={cards}/>            
        </div>
    )
}

export default TagSearchResultPage
