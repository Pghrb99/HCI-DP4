import React from 'react'
import Tag from '../Tag/Tag'
import './Tags.scss'

const Tags = ({tags}) => {
    return (
        <ul className='Applied-Tags'>
            {tags.map((tag) => (
                <Tag 
                    key={tag.name}
                    name={tag.name} 
                    isInclude={tag.isInclude}
                />
            ))}
        </ul>
    )
}

export default Tags
