import React from 'react'
import {Col} from 'react-bootstrap'
import InputSlider from '../InputSlider/InputSlider'
import './SearchOptions.scss'
import PrioritySelect from '../PrioritySelect/PrioritySelect'
const SearchOptions = () => {
    return (
        <div className="SerachOptions">
            <PrioritySelect/>
        </div>
    )
}

export default SearchOptions
