import React from 'react';
import Banner from '../components/Banner';
import SessionCard from '../Role/Student/SessionCard';
import TutorSection from '../components/TutorSection';
import Categories from '../components/Categories';
import AboutUs from '../components/AboutUs';
import Mentorship from '../components/Mentorship';
import CourseCards from '../components/CourseCards';
import FAQ from '../components/FAQ';
import WhyChooseUs from '../components/WhyChooseUs';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <SessionCard></SessionCard>
           <AboutUs></AboutUs>
           <Mentorship></Mentorship> 
           {/* <TutorSection></TutorSection> */}
           <CourseCards></CourseCards> 
           <Categories></Categories>
           <WhyChooseUs></WhyChooseUs>
           <FAQ></FAQ>
        </div>
    );
};

export default Home;