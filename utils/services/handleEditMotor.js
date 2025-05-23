export const updateMotor = async ({
    id,
    pengguna_id,
    file,
    harga_motor_diantar,
    nama_motor,
    tipe_motor,
    merk_motor,
    stok_motor,
    harga_motor_per_1_hari,
    harga_motor_per_1_minggu,
    status_motor,
    is_hidden,
    tanggal_mulai_tidak_tersedia,
    tanggal_selesai_tidak_tersedia,
    token,
}) => {
    const formData = new FormData();
    if (file) formData.append('gambar_motor', file);
    if (harga_motor_diantar) formData.append('harga_motor_diantar', harga_motor_diantar);
    if (nama_motor) formData.append('nama_motor', nama_motor);
    if (tipe_motor) formData.append('tipe_motor', tipe_motor);
    if (merk_motor) formData.append('merk_motor', merk_motor);
    if (stok_motor) formData.append('stok_motor', stok_motor);
    if (harga_motor_per_1_hari) formData.append('harga_motor_per_1_hari', harga_motor_per_1_hari);
    if (harga_motor_per_1_minggu) formData.append('harga_motor_per_1_minggu', harga_motor_per_1_minggu);
    if (status_motor) formData.append('status_motor', status_motor);  // status_motor is required
    if (is_hidden !== undefined && is_hidden !== null) formData.append('is_hidden', is_hidden);
    if (tanggal_mulai_tidak_tersedia) formData.append('tanggal_mulai_tidak_tersedia', tanggal_mulai_tidak_tersedia);
    if (tanggal_selesai_tidak_tersedia) formData.append('tanggal_selesai_tidak_tersedia', tanggal_selesai_tidak_tersedia);
    if (pengguna_id) formData.append('pengguna_id', pengguna_id);  // pengguna_id is required

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/edit/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`  // No 'Content-Type' header for FormData
            },
            body: formData
        });

        // const updateData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/riwayat-data/detail-list-motor/${id}`, {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // })

        if (!response.ok) {
            throw new Error(`Failed to update data: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(`An error occurred: ${err.message}`);
    }
};
