import React from 'react';
import './NewTag.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';


const Tag = ({ name, isAdd }) => {
    if (isAdd) {
        return (
            <Button className="addtag">
                <FontAwesomeIcon icon={faTag} style={{marginRight:'10px'}}/>
                <span className="newtagName">{name}</span>
            </Button>
        )
        
    }

    else {
        return (
            <Button className="notaddtag">
                <FontAwesomeIcon icon={faTag} style={{marginRight:'10px'}}/>
                <span className="newtagName">{name}</span>
            </Button>
        )
    }

}

export default Tag
