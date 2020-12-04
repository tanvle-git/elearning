import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.scss'
import logo from './elearning.svg'
import { NavLink } from 'react-router-dom';
import {SolidButton, OutlineButton} from '../Buttons/Button';


export default function Header() {
    return (
            <header>
                <div className="container">
                    <NavLink className="leftItems" to={`/home`}>
                        <img src={logo} alt="brand logo"/>
                        <span className="brandName">E-learning</span>
                    </NavLink>
                    <div className="rightItems">
                        <OutlineButton color={"brown"} size={"small"}>Đăng ký</OutlineButton>
                        <SolidButton color={"brown"}  size={"small"}>Đăng nhập</SolidButton>
                    </div>
                </div>
            </header>

    )
}
