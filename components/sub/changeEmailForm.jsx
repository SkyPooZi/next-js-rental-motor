import { Card, CardHeader, Input, Button } from '@material-tailwind/react';

const ChangeEmailForm = ({
    user,
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
    setError
}) => {
    return (
        <Card className="w-full h-full mb-10">
            <form action="post" method="post" onSubmit={handleEmailChange}>
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-4">
                        <span className="text-black font-medium">Ubah Email</span>
                        <div className="border-t border-[#969696] w-full"></div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Email</span>
                                <Input
                                    type="email"
                                    label={`Masukkan email (${user.email})`}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <span className="text-[#6B7280] text-xs">
                                    Email akan berubah ketika Anda sudah memasukkan kode OTP untuk verifikasi yang
                                    dikirimkan ke email baru Anda.
                                </span>
                            </div>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className={`cursor-pointer capitalize text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] ${loadingEmail ? 'opacity-50 cursor-not-allowed' : ''}`}
                                loading={loadingEmail}
                            >
                                {loadingEmail ? 'Mengirim OTP...' : 'Ubah Email'}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </form>
            {otpSent && (
                <OTPPopup
                    isOpen={otpPopupVisible}
                    onVerify={handleOtpVerify}
                    onClose={() => setOtpPopupVisible(false)}
                    email={email}
                    token={token}
                    id={user.id}
                    serverOtp={serverOtp}
                    setShowNotification={setShowNotification}
                    setOtpPopupVisible={setOtpPopupVisible}
                    setErrorOtp={setError}
                />
            )}
        </Card>
    );
};

export default ChangeEmailForm;