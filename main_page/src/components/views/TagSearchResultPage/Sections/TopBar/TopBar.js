import React from 'react'
import {Col} from 'react-bootstrap'
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import logo from '../imgs/logo.svg'
import Tags from '../Tags/Tags'
import './TopBar.scss'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { useHistory } from 'react-router';
import { useAuth } from '../../../../../contexts/AuthContext'

const TopBar = ({searchText, tags, category, isSignedIn, userName}) => {
    const { logOut } = useAuth();
    const history = useHistory();
    async function handleLogout() {
        await logOut();
        history.push({
            pathname: '/result',
            state: {
                tags: tags
            }
        })
    }

    const onEdit = () => {
        history.push({
            pathname: '/',
            state: {
                tags: tags
            }
        })
    }
    return (
        <div id="TSRP-nav-container">
            <div className="align-self-end">
                {isSignedIn ?
                <Nav className="mt-3">
                    <Nav.Link  className="mr-4"><Link to={"/mypage"}><span className="nav-text" id="nav-userName">{userName}</span></Link></Nav.Link>
                    <Nav.Link  className="mr-5" ><span className="nav-text" id="nav-signOut" onClick={handleLogout}>Sign Out</span></Nav.Link>
                </Nav>
                :
                <Nav className="mt-3">
                    <Nav.Link  className="mr-4"><Link to={"/login"}><span className="nav-text"id="nav-signIn" >Sign In</span></Link></Nav.Link>
                    <Link to={"/register"}><Button 
                        variant="outline-dark"
                        className="mr-5"
                    > <span className="nav-text" id="nav-signUp">Sign Up</span>
                    </Button></Link>
                </Nav>
                }
            </div>
            <div className="align-self-center" id="search-result">
                {
                (typeof category == 'undefined') ? (searchText ? `Results for "${searchText}"` : "Search result"): "Category: "+category
                }
            </div>
            {
            typeof tags != 'undefined' &&

            <div className="align-self-start" id="tags">   
                <span>Tags applied :</span>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Tags tags={tags}/>
                    <FontAwesomeIcon icon={faEdit} style={{ marginLeft: '10px', cursor:"pointer"}} onClick={onEdit}/>
                </div>
            </div>
    
            }
        </div>
    )
}

export default TopBar
