import React from 'react'
import Tag from '../Tag/Tag'
import './Tags.scss'

const Tags = ({tags}) => {
    return (
        <ul className='Tags'>
            {tags.map((tag) => (
                <Tag 
                    name={tag.name} 
                    isInclude={tag.isInclude}
                />
            ))}
        </ul>
    )
}

export default Tags
