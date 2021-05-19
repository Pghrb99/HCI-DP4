import React, {useState} from 'react'
import Autocomplete from 'react-autocomplete'
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
                        { label: 'Ball' },
                        { label: 'Climbing' },
                        { label: 'Water' },
                        { label: 'Indoor' },
                        { label: 'Outdoor' },
                        { label: 'Combat' },
                        { label: 'Strength' },
                        { label: 'Ball' },
                        { label: 'Climbing' },
                        { label: 'Water' },
                        { label: 'Indoor' },
                        { label: 'Outdoor' },
                        { label: 'Combat' },
                        { label: 'Strength' },
                        { label: 'Ball' },
                        { label: 'Climbing' },
                        { label: 'Water' },
                        { label: 'Indoor' },
                        { label: 'Outdoor' },
                        { label: 'Combat' },
                        { label: 'Strength' },
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
                        style={{
                            cursor: 'default',
                            backgroundColor: highlighted ? '#e3e3e3' : 'transparent'
                        }}
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
                            placeholder: 'Enter Tags'
                        }}
                    menuStyle= 
                        {{
                            borderRadius: '3px',
                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                            background: 'rgba(255, 255, 255, 0.9)',
                            padding: '2px 0',
                            fontSize: '90%',
                            position: 'fixed',
                            overflow: 'auto',
                            maxHeight: '30%', // TODO: don't cheat, let it flow to the bottom
                        }}
                />
            </div>
            <div>
                {/*<FontAwesomeIcon icon={faSearch}/>*/}
                <SearchButton />
            </div>
        </div>
        
    )
}

export default TagSearchBar
