import EditProfileForm from '@/components/sub/editProfileForm';
import ChangeEmailForm from '@/components/sub/changeEmailForm';
import ChangePasswordForm from '@/components/sub/changePasswordForm';
import { MdDone } from "react-icons/md";
import Loading from '../ui/loading';

const UserProfile = ({
    user,
    imagePreview,
    image,
    handleSubmit,
    handleImageChange,
    handleButtonClick,
    fileInputRef,
    setNamaPengguna,
    setNamaLengkap,
    setAlamat,
    setNomorHp,
    loading,
    email,
    setEmail,
    handleEmailChange,
    loadingEmail,
    otpSent,
    otpPopupVisible,
    handleOtpVerify,
    setOtpPopupVisible,
    token,
    serverOtp,
    setShowNotification,
    setError,
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    handlePasswordReset,
    loadingPassword,
    error,
    showNotification
}) => {
    return (
        <div className="mt-12">
            {user ? (
                <>
                    <EditProfileForm
                        user={user}
                        imagePreview={imagePreview}
                        image={image}
                        handleSubmit={handleSubmit}
                        handleImageChange={handleImageChange}
                        handleButtonClick={handleButtonClick}
                        fileInputRef={fileInputRef}
                        setNamaPengguna={setNamaPengguna}
                        setNamaLengkap={setNamaLengkap}
                        setAlamat={setAlamat}
                        setNomorHp={setNomorHp}
                        loading={loading}
                    />
                    <ChangeEmailForm
                        user={user}
                        email={email}
                        setEmail={setEmail}
                        handleEmailChange={handleEmailChange}
                        loadingEmail={loadingEmail}
                        otpSent={otpSent}
                        otpPopupVisible={otpPopupVisible}
                        handleOtpVerify={handleOtpVerify}
                        setOtpPopupVisible={setOtpPopupVisible}
                        token={token}
                        serverOtp={serverOtp}
                        setShowNotification={setShowNotification}
                        setError={setError}
                    />
                    <ChangePasswordForm
                        password={password}
                        confirmPassword={confirmPassword}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                        handlePasswordReset={handlePasswordReset}
                        loadingPassword={loadingPassword}
                        error={error}
                    />
                </>
            ) : (
                <Loading />
            )}
            {showNotification && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
                    <span>Data berhasil ubah</span>
                    <MdDone className="ml-2 text-white" />
                </div>
            )}
        </div>
    );
};

export default UserProfile;
