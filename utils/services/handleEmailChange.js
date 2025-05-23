import { fetchUser } from './fetchUser';

export const handleEmailChange = async (
    e,
    {
        email,
        token,
        setLoadingEmail,
        setError,
        setOtpSent,
        setOtpPopupVisible,
        setServerOtp
    }
) => {
    e.preventDefault();

    setLoadingEmail(true);
    setError('');  // Reset error

    try {
        // Fetch all users to check if the email is already taken
        const users = await fetchUser(token);

        // Check if the email already exists
        const emailExists = users.some(user => user.email === email);

        if (emailExists) {
            setError('Email telah digunakan oleh orang lain.');
            setLoadingEmail(false);
            return; // Early return to prevent further execution
        }

        // Proceed to send OTP if the email is not taken
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            setError(`Failed to send OTP: ${errorText}`);
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
