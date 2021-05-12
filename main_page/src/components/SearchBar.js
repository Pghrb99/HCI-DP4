import React, {useState} from 'react'
import Autocomplete from 'react-autocomplete'
import Tags from './Tags'
import Toggle from 'react-toggle'
import "./Toggle.scss"
import './SearchBar.scss'
import SearchButton from './SearchButton'

const SearchBar = () => {
    const [mode, setMode] = useState(true);
    const [tags, setTags] = useState([]);
    const [text, setText] = useState("");

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
        setTags([...tags, newTag])
        setText("");
    }

    return (
        <div className="SearchBar">
            <div>
                <Toggle className="Toggle"
                    defaultChecked={true}
                    icons={{
                        checked: <div className="toggle-message-include">Include</div>,
                        unchecked: <div className="toggle-message-exclude">Exclude</div>
                    }}
                    onClick={onModeChange}
                    value="hi"
                />
            </div>

            <div className="inputField">
                <Tags tags={tags}/>
                <Autocomplete
                    getItemValue={(item) => item.label}
                    items={[
                    { label: 'apple' },
                    { label: 'banana' },
                    { label: 'pear' }
                    ]}
                    renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.label}
                    </div>
                    }
                    value={text}
                    onChange={onTextChange}
                    onSelect={onTextSelect}
                    inputProps=
                        {{
                            type: 'text',
                            placeholder: 'Enter Tags',
                        }}
                />
            </div>
            <div>
                <SearchButton />
            </div>
        </div>
        
    )
}

export default SearchBar
