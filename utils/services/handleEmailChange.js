export const handleEmailChange = async (e, { email, token, setLoadingEmail, setError, setOtpSent, setOtpPopupVisible, setServerOtp }) => {
    e.preventDefault();

    setLoadingEmail(true);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            setError(`Failed to send OTP: ${response.statusText}`);
        } else {
            const data = await response.json();
            console.log(data.message);

            setOtpSent(true);
            setOtpPopupVisible(true);
            setServerOtp(data.OTP);
        }
    } catch (err) {
        setError(`An error occurred: ${err.message}`);
    } finally {
        setLoadingEmail(false);
    }
};
