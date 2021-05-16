import React from 'react'
import './ActivityTag.scss'

const ActivityTag = ({name}) => {
    return (
        <li className="ActivityTag">
            <span className="tagName">{name}</span>
        </li>
    )
}

export default ActivityTag
