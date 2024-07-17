import React, { useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const TermsModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div ref={modalRef} className="relative bg-white p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <FaTimes className="w-6 h-6" />
                </button>
                <div className='flex flex-col gap-5 bg-white font-medium'>
                    <div className='flex flex-row gap-2 items-center justify-center bg-white'>
                        <span className='font-bold text-black text-lg bg-white'>
                            Syarat & Ketentuan
                        </span>
                    </div>
                    <div className='flex flex-col gap-2 bg-white'>
                        <ol className='list-decimal ml-4 font-semibold text-xs w-full max-w-[500px] leading-5'>
                            <li>
                                KTP asli penyewa
                            </li>
                            <li>
                                Dokumen tambahan (KK/BPJS/ID Card/lainnya)
                            </li>
                            <li>
                                Menunjukkan AKUN SOSMED asli yang aktif, bisa Facebook/Instagram
                            </li>
                            <li>
                                Bisa menunjukkan SIM C (tidak memiliki SIM C berisiko ditanggung sendiri)
                            </li>
                            <li>
                                Lokasi pengambilan motor: Jekulo. Motor akan diantar ke tempat penyewa untuk penyewa pertama. Tidak melayani pengambilan di tempat atau COD. (Tarif antar menyesuaikan lokasi)
                            </li>
                            <li>
                                BBM disi sendiri sesuai dengan saat menerima motor
                            </li>
                            <li>
                                Pengembalian motor harus dalam kondisi yang sama seperti saat diterima, dan motor harus dikembalikan ke tempat persewaan di Jekulo. Jika tidak dapat mengembalikan ke tempat persewaan, dikenai biaya pengambilan motor ke tempat penyewa sesuai dengan tarif Grab/Gojek.
                            </li>
                            <li>
                                Kerusakan/kecelakaan sepenuhnya ditanggung penyewa.
                            </li>
                            <li>
                                Helm dan jas hujan disediakan sesuai permintaan.
                            </li>
                            <li>
                                Pembayaran dilakukan di awal saat serah terima motor.
                            </li>
                            <li>
                                Perpanjangan waktu sewa di pagi/siang hari akan dikenakan biaya setara dengan 12 jam.
                            </li>
                            <li>
                                Pembayaran perpanjangan waktu sewa kendaraan harus dilakukan sebelum waktu sewa sebelumnya habis.
                            </li>
                            <li>
                                Bersedia didokumentasikan saat serah terima motor.
                            </li>
                            <li>
                                Keterlambatan pengembalian akan dikenakan denda sebesar 10% dari harga sewa per 24 jam.
                            </li>
                            <li>
                                Segala tindak kejahatan dan penggelapan akan diproses secara hukum yang berlaku.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
