import React, {useState} from 'react'
import Autocomplete from 'react-autocomplete'
import { AutoComplete, Input, Option} from 'antd';
import Toggle from 'react-toggle'
import Tags from '../Tags/Tags'
import SearchButton from '../SearchButton/SearchButton'
import "../Toggle/Toggle.scss"
import '../TagSearchBar/TagSearchBar.scss'
import {db} from 'firebase.js'


const TagSearchBar = ({tags, setTags, onClick}) => {
    

    const [mode, setMode] = useState(true);
    const [text, setText] = useState("");
    const [options, setOptions] = useState([]);

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

    const onSearch = (searchText) => {
        const tagDocs = db.collectionGroup('Tags').orderBy('name_lower')
        .where('name_lower', '>=', searchText).where('name_lower', '<=', searchText+"\uf8ff");

        tagDocs.get().then((querySnapshot) => {
            let result = [];
            for (let i in querySnapshot.docs) {
                const doc = querySnapshot.docs[i]
                const tagName = doc.get("name");
                if(tags.map(x => x.name).includes(tagName))
                    continue;
                if(result.length==0 || result[result.length-1].value != tagName) {
                    result.push({value: tagName, key: result.length});
                }
                if(result.length == 5) {
                   break;
                }
            }
            setOptions(result);
        });
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
                <AutoComplete
                value={text}
                options={options}
                onSearch={onSearch}
                onSelect={onTextSelect}
                open={text.length >= 1}
                defaultActiveFirstOption={true}
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
                <SearchButton onClick={onClick}/>
            </div>
        </div>
        
    )
}

export default TagSearchBar
