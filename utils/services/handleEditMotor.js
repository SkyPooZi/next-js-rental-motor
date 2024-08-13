export const updateMotor = async ({
    id,
    file,
    nama_motor,
    tipe_motor,
    merk_motor,
    stok_motor,
    harga_motor_per_1_hari,
    harga_motor_per_1_minggu,
    fasilitas_motor,
    status_motor,
    token
}) => {
    const formData = new FormData();
    if (file) formData.append('gambar_motor', file);
    if (nama_motor) formData.append('nama_motor', nama_motor);
    if (tipe_motor) formData.append('tipe_motor', tipe_motor);
    if (merk_motor) formData.append('merk_motor', merk_motor);
    if (stok_motor) formData.append('stok_motor', stok_motor);
    if (harga_motor_per_1_hari) formData.append('harga_motor_per_1_hari', harga_motor_per_1_hari);
    if (harga_motor_per_1_minggu) formData.append('harga_motor_per_1_minggu', harga_motor_per_1_minggu);
    if (fasilitas_motor) formData.append('fasilitas_motor', fasilitas_motor);
    if (status_motor) formData.append('status_motor', status_motor);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/edit/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Failed to update data: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(`An error occurred: ${err.message}`);
    }
};
