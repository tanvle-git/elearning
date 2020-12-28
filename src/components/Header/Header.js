import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.scss'
import logo from './elearning.svg'
import { NavLink } from 'react-router-dom';
import '../Buttons/Button.scss'
import HeaderGuest from './HeaderGuest'
import { connect, useSelector, useDispatch } from 'react-redux';
import HeaderNormalUser from './HeaderNormalUser';
import HeaderAdminUser from './HeaderAdminUser';

export default function Header() {
    let userInfo = useSelector(state => state.UserReducer.userInfo);
    console.log(userInfo);
    const headerRender = () => {
        switch (userInfo.maLoaiNguoiDung) {
            case 'HV':
                return <HeaderNormalUser />
            case 'GV':
                return <HeaderAdminUser />;
            default:
                return <HeaderGuest />
        }
        
    }


    return (
        <header expand="lg">
            <div className="container">
                <NavLink className="leftItems" to={`/home`}>
                    <img src={logo} alt="brand logo" />
                    <span className="brandName">E-learning</span>
                </NavLink>
                <div className="rightItems">
                    {headerRender()}
                </div>
            </div>


        </header>

    )
}

