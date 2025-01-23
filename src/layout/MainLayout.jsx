import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    const navigaton = useNavigation();
  const isNavigation = navigaton.state === "loading";
    return (
        <div>
             {isNavigation ? (
       <div className="flex justify-center items-center h-screen">
         <span className="loading loading-spinner loading-lg"></span>
       </div>
      ) : (
        <div>
          <Navbar></Navbar>
          <div className="">
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </div>
      )}
        </div>
    );
};

export default MainLayout;