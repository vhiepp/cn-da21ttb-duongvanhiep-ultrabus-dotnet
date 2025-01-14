'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from 'primereact/button';
import { apiClient } from '@/apis/api-client';
import { updateBusRoutenApi, getBusRoutenByIdApi } from '@/apis/admin/bus-route';
import { getBusStationApi } from '@/apis/admin/bus-station';
import { useParams, useRouter } from 'next/navigation';
import { InputNumber } from 'primereact/inputnumber';
import update from 'immutability-helper';
import { BusStationCard } from '@/components/BusStationCard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Timeline } from 'primereact/timeline';
import { MultiSelect } from 'primereact/multiselect';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';

const UserAdminCreate = () => {
    const { id } = useParams();

    const [loading1, setLoading1] = useState(false);
    const [selectBusStations, setSelectBusStations] = useState([]);
    const [busStations, setBusStations] = useState([]);
    const [price, setPrice] = useState(0);

    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật tuyến đường thành công', life: 2500 });
    };

    const showChooseBusStation = () => {
        toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng chọn ít nhất 2 điểm dừng', life: 2500 });
    };

    const showPrice = () => {
        toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng nhập đơn giá', life: 2500 });
    };

    const getBusStations = async () => {
        const response = await apiClient.get(getBusStationApi);
        // console.log(response.data.data);
        const data = response.data.data;
        let tempBusStations = [];
        data.forEach((item) => {
            const province = tempBusStations.find((p) => p.provinceId === item.provinceId);
            if (!!province) {
                province.items.push({ id: item.id, name: item.name, address: item.fullAddress });
            } else {
                tempBusStations.push({
                    provinceId: item.provinceId,
                    name: item.province.name,
                    items: [{ id: item.id, name: item.name, address: item.fullAddress }]
                });
            }
        });
        // console.log({ tempBusStations });
        setBusStations(tempBusStations);
    };

    const getBusRoute = async () => {
        const response = await apiClient.get(getBusRoutenByIdApi(id));
        const data = response.data.data;
        // console.log({ data });
        let tempBusStations = [];
        data.stations.forEach((item) => {
            tempBusStations.push({
                id: item.id,
                name: item.name,
                address: item.fullAddress
            });
        });
        setSelectBusStations(tempBusStations);
        // console.log({ tempBusStations });
        setPrice(data.price);
    };

    useEffect(() => {
        getBusStations();
        getBusRoute();
    }, []);

    const groupedItemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setSelectBusStations((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]]
                ]
            })
        );
    }, []);

    const customizedMarker = (item, index) => {
        // console.log({ index });
        if (index === 0) {
            return (
                <span className="flex align-items-center justify-content-center z-1 shadow-1">
                    <i className="pi pi-circle-fill border-circle" style={{ fontSize: '1.2rem', border: '2px solid #fff', color: '#00cf29' }}></i>
                </span>
            );
        } else if (index === selectBusStations.length - 1) {
            return (
                <span className="flex align-items-center justify-content-center z-1 shadow-1">
                    <i className="pi pi-map-marker" style={{ fontSize: '1.6rem', color: '#d37528' }}></i>
                </span>
            );
        } else {
            return (
                <span className="flex align-items-center justify-content-center text-white border-circle z-1 shadow-1" style={{ backgroundColor: '#607D8B', border: '2px solid', borderColor: '#4cc8db' }}>
                    <i className="pi pi-circle-fill" style={{ fontSize: '.8rem' }}></i>
                </span>
            );
        }
    };

    const renderCard = useCallback((card, index) => {
        return <BusStationCard key={card.id} index={index} id={card.id} text={card.name} address={card.address} moveCard={moveCard} />;
        // return <></>;
    }, []);

    const router = useRouter();

    const save = async (exit = false) => {
        if (selectBusStations.length < 2) {
            showChooseBusStation();
            return;
        }
        if (price == 0 || price == null || !price) {
            showPrice();
            return;
        }

        setLoading1(true);
        // console.log({ selectBusStations });

        const data = {
            price,
            stations: selectBusStations.map((item) => item.id)
        };

        const response = await apiClient.put(updateBusRoutenApi(id), data);

        if (response.status == 200) {
            if (exit) {
                router.push('/admin/bus-routes');
            } else {
                showSuccess();
            }
        } else {
            alert('Có lỗi xảy ra');
        }
        setLoading1(false);
    };

    // console.log({ selectBusStations });

    return (
        <div className="grid">
            <Toast ref={toast} />
            <DndProvider backend={HTML5Backend}>
                <div className="col-12">
                    <div className="card">
                        <h5>Thêm tuyến đường</h5>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-6">
                                <label htmlFor="chon_tuyen_duong" className="text-lg">
                                    Chọn các trạm dừng <span className="p-error">(*)</span>
                                </label>
                                <MultiSelect
                                    value={selectBusStations}
                                    options={busStations}
                                    onChange={(e) => setSelectBusStations(e.value)}
                                    optionLabel="name"
                                    filter
                                    showSelectAll={false}
                                    optionGroupLabel="name"
                                    optionGroupChildren="items"
                                    optionGroupTemplate={groupedItemTemplate}
                                    placeholder="Chọn các trạm dừng"
                                    display="chip"
                                    className="w-full"
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="full_name" className="text-lg">
                                    Giá tiền <span className="p-error">(*)</span>
                                </label>
                                <div className="p-inputgroup flex-1">
                                    <InputNumber placeholder="Nhập đơn giá" value={price} onChange={(e) => setPrice(e.value)} />
                                    <span className="p-inputgroup-addon">VND</span>
                                </div>
                            </div>
                            {selectBusStations.length < 2 ? (
                                <div className="field col-12">
                                    <Message severity="warn" text="Vui lòng chọn ít nhất 2 trạm dừng" />
                                </div>
                            ) : (
                                <>
                                    <div className="col-0 lg:col-2"></div>
                                    <div className="field col-12 lg:col-8">
                                        <label htmlFor="tuyen_duong" className="text-lg">
                                            Sắp xếp trạm dừng
                                        </label>
                                        <Timeline value={selectBusStations} align="alternate" marker={(item, index) => customizedMarker(item, index)} content={(item, index) => renderCard(item, index)} />
                                    </div>
                                </>
                            )}
                            <div className="field col-12">
                                <div className="grid mt-4 justify-content-end align-items-center gap-2">
                                    <div className="col-12 md:col-6 lg:col-2">
                                        <Button label="Lưu" icon="pi pi-save" className="p-button-info" loading={loading1} onClick={() => save()} />
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-2">
                                        <Button label="Lưu và thoát" icon="pi pi-save" className="p-button-success" loading={loading1} onClick={() => save(true)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DndProvider>
        </div>
    );
};

export default UserAdminCreate;
