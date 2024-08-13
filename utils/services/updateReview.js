export const updateReview = async ({ id, token, file, nama_pengguna, penilaian, komentar }) => {
    const formData = new FormData();
    if (file) formData.append('gambar', file);
    if (nama_pengguna) formData.append('nama_pengguna', nama_pengguna);
    if (penilaian) formData.append('penilaian', penilaian);
    if (komentar) formData.append('komentar', komentar);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review/edit/${id}`, {
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
        return data.review;
    } catch (err) {
        throw new Error(`An error occurred: ${err.message}`);
    }
};
