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
import UserProfile from './pages/UserProfile/UserProfile';
function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getCourseCategoryAction()) }, [])
  useEffect(() => { dispatch(getCourseListAction()) }, [])

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/detail/:id' component={Detail} />
        <Route exact path='/all-course' component={CourseList} />
        <Route exact path='/profile' component={UserProfile} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
