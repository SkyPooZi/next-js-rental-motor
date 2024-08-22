// utils/fetchregister.js

const fetchRegister = async (formData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
  
    const data = await response.json();
    return data;
  };
  
  export default fetchRegister;
  