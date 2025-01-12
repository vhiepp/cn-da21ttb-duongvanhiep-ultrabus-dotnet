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
import { InputNumber } from 'primereact/inputnumber';
import { Badge } from 'primereact/badge';

interface InputValue {
    name: string;
    code: number;
}

const busTypeValues: Array<InputValue> = [
    { name: 'Ghế ngồi', code: 1 },
    { name: 'Giường nằm', code: 2 }
];

const floorValues: Array<InputValue> = [
    { name: '1 tầng', code: 1 },
    { name: '2 tầng', code: 2 },
    { name: '3 tầng', code: 3 },
    { name: '4 tầng', code: 4 },
    { name: '5 tầng', code: 5 }
];

const UserAdminCreate = () => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [checkUserName, setCheckUserName] = useState(null);
    const [password, setPassword] = useState('ultrabus123');
    const [selectFloorValue, setSelectFloorValue] = useState(floorValues[0]);
    const [selectBusType, setBusTypeValue] = useState(busTypeValues[1]);
    const [description, setDescription] = useState('');
    const [brandName, setBrandName] = useState('');
    const [rowSeatValue, setRowSeatValue] = useState(1);
    const [colSeatValue, setColSeatValue] = useState(1);
    const [seatArrangement, setSeatArrangement] = useState<Array<Array<Array<string>>>>([]);

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
        if (selectFloorValue == null) {
            roleRef.current.focus();
            return;
        }
        if (selectBusType == null) {
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
            roleId: selectFloorValue.code,
            gender: selectBusType.code
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
                setPassword('ultrabus123');
            }
        } else {
            alert('Có lỗi xảy ra');
        }
    };

    useEffect(() => {
        setSeatArrangement(
            Array.from({ length: selectFloorValue.code }, (_, i) => i + 1).map((floor, index) => {
                return Array.from({ length: rowSeatValue }, (_, i) => i + 1).map((col, index) => {
                    return Array.from({ length: colSeatValue }, (_, i) => i + 1).map((row, index) => {
                        return `${String.fromCharCode(row + 64)}${floor}.${col}`;
                    });
                });
            })
        );
    }, [colSeatValue, rowSeatValue, selectFloorValue]);

    // console.log(seatArrangement);

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
    // console.log(rowSeatValue);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Thêm loại xe</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="full_name" className="text-lg">
                                Tên xe <span className="p-error">(*)</span>
                            </label>
                            <InputText ref={fullNameRef} placeholder="Nhập tên xe" id="full_name" value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" />
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="brand_name" className="text-lg">
                                Hãng sản xuất <span className="p-error">(*)</span>
                            </label>
                            <InputText ref={fullNameRef} placeholder="Nhập tên hãng sản xuất" id="brand_name" value={brandName} onChange={(e) => setBrandName(e.target.value)} type="text" />
                        </div>

                        <div className="field col-12">
                            <label htmlFor="address" className="text-lg">
                                Mô tả{' '}
                                <span className="text-sm">
                                    <i>(không bắt buộc)</i>
                                </span>
                            </label>
                            <InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="bustype" className="text-lg">
                                Loại ghế <span className="p-error">(*)</span>
                            </label>
                            <Dropdown ref={genderRef} value={selectBusType} onChange={(e) => setBusTypeValue(e.value)} options={busTypeValues} optionLabel="name" placeholder="Chọn giới tính" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="floor" className="text-lg">
                                Số lượng tầng <span className="p-error">(*)</span>
                            </label>
                            <Dropdown ref={roleRef} value={selectFloorValue} onChange={(e) => setSelectFloorValue(e.value)} options={floorValues} optionLabel="name" placeholder="Chọn số lượng tầng ghế" />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="seat" className="text-lg">
                                Bố trí ghế <span className="p-error">(*)</span>
                            </label>
                        </div>
                        <div className="field col-6">
                            <label htmlFor="seat" className="text-lg">
                                Số lượng dãy ghế
                            </label>
                            <InputNumber value={colSeatValue} onValueChange={(e) => setColSeatValue(e.value ?? null)} min={1} max={5} showButtons mode="decimal"></InputNumber>
                        </div>
                        <div className="field col-6">
                            <label htmlFor="seat" className="text-lg">
                                Số lượng hàng ghế
                            </label>
                            <InputNumber value={rowSeatValue} onValueChange={(e) => setRowSeatValue(e.value ?? null)} min={1} max={20} showButtons mode="decimal"></InputNumber>
                        </div>
                        {selectFloorValue.code && (
                            <>
                                {seatArrangement.map((floor, floorIndex) => {
                                    return (
                                        <div className={`col-${colSeatValue} mb-3`} key={`floor-${floorIndex}`}>
                                            <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                                                <h5 className="text-center">Tầng {floorIndex + 1}</h5>
                                                <table className="w-full text-center">
                                                    <tbody>
                                                        {floor.map((cols, colIndex) => {
                                                            return (
                                                                <tr key={`row-${colIndex}`} className="text-center">
                                                                    {cols.map((row, rowIndex) => {
                                                                        return (
                                                                            <td key={`col-${rowIndex}`}>
                                                                                <div className="flex justify-content-center align-items-center py-2 relative">
                                                                                    {(row && (
                                                                                        <i className="pi pi-stop p-overlay-badge" style={{ fontSize: '3.2rem' }}>
                                                                                            <Badge
                                                                                                value="x"
                                                                                                severity="danger"
                                                                                                className="cursor-pointer"
                                                                                                onClick={() => {
                                                                                                    const newArr = [...seatArrangement];
                                                                                                    newArr[floorIndex][colIndex][rowIndex] = '';
                                                                                                    setSeatArrangement(newArr);
                                                                                                }}
                                                                                            ></Badge>
                                                                                        </i>
                                                                                    )) || (
                                                                                        <i
                                                                                            className="pi pi-plus p-overlay-badge flex justify-content-center align-items-center cursor-pointer"
                                                                                            style={{ fontSize: '1rem', width: '44px', height: '44px' }}
                                                                                            onClick={() => {
                                                                                                const newArr = [...seatArrangement];
                                                                                                newArr[floorIndex][colIndex][rowIndex] = `${String.fromCharCode(rowIndex + 65)}${floorIndex + 1}.${colIndex + 1}`;
                                                                                                setSeatArrangement(newArr);
                                                                                            }}
                                                                                        ></i>
                                                                                    )}

                                                                                    {row && <div className="absolute">{row}</div>}
                                                                                </div>
                                                                            </td>
                                                                        );
                                                                    })}
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}

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
