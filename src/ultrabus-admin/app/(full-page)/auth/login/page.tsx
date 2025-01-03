/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { apiClient } from '@/apis/api-client';
import { setToken } from '@/functions';
import { loginApi } from '@/apis/auth-api';

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    // const [checked, setChecked] = useState(false);
    const router = useRouter();
    const { layoutConfig } = useContext(LayoutContext);
    // const { data, error } = useSWR(profileApi, fetcher);
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const handleLogin = async () => {
        try {
            if (username != '' && password != '') {
                setLoading(true);
                const res = await apiClient.post(loginApi, { userName: username, password });
                if (!res.data.data.profile.isCustomer) {
                    setToken(res.data.data.accessToken);
                    window.location.href = '/';
                }
                setLoading(false);
            }
        } catch (error) {
            // console.log('Login error', error);
            setToken('');
            setLoading(false);
        }
    };

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                {/* <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" /> */}
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            {/* <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" /> */}
                            <div className="text-900 text-3xl font-medium mb-3">Hệ thống UltraBus</div>
                            <span className="text-600 font-medium">Đăng nhập để tiếp tục</span>
                        </div>

                        <div>
                            <label htmlFor="username1" className="block text-900 text-xl font-medium mb-2">
                                Tên đăng nhập
                            </label>
                            <InputText id="username1" type="text" placeholder="Username" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} value={username} onChange={(e) => setUsername(e.target.value)} />
                            {/* <small id="username-help" className="p-error">
                                Enter your username to reset your password.
                            </small> */}
                            {/* <Message severity="error" text="Username is required" /> */}

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Mật khẩu
                            </label>
                            <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                {/* <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div> */}
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Quên mật khẩu?
                                </a>
                            </div>
                            <Button label="Đăng nhập" loading={loading} className="w-full p-3 text-xl" onClick={handleLogin}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
