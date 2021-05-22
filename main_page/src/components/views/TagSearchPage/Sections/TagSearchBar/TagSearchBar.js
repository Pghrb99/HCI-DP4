import React, {useState} from 'react'
import Autocomplete from 'react-autocomplete'
import { AutoComplete, Input} from 'antd';
import Toggle from 'react-toggle'
import Tags from '../Tags/Tags'
import SearchButton from '../SearchButton/SearchButton'
import "../Toggle/Toggle.scss"
import '../TagSearchBar/TagSearchBar.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const TagSearchBar = () => {
    const [mode, setMode] = useState(true);
    const [tags, setTags] = useState([]);
    const [text, setText] = useState("");
    const [options, setOptions] = useState([
        {value: 'Water', label: 'Water'},
        {value: 'Outdoor', label: 'Outdoor'},
        {value: 'Extreme', label: 'Extreme'},
        {value: 'Relax', label: 'Relax'},
        {value: 'Solo', label: 'Solo'},
        {value: 'Party', label: 'Party'},
        {value: 'Thrill', label: 'Thrill'},
    ]);

    const onModeChange = (e) => {
        setMode(e.target.checked);
    }

    const onTextChange = (e) => {
        setText(e.target.value);
    }

    const onTextSelect = (val) => {
        const newTag = {
            name: val,
            isInclude: mode,
        };
        setText("");
        setTags([...tags, newTag]);
    }

    // const onSearch = (searchText) => {

    // }
    const onRemove = (name) => {
        setTags(tags.filter(tag => tag.name!==name))
    }

    const onBackspaceDown = function(e) {
        if(e.keyCode === 8 && text.length === 0) {
            setTags(tags.slice(0, -1))
        }
    }

    return (
        <div className="TagSearchBar">
            <div>
                <Toggle className="Toggle"
                    defaultChecked={true}
                    icons={{
                        checked: <div className="toggle-message-include">Include</div>,
                        unchecked: <div className="toggle-message-exclude">Exclude</div>
                    }}
                    onClick={onModeChange}
                />
            </div>

            <div className="inputField" >
                <Tags tags={tags} onRemove={onRemove}/>
                <AutoComplete
                value={text}
                options={options}
                onSelect={onTextSelect}
                open={text.length >= 2}
                // onSearch={onSearch}
                backfill={true}
                defaultActiveFirstOption={true}
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    && !tags.map(x => x.name).includes(option.value)
                }
                >
                    <Input
                        placeholder="Enter tags"
                        className="input"
                        style={{ width: 100, height: 48 }}
                        onChange={onTextChange}
                    />

                </ AutoComplete>
            </div>
            <div>
                {/*<FontAwesomeIcon icon={faSearch}/>*/}
                <SearchButton />
            </div>
        </div>
        
    )
}

export default TagSearchBar
