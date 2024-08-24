'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button as TailwindButton } from '@material-tailwind/react';
import Cookies from 'js-cookie';
import fetchRegister from '@/utils/services/fetchregister'; // Import the fetchRegister function
import { ButtonLoading } from '@/components/ui/buttonLoading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama_pengguna: '',
    email: '',
    password: '',
    kode_referensi: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const responseData = await fetchRegister(formData); // Call the fetchRegister function
      const user = responseData.user;
      const token = responseData.access_token;
      const id = user.id;
      const role = user.peran;

      Cookies.set('token', token);
      Cookies.set('id', id);
      Cookies.set('role', role);

      router.push('/');
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/login/google`);
  };

  const handleFacebookLogin = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/login/facebook`);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center p-4 bg-gray-300">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-12 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl flex flex-col md:flex-row">

        {/* Form Section */}
        <div className="flex flex-col w-full md:w-1/2 pr-0 md:pr-4">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-black">Create Your Account</h1>
          {error && <div className="text-red-500 mb-2 md:mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <input
              type="text"
              name="nama_pengguna"
              value={formData.nama_pengguna}
              onChange={handleChange}
              placeholder="Nama Pengguna"
              className="input-animated bg-white text-black mt-2 md:mt-3 p-2 border border-black focus:outline-none rounded-lg w-full h-10 md:h-12 shadow"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-animated bg-white text-black mt-1 md:mt-2 p-2 border border-black focus:outline-none rounded-lg w-full h-10 md:h-12 shadow"
            />
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Kata Sandi"
                className="input-animated bg-white text-black mt-1 md:mt-2 p-2 border border-black focus:outline-none rounded-lg w-full h-10 md:h-12 shadow pr-10"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-2 top-1/2 mt-1 transform -translate-y-1/2 text-gray-600 focus:outline-none"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <input
              type="text"
              name="kode_referensi"
              value={formData.kode_referensi}
              onChange={handleChange}
              placeholder="Kode Referensi (Optional)"
              className="input-animated bg-white text-black mt-1 md:mt-2 p-2 border border-black focus:outline-none rounded-lg w-full h-10 md:h-12 shadow"
            />
            <div className="flex items-center mt-2 md:mt-4 text-black bg-white">
              <input
                type="checkbox"
                id="ingat-saya"
                className="checkbox-animated mr-2"
              />
              <label htmlFor="ingat-saya">Ingat Saya</label>
              <span className="flex-grow"></span>
            </div>
            {loading ? (
              <ButtonLoading />
            ) : (
              <TailwindButton type="submit" className="mt-5 w-full before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-full md:w-96 before:origin-center before:-translate-x-40 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-96 hover:before:-translate-y-48">
                <span className="relative text-base z-10">Register</span>
              </TailwindButton>
            )}
          </form>
          <div className="flex justify-center mt-2 md:mt-4 text-sm md:text-base text-black">
            <span>Sudah punya akun?</span>
            <a href="/login" className="hover:underline hover:text-[#ff4d33] ml-1 md:ml-2">Login disini</a>
          </div>
          <div className="flex justify-center items-center mt-2 md:mt-4 text-sm md:text-base">
            <span>Atau</span>
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-4 mt-1 md:mt-2">
            <button onClick={handleGoogleLogin} className="flex md:px-6 md:py-3 items-center justify-center rounded-lg p-2 shadow hover:bg-gray-300">
              <img
                src="/images/google.png"
                alt="Google"
              />
            </button>
            <button onClick={handleFacebookLogin} className="flex items-center justify-center bg-blue-900 hover:bg-blue-700 rounded-lg px-4 py-2 md:px-6 md:py-3 shadow">
              <img
                src="/images/facebook.png"
                alt="Facebook"
              />
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-full mt-6 md:mt-0">
          <img
            src="/images/register.png"
            alt="Register"
            className="object-cover md:h-full w-full rounded-lg md:rounded-r-lg"
          />
        </div>
      </div>

      <style jsx>{`
        .input-animated {
          transition: border-color 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        .input-animated:hover,
        .input-animated:focus {
          transform: scale(1.05);
          border-color: #FF4D33;
        }

        .checkbox-animated {
          transition: transform 0.3s ease-in-out;
        }

        .checkbox-animated:hover,
        .checkbox-animated:focus {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
