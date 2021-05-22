import React from 'react';
import './Sidemenu.scss';
import $ from 'jquery';
import logo from '../imgs/logo.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars, faHome, faTags, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { faHotjar } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";

function clickSide() {
    $('#sidebar').addClass('active');
    // fade in the overlay
    $('.overlay').addClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
}

function clickCollapse() {
    $('#sidebar').removeClass('active');
    $('.overlay').removeClass('active');
}

const Sidemenu = () => {
    return (
        <div class="wrapper">
            <nav id="sidebar">
                <div id="dismiss" onClick={clickCollapse}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>

                <div class="sidebar-header">
                <Link to={"/"}><img src={logo} class="sidemenu_logo"/></Link>
                </div>

                <ul class="list-unstyled components">
                    {/*<p>Dummy Heading</p>*/}
                    <li class="active">
                        <Link to={"/namesearch"}><FontAwesomeIcon icon={faHome} style={{marginRight: "10px"}}/>Name Search</Link>
                    </li>
                    <li class="active">
                    <Link to={"/"}><FontAwesomeIcon icon={faTags} style={{marginRight: "10px"}}/>Tag Search</Link>
                    </li>
                    <li class="active">
                    <Link to={"/"}><FontAwesomeIcon icon={faList} style={{marginRight: "10px"}}/>Categories</Link>
                    </li>
                    <li class="active">
                    <Link to={"/hotactivity"}><FontAwesomeIcon icon={faHotjar} style={{marginRight: "10px"}}/>Hot Activities</Link>
                    </li>
                    <li class="active">
                    <Link to={"/mypage"}><FontAwesomeIcon icon={faUser} style={{marginRight: "10px"}}/>My Activites</Link>
                    </li>
                </ul>
            </nav>
            <div id="content">
                <button type="button" id="sidebarCollapse" class="btn btn-info" onClick={clickSide}>
                    <FontAwesomeIcon icon={faBars}/>
                </button>
            </div>
            <div class="overlay" onClick={clickCollapse}></div>
        </div>
    )

}

export default Sidemenu;