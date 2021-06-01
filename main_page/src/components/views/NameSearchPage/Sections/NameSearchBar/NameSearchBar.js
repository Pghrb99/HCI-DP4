import React, {useState, useEffect} from 'react'
import './NameSearchBar.scss'
import { AutoComplete, Input} from 'antd';
import {db} from '../../../../../firebase'
import { BsSearch } from "react-icons/bs";
import {useHistory} from "react-router";

const NameSearchBar = () => {

    const [text, setText] = useState("");
    const [options, setOptions] = useState([]);
    const history = useHistory();

    const onTextChange = (e) => {
        setText(e.target.value);
    };


    const onTextSelect = (val) => {
        setText(val);
    };

    const onSearch = async (searchText) => {
        if (searchText.length==0 ) {
            setOptions([]);
            return;
        }
        const querySnapshot = await db.collection('Activities').orderBy('name_lower')
        .where('name_lower', '>=', searchText.toLowerCase())
        .where('name_lower', '<=', searchText.toLowerCase()+"\uf8ff")
        .limit(5).get()
        const result = [];
        querySnapshot.forEach((doc) => result.push({value: doc.get('name')}))
        setOptions(result);
    };


    const onTextPressEnter = () => {
        history.push({
            pathname: "/result",
            state: {
                searchText: text
            }
        });
    };

    return (
        <div className="NameSearchBar">
            <AutoComplete
                options={options}
                onSelect={onTextSelect}
                onSearch={onSearch}
                open={text.length>=1}
            >
                <Input
                    placeholder="Search"
                    className="inputField"
                    style={{ width: 480, height: 50 }}
                    onChange={onTextChange}
                    onPressEnter={onTextPressEnter}
                    
                />

            </ AutoComplete>
            <div className="SearchButton" onClick={onTextPressEnter}>
                    <BsSearch className="search-icon" style={{color:'white'}}/>
            </div>
        </div>
        
    )
}

export default NameSearchBar
