import React from 'react';

const ForgotPass = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-row">
        <img
          src="/images/reset.png"
          alt="Login"
          className="w-500 h-500 object-cover mr-10"
        />
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-3xl font-bold mb-1 text-left">Reset Kata Sandi</h1>
          <div className="flex flex-col gap-4 items-center">
            <input
              type="text"
              placeholder="Kata Sandi Baru"
              className="mt-10 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg shadow w-full max-w-xs"
              style={{ width: '448px' }}
            />
            <input
              type="text"
              placeholder="Konfirmasi Kata Sandi"
              className="p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg shadow w-full max-w-xs"
              style={{ width: '448px' }}
            />
            <div className="flex mt-4">
              <button
                type="submit"
                className="bg-black text-white font-bold py-2 px-4 rounded-lg shadow shadow-black shadow-opacity-25 shadow-radius-1 hover:bg-FF0000 flex-grow"
                style={{ width: '448px' }}
              >
                Ubah Kata Sandi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
