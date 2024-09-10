'use client';

import React, { useState, useEffect } from 'react';
import AdminSetting from '@/components/sub/admin/adminSetting'; // Correct import path to the component
import Sidebar from '@/components/main/sidebar'; // Import Sidebar
import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import Discount from "@/components/sub/admin/discount";
import Cookies from 'js-cookie';

const SettingPage = ({ params: { id } }) => {
    const [token, setToken] = useState(null);
    const [activeComponent, setActiveComponent] = useState('adminSetting'); // Track the active component in the sidebar

    // Use useEffect to get the token from cookies on the client side
    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            setToken(storedToken); // Set token in state once it's retrieved
        }
    }, []); // Runs only once when the component is mounted

    // Handle button clicks in the sidebar
    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };

    // Render nothing if token is not yet available
    if (!token) {
        return <p>Loading...</p>; // Optional: A loading state while token is being fetched
    }

    return (
        <>
            <div>
                {activeComponent === "dashboard" && <Dashboard />}
                {activeComponent === "list" && <MotorList />}
                {activeComponent === "user" && <User />}
                {activeComponent === "discount" && <Discount />}
                {activeComponent === "history" && <History />}
                {activeComponent === "rating" && <Rating />}
            </div>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar activeComponent={activeComponent} handleButtonClick={handleButtonClick} />

                {/* Main content */}
                <div className="ml-72 p-8 flex-1">
                    {activeComponent === 'adminSetting' && <AdminSetting motorId={id} token={token} />}
                    {/* You can add more conditional renders for other components based on `activeComponent` */}
                </div>
            </div>
        </>
    );
};

export default SettingPage;
