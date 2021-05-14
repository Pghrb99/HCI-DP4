import React from 'react'
import './Tag.scss'

const Tag = ({name}) => {
    return (
        <li className="Tag">
            <span className="tagName">{name}</span>
        </li>
    )
}

export default Tag
