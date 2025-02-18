import React from 'react';
import Banner from '../components/Banner';
import SessionCard from '../Role/Student/SessionCard';
import TutorSection from '../components/TutorSection';
import Categories from '../components/Categories';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <SessionCard></SessionCard>
           <Categories></Categories>
           <TutorSection></TutorSection>
        </div>
    );
};

export default Home;