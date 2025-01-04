'use client';

import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { apiClient } from '@/apis/api-client';
import { getAdminPermissionsApi, updateAdminRoleApi, getAdminRoleApi } from '@/apis/admin/role';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

interface Role {
    name?: string;
    description?: string;
    permissions?: string[];
}

const RoleAdminCreate = () => {
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [switchValue, setSwitchValue] = useState(null);
    const [role, setRole] = useState<Role>({});
    const roleNameRef = useRef(null);
    const router = useRouter();

    const params = useParams();
    const id = params.id;

    const getPermissions = async (role) => {
        // console.log(role);
        const response = await apiClient.get(getAdminPermissionsApi);
        const pers = response.data.data;
        pers.forEach((per) => {
            setSwitchValue((prev) => ({ ...prev, [per.id]: role.permissions.some((obj) => obj.id === per.id) }));
        });
        setPermissions(pers);
    };

    const changeSwitchValue = (key: string, value: boolean) => {
        setSwitchValue((prev) => ({ ...prev, [key]: value }));
    };

    const saveRole = async (exit = false) => {
        if (!role.name) {
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
        if (exit) setLoading1(true);
        else setLoading2(true);
        const data = {
            name: role.name,
            description: role.description,
            permissionIds: pers
        };
        const response = await apiClient.put(updateAdminRoleApi(id), data);
        // console.log(response.data);
        if (exit) setLoading1(false);
        else setLoading2(false);
        if (response.status == 200) {
            if (exit) {
                router.push('/admin/role-groups');
            }
        } else {
            alert('Có lỗi xảy ra');
        }
    };

    const getRole = async () => {
        const response = await apiClient.get(getAdminRoleApi(id));
        // console.log(response.data);
        await setRole(response.data.data);
        getPermissions(response.data.data);
    };

    useEffect(() => {
        getRole();
    }, []);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Chỉnh sửa quyền</h5>
                    {((role?.name || permissions.length > 0) && (
                        <div className="p-fluid formgrid grid gap-2">
                            <div className="field col-12 md:col-6">
                                <label htmlFor="role_name" className="text-lg">
                                    Tên quyền <span className="p-error">(*)</span>
                                </label>
                                <InputText ref={roleNameRef} id="role_name" value={role.name || ''} onChange={(e) => setRole((pre) => ({ ...pre, name: e.target.value }))} type="text" />
                            </div>
                            <div className="field col-12">
                                <label htmlFor="address" className="text-lg">
                                    Mô tả{' '}
                                    <span className="text-sm">
                                        <i>(không bắt buộc)</i>
                                    </span>
                                </label>
                                <InputTextarea id="description" onChange={(e) => setRole((pre) => ({ ...pre, description: e.target.value }))} value={role.description || ''} rows={2}></InputTextarea>
                            </div>

                            <div className="field col-12">
                                <label className="text-lg">Các quyền hạn</label>
                            </div>
                            <div className="field col-12">
                                <div className="grid">
                                    {permissions.map((permission) => {
                                        return (
                                            <div className="field col-12 md:col-6 lg:col-4" key={permission.id} title={permission.description}>
                                                <div className="flex align-items-center gap-2">
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
                                        <Button label="Lưu" icon="pi pi-save" className="p-button-info" loading={loading2} onClick={() => saveRole()} />
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-2">
                                        <Button label="Lưu và thoát" icon="pi pi-save" className="p-button-success" loading={loading1} onClick={() => saveRole(true)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) || (
                        <div className="flex justify-content-center">
                            <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoleAdminCreate;
