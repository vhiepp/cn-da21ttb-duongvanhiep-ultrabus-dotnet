'use client';

import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { apiClient } from '@/apis/api-client';
import { createAdminRoleApi, getAdminRolesApi } from '@/apis/admin/role';
import { checkUsernameExistApi } from '@/apis/user-api';
import { createAdminUserApi } from '@/apis/admin/user';
import { useRouter } from 'next/navigation';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';

interface InputValue {
    name: string;
    code: number;
}

const genderValues: Array<InputValue> = [
    { name: 'Nam', code: 1 },
    { name: 'Nữ', code: 2 },
    { name: 'Khác', code: 3 }
];

const UserAdminCreate = () => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [checkUserName, setCheckUserName] = useState(null);
    const [password, setPassword] = useState('ultrabus123');
    const [selectRoleValue, setSelectRoleValue] = useState(null);
    const [selectGenderValue, setSelectGenderValue] = useState(genderValues[2]);

    const [loading1, setLoading1] = useState(false);
    const [dropdownValues, setDropdownValues] = useState<Array<InputValue>>([]);

    const fullNameRef = useRef(null);
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);
    const usernameRef = useRef(null);
    const roleRef = useRef(null);
    const genderRef = useRef(null);

    const router = useRouter();

    const getRoles = async () => {
        const response = await apiClient.get(getAdminRolesApi);
        const roles = response.data.data.map((role) => {
            return {
                name: role.name,
                code: role.id
            };
        });
        setDropdownValues(roles);
    };

    const saveRole = async (exit = false) => {
        if (fullName.length == 0) {
            fullNameRef.current.focus();
            return;
        }
        if (username.length == 0) {
            usernameRef.current.focus();
            return;
        }
        if (password.length == 0) {
            passwordRef.current.focus();
            return;
        }
        if (selectRoleValue == null) {
            roleRef.current.focus();
            return;
        }
        if (selectGenderValue == null) {
            genderRef.current.focus();
            return;
        }
        if (checkUserName != null) {
            return;
        }

        setLoading1(true);

        const data = {
            firstName: fullName,
            phoneNumber: phone,
            userName: username,
            password: password,
            roleId: selectRoleValue.code,
            gender: selectGenderValue.code
        };

        const response = await apiClient.post(createAdminUserApi, data);

        setLoading1(false);

        if (response.status == 200) {
            if (exit) {
                router.push('/admin/user-admin');
            } else {
                setFullName('');
                setPhone('');
                setUsername('');
                setSelectRoleValue(null);
                setPassword('ultrabus123');
                setSelectGenderValue(genderValues[2]);
            }
        } else {
            alert('Có lỗi xảy ra');
        }
    };

    const checkUsernameExist = async () => {
        if (username.length > 0) {
            // check username khoong co ky tu dac biet
            if (!/^[a-zA-Z0-9_]*$/.test(username) && checkUserName == null) {
                setCheckUserName('Tên đăng nhập không được chứa ký tự đặc biệt');
                usernameRef.current.focus();
                return;
            }

            // const response = await apiClient.get(checkUsernameExistApi, { params: { username: username } });
            // // console.log(response.data);
            // if (response.data.status == 'error') {
            //     setCheckUserName('Username đã tồn tại');
            // }
        }
    };

    useEffect(() => {
        getRoles();
    }, []);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Thêm user quản trị hệ thống</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="full_name" className="text-lg">
                                Họ tên <span className="p-error">(*)</span>
                            </label>
                            <InputText ref={fullNameRef} placeholder="Nhập họ tên" id="full_name" value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="phone" className="text-lg">
                                Số điện thoại
                            </label>
                            <InputText id="phone" ref={phoneRef} placeholder="Nhập số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} type="text" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="username" className="text-lg">
                                Tên đăng nhập <span className="p-error">(*)</span>{' '}
                                {checkUserName != null && (
                                    <small id="username-help" className="p-error text-sm">
                                        <i>{checkUserName}</i>
                                    </small>
                                )}
                            </label>
                            <InputText
                                ref={usernameRef}
                                id="username"
                                placeholder="Nhập tên đăng nhập"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    if (checkUserName != null) {
                                        setCheckUserName(null);
                                    }
                                }}
                                onBlur={checkUsernameExist}
                                type="text"
                            />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="password" className="text-lg">
                                Mật khẩu <span className="p-error">(*)</span>{' '}
                                <span className="text-sm">
                                    <i>(Mặc định: ultrabus123)</i>
                                </span>
                            </label>
                            <Password id="password" ref={passwordRef} value={password} placeholder="Nhập mật khẩu" toggleMask onChange={(e) => setPassword(e.target.value)} type="password" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="password" className="text-lg">
                                Giới tính <span className="p-error">(*)</span>
                            </label>
                            <Dropdown ref={genderRef} value={selectGenderValue} onChange={(e) => setSelectGenderValue(e.value)} options={genderValues} optionLabel="name" placeholder="Chọn giới tính" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="password" className="text-lg">
                                Quyền <span className="p-error">(*)</span>
                            </label>
                            <Dropdown ref={roleRef} value={selectRoleValue} onChange={(e) => setSelectRoleValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Chọn quyền cho user" />
                        </div>

                        <div className="field col-12">
                            <div className="grid mt-4 justify-content-end align-items-center gap-2">
                                <div className="col-12 md:col-6 lg:col-2">
                                    <Button label="Lưu và thêm mới" icon="pi pi-save" className="p-button-info" loading={loading1} onClick={() => saveRole()} />
                                </div>
                                <div className="col-12 md:col-6 lg:col-2">
                                    <Button label="Lưu và thoát" icon="pi pi-save" className="p-button-success" loading={loading1} onClick={() => saveRole(true)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAdminCreate;
