export const updateMoneyReport = async ({
    id,
    pengguna_id,
    total_harga_motor,
    total_biaya_overtime,
    total_biaya_diantar,
    total_potongan_point,
    total_biaya_diskon,
    total_biaya_admin,
    total_biaya_reschedule,
    total_pembayaran,
    token
}) => {
    const formData = new FormData();
    if (pengguna_id) formData.append('pengguna_id', pengguna_id);
    if (total_harga_motor) formData.append('total_harga_motor', total_harga_motor);
    if (total_biaya_overtime) formData.append('total_biaya_overtime', total_biaya_overtime);
    if (total_biaya_diantar) formData.append('total_biaya_diantar', total_biaya_diantar);
    if (total_potongan_point) formData.append('total_potongan_point', total_potongan_point);
    if (total_biaya_diskon) formData.append('total_biaya_diskon', total_biaya_diskon);
    if (total_biaya_admin) formData.append('total_biaya_admin', total_biaya_admin);
    if (total_biaya_reschedule) formData.append('total_biaya_reschedule', total_biaya_reschedule);
    if (total_pembayaran) formData.append('total_pembayaran', total_pembayaran);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/keuangan/edit/${id}`, {
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
