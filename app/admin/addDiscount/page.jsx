'use client';

import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Cookies from "js-cookie";
const FormHeader = dynamic(() => import("@/components/sub/formHeader"), { ssr: false });
const DiscountForm = dynamic(() => import("@/components/sub/discountForm"), { ssr: false });
const Notification = dynamic(() => import("@/components/sub/notification"), { ssr: false });
const Dashboard = dynamic(() => import("@/components/sub/admin/dashboard"), { ssr: false });
const MotorList = dynamic(() => import("@/components/sub/admin/motorList"), { ssr: false });
const User = dynamic(() => import("@/components/sub/admin/user"), { ssr: false });
const History = dynamic(() => import("@/components/sub/admin/history"), { ssr: false });
const Rating = dynamic(() => import("@/components/sub/admin/rating"), { ssr: false });
const Discount = dynamic(() => import("@/components/sub/admin/discount"), { ssr: false });
const MoneyManagement = dynamic(() => import("@/components/sub/admin/laporanKeuangan"), { ssr: false });

export default function AddDiscount() {
    const [activeComponent, setActiveComponent] = useState("addDiscount");
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [response, setResponse] = useState(null);
    const token = Cookies.get('token');

    const handleBtnClick = (component) => {
        setActiveComponent(component);
    };

    if (typeof window !== 'undefined') {
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
                {activeComponent === "moneyManagement" && <MoneyManagement />}
                {activeComponent === "rating" && <Rating />}
            </div>
            {activeComponent === 'dashboard' || activeComponent === 'list' || activeComponent === 'user' || activeComponent === 'discount' || activeComponent === 'history' || activeComponent === 'moneyManagement' || activeComponent === 'rating' ? null :
                <div className="p-4 xl:ml-80">
                    <FormHeader activeComponent={activeComponent} handleBtnClick={handleBtnClick} />
                    <div className="mt-12">
                        <DiscountForm token={token} response={response} setResponse={setResponse} setShowNotification={setShowNotification} setLoading={setLoading} loading={loading} />
                        <Notification showNotification={showNotification} />
                    </div>
                </div>
            }
        </>
    );
}