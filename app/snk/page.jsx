import React from 'react';
import Snk from './components/snk';
import Navbar from '@/components/main/Navbar';
import Footer from '@/components/main/Footer';

const SnkPage = () => {
    return (
        <>
        <Navbar/>
        <div className='bg-white'>     
            <Snk/>
        </div>
        <Footer/>
        </>
    );
}

export default SnkPage;