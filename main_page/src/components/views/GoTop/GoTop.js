import React from 'react';
import './GoTop.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const GoTop = () => {
    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <div id="gotop" onClick={scrollTop}><FontAwesomeIcon icon={faArrowUp}/></div>
    )
}


export default GoTop;