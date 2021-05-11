import React from 'react';
import './index.css';
import $ from "jquery";

class Header extends React.Component {
    clickStart() {
        $('#start_button').hide();
        $('#head_bottom').append("<button id='progress_button'>Progress</button>");
    }

    render() {
        return (
            <div id="head">
                <h1 id="head_title">Tennis</h1>
                <div id="head_bottom">
                    <div id="head_tags">Related Tags:</div>
                    <button id="start_button" onClick={this.clickStart}>Start</button>
                </div>
            </div>
            
        )
    }
}

export default Header;