import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.scss';
// import '../Button/Button.scss'
// import '../../assets/Button.scss'
import { setModal } from '../../redux/actions/UserSettingActions';
import { Fragment } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';


export default function HeaderGuest() {

    const dispatch = useDispatch();

    const handleModal = (modalName) => dispatch(setModal({ modal: modalName, value: true }));

    return (
        <Fragment>
            <button className="brownOutlineBtn d-none d-sm-block" onClick={() => handleModal('signUp')} >Đăng ký</button>
            <button className="brownSolidBtn d-none d-sm-block" onClick={() => handleModal('signIn')}>Đăng nhập</button>
            <Dropdown>
                <Dropdown.Toggle className="d-block d-sm-none" variant="outline-secondary" id="dropdown-basic">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleModal('signUp')} >Đăng ký</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleModal('signIn')} >Đăng nhập</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <ModalComponent type='signIn' />
            <ModalComponent type='signUp' />
        </Fragment>
    )
}
