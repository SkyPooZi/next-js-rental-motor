'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const FacebookCallback = () => {
    const router = useRouter();

    useEffect(() => {
        const handleFacebookCallback = async () => {
            try {
                if (window.location.hash === "#_=_") {
                    window.location.hash = "";
                    history.replaceState(null, null, window.location.href.split("#")[0]);
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/facebook/detail`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to exchange code for token');
                }

                const data = await response.json();
                const user = data.facebook;
                const token = user.access_token;
                const id = user.pengguna_id;

                Cookies.set('token', token);
                Cookies.set('id', id);
                console.log('bearer token:', token);
                console.log('id:', id);

                router.push('/');
            } catch (error) {
                console.error('Login failed:', error);
                setError('An error occurred during login. Please try again.');
            }
        };

        handleFacebookCallback();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#FF4D33]"></div>
        </div>
    );
};

export default FacebookCallback;
