import React from 'react';
import { MdDone } from "react-icons/md";

const Notification = ({ showNotification }) => (
    <>
        {showNotification && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
                <span>Data berhasil dikirim</span>
                <MdDone className="ml-2 text-white" />
            </div>
        )}
    </>
);

export default Notification;
