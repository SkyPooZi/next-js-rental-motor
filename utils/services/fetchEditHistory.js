export const EditHistory = async ({
    id,
    token,
    nama_lengkap,
    email,
    no_telp,
    akun_sosmed,
    alamat,
    penyewa,
    motor_id,
    tanggal_mulai,
    tanggal_selesai,
    keperluan_menyewa,
    penerimaan_motor,
    nama_kontak_darurat,
    nomor_kontak_darurat,
    hubungan_dengan_kontak_darurat,
    id_diskon,
    metode_pembayaran,
    total_pembayaran,
    status_history,
    selectedMotor,
    setHistory,
    setShowNotification,
    setError,
    setLoading
}) => {
    const formData = new FormData();
    if (nama_lengkap) formData.append('nama_lengkap', nama_lengkap);
    if (email) formData.append('email', email);
    if (no_telp) formData.append('no_telp', no_telp);
    if (akun_sosmed) formData.append('akun_sosmed', akun_sosmed);
    if (alamat) formData.append('alamat', alamat);
    if (penyewa) formData.append('penyewa', penyewa);
    if (motor_id) formData.append('motor_id', motor_id);
    if (selectedMotor) formData.append('motor_id', selectedMotor);
    if (tanggal_mulai) formData.append('tanggal_mulai', tanggal_mulai);
    if (tanggal_selesai) formData.append('tanggal_selesai', tanggal_selesai);
    if (keperluan_menyewa) formData.append('keperluan_menyewa', keperluan_menyewa);
    if (penerimaan_motor) formData.append('penerimaan_motor', penerimaan_motor);
    if (nama_kontak_darurat) formData.append('nama_kontak_darurat', nama_kontak_darurat);
    if (nomor_kontak_darurat) formData.append('nomor_kontak_darurat', nomor_kontak_darurat);
    if (hubungan_dengan_kontak_darurat) formData.append('hubungan_kontak_darurat', hubungan_dengan_kontak_darurat);
    if (id_diskon) formData.append('diskon.id', id_diskon);
    if (metode_pembayaran) formData.append('metode_pembayaran', metode_pembayaran);
    if (total_pembayaran) formData.append('total_pembayaran', total_pembayaran);
    if (status_history) formData.append('status_history', status_history);

    setLoading(true);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/edit/${id}`, {
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

            setHistory((prevHistory) => ({
                ...prevHistory,
                ...(nama_lengkap && { nama_lengkap: data.history.nama_lengkap }),
                ...(email && { email: data.history.email }),
                ...(no_telp && { no_telp: data.history.no_telp }),
                ...(akun_sosmed && { akun_sosmed: data.history.akun_sosmed }),
                ...(alamat && { alamat: data.history.alamat }),
                ...(penyewa && { penyewa: data.history.penyewa }),
                ...(motor_id && { motor_id: data.history.motor_id }),
                ...(selectedMotor && { selectedMotor: data.history.nama_motor }),
                ...(tanggal_mulai && { tanggal_mulai: data.history.tanggal_mulai }),
                ...(tanggal_selesai && { tanggal_selesai: data.history.tanggal_selesai }),
                ...(keperluan_menyewa && { keperluan_menyewa: data.history.keperluan_menyewa }),
                ...(penerimaan_motor && { penerimaan_motor: data.history.penerimaan_motor }),
                ...(nama_kontak_darurat && { nama_kontak_darurat: data.history.nama_kontak_darurat }),
                ...(nomor_kontak_darurat && { nomor_kontak_darurat: data.history.nomor_kontak_darurat }),
                ...(hubungan_dengan_kontak_darurat && { hubungan_dengan_kontak_darurat: data.history.hubungan_dengan_kontak_darurat }),
                ...(id_diskon && { id_diskon: data.history.id_diskon }),
                ...(metode_pembayaran && { metode_pembayaran: data.history.metode_pembayaran }),
                ...(total_pembayaran && { total_pembayaran: data.history.total_pembayaran }),
                ...(status_history && { status_history: data.history.status_history }),
            }));

            setTimeout(() => {
                setShowNotification(false);
                window.location.reload();
            }, 1000);
        }
    } catch (err) {
        setError(`An error occurred: ${err.message}`);
    } finally {
        setLoading(false);
    }
};
