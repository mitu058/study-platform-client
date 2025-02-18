import React from 'react';
import Banner from '../components/Banner';
import SessionCard from '../Role/Student/SessionCard';
import TutorSection from '../components/TutorSection';
import Categories from '../components/Categories';
import AboutUs from '../components/AboutUs';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <SessionCard></SessionCard>
           <Categories></Categories>
           <AboutUs></AboutUs>
           <TutorSection></TutorSection>
        </div>
    );
};

export default Home;