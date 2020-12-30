import React from 'react'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './Header.scss'
// import '../Button/Button.scss'
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, useHistory } from 'react-router-dom';
import { signOutAction } from '../../redux/actions/UserAction';

export default function HeaderAdminUser() {
    const dispatch = useDispatch();
    const history = useHistory();
    const fullName = useSelector(state => state.UserReducer.userInfo.hoTen);
    var nameFilter = fullName.match(/\b\w/g) || [];
    nameFilter = (nameFilter.pop() || '').toUpperCase();

    const link = (linkTo) => {
        switch (linkTo) {
            case 'profile':
                history.push("/profile");
                break;
            case 'signOut':
                dispatch(signOutAction());
                history.push("/home");
                break;
            case 'all-course':
                history.push("/all-course");
                break;
            case 'user-list':
                history.push("/user-list");
                break;

            default:
                break;
        }
    }
    return (
        <Fragment>
            <span  className="simpleBtn hover d-none d-md-block"><NavLink to='/all-course'>Quản lý khóa học</NavLink></span>
            <div className="verLine d-none d-md-block"></div>
            <span className="simpleBtn hover d-none d-md-block"><NavLink to='/user-list'>Quản lý người dùng</NavLink></span>
            <div className="verLine d-none d-md-block"></div>
            <span className="simpleBtn hover d-none d-md-block"><NavLink to='/profile'>{fullName}</NavLink></span>
            <span className="userPicture d-none d-md-block">{nameFilter}</span>
            <Dropdown>
                <Dropdown.Toggle className="d-block d-md-none" variant="outline-secondary" id="dropdown-basic">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => link('all-course')}>Quản lý khóa học</Dropdown.Item>
                    <Dropdown.Item onClick={() => link('user-list')}>Quản lý người dùng</Dropdown.Item>
                    <Dropdown.Item onClick={() => link('profile')}> Quản lý tài khoản</Dropdown.Item>
                    <Dropdown.Item onClick={() => link('signOut')}>Đăng xuất</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    )
}
