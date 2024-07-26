export const handleVerifyOTP = async (otp, { id, email, token, setErrorOtp, setLoadingOtp, setShowNotification, setUser, setOtpPopupVisible, serverOtp }) => {
    if (!id) {
        setErrorOtp('User ID not provided.');
        return;
    }

    if (otp !== serverOtp.toString()) {
        setErrorOtp('Invalid OTP. Please try again.');
        return;
    }

    setLoadingOtp(true);

    try {
        const editResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/account/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email }),
        });

        if (!editResponse.ok) {
            setErrorOtp(`Failed to update email: ${editResponse.statusText}`);
        } else {
            const editData = await editResponse.json();
            console.log(editData.message);
            setShowNotification(true);

            setUser((prevUser) => ({
                ...prevUser,
                email: editData.user.email,
            }));

            setTimeout(() => {
                setShowNotification(false);
            }, 3000);

            setOtpPopupVisible(false);
        }
    } catch (err) {
        setErrorOtp(`An error occurred: ${err.message}`);
    } finally {
        setLoadingOtp(false);
    }
};
