import React from 'react'
import Tag from '../Tag/Tag'
import './Tags.scss'

const Tags = ({tags, onRemove}) => {
    return (
        <ul className='Tags'>
            {tags.map((tag) => (
                <Tag 
                    key={tag.name} 
                    name={tag.name} 
                    isInclude={tag.isInclude}
                    onRemove={onRemove} 
                />
            ))}
        </ul>
    )
}

export default Tags
