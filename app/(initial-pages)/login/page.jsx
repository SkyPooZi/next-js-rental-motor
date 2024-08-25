'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button as TailwindButton } from '@material-tailwind/react';
import Cookies from 'js-cookie';
import fetchLogin from '@/utils/services/fetchlogin'; // Import the fetchLogin function
import Input from '@/components/ui/input';
import { ButtonLoading } from '@/components/ui/buttonLoading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Anda harus mengisi email dan password!');
      setLoading(false);
      return;
    }

    try {
      const data = await fetchLogin(email, password); // Call the fetchLogin function
      const user = data.user;
      const token = data.access_token;
      const id = user.id;

      console.log('bearer token:', token);
      Cookies.set('token', token);
      Cookies.set('id', id);

      if (user && user.email === email) {
        const isAdmin = user.peran === 'admin' ? 'true' : null;
        console.log('is admin:', isAdmin);

        if (isAdmin !== null) {
          Cookies.set('isAdmin', 'true');
          console.log(Cookies.get('isAdmin'));
        } else {
          Cookies.remove('isAdmin');
        }

        const params = new URLSearchParams(window.location.search);
        let returnUrl = params.get('returnUrl') || '/';

        if (isAdmin !== null && returnUrl === '/') {
          returnUrl = '/admin';
        }
        router.push(returnUrl);
      } else {
        setError('Email atau password tidak valid');
      }

    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Email atau Password yang anda isi salah. Silahkan Coba Lagi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'success') {
      router.push('/');
    }
  }, []);

  const handleGoogleLogin = async () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/login/google`);
  };

  const handleFacebookLogin = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/login/facebook`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center p-4 bg-gray-300">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-12 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl flex flex-col md:flex-row">

        {/* Form Section */}
        <div className="flex flex-col w-full md:w-1/2 pr-0 md:pr-4">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-black">Login To Your Account</h1>
          {error && <div className="text-red-500 mb-2 md:mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="input-animated bg-white text-black mt-2 md:mt-3 p-2 border border-black focus:outline-none rounded-lg w-full h-10 md:h-12 shadow"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Kata Sandi"
                value={password}
                onChange={handlePasswordChange}
                className="input-animated bg-white text-black mt-1 md:mt-2 p-2 border border-black focus:outline-none rounded-lg w-full h-10 md:h-12 shadow pr-10"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-2 top-1/2 mt-1 transform -translate-y-1/2 text-gray-600 focus:outline-none"
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
            <div className="flex items-center mt-2 md:mt-4 text-black bg-white">
              <input
                type="checkbox"
                id="ingat-saya"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="checkbox-animated mr-2"
              />
              <label htmlFor="ingat-saya">Ingat Saya</label>
              <span className="flex-grow"></span>
              <a href="/forgot-email" className="hover:underline hover:text-[#ff4d30]">Lupa Kata Sandi?</a>
            </div>

            {loading ? (
              <ButtonLoading />
            ) : (
              <TailwindButton type="submit" className="mt-5 w-full md:w-96 before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-full before:origin-center before:-translate-x-40 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-96 hover:before:-translate-y-48">
                <span className="relative text-base z-10">Login</span>
              </TailwindButton>
            )}
          </form>
          <div className="flex justify-center mt-2 md:mt-4 text-sm md:text-base text-black">
            <span>Belum punya akun?</span>
            <a href="/register" className="hover:underline hover:text-[#ff4d33] ml-1 md:ml-2">Daftar di sini</a>
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
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <img
            src="/images/login.png"
            alt="Login"
            className="object-cover h-64 md:h-full w-full rounded-lg md:rounded-r-lg"
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

export default LoginPage;
