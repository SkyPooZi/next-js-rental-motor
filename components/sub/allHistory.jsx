"use client";

import React from "react";

import PaymentWait from "@/components/sub/paymentWait";
import Booked from "@/components/sub/booked";
import InUse from "@/components/sub/inUse";
import DoneRentBefore from "@/components/sub/doneRentBefore";
import DoneRentAfter from "@/components/sub/doneRentAfter";
import Canceled from "@/components/sub/canceled";

export default function AllHistory() {

    return (
        <div className="flex flex-col gap-5">
            <PaymentWait />
            <Booked />
            <InUse />
            <DoneRentBefore />
            <DoneRentAfter />
            <Canceled />
        </div>
    );
}