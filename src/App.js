import React, { Fragment, useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Detail from './pages/Detail/Detail';
import CourseList from './pages/CourseList/CourseList';
import { getCourseCategoryAction, getCourseListAction } from './redux/actions/CoursesManageActions';
import { getUserInfoAction } from './redux/actions/UserAction'

import UserProfile from './pages/UserProfile/UserProfile';
import MyCourses from './pages/MyCourses/MyCourses';
import UserList from './pages/UserList/UserList';

function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getCourseCategoryAction()) }, []);
  useEffect(() => { dispatch(getCourseListAction()) }, []);
  const userInfo = useSelector(state => state.UserReducer.userInfo);

  useEffect(() => { if (userInfo.taiKhoan) { dispatch(getUserInfoAction()) } }, []);


  return (
    <BrowserRouter>
      <div className="page-container">
        <Header />
        <div className="content-container">
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route exact path='/detail/:id' component={Detail} />
          <Route exact path='/all-course' component={CourseList} />
          <Route exact path='/user-list' component={UserList} />
          <Route exact path='/profile' component={UserProfile} />
          <Route exact path='/mycourse' component={MyCourses} />
        </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
