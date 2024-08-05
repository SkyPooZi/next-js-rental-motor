export const createDiskon = async ({ file, nama_diskon, potongan_harga, tanggal_mulai, tanggal_selesai, token }) => {
    if (!file) {
        console.error('No file selected');
        return { error: 'No file selected' };
    }

    const formData = new FormData();
    formData.append('gambar', file);
    formData.append('nama_diskon', nama_diskon);
    formData.append('potongan_harga', potongan_harga);
    formData.append('tanggal_mulai', tanggal_mulai);
    formData.append('tanggal_selesai', tanggal_selesai);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diskon/create`, {
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