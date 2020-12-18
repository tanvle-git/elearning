import React, { Fragment, useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import './CourseList.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import SubInfo from '../../components/SubInfo/SubInfo';
import { setListSetting, resetListSetting, selectPage } from '../../redux/actions/UserSettingActions';
import List from '../../components/List/List';


export default function CourseList() {

    const courseList = useSelector(state => state.CoursesReducer.courses);
    const category = useSelector(state => state.CoursesReducer.category);
    let listSetting_category = useSelector(state => state.UserSettingReducer.listSetting.category); // không dùng obj để tránh tham chiếu, không render được
    let listSetting_sort = useSelector(state => state.UserSettingReducer.listSetting.sort);
    let listSetting_itemperpage = useSelector(state => state.UserSettingReducer.listSetting.itemperpage);

    let filterList = courseList.filter(course => course.danhMucKhoaHoc.maDanhMucKhoahoc === (listSetting_category === 'all' ? course.danhMucKhoaHoc.maDanhMucKhoahoc : listSetting_category))
    const listSetting = {...useSelector(state => state.UserSettingReducer.listSetting)};


    const doSort = (how, list) => {
        if (how === 'AZ') {
          return list.sort((a, b) => (a.biDanh > b.biDanh) ? 1 : -1);
        } if (how === 'ZA') {
          return list.sort((a, b) => (a.biDanh > b.biDanh) ? -1 : 1);
        } if (how === 'oldest') {
            return list.sort((a, b) => (a.ngayTao > b.ngayTao) ? -1 : 1);
          } else {
            return list.sort((a, b) => (a.ngayTao > b.ngayTao) ? 1 : -1);
          }
      }
    const sortList = doSort (listSetting.sort, filterList)



    let currentPage = 1;

    const categoryRender = () => {
        return category.map((item, index) => {
            return <Fragment>
                <input type="radio" id={item.maDanhMuc} name="category" defaultValue={item.maDanhMuc} key={index} />
                <label htmlFor={item.maDanhMuc}>{item.tenDanhMuc}</label><br />
            </Fragment>
        })
    }
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setListSetting(e.target.name, e.target.value));
        dispatch(selectPage(0));
    }

    useEffect(() => () => {
        dispatch(resetListSetting());
    }, [])


    return (
        <div className="container" style={{ marginTop: '60px' }}>
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="title">Tất cả khóa học</h1>
                <span>{filterList.length} kết quả</span>
            </div>
            <div className="row">
                <div className="d-none d-lg-block col-lg-3">
                    <div style={{ padding: 30, backgroundColor: 'white', borderRadius: 20 }} onChange={handleChange} >
                        <input type="text" placeholder="Tìm kiếm khóa học" style={{ width: '100%', border: 'none', borderBottom: '.5px solid #504343', height: 35, marginBottom: 30 }} />
                        <h2 className="smallTitle">Danh mục</h2>
                        <input type="radio" id="all" name="category" defaultValue="all" defaultChecked />
                        <label htmlFor="all" >Tất cả</label><br />
                        {categoryRender()}
                        <h2 className="smallTitle">Sắp xếp</h2>
                        <input type="radio" id="AZ" name="sort" defaultValue="AZ" defaultChecked />
                        <label htmlFor="AZ">A - Z</label><br />
                        <input type="radio" id="ZA" name="sort" defaultValue="ZA" />
                        <label htmlFor="ZA">Z - A</label><br />
                        <input type="radio" id="oldest" name="sort" defaultValue="oldest" />
                        <label htmlFor="oldest">Cũ nhất</label><br />
                        <input type="radio" id="newest" name="sort" defaultValue="newest" />
                        <label htmlFor="newest">Mới nhất</label><br /><br />
                        <h2 className="smallTitle">Kết quả mỗi trang</h2>
                        <input type="radio" id="5" name="itemperpage" defaultValue="5" defaultChecked />
                        <label htmlFor="5" >5</label><br />
                        <input type="radio" id="10" name="itemperpage" defaultValue="10" />
                        <label htmlFor="10">10</label><br />
                    </div>
                </div>
                <div className="col-12 col-lg-9">
                    <div style={{ padding: '30px 0', backgroundColor: 'white', borderRadius: 20 }}>
                        <List list={sortList} itemperpage={listSetting.itemperpage} />

                    </div>
                </div>
            </div>
        </div>

    )
}
