export const updateDiscount = async ({
    id,
    file,
    nama_diskon,
    potongan_harga,
    tanggal_mulai,
    tanggal_selesai,
    token,
    setImage,
    setShowNotification,
    setDiskon,
    setLoading,
    setError,
}) => {
    const formData = new FormData();
    if (file) formData.append('gambar', file);
    if (nama_diskon) formData.append('nama_diskon', nama_diskon);
    if (potongan_harga) formData.append('potongan_harga', potongan_harga);
    if (tanggal_mulai) formData.append('tanggal_mulai', tanggal_mulai);
    if (tanggal_selesai) formData.append('tanggal_selesai', tanggal_selesai);

    setLoading(true);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diskon/edit/${id}`, {
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
            setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.diskon.gambar}`);
            setShowNotification(true);

            setDiskon((prevDiskon) => ({
                ...prevDiskon,
                ...(nama_diskon && { nama_diskon: data.diskon.nama_diskon }),
                ...(potongan_harga && { potongan_harga: data.diskon.potongan_harga }),
                ...(tanggal_mulai && { tanggal_mulai: data.diskon.tanggal_mulai }),
                ...(tanggal_selesai && { tanggal_selesai: data.diskon.tanggal_selesai }),
            }));

            setTimeout(() => {
                setShowNotification(false);
            }, 1000);
        }
    } catch (err) {
        setError(`An error occurred: ${err.message}`);
    } finally {
        setLoading(false);
    }
};