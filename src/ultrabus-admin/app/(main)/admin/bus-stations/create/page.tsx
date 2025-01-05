'use client';

import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { apiClient } from '@/apis/api-client';
import { getBusStationByIdApi, createBusStationApi } from '@/apis/admin/bus-station';
import { createAdminUserApi } from '@/apis/admin/user';
import { getProvincesApi, getDistrictByProvinceIdApi, getWardsByDistrictIdApi } from '@/apis/address';
import { useRouter } from 'next/navigation';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import Mapbox from '@/components/mapbox';

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
    const [selectProvinceValue, setSelectProvinceValue] = useState(null);
    const [selectDistrictValue, setSelectDistrictValue] = useState(null);
    const [selectWardValue, setSelectWardValue] = useState(null);
    const [selectGenderValue, setSelectGenderValue] = useState(genderValues[2]);

    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('');

    const [loading1, setLoading1] = useState(false);
    const [provinceValues, setProvinceValues] = useState<Array<InputValue>>([]);
    const [districtValues, setDistrictValues] = useState<Array<InputValue>>([]);
    const [wardValues, setWardValues] = useState<Array<InputValue>>([]);

    const fullNameRef = useRef(null);
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);
    const usernameRef = useRef(null);
    const roleRef = useRef(null);
    const provinceRef = useRef(null);
    const districtRef = useRef(null);
    const wardRef = useRef(null);
    const addressRef = useRef(null);
    const genderRef = useRef(null);

    const router = useRouter();

    const getProvinces = async () => {
        const response = await apiClient.get(getProvincesApi);
        const provinces = response.data.data.map((prv) => {
            return {
                name: prv.fullName,
                code: prv.id
            };
        });
        setProvinceValues(provinces);
    };

    const getDistricts = async (provinceId) => {
        if (selectDistrictValue) setSelectDistrictValue(null);
        if (selectWardValue) setSelectWardValue(null);
        if (wardValues.length > 0) setWardValues([]);
        const response = await apiClient.get(getDistrictByProvinceIdApi(provinceId));
        const districts = response.data.data.map((disttrict) => {
            return {
                name: disttrict.fullName,
                code: disttrict.id
            };
        });
        setDistrictValues(districts);
    };

    const getWards = async (districtId) => {
        const response = await apiClient.get(getWardsByDistrictIdApi(districtId));
        const wards = response.data.data.map((ward) => {
            return {
                name: ward.fullName,
                code: ward.id
            };
        });
        setWardValues(wards);
    };

    const saveRole = async (exit = false) => {
        if (fullName.length == 0) {
            fullNameRef.current.focus();
            return;
        }

        if (!selectProvinceValue) {
            provinceRef.current.focus();
            return;
        }

        if (!selectDistrictValue) {
            districtRef.current.focus();
            return;
        }

        if (!selectWardValue) {
            wardRef.current.focus();
            return;
        }

        setLoading1(true);

        const data = {
            name: fullName,
            provinceId: selectProvinceValue.code,
            districtId: selectDistrictValue.code,
            wardId: selectWardValue.code,
            address: address,
            longitude: location?.lng,
            latitude: location?.lat
        };

        const response = await apiClient.post(createBusStationApi, data);

        setLoading1(false);

        if (response.status == 200) {
            if (exit) {
                router.push('/admin/bus-stations');
            } else {
                setFullName('');
                setAddress('');
                setSelectProvinceValue(null);
                setSelectDistrictValue(null);
                setDistrictValues([]);
                setSelectWardValue(null);
                setWardValues([]);
                setLocation(null);
            }
        } else {
            alert('Có lỗi xảy ra');
        }
    };
    // Hàm chuẩn hóa chuỗi
    function normalizeString(str) {
        return (
            str
                .toLowerCase() // Chuyển về chữ thường
                // .replace(/[^\w\s]/gi, '') // Loại bỏ ký tự đặc biệt
                // bỏ dấu tiếng việt
                .replace(/tỉnh/g, '')
                .replace(/huyện/g, '')
                .replace(/phường/g, '')
                .replace(/xã/g, '')
                .replace(/thành phố/g, '')
                .replace(/thị trấn/g, '')
                .replace(/a|á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a')
                .replace(/e|é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e')
                .replace(/i|í|ì|ỉ|ĩ|ị/g, 'i')
                .replace(/o|ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o')
                .replace(/u|ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u')
                .replace(/y|ý|ỳ|ỷ|ỹ|ỵ/g, 'y')
                .replace(/d|đ/g, 'd')
                .replace(/\s+/g, ' ') // Loại bỏ khoảng trắng thừa
                // bo chu province va district
                .replace(/province/g, '')
                .replace(/district/g, '')
                .replace(/city/g, '')
                .replace(/ward/g, '')
                .trim()
        ); // Xóa khoảng trắng đầu và cuối chuỗi
    }

    // Tìm tỉnh/huyện tương tự nhất
    function findBestMatch(input, options) {
        input = normalizeString(input);
        let bestMatch = null;
        let bestScore = 0;

        options.forEach((option) => {
            const normalizedOption = normalizeString(option.name);
            const score = similarityScore(input, normalizedOption);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = option;
            }
        });

        return bestScore > 0.4 ? bestMatch : null;
    }

    function levenshteinDistance(a, b) {
        const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

        for (let i = 0; i <= a.length; i++) dp[i][0] = i;
        for (let j = 0; j <= b.length; j++) dp[0][j] = j;

        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                if (a[i - 1] === b[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
                }
            }
        }

        return dp[a.length][b.length];
    }

    function similarityScore(a, b) {
        const distance = levenshteinDistance(a, b);
        const maxLen = Math.max(a.length, b.length);
        return 1 - distance / maxLen;
    }

    useEffect(() => {
        getProvinces();
    }, []);

    async function autoFillLocation() {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}&addressdetails=1`);

        const data = await response.json();
        if (data && data.address) {
            let rawProvince = data.address.state || '';
            let rawDistrict = '';
            let ward = '';

            if (!rawProvince) {
                rawProvince = data.address.city || '';

                rawDistrict = data.address.county || '';
                if (!rawDistrict) {
                    rawDistrict = data.address.suburb || '';
                    ward = data.address.village || '';
                    if (!ward) {
                        ward = data.address.quarter || '';
                        if (!ward) {
                            ward = data.address.town || '';
                        }
                    }
                } else {
                    ward = data.address.suburb || '';
                    if (!ward) {
                        ward = data.address.village || '';
                        if (!ward) {
                            ward = data.address.quarter || '';
                            if (!ward) {
                                ward = data.address.town || '';
                            }
                        }
                    }
                }
            } else {
                rawDistrict = data.address.county || '';
                if (!rawDistrict) {
                    rawDistrict = data.address.city || '';
                }
                ward = data.address.village || '';
                if (!ward) {
                    ward = data.address.suburb || '';
                    if (!ward) {
                        ward = data.address.quarter || '';
                        if (!ward) {
                            ward = data.address.town || '';
                        }
                    }
                }
            }
            const matchedProvince = findBestMatch(rawProvince, provinceValues);
            if (matchedProvince) {
                setSelectProvinceValue(matchedProvince);

                const response = await apiClient.get(getDistrictByProvinceIdApi(matchedProvince.code));
                const districts = response.data.data.map((disttrict) => {
                    return {
                        name: disttrict.fullName,
                        code: disttrict.id
                    };
                });
                if (districts.length > 0) {
                    const matchedDistrict = findBestMatch(rawDistrict, districts);

                    if (matchedDistrict) {
                        setSelectDistrictValue(matchedDistrict);

                        const response = await apiClient.get(getWardsByDistrictIdApi(matchedDistrict.code));
                        const wards = response.data.data.map((ward) => {
                            return {
                                name: ward.fullName,
                                code: ward.id
                            };
                        });
                        if (wards.length > 0) {
                            const matchedWard = findBestMatch(ward, wards);
                            if (matchedWard) {
                                setSelectWardValue(matchedWard);
                            }
                            setWardValues(wards);
                        }
                    }

                    setDistrictValues(districts);
                }
            }
            setAddress(data.name);
        }
    }

    useEffect(() => {
        if (location) {
            autoFillLocation();
        }
    }, [location]);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Thêm trạm dừng</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name" className="text-lg">
                                Tên trạm <span className="p-error">(*)</span>
                            </label>
                            <InputText ref={fullNameRef} placeholder="Nhập tên trạm" id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" />
                        </div>
                        <div className="field col-12 md:col-6">
                            {/* <label htmlFor="phone" className="text-lg">
                                Số điện thoại
                            </label>
                            <InputText id="phone" ref={phoneRef} placeholder="Nhập số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} type="text" /> */}
                        </div>
                        <div className="field col-12">
                            <p>Vị trí:</p>
                        </div>
                        <div className="field col-12">
                            <Mapbox clickLocation={(e) => setLocation(e)} />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="" className="text-lg">
                                Tỉnh/ TP <span className="p-error">(*)</span>
                            </label>
                            <Dropdown
                                ref={provinceRef}
                                value={selectProvinceValue}
                                onChange={(e) => {
                                    setSelectProvinceValue(e.value);
                                    getDistricts(e.value.code);
                                }}
                                options={provinceValues}
                                optionLabel="name"
                                placeholder="Chọn tỉnh"
                            />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="" className="text-lg">
                                Quận/ Huyện <span className="p-error">(*)</span>
                            </label>
                            <Dropdown
                                ref={districtRef}
                                value={selectDistrictValue}
                                disabled={!selectProvinceValue || districtValues.length == 0}
                                onChange={(e) => {
                                    setSelectDistrictValue(e.value);
                                    getWards(e.value.code);
                                }}
                                options={districtValues}
                                optionLabel="name"
                                placeholder="Chọn huyện"
                            />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="" className="text-lg">
                                Phường/ Xã <span className="p-error">(*)</span>
                            </label>
                            <Dropdown ref={wardRef} value={selectWardValue} disabled={!selectDistrictValue || wardValues.length == 0} onChange={(e) => setSelectWardValue(e.value)} options={wardValues} optionLabel="name" placeholder="Chọn xã" />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="address" className="text-lg">
                                Địa chỉ cụ thể
                            </label>
                            <InputText id="address" ref={addressRef} placeholder="VD: 123, Đường Nguyễn Đáng" value={address} onChange={(e) => setAddress(e.target.value)} type="text" />
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
