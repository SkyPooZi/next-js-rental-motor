import Cookies from 'js-cookie';

const fetchCatalog = async () => {
  const token = Cookies.get('token');

  if (!token) {
    console.error('Token not found');
    return [];
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 200) {
      return data.listMotor;
    } else {
      console.error('Unexpected response status:', data.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching motor data:', error);
    return [];
  }
};

export default fetchCatalog;