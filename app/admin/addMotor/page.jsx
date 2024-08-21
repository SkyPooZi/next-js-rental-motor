'use client';

import React, { useState } from "react";
import Cookies from "js-cookie";
import NavbarAdmin from "@/components/sub/admin/navbar";
import Sidebar from '@/components/main/sidebar';
import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import Discount from "@/components/sub/admin/discount";
import MotorForm from "@/components/sub/motorForm";
import Notification from "@/components/sub/notification";
import FormHeader from "@/components/sub/formHeader";

export default function AddMotor() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [activeComponent, setActiveComponent] = useState("addMotor");
    const token = Cookies.get('token');

    const handleBtnClick = (component) => {
        setActiveComponent(component);
    };

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