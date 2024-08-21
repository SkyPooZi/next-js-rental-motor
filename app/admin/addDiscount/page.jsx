'use client';

import React, { useState } from "react";
import Cookies from "js-cookie";
import FormHeader from "@/components/sub/formHeader";
import DiscountForm from "@/components/sub/discountForm";
import Notification from "@/components/sub/notification";
import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import Discount from "@/components/sub/admin/discount";

export default function AddDiscount() {
    const [activeComponent, setActiveComponent] = useState("addDiscount");
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [response, setResponse] = useState(null);
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
                        <DiscountForm token={token} setResponse={setResponse} setShowNotification={setShowNotification} setLoading={setLoading} />
                        <Notification showNotification={showNotification} />
                    </div>
                </div>
            }
        </>
    );
}