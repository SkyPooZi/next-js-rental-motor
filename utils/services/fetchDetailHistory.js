export const fetchHistoryDetail = async (id, token, setHistory, setError, setMotorId, setSelectedMotor, setTanggalMulai, setTanggalSelesai, setHargaRental, setNomorHp, setNomorKontakDarurat) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/detail/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 204) {
            return { error: 'No content available for the provided ID' };
        } else if (!response.ok) {
            return { error: `Failed to fetch data: ${response.statusText}` };
        } else {
            const data = await response.json();
            console.log('Fetched data:', data.history);
            setHistory(data.history);
            setMotorId(data.history.list_motor.id);
            setSelectedMotor(data.history.list_motor.id);
            setTanggalMulai(data.history.tanggal_mulai);
            setTanggalSelesai(data.history.tanggal_selesai);
            setHargaRental(data.history.total_pembayaran);
            setNomorHp(data.history.nomor_hp);
            setNomorKontakDarurat(data.history.nomor_kontak_darurat);
        }
    } catch (err) {
        setError(`An error occurred: ${err.message}`);
    }
};
