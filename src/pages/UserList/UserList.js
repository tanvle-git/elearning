import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserList.scss'
import List from '../../components/List/List';
import { getUserList, getUserType, deleteUserAction, selectUserEditAction } from '../../redux/actions/UserAction'
import { setModal, resetListSetting } from '../../redux/actions/UserSettingActions';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Filter from '../../components/Filter/Filter';
import addItemSvg from '../../assets/addItem.svg';
import editSvg from '../../assets/edit.svg';
import deleteSvg from '../../assets/delete.svg';
import infoSvg from '../../assets/info.svg';
import filterSvg from '../../assets/filter.svg';

export default function UserList() {
    
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getUserType()) }, [dispatch])
    const userList = useSelector(state => state.UserReducer.userList);
    const handleFilterModal = () => {
        dispatch(setModal({ modal: 'filter', value: true }));
    }
    const handleNewUserModal = () => {
        dispatch(setModal({ modal: 'newUser', value: true }))
    };
    const deleteUser = (taiKhoan) => {
        dispatch(deleteUserAction(taiKhoan))
    }
    const editUser = (Obj) => {
        dispatch(setModal({ modal: 'editUser', value: true }));
        dispatch(selectUserEditAction(Obj));
    }
    const viewUser = (taiKhoan) => {
        history.push("/user/" + taiKhoan);
    }
    let userListSetting_type = useSelector(state => state.UserSettingReducer.userListSetting.type);
    let userListSetting_sort = useSelector(state => state.UserSettingReducer.userListSetting.sort);
    let userListSetting_itemperpage = useSelector(state => state.UserSettingReducer.userListSetting.itemperpage);

    let filterList = userList.filter(user => user.maLoaiNguoiDung === (userListSetting_type === 'all' ? user.maLoaiNguoiDung : userListSetting_type))

    const doSort = (how, list) => {
        switch (how) {
            case 'AZ':
                return list.sort((a, b) => (a.taiKhoan > b.taiKhoan) ? 1 : -1);
            default:
                return list.sort((a, b) => (a.taiKhoan > b.taiKhoan) ? -1 : 1);
        }
    }
    const sortList = doSort(userListSetting_sort, filterList)

    useEffect(() => () => {
        dispatch(resetListSetting());
        dispatch(getUserList());
    }, [dispatch])

    const adminButtonRender = (button, IDorObj) => {
        switch (button) {
            case 'add':
                return <Fragment>
                    <button className="icon" style={{ marginLeft: '1rem' }} onClick={() => handleNewUserModal()}>
                        <img src={addItemSvg} alt="add item button" />
                    </button>
                </Fragment>
            case 'edit':
                return <Fragment>
                    <button className="icon" onClick={() => editUser(IDorObj)}>
                        <img src={editSvg} alt="edit button" />
                    </button></Fragment>
            case 'delete':
                return <button className="icon" onClick={() => deleteUser(IDorObj)}>
                    <img src={deleteSvg} alt="delete button" />
                </button>;
            case 'view':
                return <button className="icon" onClick={() => viewUser(IDorObj)}>
                    <img src={infoSvg} alt="info button" />
                </button>;
            default:
                break;
        }
    }

    if (!localStorage.getItem('userLogin') || JSON.parse(localStorage.getItem('userLogin'))?.maLoaiNguoiDung !=="GV") {
        swal({ title: 'Không có quyền truy cập', text: 'hệ thống tự điều hướng về trang chủ', icon: "error", button: false });
        return <Redirect to='/home'/>
    }else{
    return (
        <div className="container" style={{ marginTop: '60px' }}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center title-container">
                    <h1 className="title">Danh sách người dùng</h1>
                    {adminButtonRender('add', '')}
                    <button className="d-block d-lg-none icon" onClick={() => handleFilterModal()}>
                        <img src={filterSvg} alt="filter button" />
                    </button>
                </div>
                <span className="d-none d-sm-block">{filterList.length} kết quả</span>
            </div>
            <div className="row">
                <div className="d-none d-lg-block col-lg-3">
                    <Filter type='user' />
                </div>
                <div className="col-12 col-lg-9">
                    <div style={{ padding: '30px 0', backgroundColor: 'white', borderRadius: 20 }}>
                        <List type="UserList" list={sortList} itemperpage={userListSetting_itemperpage} adminButtonRender={adminButtonRender} />
                    </div>
                </div>
            </div>

            <ModalComponent type='newUser' />
            <ModalComponent type='editUser' />
        </div>
    )
}}
