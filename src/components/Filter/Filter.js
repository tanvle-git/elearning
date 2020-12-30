import React, { useState,Fragment } from 'react'
import './Filter.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCourseListAction } from '../../redux/actions/CoursesManageActions';
import { setListSetting, setUserListSetting, selectPage } from '../../redux/actions/UserSettingActions';
import { getUserList } from '../../redux/actions/UserAction'
import { setModal } from '../../redux/actions/UserSettingActions';
import Modal from 'react-bootstrap/Modal';
import searchSvg from '../../assets/search.svg'
import cancelSvg from '../../assets/cancel.svg'

export default function Filter(props) {
    const reducer = props.type === 'course' ? 'CoursesReducer' : 'UserReducer';
    const setting = props.type === 'course' ? 'listSetting' : 'userListSetting';
    const cate = props.type === 'course' ? 'category' : 'userType';
    const cate_USR = props.type === 'course' ? 'category' : 'type';// detect attribute in UserSettingReducer
    const ID = props.type === 'course' ? 'maDanhMuc' : 'maLoaiNguoiDung';
    const name = props.type === 'course' ? 'tenDanhMuc' : 'tenLoaiNguoiDung';
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('')
    const searchKey = useSelector(state => state.[reducer].searchKey)
    let listSetting_category = useSelector(state => state.UserSettingReducer.[setting].[cate_USR]);
    let listSetting_sort = useSelector(state => state.UserSettingReducer.[setting].sort);
    let listSetting_itemperpage = useSelector(state => state.UserSettingReducer.[setting].itemperpage);
    const filterModal = useSelector(state => state.UserSettingReducer.modal.filter);
    const category = useSelector(state => state.[reducer].[cate]);
    const categoryRender = (modal) => {
        return category.map((item, index) => {
            return <Fragment key={index}>
                <input type="radio" id={item.[ID] + modal} name={[cate_USR] + modal} defaultValue={item.[ID]} defaultChecked={listSetting_category === item.[ID]} />
                <label htmlFor={item.[ID] + modal}>{item.[name]}</label><br />
            </Fragment>
        })
    }
    const handleModalClose = (modalName) => {
        dispatch(setModal({ modal: modalName, value: false }));

    }
    const search = (e) => {
        e.preventDefault();
        if (props.type === 'course') {
            dispatch(getCourseListAction(searchInput));
        } else {
            dispatch(getUserList(searchInput));
        }
    }
    const clearSearch = (e) => {
        e.preventDefault();
        if (props.type === 'course') {
            dispatch(getCourseListAction(''));
        } else {
            dispatch(getUserList());
        }
    }
    const handleChangeInput = (e) => {
        setSearchInput(e.target.value)
    }
    const handleChange = (e) => {
        dispatch(selectPage(0));
        if (props.type === 'course') {
            dispatch(setListSetting(e.target.name.replace('Modal', ''), e.target.value));
        } else {
            dispatch(setUserListSetting(e.target.name.replace('Modal', ''), e.target.value));
        }
    }
    const searchButtonRender = () => {
        if (searchKey !== '') {
            return <button className="icon" onClick={clearSearch}>
                <img src={cancelSvg} alt="cancel button"/>
            </button>

        }
        return <button className="icon" onClick={search} >
            <img src={searchSvg} alt="search button"/>
        </button>

    }

    const filterRender = (modal) => {
        return <Fragment>
            <form className="searchForm" style={{ flexDirection: 'row' }}>
                <input type="text" placeholder="Tìm kiếm" defaultValue={searchKey} onChange={handleChangeInput} />
                {searchButtonRender()}
            </form>
            <br />
            <h2 className="smallTitle">Danh mục</h2>
            <input type="radio" id={"all" + modal} name={[cate_USR] + modal} defaultValue="all" defaultChecked={listSetting_category === 'all'} />
            <label htmlFor={"all" + modal} >Tất cả</label><br />
            {categoryRender(modal)}
            <h2 className="smallTitle">Sắp xếp</h2>
            <input type="radio" id={"AZ" + modal} name={"sort" + modal} defaultValue="AZ" defaultChecked={listSetting_sort === 'AZ'} />
            <label htmlFor={"AZ" + modal}>A - Z</label><br />
            <input type="radio" id={"ZA" + modal} name={"sort" + modal} defaultValue="ZA" defaultChecked={listSetting_sort === 'ZA'} />
            <label htmlFor={"ZA" + modal}>Z - A</label><br />
            <h2 className="smallTitle">Kết quả mỗi trang</h2>
            <input type="radio" id={"5" + modal} name={"itemperpage" + modal} defaultValue="5" defaultChecked={listSetting_itemperpage === '5'} />
            <label htmlFor={"5" + modal} >5</label><br />
            <input type="radio" id={"10" + modal} name={"itemperpage" + modal} defaultValue="10" defaultChecked={listSetting_itemperpage === '10'} />
            <label htmlFor={"10" + modal}>10</label><br />
        </Fragment>
    }

    return (
        <div className="filterContainer" onChange={handleChange} >
            {filterRender('')}
            <Modal show={filterModal} onHide={() => handleModalClose('filter')} centered size="sm">
                <div onChange={handleChange} >
                    {filterRender('Modal')}
                </div>
                <button className="smallBtn brownOutlineBtn" onClick={() => handleModalClose('filter')}>Đóng</button>
            </Modal>
        </div>
    )
}
