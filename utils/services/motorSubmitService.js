export const submitMotorData = async ({ file, nama_motor, tipe_motor, merk_motor, stok_motor, harga_motor_per_1_hari, harga_motor_per_1_minggu, fasilitas_motor, status_motor, token }) => {
    if (!file) {
        console.error('No file selected');
        return { error: 'No file selected' };
    }

    const formData = new FormData();
    formData.append('gambar_motor', file);
    formData.append('nama_motor', nama_motor);
    formData.append('tipe_motor', tipe_motor);
    formData.append('merk_motor', merk_motor);
    formData.append('stok_motor', stok_motor);
    formData.append('harga_motor_per_1_hari', harga_motor_per_1_hari);
    formData.append('harga_motor_per_1_minggu', harga_motor_per_1_minggu);
    formData.append('fasilitas_motor', fasilitas_motor);
    formData.append('status_motor', status_motor);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network Error');
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        return { error: error.message };
    }
};