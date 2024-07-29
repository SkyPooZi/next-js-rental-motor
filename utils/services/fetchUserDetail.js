export const fetchUserDetail = async (id, token) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/detail/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.status === 204) {
      setError('No content available for the provided ID');
    } else if (!response.ok) {
      setError(`Failed to fetch data: ${response.statusText}`);
    } else {
      const data = await response.json();
      return data.user;
    }
  } catch (err) {
    setError(`An error occurred: ${err.message}`);
  }
}