import React from 'react'
import Tag from '../Tag/Tag'
import './Tags.scss'

const Tags = ({tags, onRemove}) => {
    return (
        <ul className='Tags'>
            {tags.map((tag) => (
                <Tag name={tag.name}/>
            ))}
        </ul>
    )
}

export default Tags
