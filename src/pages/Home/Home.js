import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel/Carousel'
import CoursesClassifiedByCategory from '../../components/CoursesClassifiedByCategory/CoursesClassifiedByCategory';
import Feedbacks from '../../components/Feedbacks/Feedbacks';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header'
import Rewards from '../../components/Rewards/Rewards';
import TopCourses from '../../components/TopCourses/TopCourses'
import WhyUs from '../../components/WhyUs/WhyUs'
import './Home.scss'

export default function Home(props) {
    return (
        <div>
            {/* <Header/> */}
            <Carousel/>
            <WhyUs/>
            <TopCourses/>
            <CoursesClassifiedByCategory />
            <Feedbacks />
            <Rewards />
            {/* <Footer /> */}
        </div>
    )
}
