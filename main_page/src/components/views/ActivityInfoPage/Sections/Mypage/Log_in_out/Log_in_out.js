import React from 'react'
import './Log_in_out.scss'
import { Nav, Button } from 'react-bootstrap'
import logo from '../../imgs/logo.svg'

const Log_in_out = ({ isSignedIn, name }) => {
    
    return (
        <div id="AIP-nav-container-1">

            <div className="mypage-center">
            <img src={logo} id="logo_mypage"/>  My page
            </div>
            <div className="mypage-end">
                {isSignedIn ?
                    <Nav >
                        <Nav.Link className="me-4"><span className="nav-text" >{name}</span></Nav.Link>
                        <Nav.Link className="me-5"><span className="nav-text" >Sign Out</span></Nav.Link>
                    </Nav>
                    : alert('hi')
                    
                }
            </div>
        </div>
    )
}

export default Log_in_out;