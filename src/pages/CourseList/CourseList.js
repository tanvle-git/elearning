import React, { Fragment, useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import './CourseList.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import SubInfo from '../../components/SubInfo/SubInfo';
import { setListSetting, resetListSetting, selectPage } from '../../redux/actions/UserSettingActions';
import List from '../../components/List/List';
import Modal from 'react-bootstrap/Modal';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import { setModal } from '../../redux/actions/UserSettingActions';
import { deleteCourseAction, selectCourseEditAction } from '../../redux/actions/CoursesManageActions'


export default function CourseList() {
    //Filter modal in small screen
    const [filterModal, setFilterModal] = useState(false);
    const handleFilterClose = () => setFilterModal(false);
    const handleFilterModal = () => setFilterModal(true);
    const handleNewCourseModal = () => {
        dispatch(setModal({ modal: 'newCourse', value: true }))
    };
    const deleteCourse = (ID) => {
        console.log('sẽ xóa khóa học ', ID);
        dispatch(deleteCourseAction(ID))
    }
    const editCourse = (Obj) => {
        dispatch(setModal({ modal: 'editCourse', value: true }));
        dispatch(selectCourseEditAction(Obj));
        console.log('sẽ sửa khóa học ', Obj);
    }
    const userInfo = useSelector(state => state.UserReducer.userInfo)
    const courseList = useSelector(state => state.CoursesReducer.courses);
    const category = useSelector(state => state.CoursesReducer.category);

    let listSetting_category = useSelector(state => state.UserSettingReducer.listSetting.category); // không dùng obj để tránh tham chiếu, không render được
    let listSetting_sort = useSelector(state => state.UserSettingReducer.listSetting.sort);
    let listSetting_itemperpage = useSelector(state => state.UserSettingReducer.listSetting.itemperpage);

    let filterList = courseList.filter(course => course.danhMucKhoaHoc.maDanhMucKhoahoc === (listSetting_category === 'all' ? course.danhMucKhoaHoc.maDanhMucKhoahoc : listSetting_category))

    const listSetting = { ...useSelector(state => state.UserSettingReducer.listSetting) };

    const adminButtonRender = (button, IDorObj) => {
        if (userInfo.maLoaiNguoiDung === 'GV') {
            switch (button) {
                case 'add':
                    return <Fragment>
                        <button className="icon" onClick={() => handleNewCourseModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none" /><g fill="#645a53"><path d="M45.86667,17.2c-9.50013,0 -17.2,7.69987 -17.2,17.2v103.2c0,9.48293 7.71707,17.2 17.2,17.2h39.83099c-1.80027,-3.60627 -3.19804,-7.44187 -4.10964,-11.46667h-35.72136c-3.15907,0 -5.73333,-2.57427 -5.73333,-5.73333c0,-3.15907 2.57427,-5.73333 5.73333,-5.73333h34.4c0,-28.5004 23.0996,-51.6 51.6,-51.6c3.94453,0 7.7744,0.47856 11.46667,1.32136v-52.92136c0,-6.33533 -5.13133,-11.46667 -11.46667,-11.46667zM131.86667,91.73333c-22.16507,0 -40.13333,17.96827 -40.13333,40.13333c0,22.16507 17.96827,40.13333 40.13333,40.13333c22.16507,0 40.13333,-17.96827 40.13333,-40.13333c0,-22.16507 -17.96827,-40.13333 -40.13333,-40.13333zM131.86667,108.93333c3.1648,0 5.73333,2.5628 5.73333,5.73333v11.46667h11.46667c3.1648,0 5.73333,2.5628 5.73333,5.73333c0,3.17053 -2.56853,5.73333 -5.73333,5.73333h-11.46667v11.46667c0,3.17053 -2.56853,5.73333 -5.73333,5.73333c-3.1648,0 -5.73333,-2.5628 -5.73333,-5.73333v-11.46667h-11.46667c-3.1648,0 -5.73333,-2.5628 -5.73333,-5.73333c0,-3.17053 2.56853,-5.73333 5.73333,-5.73333h11.46667v-11.46667c0,-3.17053 2.56853,-5.73333 5.73333,-5.73333z" /></g></g></svg>
                        </button>
                    </Fragment>
                case 'edit':
                    return <Fragment>
                        <button className="icon" onClick={() => editCourse(IDorObj)}>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none" /><g fill="#645a53"><path d="M130.88125,17.2c-2.93403,0 -5.86843,1.12051 -8.10729,3.35938l-13.84062,13.84063l28.66667,28.66667l13.84062,-13.84063c4.47773,-4.47773 4.47773,-11.73685 0,-16.21458l-12.45208,-12.45208c-2.23887,-2.23887 -5.17326,-3.35937 -8.10729,-3.35937zM97.46667,45.86667l-67.31068,67.31067c0,0 5.26186,-0.47147 7.22266,1.48933c1.9608,1.9608 0.34669,14.792 2.75469,17.2c2.408,2.408 15.15831,0.71299 16.98724,2.54192c1.82894,1.82893 1.70209,7.43542 1.70209,7.43542l67.31067,-67.31067zM22.93333,131.86667l-5.40859,15.31875c-0.21262,0.60453 -0.32239,1.24042 -0.32474,1.88125c0,3.16643 2.5669,5.73333 5.73333,5.73333c0.64083,-0.00235 1.27672,-0.11212 1.88125,-0.32474c0.0187,-0.00737 0.03737,-0.01483 0.05599,-0.02239l0.14557,-0.04479c0.01122,-0.00743 0.02242,-0.01489 0.03359,-0.0224l15.08359,-5.31901l-8.6,-8.6z" /></g></g></svg>
                        </button></Fragment>
                case 'delete':
                    return <button className="icon" onClick={() => deleteCourse(IDorObj)}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none" /><g fill="#645a53"><path d="M85.91042,14.25495c-3.16203,0.04943 -5.68705,2.6496 -5.64375,5.81172v2.86667h-31.53333c-1.53406,-0.02082 -3.01249,0.574 -4.10468,1.65146c-1.09219,1.07746 -1.70703,2.54767 -1.70704,4.08187h-8.52161c-2.06765,-0.02924 -3.99087,1.05709 -5.03322,2.843c-1.04236,1.78592 -1.04236,3.99474 0,5.78066c1.04236,1.78592 2.96558,2.87225 5.03322,2.843h103.2c2.06765,0.02924 3.99087,-1.05709 5.03322,-2.843c1.04236,-1.78592 1.04236,-3.99474 0,-5.78066c-1.04236,-1.78592 -2.96558,-2.87225 -5.03322,-2.843h-8.52161c-0.00001,-1.53421 -0.61486,-3.00442 -1.70704,-4.08187c-1.09219,-1.07746 -2.57061,-1.67228 -4.10468,-1.65146h-31.53333v-2.86667c0.02122,-1.54972 -0.58581,-3.04203 -1.68279,-4.1369c-1.09698,-1.09487 -2.59045,-1.69903 -4.14013,-1.67482zM34.4,51.6l10.27969,87.34375c0.67653,5.77347 5.56348,10.12292 11.37708,10.12292h59.88646c5.8136,0 10.69482,-4.34945 11.37708,-10.12292l10.27969,-87.34375z" /></g></g></svg>
                    </button>;
                default:
                    break;
            }
        }
    }

    const doSort = (how, list) => {
        switch (how) {
            case 'AZ':
                return list.sort((a, b) => (a.biDanh > b.biDanh) ? 1 : -1);
            case 'ZA':
                return list.sort((a, b) => (a.biDanh > b.biDanh) ? -1 : 1);
            case 'oldest':
                return list.sort((a, b) => (a.ngayTao > b.ngayTao) ? -1 : 1);
            default:
                return list.sort((a, b) => (a.ngayTao > b.ngayTao) ? 1 : -1);
        }
    }
    const sortList = doSort(listSetting.sort, filterList)

    const categoryRender = (modal) => {
        return category.map((item, index) => {
            return <Fragment key={index}>
                <input type="radio" id={item.maDanhMuc + modal} name={"category" + modal} defaultValue={item.maDanhMuc} defaultChecked={listSetting_category === item.maDanhMuc} />
                <label htmlFor={item.maDanhMuc + modal}>{item.tenDanhMuc}</label><br />
            </Fragment>
        })
    }
    const dispatch = useDispatch();

    const handleChange = (e) => {
        console.log(e);
        console.log(e.target.name, e.target.value);
        dispatch(setListSetting(e.target.name.replace('Modal', ''), e.target.value));
        dispatch(selectPage(0));
    }

    useEffect(() => () => {
        dispatch(resetListSetting());
    }, [])


    const filterRender = (modal) => {
        return <Fragment>
            <input type="text" placeholder="Tìm kiếm khóa học" style={{ width: '100%', border: 'none', borderBottom: '.5px solid #504343', height: 35, marginBottom: 30 }} />
            <h2 className="smallTitle">Danh mục</h2>
            <input type="radio" id={"all" + modal} name={"category" + modal} defaultValue="all" defaultChecked={listSetting_category === 'all'} />
            <label htmlFor={"all" + modal} >Tất cả</label><br />
            {categoryRender(modal)}
            <h2 className="smallTitle">Sắp xếp</h2>
            <input type="radio" id={"AZ" + modal} name={"sort" + modal} defaultValue="AZ" defaultChecked={listSetting_sort === 'AZ'} />
            <label htmlFor={"AZ" + modal}>A - Z</label><br />
            <input type="radio" id={"ZA" + modal} name={"sort" + modal} defaultValue="ZA" defaultChecked={listSetting_sort === 'ZA'} />
            <label htmlFor={"ZA" + modal}>Z - A</label><br />
            <input type="radio" id={"oldest" + modal} name={"sort" + modal} defaultValue="oldest" defaultChecked={listSetting_sort === 'oldest'} />
            <label htmlFor={"oldest" + modal}>Cũ nhất</label><br />
            <input type="radio" id={"newest" + modal} name={"sort" + modal} defaultValue="newest" defaultChecked={listSetting_sort === 'newest'} />
            <label htmlFor={"newest" + modal}>Mới nhất</label><br /><br />
            <h2 className="smallTitle">Kết quả mỗi trang</h2>
            <input type="radio" id={"5" + modal} name={"itemperpage" + modal} defaultValue="5" defaultChecked defaultChecked={listSetting_itemperpage === '5'} />
            <label htmlFor={"5" + modal} >5</label><br />
            <input type="radio" id={"10" + modal} name={"itemperpage" + modal} defaultValue="10" defaultChecked={listSetting_itemperpage === '10'} />
            <label htmlFor={"10" + modal}>10</label><br />
        </Fragment>
    }

    return (
        <div className="container" style={{ marginTop: '60px' }}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center title-container">
                    <h1 className="title">Tất cả khóa học</h1>
                    <button className="d-block d-lg-none icon" onClick={() => handleFilterModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none" /><g fill="#645a53"><path d="M22.93333,22.93333c-2.06765,-0.02924 -3.99087,1.05709 -5.03322,2.843c-1.04236,1.78592 -1.04236,3.99474 0,5.78066c1.04236,1.78592 2.96558,2.87225 5.03322,2.843h4.59115l41.27552,51.6h34.4l41.27552,-51.6h4.59114c2.06765,0.02924 3.99087,-1.05709 5.03322,-2.843c1.04236,-1.78592 1.04236,-3.99474 0,-5.78066c-1.04236,-1.78592 -2.96558,-2.87225 -5.03322,-2.843zM68.8,97.46667v51.6l34.4,-11.46667v-40.13333z" /></g></g></svg>

                    </button>
                    {adminButtonRender('add', '')}
                </div>
                <span className="d-none d-sm-block">{filterList.length} kết quả</span>
            </div>
            <div className="row">
                <div className="d-none d-lg-block col-lg-3">
                    <div style={{ padding: 30, backgroundColor: 'white', borderRadius: 20 }} onChange={handleChange} >
                        {filterRender('')}
                    </div>
                </div>
                <div className="col-12 col-lg-9">
                    <div style={{ padding: '30px 0', backgroundColor: 'white', borderRadius: 20 }}>
                        <List type="CourseList" list={sortList} itemperpage={listSetting.itemperpage} adminButtonRender={adminButtonRender} />

                    </div>
                </div>
            </div>

            <Modal show={filterModal} onHide={handleFilterClose} centered size="sm">
                <div onChange={handleChange} >
                    {filterRender('Modal')}
                </div>
                <button className="smallBtn brownOutlineBtn" onClick={() => handleFilterClose()}>Đóng</button>
            </Modal>
            
            <ModalComponent type='newCourse' />
            <ModalComponent type='editCourse' />
        </div>
    )
}
