'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { apiClient } from '@/apis/api-client';
import { getAdminPermissionsApi, createAdminRoleApi } from '@/apis/admin/role';
import { useRouter } from 'next/navigation';

interface DropdownItem {
    name: string;
    code: string;
}

const RoleAdminCreate = () => {
    const [loading1, setLoading1] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [switchValue, setSwitchValue] = useState({});
    const [roleName, setRoleName] = useState('');
    const [description, setDescription] = useState('');
    const roleNameRef = useRef(null);
    const router = useRouter();

    const getPermissions = async () => {
        const response = await apiClient.get(getAdminPermissionsApi);
        const pers = response.data.data;
        pers.forEach((per) => {
            setSwitchValue((prev) => ({ ...prev, [per.id]: false }));
        });
        setPermissions(pers);
    };

    const changeSwitchValue = (key: number, value: boolean) => {
        setSwitchValue((prev) => ({ ...prev, [key]: value }));
    };

    const saveRole = async (exit = false) => {
        if (!roleName) {
            roleNameRef.current.focus();
            return;
        }
        const pers = Object.keys(switchValue)
            .filter((key) => switchValue[key])
            .map(Number);
        // if (pers.length == 0) {
        //     alert('Vui lòng chọn ít nhất một quyền');
        //     return;
        // }
        setLoading1(true);
        const data = {
            name: roleName,
            description: description,
            permissionIds: pers
        };

        const response = await apiClient.post(createAdminRoleApi, data);

        setLoading1(false);

        if (response.status == 200) {
            if (exit) {
                router.push('/admin/role-groups');
            } else {
                setRoleName('');
                setDescription('');
                setSwitchValue({});
                roleNameRef.current.focus();
            }
        } else {
            alert('Có lỗi xảy ra');
        }
    };

    useEffect(() => {
        getPermissions();
    }, []);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Thêm quyền quản trị hệ thống</h5>
                    <div className="p-fluid formgrid grid gap-2">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="role_name" className="text-lg">
                                Tên quyền <span className="p-error">(*)</span>
                            </label>
                            <InputText ref={roleNameRef} id="role_name" value={roleName} onChange={(e) => setRoleName(e.target.value)} type="text" />
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

                        <div className="field col-12">
                            <label className="text-lg">Các quyền hạn</label>
                        </div>
                        <div className="field col-12">
                            <div className="grid">
                                {permissions.map((permission) => {
                                    return (
                                        <div className="field col-12 md:col-6 lg:col-4" key={permission.id} title={permission.description}>
                                            <div className="flex align-items-center gap-2 pb-2">
                                                <InputSwitch checked={switchValue[permission.id]} onChange={(e) => changeSwitchValue(permission.id, e.value ?? false)} />
                                                <label className="text-lg">{permission.name}</label>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
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

export default RoleAdminCreate;
