'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useRef, useState } from 'react';
import { getBusRoutenApi, deleteBusRoutenApi } from '@/apis/admin/bus-route';
import { apiClient } from '@/apis/api-client';
import { useRouter } from 'next/navigation';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

const UserAdminPage = () => {
    const [adminUsers, setAdminUsers] = useState([]);
    const [loading1, setLoading1] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [userSelected, setUserSelected] = useState(null);

    const router = useRouter();
    const [displayDeleteConfirmation, setDisplayDeleteConfirmation] = useState(false);

    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa tuyến đường thành công', life: 2500 });
    };

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-plus" label="Thêm tuyến đường" outlined onClick={() => router.push('/admin/bus-routes/create')} />
            </div>
        );
    };

    const getAdminUsers = async () => {
        try {
            const response = await apiClient.get(getBusRoutenApi);
            console.log(response.data.data);
            setAdminUsers(response.data.data);

            setLoading1(false);
        } catch (error) {
            console.error('error', error);
        }
    };

    useEffect(() => {
        getAdminUsers();
    }, []);

    const handleDeleteRole = async () => {
        setDeleteLoading(true);
        const response = await apiClient.delete(deleteBusRoutenApi(userSelected.id));
        if (response.status === 200) {
            showSuccess();
            setAdminUsers(adminUsers.filter((user) => user.id !== userSelected.id));
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
        await setUserSelected(rowData);
        setDisplayDeleteConfirmation(true);
    };

    const actionBody = (rowData: any) => {
        return (
            <div className="flex justify-content-center gap-2">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => router.push(`/admin/bus-routes/${rowData.id}`)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteClickButton(rowData)} />
            </div>
        );
    };
    const startStationBody = (rowData: any) => {
        return (
            <>
                <span>
                    <b>{rowData.startStation.province.name}</b>
                </span>{' '}
                <br />
                <small>
                    <b>{rowData.startStation.name}</b> ({rowData.startStation.fullAddress})
                </small>
            </>
        );
    };

    const endStationBody = (rowData: any) => {
        return (
            <>
                <span>
                    <b>{rowData.endStation.province.name}</b>
                </span>{' '}
                <br />
                <small>
                    <b>{rowData.endStation.name}</b> ({rowData.endStation.fullAddress})
                </small>
            </>
        );
    };

    const header1 = renderHeader1();

    return (
        <div className="grid">
            <Toast ref={toast} />
            <div className="col-12">
                <div className="card">
                    <h5>Danh sách tuyến đường</h5>
                    <DataTable value={adminUsers} paginator className="p-datatable-gridlines" showGridlines rows={10} dataKey="id" loading={loading1} responsiveLayout="scroll" header={header1} emptyMessage="Chưa có tuyến đường nào">
                        <Column header="Điểm đi" body={startStationBody} style={{ minWidth: '12rem' }} />
                        <Column header="Điểm đến" body={endStationBody} style={{ minWidth: '12rem' }} />
                        <Column body={(r) => r.stations.length} header="Số trạm dừng" className="text-center" />
                        <Column body={(r) => `${r.price.toLocaleString('vi-VN')} vnđ`} header="Đơn giá" className="text-center" />
                        <Column header="Chức năng" body={actionBody} style={{ minWidth: '12rem' }} align="center" />
                    </DataTable>
                    <Dialog header="Cảnh báo" visible={displayDeleteConfirmation} onHide={() => setDisplayDeleteConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            <span>Bạn chắc chắn muốn xóa tuyến đường này?</span>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default UserAdminPage;
