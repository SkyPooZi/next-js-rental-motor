export const updateUser = async ({ id, token, file, nama_pengguna, nama_lengkap, email, nomor_hp, alamat, peran }) => {
    const formData = new FormData();
    if (file) formData.append('gambar', file);
    if (nama_pengguna) formData.append('nama_pengguna', nama_pengguna);
    if (nama_lengkap) formData.append('nama_lengkap', nama_lengkap);
    if (email) formData.append('email', email);
    if (nomor_hp) formData.append('nomor_hp', nomor_hp);
    if (alamat) formData.append('alamat', alamat);
    if (peran) formData.append('peran', peran);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/${id}`, {
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
        return data.user;
    } catch (err) {
        throw new Error(`An error occurred: ${err.message}`);
    }
};