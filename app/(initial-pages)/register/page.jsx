import React from 'react';

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-row">
        <img
          src="/images/register.png"
          alt="register"
          className="w-500 h-500 object-cover mr-10"
        />
        <div className="flex flex-col w-full">
          <h1 className="text-4xl font-bold mb-3">Register</h1>
          <div className="flex flex-col gap-2 items-center">
            <input
              type="username"
              placeholder="Nama Pengguna"
              className="mt-10 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-448px h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1"
              style={{ width: '448px' }}
            />
            <input
              type="email"
              placeholder="Email"
              className="mt-0 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-448px h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1"
              style={{ width: '448px' }}
            />
            <input
              type="password"
              placeholder="Kata Sandi"
              className="mt-0 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-448px h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1"
              style={{ width: '448px' }}
            />
          </div>
          <div className="flex mt-4">
            <input type="checkbox" id="ingat-saya" className="mr-2" />
            <label htmlFor="ingat-saya">Ingat Saya</label>
            <span className="mx-20"> </span>
          </div>
          <div className="flex mt-4">
            <button
              type="submit"
              className="bg-black text-white font-bold py-2 px-4 rounded-lg h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1 hover:bg-FF0000 flex-grow"
              style={{ width: '448px' }}
            >
              Register
            </button>
          </div>
          <div className="flex mt-4 text-base">
            <span>Masukkan kode referal untuk reward! </span>
            <span className="mx-15"> </span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <input
              type="kode"
              placeholder="Masukkan Kode"
              className="mt-5 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-448px h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1"
              style={{ width: '448px' }}
            />
            </div>
            <div className="flex mt-4 text-base">
            <span>Belum punya akun? </span>
            <span className="mx-1"> </span>
            <a href="#" className="hover:underline">
              Daftar di sini
            </a>
          </div>
          <div className="flex justify-center items-center mt-4 text-base">
            <span>Atau</span>
          </div>
          <span className="m-2"> </span>
          <div className="flex justify-center items-center ml-4">
          <a href="#" className="flex items-center justify-center rounded-lg p-2 shadow shadow-black shadow-opacity-25 shadow-radius-1 hover:bg-gray-300">
              <img
                src="/images/google.png"
                alt="Google"
                className="w-500 h-5 mr-10 ml-10"
              />
            </a>
            <a href="#" className="flex items-center justify-center bg-blue-900 hover:bg-blue-700 rounded-lg p-2 shadow shadow-black shadow-opacity-25 shadow-radius-1 ml-4">
              <img
                src="/images/facebook.png"
                alt="Facebook"
                className="w-100 h-5 mr-10 ml-10"
              />
            </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;