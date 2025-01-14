'use client';

import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { apiClient } from '@/apis/api-client';
import { getBusByIdApi, updateBusApi } from '@/apis/admin/bus';
import { useParams, useRouter } from 'next/navigation';
import { Dropdown } from 'primereact/dropdown';
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
    const { id } = useParams();

    const [name, setName] = useState('');
    const [selectFloorValue, setSelectFloorValue] = useState(floorValues[0]);
    const [selectBusType, setBusTypeValue] = useState(busTypeValues[1]);
    const [description, setDescription] = useState('');
    const [brandName, setBrandName] = useState('');
    const [rowSeatValue, setRowSeatValue] = useState(1);
    const [colSeatValue, setColSeatValue] = useState(1);
    const [seatArrangement, setSeatArrangement] = useState<Array<Array<Array<string>>>>(null);

    const [loading1, setLoading1] = useState(false);

    const nameRef = useRef(null);
    const brandNameRef = useRef(null);
    const roleRef = useRef(null);
    const genderRef = useRef(null);

    const router = useRouter();

    const fetch = async () => {
        const response = await apiClient.get(getBusByIdApi(id));
        const data = response.data.data;
        // console.log(data);
        setName(data.name);
        setBrandName(data.brandName);
        setDescription(data.description);
        setBusTypeValue(busTypeValues.find((item) => item.code == data.busType));
        await setSelectFloorValue(floorValues.find((item) => item.code == data.floor));
        await setRowSeatValue(data.seatArrangement[0].length);
        await setColSeatValue(data.seatArrangement[0][0].length);
        await setSeatArrangement(data.seatArrangement);
        // getedData = true;
    };

    useEffect(() => {
        if (id) {
            fetch();
        }
    }, [id]);

    const saveRole = async (exit = false) => {
        if (name.length == 0) {
            nameRef.current.focus();
            return;
        }
        if (brandName.length == 0) {
            brandNameRef.current.focus();
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

        setLoading1(true);

        const data = {
            name: name,
            brandName: brandName,
            description: description,
            busType: selectBusType.code,
            floor: selectFloorValue.code,
            seatArrangement: seatArrangement
        };

        const response = await apiClient.put(updateBusApi(id), data);

        if (response.status == 200) {
            if (exit) {
                router.push('/admin/bus');
            }
        } else {
            alert('Có lỗi xảy ra');
        }
        setLoading1(false);
    };

    const changeSeatArrangement = (selectFloorValue, rowSeatValue, colSeatValue) => {
        setSeatArrangement(
            Array.from({ length: selectFloorValue.code }, (_, i) => i + 1).map((floor, index) => {
                return Array.from({ length: rowSeatValue }, (_, i) => i + 1).map((col, index) => {
                    return Array.from({ length: colSeatValue }, (_, i) => i + 1).map((row, index) => {
                        return `${String.fromCharCode(row + 64)}${floor}.${col}`;
                    });
                });
            })
        );
    };

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
                            <InputText ref={nameRef} placeholder="Nhập tên xe" id="full_name" value={name} onChange={(e) => setName(e.target.value)} type="text" />
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="brand_name" className="text-lg">
                                Hãng sản xuất <span className="p-error">(*)</span>
                            </label>
                            <InputText ref={brandNameRef} placeholder="Nhập tên hãng sản xuất" id="brand_name" value={brandName} onChange={(e) => setBrandName(e.target.value)} type="text" />
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
                            <Dropdown
                                ref={roleRef}
                                value={selectFloorValue}
                                onChange={(e) => {
                                    setSelectFloorValue(e.value);
                                    changeSeatArrangement(e.value, rowSeatValue, colSeatValue);
                                }}
                                options={floorValues}
                                optionLabel="name"
                                placeholder="Chọn số lượng tầng ghế"
                            />
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
                            <InputNumber
                                value={colSeatValue}
                                onValueChange={(e) => {
                                    setColSeatValue(e.value ?? null);
                                    changeSeatArrangement(selectFloorValue, rowSeatValue, e.value);
                                }}
                                min={1}
                                max={5}
                                showButtons
                                mode="decimal"
                            ></InputNumber>
                        </div>
                        <div className="field col-6">
                            <label htmlFor="seat" className="text-lg">
                                Số lượng hàng ghế
                            </label>
                            <InputNumber
                                value={rowSeatValue}
                                onValueChange={(e) => {
                                    setRowSeatValue(e.value ?? null);
                                    changeSeatArrangement(selectFloorValue, e.value, colSeatValue);
                                }}
                                min={1}
                                max={20}
                                showButtons
                                mode="decimal"
                            ></InputNumber>
                        </div>
                        {selectFloorValue.code && (
                            <>
                                {seatArrangement &&
                                    seatArrangement.map((floor, floorIndex) => {
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
                                    <Button label="Lưu" icon="pi pi-save" className="p-button-info" loading={loading1} onClick={() => saveRole()} />
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
