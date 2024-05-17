'use client';

import React from "react";

import NavbarAdmin from "@/components/sub/admin/navbar";
import { DiscountTable } from "@/components/sub/admin/discountTable";

export default function Discount() {
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
                                    <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Diskon</p>
                                </li>
                            </ol>
                        </nav>
                        <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-gray-900">Diskon</h6>
                    </div>
                    <NavbarAdmin />
                </div>
            </nav>
            <div>
                <DiscountTable />
            </div>
        </div>
    );
}