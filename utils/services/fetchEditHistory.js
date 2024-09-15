export const EditHistory = async ({
    id,
    token,
    pengguna_id,
    nama_lengkap,
    email,
    nomor_hp,
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
    total_biaya_overtime,
    total_harga_motor,
    total_biaya_admin,
    setHistory,
    setShowNotification,
    setError,
    setLoading
}) => {
    const formData = new FormData();
    if (nama_lengkap) formData.append('nama_lengkap', nama_lengkap);
    if (email) formData.append('email', email);
    if (nomor_hp) formData.append('nomor_hp', nomor_hp);
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
        // Edit the history
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/edit/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            setError(`Failed to update data: ${response.statusText}`);
            return;
        }

        // Fetch the money report
        const fetchMoneyReport = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/keuangan/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const moneyReport = await fetchMoneyReport.json();

        // Log the money report to inspect its structure
        console.log("Money Report:", moneyReport);

        // Access the keuangan array from the response
        const reportArray = moneyReport.keuangan;

        if (Array.isArray(moneyReport.keuangan)) {
            const matchedKeuangan = moneyReport.keuangan.find(
                (keuangan) => keuangan.history_id === id
            );

            if (matchedKeuangan) {
                const keuanganId = matchedKeuangan.id;

                const editResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/keuangan/edit/${keuanganId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        total_biaya_overtime: total_biaya_overtime,
                        total_harga_motor: total_harga_motor,
                        total_biaya_admin: total_biaya_admin
                    }),
                });

                await editResponse.json();
                console.log('works');

                if (!editResponse.ok) {
                    throw new Error('Failed to update keuangan');
                }

                console.log('Keuangan updated successfully');
            } else {
                console.log('No matching keuangan entry found for this historyId');
            }
        } else {
            console.error('keuanganData.keuangan is not an array:', keuanganData.keuangan);
        }

        const data = await response.json();
        setShowNotification(true);

        setHistory((prevHistory) => ({
            ...prevHistory,
            ...(nama_lengkap && { nama_lengkap: data.history.nama_lengkap }),
            ...(email && { email: data.history.email }),
            ...(nomor_hp && { nomor_hp: data.history.nomor_hp }),
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
            // window.location.reload();
        }, 1000);

    } catch (err) {
        setError(`An error occurred: ${err.message}`);
    } finally {
        setLoading(false);
    }
};
