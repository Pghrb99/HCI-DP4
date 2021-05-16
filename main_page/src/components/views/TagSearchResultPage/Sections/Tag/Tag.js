import React from 'react'
import {IoBan, IoCloseCircle} from 'react-icons/io5'
import {FaPlus} from 'react-icons/fa'
import './Tag.scss'

const Tag = ({name, isInclude}) => {
    if (isInclude){
        return (
            <li className="Applied-Include">
                <FaPlus color="white" className="tag-icon"/>
                <span className="tagName">{name}</span>
            </li>
        )
    }

    return (
        <li className="Applied-Exclude">
            <IoBan color="white" className="tag-icon"/>
            <span className="tagName">{name}</span>
        </li>
    )
    
}

export default Tag
