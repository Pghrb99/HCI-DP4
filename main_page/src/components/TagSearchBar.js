import React, {useState} from 'react'
import Autocomplete from 'react-autocomplete'
import Tags from './Tags'
import Toggle from 'react-toggle'
import "./Toggle.scss"
import './TagSearchBar.scss'
import SearchButton from './SearchButton'

const TagSearchBar = () => {
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

    const onRemove = (name) => {
        setTags(tags.filter(tag => tag.name!=name))
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

            <div className="inputField">
                <Tags tags={tags} onRemove={onRemove}/>
                <Autocomplete
                    items={[
                        { label: 'Air' },
                        { label: 'Acrobatic' },
                        { label: 'Ball' },
                        { label: 'Climbing' },
                        { label: 'Water' },
                        { label: 'Indoor' },
                        { label: 'Outdoor' },
                        { label: 'Combat' },
                        { label: 'Strength' },
                        ]}
                    
                    shouldItemRender={function (item, value) {
                        return item.label.toLowerCase().indexOf(value.toLowerCase()) > -1 && !tags.map(x => x.name).includes(item.label)
                    }}
                    getItemValue={item => item.label}
                    renderItem={(item, highlighted) =>
                      <div
                        key={item.id}
                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                      >
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

export default TagSearchBar
