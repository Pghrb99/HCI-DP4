import React from 'react';
import './Sidemenu.css';
import $ from 'jquery';
import logo from '../imgs/logo.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";

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
                        <a href="#">Name Search</a>
                    </li>
                    <li class="active">
                        <a href="#">Tag Search</a>
                    </li>
                    <li class="active">
                        <a href="#">Categories</a>
                    </li>
                    <li class="active">
                        <a href="#">Hot Activities</a>
                    </li>
                    <li class="active">
                        <a href="#">My Activites</a>
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