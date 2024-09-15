'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from "next/image";
import { MdDone } from "react-icons/md";
import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import Discount from "@/components/sub/admin/discount";
import Sidebar from '@/components/main/sidebar';
import NavbarAdmin from "@/components/sub/admin/navbar";
import Loading from '@/components/ui/loading';
import MoneyManagement from '@/components/sub/admin/laporanKeuangan';
import EditMoneyReport from '@/components/sub/moneyReportEdit';
import { fetchMoneyReport } from '@/utils/services/fetchMoneyReport';
import { updateMoneyReport } from '@/utils/services/handleEditMoneyReport';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

const Page = ({ params: { id } }) => {
    const [keuangan, setKeuangan] = useState(null);
    const [total_harga_motor, setTotalHargaMotor] = useState(0);
    const [total_biaya_overtime, setTotalBiayaOvertime] = useState(0);
    const [total_biaya_diantar, setTotalBiayaDiantar] = useState(0);
    const [total_potongan_point, setTotalPotonganPoint] = useState(0);
    const [total_biaya_diskon, setTotalBiayaDiskon] = useState(0);
    const [total_biaya_admin, setTotalBiayaAdmin] = useState(0);
    const [total_biaya_reschedule, setTotalBiayaReschedule] = useState(0);
    const [total_pembayaran, setTotalPembayaran] = useState(0);
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const [response, setResponse] = useState(null);
    const penggunaId = Cookies.get("id");
    const token = Cookies.get("token");

    useEffect(() => {
        const loadMotorDetail = async () => {
            const result = await fetchMoneyReport(id, token);

            if (result.error) {
                setError(result.error);
            } else {
                const keuanganData = result.data;
                console.log(keuanganData);
                setKeuangan(keuanganData);
                setTotalHargaMotor(keuanganData.total_harga_motor);
                setTotalBiayaOvertime(keuanganData.total_biaya_overtime);
                setTotalBiayaDiantar(keuanganData.total_biaya_diantar);
                setTotalPotonganPoint(keuanganData.total_potongan_point);
                setTotalBiayaDiskon(keuanganData.total_biaya_diskon);
                setTotalBiayaAdmin(keuanganData.total_biaya_admin);
                setTotalBiayaReschedule(keuanganData.total_biaya_reschedule);
                setTotalPembayaran(keuanganData.total_pembayaran);
            }
            setLoadData(false);
        };

        loadMotorDetail();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await updateMoneyReport({
                id,
                pengguna_id: penggunaId,
                total_harga_motor,
                total_biaya_overtime,
                total_biaya_diantar,
                total_potongan_point,
                total_biaya_diskon,
                total_biaya_admin,
                total_biaya_reschedule,
                total_pembayaran,
                token
            });

            setShowNotification(true);

            setKeuangan((prevMotor) => ({
                ...prevMotor,
                ...(total_harga_motor && { harga_motor: data.keuangan.total_harga_motor }),
                ...(total_biaya_overtime && { biaya_overtime: data.keuangan.total_biaya_overtime }),
                ...(total_biaya_diantar && { biaya_diantar: data.keuangan.total_biaya_diantar }),
                ...(total_potongan_point && { potongan_point: data.keuangan.total_potongan_point }),
                ...(total_biaya_diskon && { biaya_diskon: data.keuangan.total_biaya_diskon }),
                ...(total_biaya_admin && { biaya_admin: data.keuangan.total_biaya_admin }),
                ...(total_biaya_reschedule && { biaya_reschedule: data.keuangan.total_biaya_reschedule }),
                ...(total_pembayaran && { total_pembayaran: data.keuangan.total_pembayaran }),
            }));

            setTimeout(() => {
                setShowNotification(false);
                window.location.reload();
            }, 1000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBtnClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <>
            {response && (
                <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${response.error ? 'bg-red-500' : 'bg-green-500'} text-white py-2 px-4 rounded-md flex items-center shadow-lg`}>
                    <span>{response.message}</span>
                    <MdDone className={`ml-2 text-white ${response.error ? 'hidden' : ''}`} />
                </div>
            )}
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
                <div className="block p-4 xl:ml-80">
                    <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
                        <div className="flex flex-col-reverse justify-between gap-1 md:flex-row md:items-center">
                            <div className="capitalize">
                                <nav aria-label="breadcrumb" className="w-max">
                                    <ol className="hidden md:flex flex-col md:flex-row items-start w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                                        <li className="flex items-center text-blue-gray-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                                            <a href="#">
                                                <p className="block antialiased text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">beranda</p>
                                            </a>
                                            <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                        </li>
                                        <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                            <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Laporan Keuangan</p>
                                            <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                        </li>
                                        <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                            <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Edit
                                            </p>
                                        </li>
                                    </ol>
                                </nav>
                                <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-gray-900 mt-2">Edit</h6>
                            </div>
                            <div className="flex">
                                <div className="md:order-1 sm:order-2 order-2">
                                    <NavbarAdmin />
                                </div>
                                <div className="order-1">
                                    <Sidebar activeComponent={activeComponent} handleButtonClick={handleBtnClick} />
                                </div>
                            </div>
                        </div>
                    </nav>
                    {loadData && (
                        <Loading />
                    )}
                    <div className="mt-12">
                        {error ? (
                            <p>Error: {error}</p>
                        ) : keuangan ? (
                            <EditMoneyReport
                                handleSubmit={handleSubmit}
                                keuangan={keuangan}
                                total_harga_motor={total_harga_motor}
                                total_biaya_overtime={total_biaya_overtime}
                                total_biaya_diantar={total_biaya_diantar}
                                total_potongan_point={total_potongan_point}
                                total_biaya_diskon={total_biaya_diskon}
                                total_biaya_admin={total_biaya_admin}
                                total_biaya_reschedule={total_biaya_reschedule}
                                total_pembayaran={total_pembayaran}
                                setTotalHargaMotor={setTotalHargaMotor}
                                setTotalBiayaOvertime={setTotalBiayaOvertime}
                                setTotalBiayaDiantar={setTotalBiayaDiantar}
                                setTotalPotonganPoint={setTotalPotonganPoint}
                                setTotalBiayaDiskon={setTotalBiayaDiskon}
                                setTotalBiayaAdmin={setTotalBiayaAdmin}
                                setTotalBiayaReschedule={setTotalBiayaReschedule}
                                setTotalPembayaran={setTotalPembayaran}
                                loading={loading}
                                token={token}
                                id={id}
                            />
                        ) : (
                            <p>Loading...</p>
                        )}
                        {showNotification && (
                            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
                                <span>Data berhasil dikirim</span>
                                <MdDone className="ml-2 text-white" />
                            </div>
                        )}
                    </div>
                </div>
            }
        </>
    );
}

export default Page;