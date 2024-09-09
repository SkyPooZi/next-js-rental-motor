'use client';
import { React, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { MdHistory } from "react-icons/md";
import { FaStar, FaUserCircle, FaMotorcycle } from "react-icons/fa";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";

const StatCard = dynamic(() => import('@/components/sub/statCard'), { ssr: false });
const FormHeaderDashboard = dynamic(() => import('@/components/sub/admin/formHeaderDashboard'), { ssr: false });
const AllChart = dynamic(() => import("@/components/sub/allChart"), { ssr: false });
const MotorList = dynamic(() => import("@/components/sub/admin/motorList"), { ssr: false });
const User = dynamic(() => import("@/components/sub/admin/user"), { ssr: false });
const History = dynamic(() => import("@/components/sub/admin/history"), { ssr: false });
const HistoryChangeData = dynamic(() => import("@/components/sub/admin/historyChangeData"), { ssr: false });
const MoneyManagement = dynamic(() => import("@/components/sub/admin/laporanKeuangan"), { ssr: false });
const Rating = dynamic(() => import("@/components/sub/admin/rating"), { ssr: false });
const NewOrderBookedList = dynamic(() => import('@/components/sub/admin/newOrderBookedList'), { ssr: false });
const Discount = dynamic(() => import("@/components/sub/admin/discount"), { ssr: false });
const Loading = dynamic(() => import('@/components/ui/loading'), { ssr: false });
import { formatToRupiah } from '@/utils/formatToRupiah';
import { fetchMotorData } from '@/utils/services/fetchMotor';
import { fetchSewaData } from '@/utils/services/fetchHistoryProfit';
import { fetchReview } from '@/utils/services/reviewService';
import { fetchUser } from '@/utils/services/fetchUser';
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
        const getReviews = async () => {
            try {
                const review = await fetchReview(token);
                setUlasan(review);

                const totalUlasan = review.length;
                setTotalUlasan(totalUlasan);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        getReviews();
    }, [token]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const user = await fetchUser(token);
                setUser(user);

                const totalUser = user.length;
                setTotalUser(totalUser);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        getUsers();
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

    if(typeof window !== 'undefined')
    {
        console.log("Window Test");
    }

    return (
        <>
            {loading && (
                <Loading />
            )}
            <div>
                {activeComponent === "list" && <MotorList />}
                {activeComponent === "user" && <User />}
                {activeComponent === "discount" && <Discount />}
                {activeComponent === "history" && <History />}
                {activeComponent === "historyChangeData" && <HistoryChangeData />}
                {activeComponent === "moneyManagement" && <MoneyManagement />}
                {activeComponent === "rating" && <Rating />}
            </div>
            {activeComponent === 'list' || activeComponent === 'user' || activeComponent === 'discount' || activeComponent === 'history' || activeComponent === 'historyChangeData' || activeComponent === 'moneyManagement' || activeComponent === 'rating' ? null :
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
                                title="Total Sewa (Bulan Ini)"
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