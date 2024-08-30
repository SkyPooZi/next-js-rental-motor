export const handleSubmitPersonalData = async (e, { nomor_hp, alamat, id, token, setIsLoadingPersonalData, setError, setShowNotification, setUser }) => {
    e.preventDefault();

    const formData = new FormData();
    if (nomor_hp) formData.append('nomor_hp', nomor_hp);
    if (alamat) formData.append('alamat', alamat);

    setIsLoadingPersonalData(true);

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
            setShowNotification(true);

            setUser((prevUser) => ({
                ...prevUser,
                ...(nomor_hp && { nomor_hp: data.user.nomor_hp }),
                ...(alamat && { alamat: data.user.alamat }),
            }));

            setTimeout(() => {
                setShowNotification(false);
                window.location.reload();
            }, 1000);
        }
    } catch (err) {
        setError(`An error occurred: ${err.message}`);
    } finally {
        setIsLoadingPersonalData(false);
    }
};