"use client";

import React from 'react';

export default function SyaratDanKetentuan() {

  return (
    <div className="flex flex-col items-center justify-center bg-[#F6F7F9]">
      <div className="mx-view-pc">
        <div className="mt-10 mb-2">
          <h1 className="text-2xl text-black font-bold text-center">Syarat & Ketentuan</h1>
        </div>
        <div className='mt-2 mb-4'>
          <h2 className='text-xl text-black font-bold mt-4 mb-2'>Sebelum Pengambilan</h2>
          <ol className="list-decimal text-base font-medium text-justify ml-5">
            <li>Penyewa harus membagikan kepada penyedia foto KTP mereka.</li>
            <li>Penyewa harus membagikan kepada penyedia foto SIM C mereka.</li>
            <li>Penyewa harus membagikan kepada penyedia nama akun media sosial mereka.</li>
            <li>Penyewa yang tidak memiliki akun media sosial harus membagikan kepada penyedia salinan SIM C atau kartu mahasiswa/pelajar mereka sebagai pengganti.</li>
            <li>Bila penyewa tidak memiliki alamat tetap, penyewa wajib membagikan data pendukung berupa: Kartu Keluarga, BPJS, atau KTP.</li>
          </ol>
        </div>
        <div className='mt-2 mb-4'>
          <h2 className="text-xl text-black font-bold mt-4 mb-2">Saat Pengambilan</h2>
          <ol className='list-decimal text-base font-medium text-justify ml-5'>
            <li>Penyewa harus menunjukkan KTP yang berlaku.</li>
            <li>Penyewa diwajibkan untuk memfotokopi KTP atau salah satu data asli mereka dengan penyedia selama durasi rental.</li>
            <li>Pengemudi dapat mengambil foto dokumentasi kendaraan sebelum serah terima dilakukan. Pastikan kendaraan dikembalikan dalam kondisi yang sama seperti semula.</li>
            <li>Pengemudi harus berusia antara 18 - 75 tahun.</li>
            <li>Pengemudi harus menunjukkan SIM C yang masih berlaku.</li>
            <li>Pengemudi harus sudah memiliki SIM C.</li>
            <li>Semua dokumen yang ditunjukkan harus asli, lengkap, berlaku, dan sesuai dengan nama yang digunakan dalam pesanan.</li>
          </ol>
        </div>
        <div className='mt-4 mb-2'>
          <h2 className="text-2xl text-black font-bold mt-4 mb-2">Kebijakan Rental</h2>
        </div>
        <div className='mt-2 mb-4'>
          <h2 className='text-xl text-black font-bold mt-4 mb-2'>Penggunaan</h2>
          <ol className='list-decimal text-base font-medium text-justify ml-5'>
            <li>Biaya tambahan dikenakan untuk pengantaran kendaraan setiap 1 km.</li>
            <li>Penyewa tidak boleh mengalihkan, menyewakan, memberikan, atau menjadikan kendaraan sebagai jaminan kepada pihak lain.</li>
            <li>Penyewa hanya boleh menggunakan kendaraan untuk keperluan pribadi atau bisnis, dan tidak boleh bertentangan dengan hukum yang berlaku.</li>
            <li>Penyewa tidak boleh mengemudikan kendaraan di bawah pengaruh obat bius atau alkohol, atau mengemudikannya di luar jalan yang tidak wajar atau tidak layak untuk dilalui.</li>
            <li>Penyedia berhak mengambil kembali kendaraan jika digunakan untuk balapan, melanggar hukum, atau untuk tujuan lainnya selain domestik dan sosial.</li>
            <li>Penyewa tidak boleh mengemudikan kendaraan ke jalanan atau daerah yang berbahaya.</li>
            <li>Penyewa harus segera menghubungi penyedia jika terjadi kecelakaan.</li>
          </ol>
        </div>
        <div className='mt-2 mb-4'>
          <h2 className="text-xl text-black font-bold mt-4 mb-2">Pengembalian</h2>
          <ol className='list-decimal text-base font-medium text-justify ml-5'>
            <li>Penyewa harus mengembalikan kendaraan dengan volume bensin yang sama seperti saat kendaraan diterima.</li>
            <li>Pengembalian kendaraan dengan volume bensin kurang akan dikenakan biaya tambahan untuk menutupi selisihnya.</li>
            <li>Kendaraan harus dikembalikan dalam kondisi yang sama seperti saat kendaraan diterima.</li>
            <li>Penyewa harus mengembalikan kendaraan selambat-lambatnya pada waktu selesai rental yang tertera pada form.</li>
            <li>Penyewa bertanggung jawab atas biaya penggantian atau perbaikan atas kehilangan atau kerusakan terhadap STNK, kunci kendaraan, dan aksesoris.</li>
            <li>Penyewa bertanggung jawab atas semua denda parkir, lalu lintas, dan lainnya yang terjadi akibat pelanggaran hukum selama periode rental.</li>
            <li>Penyedia tidak bertanggung jawab atas barang yang tertinggal di kendaraan setelah penyewa mengembalikan kendaraan kepada penyedia.</li>
          </ol>
        </div>
        <div className='mt-2 mb-4'>
          <h2 className="text-xl text-black font-bold mt-4 mb-2">Overtime</h2>
          <ol className='list-decimal text-base font-medium text-justify ml-5'>
            <li>Penggunaan lebih dari 24 jam per hari rental akan dikenakan biaya overtime.</li>
            <li>Overtime yang melebihi 3 jam akan dikenakan biaya satu hari rental.</li>
            <li>Penyewa harus mengembalikan kendaraan selambat-lambatnya pada waktu selesai rental yang tertera pada form.</li>
          </ol>
        </div>
        <div className='mt-2 mb-10'>
          <h2 className="text-xl text-black font-bold mt-4 mb-2">Reschedule</h2>
          <ol className='list-decimal text-base font-medium text-justify ml-5'>
            <li>Reschedule harus dilakukan paling lambat 24 jam setelah waktu pemesanan. Jika melebihi batas waktu, akan dikenakan biaya reschedule sebesar Rp100.000.</li>
            <li>Penyedia berhak menolak rental jika Syarat Rental tidak dipenuhi.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}