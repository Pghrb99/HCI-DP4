import React, {useState} from 'react'
import './NameSearchBar.scss'
import SearchButton from '../../../TagSearchPage/Sections/SearchButton/SearchButton'
import { AutoComplete, Input} from 'antd';


const NameSearchBar = () => {

    // const {Search} = Input;
    const mockVal = (str, repeat = 1) => ({
        value: str.repeat(repeat),
      });

    
    const [text, setText] = useState("");
    const [options, setOptions] = useState([]);

    const onTextChange = (e) => {
        setText(e.target.value);
        console.log(e.target.value);
    };


    const onTextSelect = (val) => {
        setText(val);
    };

    const onSearch = (searchText) => {
        setOptions(
          !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
        );
    };


    return (
        <div className="NameSearchBar">
            <AutoComplete
                options={options}
                onSelect={onTextSelect}
                onSearch={onSearch}
            >
                <Input
                    placeholder="Search"
                    className="inputField"
                    style={{ width: 480, height: 50 }}
                    onChange={onTextChange}
                />

            </ AutoComplete>
            <div>
                <SearchButton />
            </div>
        </div>
        
    )
}

export default NameSearchBar
