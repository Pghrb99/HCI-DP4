import React from 'react';
import './index.css';
import thi from './Tennis_head_image.png';
import $ from "jquery";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    clickStart() {
        $('#start_button').hide();
        $('#head_bottom').append("<button id='progress_button'>Progress</button>");
        //$('#progress_button').show();
    }

    render() {
        return (
            <div id="head">
                <div class="head_image"><img src={thi} alt="-"/></div>
                <div class="head_title"><p>Tennis</p></div>
                <div id="head_bottom">
                    <div id="head_tags">Related Tags:</div>
                    <button id="start_button" onClick={this.clickStart}>Start</button>
                </div>
            </div>
        )
    }
}

export default Header;