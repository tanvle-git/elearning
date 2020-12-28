import React from 'react'
import { Fragment } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import './Header.scss'
import '../Buttons/Button.scss'
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, useHistory } from 'react-router-dom';
import { signOutAction } from '../../redux/actions/UserAction';

export default function HeaderNormalUser() {
    const dispatch = useDispatch();
    const history = useHistory();
    const fullName = useSelector(state => state.UserReducer.userInfo.hoTen);
    var nameFilter = fullName.match(/\b\w/g) || [];
    nameFilter = (nameFilter.pop() || '').toUpperCase();
    console.log(nameFilter);

    const signOut = () => {
        dispatch(signOutAction());
        history.push("/home");
    }

    const profile = () => {
        history.push("/profile");
    }

    const myCourse = () => {
        history.push("/mycourse");
    }

    return (
        <Fragment>
            <span className="simpleBtn d-none d-md-block"><NavLink to='/mycourse'>Khóa học của tôi</NavLink></span>
            <div className="verLine d-none d-md-block"></div>
            <span className="simpleBtn d-none d-md-block"><NavLink to='/profile'>{fullName}</NavLink></span>
            <span className="userPicture d-none d-md-block">{nameFilter}</span>
            <Dropdown>
                <Dropdown.Toggle className="d-block d-md-none" variant="outline-secondary" id="dropdown-basic">
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => myCourse()}>Khóa học của tôi</Dropdown.Item>
                    <Dropdown.Item  onClick={() => profile()}> Quản lý tài khoản</Dropdown.Item>
                    <Dropdown.Item onClick={() => signOut()}>Đăng xuất</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    )
}
