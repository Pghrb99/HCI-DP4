import React from 'react'
import {IoBan, IoCloseCircle} from 'react-icons/io5'
import {FaPlus} from 'react-icons/fa'
import './Tag.scss'

const Tag = ({name, isInclude, onRemove}) => {
    if (isInclude){
        return (
            <li className="Include">
                <FaPlus color="white" className="tag-icon"/>
                <span className="tagName">{name}</span>
                <span className="wrapper" onClick={() => onRemove && onRemove(name)}>
                    <IoCloseCircle className="tag-close-icon"/>
                </span>
            </li>
        )
    }

    return (
        <li className="Exclude">
            <IoBan color="white" className="tag-icon"/>
            <span className="tagName">{name}</span>
            <span className="wrapper" onClick={() => onRemove && onRemove(name)}>
                <IoCloseCircle className="tag-close-icon"/>
            </span>
        </li>
    )
    
}

export default Tag
