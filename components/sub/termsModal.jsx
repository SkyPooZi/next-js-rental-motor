import React, { useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Label } from "@/components/ui/label";

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
            <div
                ref={modalRef}
                className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <FaTimes className="w-6 h-6" />
                </button>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-2 items-center justify-start'>
                        <Label>
                            <span className='text-black text-lg'>
                                Syarat & Ketentuan
                            </span>
                        </Label>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>
                            <ol className='list-decimal ml-4 text-base w-full max-w-[500px] leading-6'>
                                <li className="mb-2">KTP asli penyewa</li>
                                <li className="mb-2">Dokumen tambahan (KK/BPJS/ID Card/lainnya)</li>
                                <li className="mb-2">Menunjukkan AKUN SOSMED asli yang aktif, bisa Facebook/Instagram</li>
                                <li className="mb-2">Bisa menunjukkan SIM C (tidak memiliki SIM C berisiko ditanggung sendiri)</li>
                                <li className="mb-2">Lokasi pengambilan motor: Jekulo. Motor akan diantar ke tempat penyewa untuk penyewa pertama. Tidak melayani pengambilan di tempat atau COD. (Tarif antar menyesuaikan lokasi)</li>
                                <li className="mb-2">BBM disi sendiri sesuai dengan saat menerima motor</li>
                                <li className="mb-2">Pengembalian motor harus dalam kondisi yang sama seperti saat diterima, dan motor harus dikembalikan ke tempat persewaan di Jekulo. Jika tidak dapat mengembalikan ke tempat persewaan, dikenai biaya pengambilan motor ke tempat penyewa sesuai dengan tarif Grab/Gojek.</li>
                                <li className="mb-2">Kerusakan/kecelakaan sepenuhnya ditanggung penyewa.</li>
                                <li className="mb-2">Helm dan jas hujan disediakan sesuai permintaan.</li>
                                <li className="mb-2">Pembayaran dilakukan di awal saat serah terima motor.</li>
                                <li className="mb-2">Perpanjangan waktu sewa di pagi/siang hari akan dikenakan biaya setara dengan 12 jam.</li>
                                <li className="mb-2">Pembayaran perpanjangan waktu sewa kendaraan harus dilakukan sebelum waktu sewa sebelumnya habis.</li>
                                <li className="mb-2">Bersedia didokumentasikan saat serah terima motor.</li>
                                <li className="mb-2">Keterlambatan pengembalian akan dikenakan denda sebesar 10% dari harga sewa per 24 jam.</li>
                                <li className="mb-2">Segala tindak kejahatan dan penggelapan akan diproses secara hukum yang berlaku.</li>
                            </ol>
                        </Label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
