import React from 'react';
import Carousel from '../../components/Carousel/Carousel'
import CoursesClassifiedByCategory from '../../components/CoursesClassifiedByCategory/CoursesClassifiedByCategory';
import Feedbacks from '../../components/Feedbacks/Feedbacks';
import Rewards from '../../components/Rewards/Rewards';
import TopCourses from '../../components/TopCourses/TopCourses'
import WhyUs from '../../components/WhyUs/WhyUs'
import './Home.scss'

export default function Home() {
    return (
        <div>
            <Carousel/>
            <WhyUs/>
            <TopCourses/>
            <CoursesClassifiedByCategory />
            <Feedbacks />
            <Rewards />
        </div>
    )
}
