import React, {useState, useEffect} from 'react'
import './NameSearchBar.scss'
import { AutoComplete, Input} from 'antd';
import {db} from '../../../../../firebase'
import { BsSearch } from "react-icons/bs";
import {useHistory} from "react-router";

const NameSearchBar = () => {

    const [text, setText] = useState("");
    const [allOptions, setAllOptions] = useState([]);
    const [options, setOptions] = useState([]);
    const history = useHistory();
    
    useEffect(() => {
        const tempOptionList = [];
        db.collection('Activities').orderBy('name').get().then((querySnapshot => {
            querySnapshot.forEach((doc) => {
                tempOptionList.push(doc.get('name'))
            })
            setAllOptions(tempOptionList);
        }))
    }, []);

    const onTextChange = (e) => {
        setText(e.target.value);
    };


    const onTextSelect = (val) => {
        setText(val);
    };

    const onSearch = (searchText) => {
        if (searchText.length==0 ) {
            setOptions([]);
            return;
        }
        const lowerText = searchText.toLowerCase();
        let result = [];
        result = allOptions.filter((x) => (x.toLowerCase().includes(lowerText)));
        result = result.slice(0, 5)
        result = result.map(x => ({value: x}))
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
