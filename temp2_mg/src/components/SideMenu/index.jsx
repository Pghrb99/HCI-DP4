import React from 'react';
import './index.css';

class SideMenu extends React.Component {

    render() {
        return (
            <nav role="navigation">
                <div id="menuToggle">
                {/*A fake / hidden checkbox is used as click reciever, so you can use the :checked selector on it.*/}
                    <input type="checkbox" />
    
                {/*Some spans to act as a hamburger. They are acting like a real hamburger, not that McDonalds stuff.*/}
                    <span></span>
                    <span></span>
                    <span></span>
    
                {/*Too bad the menu has to be inside of the button but hey, it's pure CSS magic.*/}
                    <ul id="menu">
                        <a href="#"><p className="sidemenu_elements">Name Search</p></a>
                        <a href="#"><p className="sidemenu_elements">Tag Search</p></a>
                        <a href="#"><p className="sidemenu_elements">Category</p></a>
                        <a href="#"><p className="sidemenu_elements">Hot Activities</p></a>
                        <a href="#"><p className="sidemenu_elements">My Activities</p></a>
                        {/*<a href="https://erikterwan.com/" target="_blank"><li>Show me more</li></a>*/}
                        <button className="sidemenu_user" id="signup_button">Sign up</button>
                        <button className="sidemenu_user" id="signin_button">Sign in</button>
                    </ul>                    
                </div>
            </nav>
        )
    }
}

export default SideMenu;