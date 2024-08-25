import React, { useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Label } from "@/components/ui/label";

const PrivacyModal = ({ isOpen, onClose }) => {
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

                <div className="flex flex-col gap-5 py-5 px-5 bg-white rounded-md">
                    <Label>
                        <span>
                            Kebijakan Privasi
                        </span>
                    </Label>
                    <Label>
                        <span className="leading-5">
                            Terima kasih telah memilih Rental Motor Kudus. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan situs web dan layanan kami.
                        </span>
                    </Label>
                    <Label>
                        <span>
                            Informasi yang kami kumpulkan
                        </span>
                    </Label>
                    <Label>
                        <span className="leading-5">
                            1. Informasi Pribadi : Saat Anda melakukan pemesanan atau membuat akun, kami dapat mengumpulkan informasi pribadi seperti nama Anda, alamat email, nomor telepon, dan informasi pembayaran.
                        </span>
                    </Label>
                    <Label>
                        <span className="leading-5">
                            2. Informasi Penggunaan : Kami mengumpulkan informasi tentang bagaimana Anda berinteraksi dengan situs web kami, seperti alamat IP, jenis browser, halaman yang dikunjungi, dan waktu kunjungan.
                        </span>
                    </Label>
                    <Label>
                        <span>
                            Bagaimana Kami Menggunakan Informasi Anda
                        </span>
                    </Label>
                    <Label>
                        <span className="leading-5">
                            1. Pemesanan dan Layanan : Kami menggunakan informasi pribadi Anda untuk memproses pemesanan, menyediakan layanan sewa, dan berkomunikasi dengan Anda tentang reservasi Anda.
                        </span>
                    </Label>
                    <Label>
                        <span className="leading-5">
                            2. Meningkatkan Layanan Kami : Kami menganalisis data penggunaan untuk meningkatkan situs web kami, layanan, dan pengalaman pelanggan.
                        </span>
                    </Label>
                    <Label>
                        <span className="leading-5">
                            3. Pemasaran : Dengan persetujuan Anda, kami dapat mengirimkan email promosi tentang penawaran khusus, diskon, dan layanan baru.
                        </span>
                    </Label>
                    <Label>
                        <span>
                            Berbagi Informasi
                        </span>
                    </Label>
                    <Label>
                        <span className="leading-5">
                            Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Namun, kami dapat membagikan informasi Anda dengan mitra dan penyedia layanan tepercaya yang membantu kami dalam mengoperasikan situs web kami dan memberikan layanan kepada Anda.
                        </span>
                    </Label>
                    <Label>
                        <span>
                            Keamanan Data
                        </span>
                    </Label>
                    <Label>
                        <span className="leading-5">
                            Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses yang tidak sah, perubahan, pengungkapan, atau penghancuran.
                        </span>
                    </Label>
                    <Label>
                        <span>
                            Pilihan Anda
                        </span>
                    </Label>
                    <Label>
                        <span className="leading-5">
                            Anda memiliki hak untuk mengakses, memperbarui, atau menghapus informasi pribadi Anda. Anda juga dapat memilih untuk tidak menerima komunikasi pemasaran kapan pun.
                        </span>
                    </Label>
                    <Label>
                        <span>
                            Perubahan pada Kebijakan ini
                        </span>
                    </Label>
                    <Label>
                        <span className="leading-5">
                            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diposting di halaman ini, dan tanggal efektif akan diperbarui sesuai.
                        </span>
                    </Label>
                    <Label>
                        <span>
                            Hubungi Kami
                        </span>
                    </Label>
                    <Label>
                        <span className="leading-5">
                            Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi kami, silakan hubungi kami di <b>sewamotorkuduss@gmail.com</b> atau <span className="text-[#29A71A]">+62-858-7812-3310</span>.
                        </span>
                    </Label>
                    <Label>
                        <span className="text-[#FF4D33]">
                            Terakhir Diperbarui: 30-04-2024
                        </span>
                    </Label>
                </div>
            </div>
        </div>
    );
};

export default PrivacyModal;
