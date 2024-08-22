export const sendOtpEmail = async (email) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to send OTP. Please check the email address you entered.');
    }
  
    const data = await response.json();
    return data.OTP;
  };
  