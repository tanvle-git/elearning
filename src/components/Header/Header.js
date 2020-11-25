import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.scss'
import logo from './elearning.svg'
import {SolidButton, OutlineButton} from '../Buttons/Button';


export default function Header() {
    return (
            <header>
                <div className="container">
                    <div className="leftItems">
                        <img src={logo} alt="brand logo"/>
                        <span className="brandName">E-learning</span>
                    </div>
                    <div className="rightItems">
                        <OutlineButton color={"brown"}>Đăng ký</OutlineButton>
                        <SolidButton color={"brown"}>Đăng nhập</SolidButton>
                    </div>
                </div>
            </header>

    )
}
