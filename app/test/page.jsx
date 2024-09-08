'use client';

import React from 'react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function page() {
    const token = Cookies.get('token');
    const [userData, setUserData] = useState(null);
    const [nomor_hp, setNomorHp] = useState(0);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/detail/${1}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to fetch user data');
    //         }

    //         const data = await response.json();
    //         setUserData(data);
    //         setNomorHp(data.user.nomor_hp === null ? );
    //     }

    //     fetchUser();
    // }, []);

    const handleSubmits = async (e) => {
        e.preventDefault();

        const sendNotif = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-notification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                history_id: 1,
                pesan: `Halo, adam!`,
                no_telp: `${nomor_hp}`,
                email: 'adam@gmail.com',
            })
        });

        if (!sendNotif.ok) {
            throw new Error('Failed to send notification');
        }

        await sendNotif.json();

        console.log('submit');
    }
    return (
        <div>
            <button type='submit' onClick={handleSubmits}>
                Click
            </button>
        </div>
    )
}
