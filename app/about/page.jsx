import Image from 'next/image';
import Navbar from '@/components/main/Navbar';
import Footer from '@/components/main/Footer';

export default function About(){
    return (
        <>
            <Navbar/>
                <div className="flex flex-col justify-between bg-[#F6F7F9]">
                    <div className="container mx-auto flex flex-col lg:flex-row lg:items-center bg-transparent mt-12">
                        <div className="lg:w-1/2 pr-20">
                            <h1 className="text-black mb-4 text-4xl font-extrabold">Tentang Kami</h1>
                            <p className="text-black">
                                <span className="block">Selamat datang di layanan sewa motor terpercaya di Kudus! </span>
                                <span className="block">Kami adalah solusi transportasi andalan Anda, menyediakan</span> 
                                <span className="block">akses mudah dan nyaman ke berbagai destinasi di sekitar Kudus. Dengan komitmen kami untuk memberikan layanan terbaik, kami bangga menjadi mitra perjalanan pilihan bagi masyarakat lokal dan wisatawan. </span>
                            </p>

                            <div className="container mt-10 mb-8"></div>
                                <h1 className="text-black mb-4 text-4xl font-extrabold">Layanan Kami</h1>
                                    <p className="text-black">
                                        <span className="block">Kami menyediakan berbagai pilihan motor berkualitas tinggi untuk memenuhi kebutuhan perjalanan Anda. Dengan tarif  </span>
                                        <span className="block">yang kompetitif dan proses penyewaan yang sederhana, kami memastikan pengalaman menyewa motor Anda</span> 
                                        <span className="block">menjadi lancar dan menyenangkan. Kami juga menawarkan berbagai paket sewa harian, mingguan, dan bulanan yang dapat disesuaikan dengan kebutuhan Anda.</span>
                                    </p>
                            </div>

                        <div className='lg:w-1/2 flex flex-col rounded-xl mb-12 items-start'>
                            <Image src='/images/motor/Vespa.png' alt='motor' width={500} height={350} />
                        </div>
                    </div>
                </div>

                <div className="bg-[#F6F7F9] flex justify-center items-center pt-12" style={{ minHeight: "30vh" }}>
                    <div className='container mx-auto px-4 text-black'>
                        <p className="text-3xl font-bold text-center ">Keunggulan Kami</p>
                    </div>
                </div>

                <div className="bg-[#F6F7F9] py-2 pb-32">
                    <div className="container items-center grid grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 gap-4 mb-12">
                        <div className="rounded-xl overflow-hidden">
                            <img src="/images/utils/logo1.png" alt="Gambar" style={{ maxHeight: "150px", maxWidth: "190px"}} />
                        </div>
                        <div className="rounded-xl overflow-hidden">
                            <img src="/images/utils/logo2.png" alt="Picture 2" style={{ maxHeight: "150px", maxWidth: "190px"}} />
                        </div>
                        <div className="rounded-xl overflow-hidden">
                            <img src="/images/utils/logo3.png" alt="Picture 3" style={{ maxHeight: "150px", maxWidth: "190px"}} />
                        </div>
                        <div className="rounded-xl overflow-hidden">
                            <img src="/images/utils/logo4.png" alt="Picture 4" style={{ maxHeight: "150px", maxWidth: "190px"}} />
                        </div>
                        <div className="rounded-xl overflow-hidden">
                            <img src="/images/utils/logo5.png" alt="Picture 5" style={{ maxHeight: "150px", maxWidth: "190px"}} />
                        </div>
                        <div className="rounded-xl overflow-hidden">
                            <img src="/images/utils/logo6.png" alt="Picture 6" style={{ maxHeight: "150px", maxWidth: "190px"}} />
                        </div>
                    </div>
                </div>       

                <div className="bg-[#FF4D30]">
                    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4 items-center">
                        <img src="/images/utils/orang.png" alt="Gambar Orang" className="py-12 pl-8" style={{ maxHeight: "450px", maxWidth: "284px" }} />
                        <div className="text-white col-span-2">
                            <h1 className="text-4xl font-bold mb-4">MENGAPA MEMILIH KAMI?</h1>
                            <p>Kami menghargai kepercayaan Anda dalam memilih layanan sewa motor kami. Dengan fokus pada kepuasan pelanggan, kami berusaha untuk memberikan pengalaman perjalanan yang tak terlupakan. Jadilah bagian dari komunitas kami dan rasakan kebebasan berkendara dengan layanan sewa motor terbaik di Kudus.</p>
                            <br/>
                            <p>Hubungi kami sekarang untuk informasi lebih lanjut atau lakukan pemesanan online. Terima kasih atas kepercayaan Anda kepada kami sebagai mitra perjalanan Anda di Kudus!</p>
                            <div className="flex space-x-4 mt-4">
                                <button className="bg-white text-[#FF4D30] py-2 px-4 rounded-full">Hubungi Untuk Tanya Tanya</button>
                                <button className="border border-white text-white py-2 px-4 rounded-full">Lihat Pilihan Motor</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F6F7F9] flex flex-col justify-center items-center pt-12" style={{ minHeight: "30vh" }}>
                    <div className='container mx-auto px-4 text-black'>
                        <p className="text-3xl font-bold text-center mb-4">Lokasi Kami</p>
                    </div>
                    <img src="/images/utils/map.png" alt="peta" className="mt-14 mb-12" />
                </div>


            <Footer/>
        </>
    );
}
