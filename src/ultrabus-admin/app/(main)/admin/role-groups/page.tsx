'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import { getAdminRolesApi, deleteAdminRoleApi } from '@/apis/admin/role';
import { apiClient } from '@/apis/api-client';
import { useRouter } from 'next/navigation';
import { Dialog } from 'primereact/dialog';

const TableDemo = () => {
    const [adminRoles, setAdminRoles] = useState([]);
    const [loading1, setLoading1] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [roleSelected, setRoleSelected] = useState(null);

    const router = useRouter();
    const [displayDeleteConfirmation, setDisplayDeleteConfirmation] = useState(false);

    const representatives = [];

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-plus" label="Thêm quyền mới" outlined onClick={() => router.push('/admin/role-groups/create')} />
            </div>
        );
    };

    const getAdminRoles = async () => {
        try {
            const response = await apiClient.get(getAdminRolesApi);
            // console.log(response.data);
            setAdminRoles(response.data.data);

            setLoading1(false);
        } catch (error) {
            console.error('error', error);
        }
    };

    useEffect(() => {
        getAdminRoles();
    }, []);

    const handleDeleteRole = async () => {
        setDeleteLoading(true);
        const response = await apiClient.delete(deleteAdminRoleApi(roleSelected.id));
        if (response.status === 200 && response.data.success) {
            setAdminRoles(adminRoles.filter((role) => role.id !== roleSelected.id));
        }
        setDisplayDeleteConfirmation(false);
        setDeleteLoading(false);
    };

    const confirmationDialogFooter = (
        <>
            <Button type="button" label="Xóa" icon="pi pi-check" loading={deleteLoading} className="p-button-danger" onClick={() => handleDeleteRole()} text />
            <Button type="button" label="Hủy" icon="pi pi-times" className="p-button-info" onClick={() => setDisplayDeleteConfirmation(false)} text autoFocus />
        </>
    );

    const deleteClickButton = async (rowData) => {
        await setRoleSelected(rowData);
        setDisplayDeleteConfirmation(true);
    };

    const actionBody = (rowData: any) => {
        return (
            <div className="flex justify-content-center gap-2">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => router.push(`/admin/role-groups/${rowData.id}`)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteClickButton(rowData)} />
            </div>
        );
    };

    const header1 = renderHeader1();

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Quyền quản trị hệ thống</h5>
                    <DataTable value={adminRoles} paginator className="p-datatable-gridlines" showGridlines rows={10} dataKey="id" loading={loading1} responsiveLayout="scroll" header={header1} emptyMessage="Chưa có quyền nào">
                        <Column field="name" header="Tên quyền" style={{ minWidth: '12rem' }} />
                        <Column field="description" header="Mô tả" style={{ minWidth: '12rem' }} />
                        {/* <Column field="total_permission" header="Tổng số quyền" style={{ minWidth: '2rem', maxWidth: '4rem' }} align="center" /> */}
                        <Column header="Chức năng" body={actionBody} style={{ minWidth: '12rem' }} align="center" />
                    </DataTable>
                    <Dialog header="Cảnh báo" visible={displayDeleteConfirmation} onHide={() => setDisplayDeleteConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            <span>
                                Bạn chắc chắn muốn xóa quyền <b>{roleSelected?.name}</b>?
                            </span>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default TableDemo;
