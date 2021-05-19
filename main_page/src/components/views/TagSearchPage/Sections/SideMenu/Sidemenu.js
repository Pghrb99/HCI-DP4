import React from 'react';
import './Sidemenu.scss';
import $ from 'jquery';
import logo from '../imgs/logo.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars, faHome, faTags, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { faHotjar } from '@fortawesome/free-brands-svg-icons';

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
                    <img src={logo} class="sidemenu_logo"/>
                </div>

                <ul class="list-unstyled components">
                    {/*<p>Dummy Heading</p>*/}
                    <li class="active">
                        <a href="#"><FontAwesomeIcon icon={faHome} style={{marginRight: "10px"}}/>Name Search</a>
                    </li>
                    <li class="active">
                        <a href="#"><FontAwesomeIcon icon={faTags} style={{marginRight: "10px"}}/>Tag Search</a>
                    </li>
                    <li class="active">
                        <a href="#"><FontAwesomeIcon icon={faList} style={{marginRight: "10px"}}/>Categories</a>
                    </li>
                    <li class="active">
                        <a href="#"><FontAwesomeIcon icon={faUser} style={{marginRight: "10px"}}/>Hot Activities</a>
                    </li>
                    <li class="active">
                        <a href="#"><FontAwesomeIcon icon={faHotjar} style={{marginRight: "10px"}}/>My Activites</a>
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