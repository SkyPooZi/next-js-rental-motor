'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

const PaymentSuccessPage = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');
    const statusCode = searchParams.get('status_code');
    const transactionStatus = searchParams.get('transaction_status');

    return (
        <div>
            <h1>Payment Success</h1>
            <p>Order ID: {orderId}</p>
            <p>Status Code: {statusCode}</p>
            <p>Transaction Status: {transactionStatus}</p>
            <a href="/">Back to Home</a>
        </div>
    );
};

export default PaymentSuccessPage;
