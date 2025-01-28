import React from 'react';
import Banner from '../components/Banner';
import SessionCard from '../Role/Student/SessionCard';
import TutorSection from '../components/TutorSection';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <SessionCard></SessionCard>
           <TutorSection></TutorSection>
        </div>
    );
};

export default Home;