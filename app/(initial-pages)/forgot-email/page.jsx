import React from 'react';

const ForgotEmail = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-row">
        <img
          src="/images/reset.png"
          alt="Login"
          className="w-500 h-500 object-cover mr-10"
        />
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-4xl font-bold mb-6">Reset Kata Sandi</h1>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Email"
              className="mt-10 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-448px h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1"
              style={{ width: '448px' }}
            />
          </div>
          <div className="flex mt-4">
            <button
              type="submit"
              className="bg-black text-white font-bold py-2 px-4 rounded-lg h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1 hover:bg-FF0000 flex-grow"
              style={{ width: '448px' }}
            >
              Kirim Kode OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotEmail;
