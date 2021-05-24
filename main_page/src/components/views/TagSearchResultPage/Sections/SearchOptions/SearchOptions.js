import React from 'react'
import {Col} from 'react-bootstrap'
import InputSlider from '../InputSlider/InputSlider'
import './SearchOptions.scss'
import PrioritySelect from '../PrioritySelect/PrioritySelect'
const SearchOptions = ({onPriorityChange}) => {
    return (
        <div className="SerachOptions">
            <PrioritySelect onPriorityChange={onPriorityChange}/>
        </div>
    )
}

export default SearchOptions
