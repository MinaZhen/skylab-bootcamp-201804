import React from 'react';
import { Link } from 'react-router-dom'
import logic from '../logic'
// import Xtorage from './Xtorage';

function Header() {



    const landingNav = (
        <nav>
            <Link to="/login"> Login </Link>
            <Link to="/register"> Register </Link>
        </nav>
    )


    const regularNav = (
        <nav>
            <Link to="/unregister"> Unregister </Link>
            <Link to="/profile"> Profile </Link>
            <Link to="/world"> Home </Link>
        </nav>
    )


    return (
        <header>
            {sessionStorage.getItem('userId') ? regularNav : landingNav}
            {/* {(logic.loggedIn()) ? regularNav : landingNav} */}
        </header>
    )
}

export default Header
