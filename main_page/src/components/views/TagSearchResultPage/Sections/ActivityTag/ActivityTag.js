import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './ActivityTag.scss'

const ActivityTag = ({ name, maker }) => {

    return (maker ?
        <OverlayTrigger placement="top" overlay={(maker == 'default') ? <Tooltip>Default</Tooltip> : <Tooltip>Maker: {maker}</Tooltip>}>
            <li className="ActivityTag">
                <span className="tagName">{name}</span>
            </li>
        </OverlayTrigger>
        :
        <li className="ActivityTag">
            <span className="tagName">{name}</span>
        </li>
    );
    
}

export default ActivityTag