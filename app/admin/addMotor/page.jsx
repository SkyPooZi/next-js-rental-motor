'use client';

import React, { useState } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const NavbarAdmin = dynamic(() => import("@/components/sub/admin/navbar"), { ssr: false });
const Sidebar = dynamic(() => import('@/components/main/sidebar'), { ssr: false });
const Dashboard = dynamic(() => import("@/components/sub/admin/dashboard"), { ssr: false });
const MotorList = dynamic(() => import("@/components/sub/admin/motorList"), { ssr: false });
const User = dynamic(() => import("@/components/sub/admin/user"), { ssr: false });
const History = dynamic(() => import("@/components/sub/admin/history"), { ssr: false });
const Rating = dynamic(() => import("@/components/sub/admin/rating"), { ssr: false });
const Discount = dynamic(() => import("@/components/sub/admin/discount"), { ssr: false });
const MotorForm = dynamic(() => import("@/components/sub/motorForm"), { ssr: false });
const Notification = dynamic(() => import("@/components/sub/notification"), { ssr: false });
const FormHeader = dynamic(() => import("@/components/sub/formHeader"), { ssr: false });

export default function AddMotor() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [activeComponent, setActiveComponent] = useState("addMotor");
    const token = Cookies.get('token');

    const handleBtnClick = (component) => {
        setActiveComponent(component);
    };

    if(typeof window !== 'undefined')
    {
        console.log("Window Test");
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
            {activeComponent === 'dashboard' || activeComponent === 'list' || activeComponent === 'user' || activeComponent === 'discount' || activeComponent === 'history' || activeComponent === 'rating' ? null :
                <div className="p-4 xl:ml-80">
                    <FormHeader activeComponent={activeComponent} handleBtnClick={handleBtnClick} />
                    <div className="mt-12">
                        <MotorForm token={token} setResponse={setResponse} setShowNotification={setShowNotification} setLoading={setLoading} />
                        <Notification showNotification={showNotification} />
                    </div>
                </div>
            }
        </>
    );
}