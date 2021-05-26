import React, {useState} from 'react'
import './NameSearchBar.scss'
import SearchButton from '../../../TagSearchPage/Sections/SearchButton/SearchButton'
import { AutoComplete, Input} from 'antd';
import {db,storage} from '../../../../../firebase'
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import {useHistory} from "react-router";

const NameSearchBar = () => {

    let addcard;
    let options = []
    let snapshot;
    const history = useHistory();

    (async () => {
        snapshot = await db.collection('Activities').get();
        snapshot.forEach(doc => {
        // addcard = {name:doc.data().name
        //             }
        options.push(doc.data().name);
                });
        })();

    // (async () => {
    // await console.log(options)
    //     console.log(options.length)
    // })();


    // const {Search} = Input;

    const mockVal = (str) => {
        let temparray =[];
        let tempname;
        str = str.toLowerCase();
        for(let i=0; i<options.length;i++){
            tempname = options[i].toLowerCase();
            if(tempname.includes(str))
            temparray.push({value: options[i]})
        };
        return temparray
        
      };

    
    const [text, setText] = useState("");
    const [option, setOptions] = useState([]);

    const onTextChange = (e) => {
        setText(e.target.value);
        console.log(e.target.value);
    };


    const onTextSelect = (val) => {
        setText(val);
    };

    const onSearch = (searchText) => {
        setOptions(
          !searchText ? [] : mockVal(searchText),
        );
    };


    const onTextPressEnter = () => {
        console.log(option);
        (() => {history.push({
            pathname: "/result",
            state: {option:option}
          })})();
    };

    return (
        <div className="NameSearchBar">
            <AutoComplete
                options={option}
                onSelect={onTextSelect}
                onSearch={onSearch}
            >
                <Input
                    placeholder="Search"
                    className="inputField"
                    style={{ width: 480, height: 50 }}
                    onChange={onTextChange}
                    onPressEnter={onTextPressEnter}
                    
                />

            </ AutoComplete>
            <div id="SearchButton" onClick={onTextPressEnter}>
                    <BsSearch className="search-icon" />
            </div>
        </div>
        
    )
}

export default NameSearchBar
