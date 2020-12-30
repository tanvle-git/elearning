import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/Reset.scss'
import Home from './pages/Home/Home';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Detail from './pages/Detail/Detail';
import CourseList from './pages/CourseList/CourseList';
import { getCourseCategoryAction, getCourseListAction } from './redux/actions/CoursesManageActions';
import { getUserInfoAction, getUserList, getUserType } from './redux/actions/UserAction'

import UserProfile from './pages/UserProfile/UserProfile';
import MyCourses from './pages/MyCourses/MyCourses';
import UserList from './pages/UserList/UserList';
import UserInfo from './pages/UserInfo/UserInfo';
import swal from 'sweetalert';

function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getCourseCategoryAction()) }, [dispatch]);
  useEffect(() => { dispatch(getCourseListAction('')) }, [dispatch]);
  const userInfo = useSelector(state => state.UserReducer.userInfo);

  useEffect(() => { if (userInfo.taiKhoan) { dispatch(getUserInfoAction()) } }, [userInfo.taiKhoan, dispatch]);
  useEffect(() => { if (userInfo.maLoaiNguoiDung === 'GV') { dispatch(getUserList()); dispatch(getUserType()) } }, [userInfo.maLoaiNguoiDung, dispatch]);


  return (
    <BrowserRouter>
      <div className="page-container">
        <Header />
        <div className="content-container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/detail/:id' component={Detail} />
            <Route exact path='/user/:id' component={UserInfo} />
            <Route exact path='/all-course' component={CourseList} />
            <Route exact path='/user-list' component={UserList} />
            <Route exact path='/profile' component={UserProfile} />
            <Route exact path='/mycourse' component={MyCourses} />
            <Route exact path='*' render={()=>{
              swal({ title: 'Trang không tồn tại', text: 'hệ thống tự điều hướng về trang chủ', icon: "error", button: false });
              return <Redirect to='/home'/>
            }} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
