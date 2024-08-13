'use client';
import { React, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { MdHistory } from "react-icons/md";
import { FaStar, FaUserCircle, FaMotorcycle } from "react-icons/fa";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { Spinner } from "@material-tailwind/react";

import StatCard from '@/components/sub/statCard';
import FormHeaderDashboard from '@/components/sub/admin/formHeaderDashboard';
import AllChart from "@/components/sub/allChart";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import NewOrderBookedList from '@/components/sub/admin/newOrderBookedList';
import Discount from "@/components/sub/admin/discount";
import { formatToRupiah } from '@/utils/formatToRupiah';
import { fetchMotorData } from '@/utils/services/fetchMotor';
import { fetchSewaData } from '@/utils/services/fetchHistoryProfit';
import { fetchReviewData } from '@/utils/services/reviewService';
import { fetchUserData } from '@/utils/services/userService';
import { fetchStatusMotorData } from '@/utils/services/motorStatusService';

export default function Dashboard() {
    const [motor, setMotor] = useState([]);
    const [sewa, setSewa] = useState([]);
    const [ulasan, setUlasan] = useState([]);
    const [availableMotor, setAvailableMotor] = useState([]);
    const [unavailableMotor, setUnavailableMotor] = useState([]);
    const [user, setUser] = useState([]);
    const [totalMotor, setTotalMotor] = useState(0);
    const [totalSewa, setTotalSewa] = useState(0);
    const [totalUlasan, setTotalUlasan] = useState(0);
    const [totalUser, setTotalUser] = useState(0);
    const [loading, setLoading] = useState(true);
    const [totalKeuntungan, setTotalKeuntungan] = useState(0);
    const [activeComponent, setActiveComponent] = useState("dashboard");
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { listMotor, totalMotor } = await fetchMotorData(token);
                setMotor(listMotor);
                setTotalMotor(totalMotor);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    useEffect(() => {
        const fetchSewa = async () => {
            try {
                const { filteredHistory, totalKeuntungan, totalSewa } = await fetchSewaData(token);
                setSewa(filteredHistory);
                setTotalKeuntungan(totalKeuntungan);
                setTotalSewa(totalSewa);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchSewa();
    }, [token]);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const { review, totalUlasan } = await fetchReviewData(token);
                setUlasan(review);
                setTotalUlasan(totalUlasan);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchReview();
    }, [token]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { user, totalUser } = await fetchUserData(token);
                setUser(user);
                setTotalUser(totalUser);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
        fetchUser();
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { listMotor, available, unavailable } = await fetchStatusMotorData(token);
                setMotor(listMotor);
                setAvailableMotor(available);
                setUnavailableMotor(unavailable);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, [token]);

    const handleBtnClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
                    <Spinner color="blue" size="xl" />
                </div>
            )}
            <div>
                {activeComponent === "list" && <MotorList />}
                {activeComponent === "user" && <User />}
                {activeComponent === "discount" && <Discount />}
                {activeComponent === "history" && <History />}
                {activeComponent === "rating" && <Rating />}
            </div>
            {activeComponent === 'list' || activeComponent === 'user' || activeComponent === 'discount' || activeComponent === 'history' || activeComponent === 'rating' ? null :
                <div className="p-4 xl:ml-80">
                    <FormHeaderDashboard activeComponent={activeComponent} handleBtnClick={handleBtnClick} />
                    <div className="mt-12">
                        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                            <StatCard
                                icon={<FaMotorcycle size="25" />}
                                title="Total Motor"
                                value={totalMotor}
                                color="blue"
                            />
                            <StatCard
                                icon={<MdHistory size="25" />}
                                title="Total Sewa"
                                value={totalSewa}
                                color="pink"
                            />
                            <StatCard
                                icon={<FaStar size="25" />}
                                title="Total Ulasan"
                                value={totalUlasan}
                                color="yellow"
                            />
                            <StatCard
                                icon={<FaUserCircle size="25" />}
                                title="Total Pengguna"
                                value={totalUser}
                                color="orange"
                            />
                            <StatCard
                                icon={<FaMotorcycle size="25" />}
                                title="Total Motor Tersedia"
                                value={availableMotor.length}
                                color="green"
                            />
                            <StatCard
                                icon={<FaMotorcycle size="25" />}
                                title="Motor Tidak Tersedia"
                                value={unavailableMotor.length}
                                color="red"
                            />
                            <StatCard
                                icon={<LiaHandHoldingUsdSolid size="25" />}
                                title="Total Hasil Keuntungan"
                                value={formatToRupiah(totalKeuntungan)}
                                color="green"
                            />
                        </div>
                    </div>
                    <div>
                        <NewOrderBookedList />
                    </div>
                    <div>
                        <AllChart />
                    </div>
                </div>
            }
        </>
    );
}