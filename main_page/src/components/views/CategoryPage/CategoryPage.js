import React from 'react'
import TopBar from './Sections/TopBar/TopBar'
import CardContainer from './Sections/CardContainer/CardContainer'
import Sidemenu from '../TagSearchPage/Sections/SideMenu/Sidemenu'
import img1 from './Sections/imgs/ice_hockey.jpg'

const CategoryPage = () => {
    
    const cards = [
        {
            title: "Adventure",
            img: {alt: "Adventure", src: img1}
        },
        {
            title: "Adventure",
            img: {alt: "Adventure", src: img1}
        },
        {
            title: "Adventure",
            img: {alt: "Adventure", src: img1}
        },
        {
            title: "Adventure",
            img: {alt: "Adventure", src: img1}
        },
        {
            title: "Adventure",
            img: {alt: "Adventure", src: img1}
        }
    ]


    return (
        <div>
            <Sidemenu/>
            <TopBar tags={[{name: "Hi", isInclude: true},{name: "Bye", isInclude: false}]} isSignedIn={false} name={"Changhae"}/>
            <CardContainer cards={cards}/>
        </div>
    )
}

export default CategoryPage
