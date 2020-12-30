import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './CourseList.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { resetListSetting } from '../../redux/actions/UserSettingActions';
import List from '../../components/List/List';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import { setModal } from '../../redux/actions/UserSettingActions';
import { deleteCourseAction, selectCourseEditAction, getCourseListAction } from '../../redux/actions/CoursesManageActions'
import Filter from '../../components/Filter/Filter';
import addItemSvg from '../../assets/addItem.svg';
import editSvg from '../../assets/edit.svg';
import deleteSvg from '../../assets/delete.svg';
import filterSvg from '../../assets/filter.svg';

export default function CourseList() {
    window.scrollTo(0, 0);
    const dispatch = useDispatch();
    const handleFilterModal = () => {
        dispatch(setModal({ modal: 'filter', value: true }));
    }
    const handleNewCourseModal = () => {
        dispatch(setModal({ modal: 'newCourse', value: true }))
    };
    const deleteCourse = (ID) => {
        dispatch(deleteCourseAction(ID))
    }
    const editCourse = (Obj) => {
        dispatch(setModal({ modal: 'editCourse', value: true }));
        dispatch(selectCourseEditAction(Obj));
    }
    const userInfo = useSelector(state => state.UserReducer.userInfo)
    const courseList = useSelector(state => state.CoursesReducer.courses);

    let listSetting_category = useSelector(state => state.UserSettingReducer.listSetting.category); // không dùng obj để tránh tham chiếu, không render được
    let listSetting_sort = useSelector(state => state.UserSettingReducer.listSetting.sort);
    let listSetting_itemperpage = useSelector(state => state.UserSettingReducer.listSetting.itemperpage);

    let filterList = courseList.filter(course => course.danhMucKhoaHoc.maDanhMucKhoahoc === (listSetting_category === 'all' ? course.danhMucKhoaHoc.maDanhMucKhoahoc : listSetting_category))


    const adminButtonRender = (button, IDorObj) => {
        if (userInfo.maLoaiNguoiDung === 'GV') {
            switch (button) {
                case 'add':
                    return <Fragment>
                        <button className="icon" style={{ marginLeft: '1rem' }} onClick={() => handleNewCourseModal()}>
                            <img src={addItemSvg} alt="add item button" />
                        </button>
                    </Fragment>
                case 'edit':
                    return <Fragment>
                        <button className="icon" onClick={() => editCourse(IDorObj)}>
                            <img src={editSvg} alt="edit button" />
                        </button></Fragment>
                case 'delete':
                    return <button className="icon" onClick={() => deleteCourse(IDorObj)}>
                        <img src={deleteSvg} alt="delete button" />
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
            default:
                return list.sort((a, b) => (a.biDanh > b.biDanh) ? -1 : 1)
        }
    }
    const sortList = doSort(listSetting_sort, filterList)

    useEffect(() => () => {
        dispatch(resetListSetting());
        dispatch(getCourseListAction(''));
    }, [dispatch])

    return (
        <div className="container courseList" >
            <div className="titleContainer">
                <div className="leftItemsContainer">
                    <h1 className="title">Tất cả khóa học</h1>
                    {adminButtonRender('add', '')}
                    <button className="d-block d-lg-none icon" onClick={() => handleFilterModal()}>
                        <img src={filterSvg} alt="filter button"/>
                    </button>
                </div>
                <span className="d-none d-sm-block">{filterList.length} kết quả</span>
            </div>
            <div className="row">
                <div className="d-none d-lg-block col-lg-3">
                    <Filter type="course" />
                </div>
                <div className="col-12 col-lg-9">
                    <div className="courseContainer" >
                        <List type="CourseList" list={sortList} itemperpage={listSetting_itemperpage} adminButtonRender={adminButtonRender} />

                    </div>
                </div>
            </div>
            <ModalComponent type='newCourse' />
            <ModalComponent type='editCourse' />
        </div>
    )
}
