import React from 'react'
import { Fragment } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import './Header.scss'
import '../Buttons/Button.scss'
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from 'react-router-dom';

export default function HeaderNormalUser() {
    
    const fullName = useSelector(state => state.UserReducer.userLogin.hoTen);
    var nameFilter = fullName.match(/\b\w/g) || [];
    nameFilter = (nameFilter.pop() || '').toUpperCase();
    console.log(nameFilter);



    return (
        <Fragment>
            <span className="simpleBtn d-none d-md-block">Khóa học của tôi</span>
            <div className="verLine d-none d-md-block"></div>
            <span className="simpleBtn d-none d-md-block"><NavLink to='/profile'>{fullName}</NavLink></span>
            <span className="userPicture d-none d-md-block">{nameFilter}</span>
            <Dropdown>
                <Dropdown.Toggle className="d-block d-md-none" variant="outline-secondary" id="dropdown-basic">
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item >Khóa học của tôi</Dropdown.Item>
                    <Dropdown.Item > <NavLink to='/profile'>Quản lý tài khoản</NavLink></Dropdown.Item>
                    <Dropdown.Item >Đăng xuất</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    )
}
