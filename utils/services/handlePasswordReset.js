export const handlePasswordReset = async (e, { password, confirmPassword, id, token, setError, setLoadingPassword, setShowNotification, setUser }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        setError("Kata sandi baru tidak sama dengan kata sandi lama!");
        return;
    }

    const formData = new FormData();
    formData.append('password', password);
    formData.append('password_confirmation', confirmPassword);

    setLoadingPassword(true);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/account/${id}`, {
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
            setError(null);

            setUser((prevUser) => ({
                ...prevUser,
                ...(password && { password: data.user.password }),
            }));

            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
    } catch (err) {
        setError(`An error occurred: ${err.message}`);
    } finally {
        setLoadingPassword(false);
    }
};
