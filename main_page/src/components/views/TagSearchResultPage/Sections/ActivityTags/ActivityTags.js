import React from 'react'
import ActivityTag from '../ActivityTag/ActivityTag'
import './ActivityTags.scss'

const ActivityTags = ({tags}) => {
    return (
        <ul className='ActivityTags'>
            {tags.map((tag) => (
                <ActivityTag name={tag.name}/>
            ))}
        </ul>
    )
}

export default ActivityTags
