// utils/fetchForgotPass.js

export const fetchUserIdByEmail = async (email) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user data. Please try again.');
    }
  
    const data = await response.json();
    const user = data.user.find((user) => user.email === email);
  
    if (!user) {
      throw new Error('Email not found.');
    }
  
    return user.id;
  };
  
  export const updatePassword = async (userId, newPassword) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/account/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update password. Please try again.');
    }
  
    return response.json();
  };
