'use client';

import React from "react";
import { useState, useRef, useEffect } from 'react';

import { MdHistory } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import AllChart from "@/components/sub/allChart";
import NavbarAdmin from "@/components/sub/admin/navbar";
import { set } from "date-fns";

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                    }
                });
                const responseData = await response.json();
                console.log('Response Data:', responseData);

                const { listMotor } = responseData;
                console.log('listMotor Data:', listMotor);

                setMotor(listMotor);

                const totalMotor = listMotor.length;
                setTotalMotor(totalMotor);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchSewa = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                    }
                });
                const responseData = await response.json();
                console.log('Response Data:', responseData);

                const { history } = responseData;
                console.log('History Data:', history);

                setSewa(history);

                const totalSewa = history.length;
                setTotalSewa(totalSewa);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchSewa();
    }, []);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                    }
                });
                const responseData = await response.json();
                console.log('Response Data:', responseData);

                const { review } = responseData;
                console.log('Review Data:', review);

                setUlasan(review);

                const totalUlasan = review.length;
                setTotalUlasan(totalUlasan);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchReview();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                    }
                });

                const responseData = await response.json();
                console.log('Response Data:', responseData);

                const { user } = responseData;
                console.log('User Data:', user);

                setUser(user);

                const totalUser = user.length;
                setTotalUser(totalUser);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchAvailableMotor = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                    }
                });
                const responseData = await response.json();
                console.log('Response Data:', responseData);

                if (responseData.listMotor && Array.isArray(responseData.listMotor)) {
                    const { listMotor } = responseData;
                    console.log('ListMotor Data:', listMotor);

                    const available = listMotor.filter(motor => motor.status_motor === 'Tersedia');
                    console.log('Available Motors:', available);

                    setMotor(listMotor);
                    setAvailableMotor(available);
                } else {
                    console.error('ListMotor is not defined or not an array');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchAvailableMotor();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                    }
                });
                const responseData = await response.json();
                console.log('Response Data:', responseData);

                if (responseData.listMotor && Array.isArray(responseData.listMotor)) {
                    const { listMotor } = responseData;
                    console.log('ListMotor Data:', listMotor);

                    const available = listMotor.filter(motor => motor.status_motor === 'Tersedia');
                    console.log('Available Motors:', available);

                    const unavailable = listMotor.filter(motor => motor.status_motor !== 'Tersedia');
                    console.log('Unavailable Motors:', unavailable);

                    setMotor(listMotor);
                    setAvailableMotor(available);
                    setUnavailableMotor(unavailable);
                } else {
                    console.error('ListMotor is not defined or not an array');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-4 xl:ml-80">
            <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
                <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
                    <div className="capitalize">
                        <nav aria-label="breadcrumb" className="w-max">
                            <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                                <li className="flex items-center text-blue-gray-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                                    <a href="#">
                                        <p className="block antialiased text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
                                    </a>
                                    <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                </li>
                                <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                    <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Beranda</p>
                                </li>
                            </ol>
                        </nav>
                        <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-gray-900">Beranda</h6>
                    </div>
                    <NavbarAdmin />
                </div>
            </nav>
            <div className="mt-12">
                <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white shadow-md">
                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                <path fill-rule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="p-4 text-right">
                            <p className="block antialiased text-sm leading-normal font-medium">Total Motor</p>
                            <h4 className="block antialiased tracking-normal text-2xl font-semibold leading-snug">{totalMotor}</h4>
                        </div>
                        <div className="border-t border-blue-gray-50 p-4">
                            <p className="block antialiased text-sm leading-relaxed font-normal">
                                <strong className="text-green-500">+1%</strong>&nbsp;dari minggu lalu
                            </p>
                        </div>
                    </div>
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white shadow-md">
                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                            <MdHistory size='25' />
                        </div>
                        <div className="p-4 text-right">
                            <p className="block antialiased text-sm leading-normal font-medium">Total Sewa</p>
                            <h4 className="block antialiased tracking-normal text-2xl font-semibold leading-snug">{totalSewa}</h4>
                        </div>
                        <div className="border-t border-blue-gray-50 p-4">
                            <p className="block antialiased text-sm leading-relaxed font-normal">
                                <strong className="text-green-500">+10%</strong>&nbsp;dari minggu lalu
                            </p>
                        </div>
                    </div>
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white shadow-md">
                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                            <FaStar size='25' />
                        </div>
                        <div className="p-4 text-right">
                            <p className="block antialiased text-sm leading-normal font-normal">Total Ulasan</p>
                            <h4 className="block antialiased tracking-normal text-2xl font-semibold leading-snug">{totalUlasan}</h4>
                        </div>
                        <div className="border-t border-blue-gray-50 p-4">
                            <p className="block antialiased text-sm leading-relaxed font-normal">
                                <strong className="text-green-500">+35%</strong>&nbsp;dari minggu lalu
                            </p>
                        </div>
                    </div>
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white shadow-md">
                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                            <FaUserCircle size='25' color="white" />
                        </div>
                        <div className="p-4 text-right">
                            <p className="block antialiased text-sm leading-normal font-normal">Total Pengguna</p>
                            <h4 className="block antialiased tracking-normal text-2xl font-semibold leading-snug text-blue-gray-900">{totalUser}</h4>
                        </div>
                        <div className="border-t border-blue-gray-50 p-4">
                            <p className="block antialiased text-sm leading-relaxed font-normal">
                                <strong className="text-green-500">+12%</strong>&nbsp;dari minggu lalu
                            </p>
                        </div>
                    </div>
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white shadow-md">
                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                <path fill-rule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="p-4 text-right">
                            <p className="block antialiased text-sm leading-normal font-medium">Total Motor <br></br> Tersedia</p>
                            <h4 className="block antialiased tracking-normal text-2xl font-semibold leading-snug">{availableMotor.length}</h4>
                        </div>
                        <div className="border-t border-blue-gray-50 p-4">
                            <p className="block antialiased text-sm leading-relaxed font-normal">
                                <strong className="text-red-500">-5%</strong>&nbsp;dari hari ini
                            </p>
                        </div>
                    </div>
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white shadow-md">
                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                <path fill-rule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="p-4 text-right">
                            <p className="block antialiased text-sm leading-normal font-medium">Total Motor <br></br> Tidak Tersedia</p>
                            <h4 className="block antialiased tracking-normal text-2xl font-semibold leading-snug">{unavailableMotor.length}</h4>
                        </div>
                        <div className="border-t border-blue-gray-50 p-4">
                            <p className="block antialiased text-sm leading-relaxed font-normal">
                                <strong className="text-green-500">+35%</strong>&nbsp;dari hari ini
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <AllChart />
        </div>
    );
}