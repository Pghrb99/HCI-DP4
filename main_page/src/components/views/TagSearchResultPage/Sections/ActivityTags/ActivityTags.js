import React from 'react'
import ActivityTag from '../ActivityTag/ActivityTag'
import './ActivityTags.scss'

const ActivityTags = ({tags}) => {
    return (
        <ul className='ActivityTags'>
            {tags.map((tag) => (
                <ActivityTag 
                key={tag.name}
                name={tag.name}/>
            ))}
        </ul>
    )
}

export default ActivityTags
