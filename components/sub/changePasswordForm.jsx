import { Card, CardHeader, Input, Button } from '@material-tailwind/react';

const ChangePasswordForm = ({
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    handlePasswordReset,
    loadingPassword,
    error
}) => {
    return (
        <Card className="w-full h-full">
            <form action="post" method="post" onSubmit={handlePasswordReset}>
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-4">
                        <span className="text-black font-medium">Ubah Password</span>
                        <div className="border-t border-[#969696] w-full"></div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Password Baru</span>
                                <Input
                                    type="password"
                                    label={`Masukkan password baru`}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {error && <span className="text-red-500 text-xs">{error}</span>}
                                <span className="text-[#6B7280] text-xs">
                                    Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Konfirmasi Password Baru</span>
                                <Input
                                    type="password"
                                    label={`Konfirmasi password baru`}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className={`cursor-pointer capitalize text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] ${loadingPassword ? 'opacity-50 cursor-not-allowed' : ''}`}
                                loading={loadingPassword}
                            >
                                {loadingPassword ? 'Loading...' : 'Ubah Password'}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </form>
        </Card>
    );
};

export default ChangePasswordForm;