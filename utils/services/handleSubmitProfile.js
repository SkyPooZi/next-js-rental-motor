export const handleSubmitProfile = async (e, { file, nama_lengkap, id, token, setIsLoadingProfile, setError, setImage, setShowNotification, setUser }) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) formData.append('gambar', file);
    if (nama_lengkap) formData.append('nama_lengkap', nama_lengkap);

    setIsLoadingProfile(true);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            setError(`Failed to update data: ${response.statusText}`);
        } else {
            const data = await response.json();
            console.log('Updated data:', data);
            setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.user.gambar}`);
            setShowNotification(true);

            setUser((prevUser) => ({
                ...prevUser,
                ...(nama_lengkap && { nama_lengkap: data.user.nama_lengkap }),
            }));

            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
    } catch (err) {
        setError(`An error occurred: ${err.message}`);
    } finally {
        setIsLoadingProfile(false);
    }
};