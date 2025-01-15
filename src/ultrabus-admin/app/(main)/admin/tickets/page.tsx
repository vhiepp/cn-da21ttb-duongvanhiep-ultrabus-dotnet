'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { use, useEffect, useRef, useState } from 'react';
import { getBusApi, deleteBusApi } from '@/apis/admin/bus';
import { apiClient } from '@/apis/api-client';
import { useRouter } from 'next/navigation';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { getBusRoutenApi } from '@/apis/admin/bus-route';
import { getBusRouteTripApi } from '@/apis/admin/bus-route-trip';
import { getTicketList } from '@/apis/admin/ticket';
import { Tag } from 'primereact/tag';

const busTypeValues: Array<string> = ['', 'Ghế ngồi', 'Giường nằm'];

function formatTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0'); // Lấy giờ và thêm số 0 nếu cần
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Lấy phút và thêm số 0 nếu cần
    return `${hours}:${minutes}`;
}

const UserAdminPage = () => {
    const [date, setDate] = useState(new Date());
    const [busRouteValues, setBusRouteValues] = useState([]);
    const [selectBusRouteValue, setSelectBusRouteValue] = useState(null);
    const [busValues, setBusValues] = useState([]);
    const [selectBusValue, setSelectBusValue] = useState(null);
    const [busRouteTripValues, setBusRouteTripValues] = useState([]);
    const [selectBusRouteTripValue, setSelectBusRouteTripValue] = useState(null);

    const busRef = useRef(null);
    const busRouteRef = useRef(null);
    const busRouteTripRef = useRef(null);

    const [adminUsers, setAdminUsers] = useState([]);
    const [loading1, setLoading1] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [userSelected, setUserSelected] = useState(null);

    const router = useRouter();
    const [displayDeleteConfirmation, setDisplayDeleteConfirmation] = useState(false);

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between gap-3">
                <div className="flex flex-column gap-1">
                    <label htmlFor="">Chọn ngày</label>
                    <Calendar value={date} onChange={(e) => setDate(e.value)} placeholder="Chọn ngày" dateFormat="dd/mm/yy" />
                </div>
                <div className="flex flex-column gap-1">
                    <label htmlFor="">Tuyến đường</label>
                    <Dropdown ref={busRouteRef} filter value={selectBusRouteValue} onChange={(e) => setSelectBusRouteValue(e.value)} options={busRouteValues} optionLabel="name" placeholder="Chọn tuyến đường" />
                </div>
                <div className="flex flex-column gap-1">
                    <label htmlFor="">Xe</label>
                    <Dropdown ref={busRef} filter value={selectBusValue} onChange={(e) => setSelectBusValue(e.value)} options={busValues} optionLabel="name" placeholder="Chọn xe" />
                </div>
                <div className="flex flex-column gap-1">
                    <label htmlFor="">Giờ khởi hành</label>
                    <Dropdown ref={busRouteTripRef} filter value={selectBusRouteTripValue} onChange={(e) => setSelectBusRouteTripValue(e.value)} options={busRouteTripValues} optionLabel="name" placeholder="Chọn chuyến đi" />
                </div>
            </div>
        );
    };

    const getAdminUsers = async () => {
        try {
            if (!selectBusRouteTripValue) return;
            if (!selectBusRouteValue) return;
            if (!selectBusValue) return;
            if (!date) return;
            let newDate = new Date(date);
            newDate.setHours(7, 0, 0, 0);
            const response = await apiClient.get(getTicketList, {
                params: {
                    DepartureDay: newDate.toISOString(),
                    BusRouteId: selectBusRouteValue?.code,
                    BusId: selectBusValue?.code,
                    DepartureTime: selectBusRouteTripValue.time
                    // date: date.toISOString().split('T')[0],
                    // busRouteTripId: selectBusRouteTripValue?.code
                }
            });
            // console.log(response.data.data);
            setAdminUsers(response.data.data);

            setLoading1(false);
        } catch (error) {
            console.error('error', error);
        }
    };

    const getBusRoute = async () => {
        const response = await apiClient.get(getBusRoutenApi);
        // console.log(response.data.data);
        const busRoute = response.data.data.map((busRoute) => {
            return {
                name: busRoute.startStation.name + ' - ' + busRoute.endStation.name,
                code: busRoute.id,
                price: busRoute.price
            };
        });
        setBusRouteValues(busRoute);
        if (busRoute.length > 0) setSelectBusRouteValue(busRoute[0]);
    };

    const getBus = async () => {
        const response = await apiClient.get(getBusApi);
        // console.log(response.data.data);
        const buses = response.data.data.map((bus) => {
            return {
                name: bus.name,
                code: bus.id
            };
        });
        setBusValues(buses);
        if (buses.length > 0) setSelectBusValue(buses[0]);
    };

    const handleChangeBusRouteOrBus = async () => {
        if (selectBusRouteValue && selectBusValue) {
            const response = await apiClient.get(getBusRouteTripApi(selectBusRouteValue.code, selectBusValue.code));
            const data = response.data.data;
            const busRouteTrip = data.map((busRouteTrip) => {
                const startTime = formatTime(busRouteTrip.departureTime);
                const endTime = formatTime(busRouteTrip.arrivalTime);
                return {
                    name: startTime + ' - ' + endTime,
                    code: busRouteTrip.id,
                    time: busRouteTrip.departureTime
                    // value: busRouteTrip.departureTime
                };
            });
            setBusRouteTripValues(busRouteTrip);
            if (busRouteTrip.length > 0) setSelectBusRouteTripValue(busRouteTrip[0]);
        }
    };

    useEffect(() => {
        handleChangeBusRouteOrBus();
    }, [selectBusRouteValue, selectBusValue]);

    useEffect(() => {
        getAdminUsers();
    }, [selectBusRouteTripValue, date, selectBusRouteValue, selectBusValue]);

    useEffect(() => {
        getBusRoute();
        getBus();
    }, []);

    const handleDeleteRole = async () => {
        setDeleteLoading(true);
        const response = await apiClient.delete(deleteBusApi(userSelected.id));
        if (response.status === 200) {
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

    const handlePrintTicket = (rowData) => {
        // in ve ra pdf su dung ham truc tiep trong js
        // console.log(rowData);
        const win = window.open('', 'Print', 'height=800,width=900');
        win.document.write('<html><head><title>Print</title></head><body>');
        rowData.seatNumbers.forEach((element) => {
            win.document.write('<h1>Thông tin vé xe</h1>');
            win.document.write('<p>Tên khách hàng: ' + rowData.customerName + '</p>');
            win.document.write('<p>Số điện thoại: ' + rowData.phoneNumber + '</p>');
            win.document.write('<p>Ngày đi: ' + rowData.departureDay + '</p>');
            win.document.write('<p>Giờ đi: ' + rowData.departureTime + '</p>');
            win.document.write('<p>Số ghế: ' + element + '</p>');
            win.document.write('<hr />');
        });
        win.document.write('<p>Tổng tiền: ' + rowData.totalPrice.toLocaleString('vi-VN') + ' vnđ</p>');
        win.document.write('<p>Trạng thái: ' + (rowData.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán') + '</p>');
        win.document.write('</body></html>');
        win.document.close();
        win.print();
    };

    const actionBody = (rowData: any) => {
        return (
            <div className="flex justify-content-center gap-2">
                <Button icon="pi pi-print" className="p-button-rounded p-button-success p-mr-2" disabled={!rowData.isPaid} onClick={() => handlePrintTicket(rowData)} />
                {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteClickButton(rowData)} /> */}
            </div>
        );
    };

    const busTypeBody = (rowData: any) => {
        return <span>{busTypeValues[rowData.busType]}</span>;
    };

    const seatNumberBody = (rowData: any) => {
        return <span>{rowData.seatNumbers.join(', ')}</span>;
    };

    const paymentStatusBody = (rowData: any) => {
        return <Tag value={rowData.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'} severity={rowData.isPaid ? 'success' : 'warning'}></Tag>;
    };

    const priceBody = (rowData: any) => {
        return <span>{rowData.totalPrice.toLocaleString('vi-VN')} vnđ</span>;
    };

    const header1 = renderHeader1();

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Danh sách vé xe khách đặt</h5>
                    <DataTable value={adminUsers} paginator className="p-datatable-gridlines" showGridlines rows={10} dataKey="id" loading={loading1} responsiveLayout="scroll" header={header1} emptyMessage="Chưa có dữ liệu">
                        <Column field="customerName" header="Tên khách hàng" style={{ minWidth: '12rem' }} />
                        <Column field="phoneNumber" header="Số điện thoại" style={{ minWidth: '12rem' }} />
                        <Column field="quantity" header="Tổng vé" style={{ minWidth: '12rem' }} />
                        <Column header="Số ghế" body={seatNumberBody} style={{ minWidth: '12rem' }} />
                        <Column header="Tổng tiền" body={priceBody} className="text-center" />
                        <Column header="Trạng thái" body={paymentStatusBody} className="text-center" />
                        <Column header="Chức năng" body={actionBody} style={{ minWidth: '12rem' }} align="center" />
                    </DataTable>
                    <Dialog header="Cảnh báo" visible={displayDeleteConfirmation} onHide={() => setDisplayDeleteConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            <span>
                                Bạn chắc chắn muốn xóa xe này <b>{userSelected?.name}</b>?
                            </span>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default UserAdminPage;
