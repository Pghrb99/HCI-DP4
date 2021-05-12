import React from 'react'
import Tag from './Tag'
import './Tags.scss'

const Tags = ({tags}) => {
    return (
        <ul className='Tags'>
            {tags.map((tag) => (
                <Tag key={tag.id} name={tag.name} isInclude={tag.isInclude}></Tag>
            ))}
        </ul>
    )
}

export default Tags
