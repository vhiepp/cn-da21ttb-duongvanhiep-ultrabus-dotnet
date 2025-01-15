'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { apiClient } from '@/apis/api-client';
import { getBusApi } from '@/apis/admin/bus';
import { getBusRoutenApi } from '@/apis/admin/bus-route';
import { updateBusRouteTrip, getBusRouteTripApi } from '@/apis/admin/bus-route-trip';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';

function countElementsInArrayOptimized(A, B) {
    const setA = new Set(A);
    let count = 0;
    for (let element of B) {
        if (setA.has(element)) {
            count++;
        }
    }
    return count;
}

const UserAdminCreate = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const busId = searchParams.get('busId');
    const busRouteId = searchParams.get('busRouteId');

    // console.log({ busId, busRouteId });

    const [busRouteValues, setBusRouteValues] = useState([]);
    const [busValues, setBusValues] = useState([]);
    const [selectBusRouteValue, setSelectBusRouteValue] = useState(null);
    const [selectBusValue, setSelectBusValue] = useState(null);
    const [totalTime, setTotalTime] = useState(1);
    const [totalTimeMinute, setTotalTimeMinute] = useState(0);
    const [price, setPrice] = useState(0);

    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Lưu thành công', life: 2500 });
    };

    const departureTime = [
        {
            time: '00:00',
            value: new Date(2000, 1, 1, 0 + 7, 0).toISOString()
        },
        {
            time: '01:00',
            value: new Date(2000, 1, 1, 1 + 7, 0).toISOString()
        },
        {
            time: '02:00',
            value: new Date(2000, 1, 1, 2 + 7, 0).toISOString()
        },
        {
            time: '03:00',
            value: new Date(2000, 1, 1, 3 + 7, 0).toISOString()
        },
        {
            time: '04:00',
            value: new Date(2000, 1, 1, 4 + 7, 0).toISOString()
        },
        {
            time: '05:00',
            value: new Date(2000, 1, 1, 5 + 7, 0).toISOString()
        },
        {
            time: '06:00',
            value: new Date(2000, 1, 1, 6 + 7, 0).toISOString()
        },
        {
            time: '07:00',
            value: new Date(2000, 1, 1, 7 + 7, 0).toISOString()
        },
        {
            time: '08:00',
            value: new Date(2000, 1, 1, 8 + 7, 0).toISOString()
        },
        {
            time: '09:00',
            value: new Date(2000, 1, 1, 9 + 7, 0).toISOString()
        },
        {
            time: '10:00',
            value: new Date(2000, 1, 1, 10 + 7, 0).toISOString()
        },
        {
            time: '11:00',
            value: new Date(2000, 1, 1, 11 + 7, 0).toISOString()
        },
        {
            time: '12:00',
            value: new Date(2000, 1, 1, 12 + 7, 0).toISOString()
        },
        {
            time: '13:00',
            value: new Date(2000, 1, 1, 13 + 7, 0).toISOString()
        },
        {
            time: '14:00',
            value: new Date(2000, 1, 1, 14 + 7, 0).toISOString()
        },
        {
            time: '15:00',
            value: new Date(2000, 1, 1, 15 + 7, 0).toISOString()
        },
        {
            time: '16:00',
            value: new Date(2000, 1, 1, 16 + 7, 0).toISOString()
        },
        {
            time: '17:00',
            value: new Date(2000, 1, 1, 17 + 7, 0).toISOString()
        },
        {
            time: '18:00',
            value: new Date(2000, 1, 1, 18 + 7, 0).toISOString()
        },
        {
            time: '19:00',
            value: new Date(2000, 1, 1, 19 + 7, 0).toISOString()
        },
        {
            time: '20:00',
            value: new Date(2000, 1, 1, 20 + 7, 0).toISOString()
        },
        {
            time: '21:00',
            value: new Date(2000, 1, 1, 21 + 7, 0).toISOString()
        },
        {
            time: '22:00',
            value: new Date(2000, 1, 1, 22 + 7, 0).toISOString()
        },
        {
            time: '23:00',
            value: new Date(2000, 1, 1, 23 + 7, 0).toISOString()
        }
    ];

    const departureTime3 = [
        {
            time: '00:30',
            value: new Date(2000, 1, 1, 0 + 7, 30).toISOString()
        },
        {
            time: '01:30',
            value: new Date(2000, 1, 1, 1 + 7, 30).toISOString()
        },
        {
            time: '02:30',
            value: new Date(2000, 1, 1, 2 + 7, 30).toISOString()
        },
        {
            time: '03:30',
            value: new Date(2000, 1, 1, 3 + 7, 30).toISOString()
        },
        {
            time: '04:30',
            value: new Date(2000, 1, 1, 4 + 7, 30).toISOString()
        },
        {
            time: '05:30',
            value: new Date(2000, 1, 1, 5 + 7, 30).toISOString()
        },
        {
            time: '06:30',
            value: new Date(2000, 1, 1, 6 + 7, 30).toISOString()
        },
        {
            time: '07:30',
            value: new Date(2000, 1, 1, 7 + 7, 30).toISOString()
        },
        {
            time: '08:30',
            value: new Date(2000, 1, 1, 8 + 7, 30).toISOString()
        },
        {
            time: '09:30',
            value: new Date(2000, 1, 1, 9 + 7, 30).toISOString()
        },
        {
            time: '10:30',
            value: new Date(2000, 1, 1, 10 + 7, 30).toISOString()
        },
        {
            time: '11:30',
            value: new Date(2000, 1, 1, 11 + 7, 30).toISOString()
        },
        {
            time: '12:30',
            value: new Date(2000, 1, 1, 12 + 7, 30).toISOString()
        },
        {
            time: '13:30',
            value: new Date(2000, 1, 1, 13 + 7, 30).toISOString()
        },
        {
            time: '14:30',
            value: new Date(2000, 1, 1, 14 + 7, 30).toISOString()
        },
        {
            time: '15:30',
            value: new Date(2000, 1, 1, 15 + 7, 30).toISOString()
        },
        {
            time: '16:30',
            value: new Date(2000, 1, 1, 16 + 7, 30).toISOString()
        },
        {
            time: '17:30',
            value: new Date(2000, 1, 1, 17 + 7, 30).toISOString()
        },
        {
            time: '18:30',
            value: new Date(2000, 1, 1, 18 + 7, 30).toISOString()
        },
        {
            time: '19:30',
            value: new Date(2000, 1, 1, 19 + 7, 30).toISOString()
        },
        {
            time: '20:30',
            value: new Date(2000, 1, 1, 20 + 7, 30).toISOString()
        },
        {
            time: '21:30',
            value: new Date(2000, 1, 1, 21 + 7, 30).toISOString()
        },
        {
            time: '22:30',
            value: new Date(2000, 1, 1, 22 + 7, 30).toISOString()
        },
        {
            time: '23:30',
            value: new Date(2000, 1, 1, 23 + 7, 30).toISOString()
        }
    ];

    const departureTime2 = [
        {
            time: '00:15',
            value: new Date(2000, 1, 1, 0 + 7, 15).toISOString()
        },
        {
            time: '01:15',
            value: new Date(2000, 1, 1, 1 + 7, 15).toISOString()
        },
        {
            time: '02:15',
            value: new Date(2000, 1, 1, 2 + 7, 15).toISOString()
        },
        {
            time: '03:15',
            value: new Date(2000, 1, 1, 3 + 7, 15).toISOString()
        },
        {
            time: '04:15',
            value: new Date(2000, 1, 1, 4 + 7, 15).toISOString()
        },
        {
            time: '05:15',
            value: new Date(2000, 1, 1, 5 + 7, 15).toISOString()
        },
        {
            time: '06:15',
            value: new Date(2000, 1, 1, 6 + 7, 15).toISOString()
        },
        {
            time: '07:15',
            value: new Date(2000, 1, 1, 7 + 7, 15).toISOString()
        },
        {
            time: '08:15',
            value: new Date(2000, 1, 1, 8 + 7, 15).toISOString()
        },
        {
            time: '09:15',
            value: new Date(2000, 1, 1, 9 + 7, 15).toISOString()
        },
        {
            time: '10:15',
            value: new Date(2000, 1, 1, 10 + 7, 15).toISOString()
        },
        {
            time: '11:15',
            value: new Date(2000, 1, 1, 11 + 7, 15).toISOString()
        },
        {
            time: '12:15',
            value: new Date(2000, 1, 1, 12 + 7, 15).toISOString()
        },
        {
            time: '13:15',
            value: new Date(2000, 1, 1, 13 + 7, 15).toISOString()
        },
        {
            time: '14:15',
            value: new Date(2000, 1, 1, 14 + 7, 15).toISOString()
        },
        {
            time: '15:15',
            value: new Date(2000, 1, 1, 15 + 7, 15).toISOString()
        },
        {
            time: '16:15',
            value: new Date(2000, 1, 1, 16 + 7, 15).toISOString()
        },
        {
            time: '17:15',
            value: new Date(2000, 1, 1, 17 + 7, 15).toISOString()
        },
        {
            time: '18:15',
            value: new Date(2000, 1, 1, 18 + 7, 15).toISOString()
        },
        {
            time: '19:15',
            value: new Date(2000, 1, 1, 19 + 7, 15).toISOString()
        },
        {
            time: '20:15',
            value: new Date(2000, 1, 1, 20 + 7, 15).toISOString()
        },
        {
            time: '21:15',
            value: new Date(2000, 1, 1, 21 + 7, 15).toISOString()
        },
        {
            time: '22:15',
            value: new Date(2000, 1, 1, 22 + 7, 15).toISOString()
        },
        {
            time: '23:15',
            value: new Date(2000, 1, 1, 23 + 7, 15).toISOString()
        }
    ];

    const departureTime4 = [
        {
            time: '00:45',
            value: new Date(2000, 1, 1, 0 + 7, 45).toISOString()
        },
        {
            time: '01:45',
            value: new Date(2000, 1, 1, 1 + 7, 45).toISOString()
        },
        {
            time: '02:45',
            value: new Date(2000, 1, 1, 2 + 7, 45).toISOString()
        },
        {
            time: '03:45',
            value: new Date(2000, 1, 1, 3 + 7, 45).toISOString()
        },
        {
            time: '04:45',
            value: new Date(2000, 1, 1, 4 + 7, 45).toISOString()
        },
        {
            time: '05:45',
            value: new Date(2000, 1, 1, 5 + 7, 45).toISOString()
        },
        {
            time: '06:45',
            value: new Date(2000, 1, 1, 6 + 7, 45).toISOString()
        },
        {
            time: '07:45',
            value: new Date(2000, 1, 1, 7 + 7, 45).toISOString()
        },
        {
            time: '08:45',
            value: new Date(2000, 1, 1, 8 + 7, 45).toISOString()
        },
        {
            time: '09:45',
            value: new Date(2000, 1, 1, 9 + 7, 45).toISOString()
        },
        {
            time: '10:45',
            value: new Date(2000, 1, 1, 10 + 7, 45).toISOString()
        },
        {
            time: '11:45',
            value: new Date(2000, 1, 1, 11 + 7, 45).toISOString()
        },
        {
            time: '12:45',
            value: new Date(2000, 1, 1, 12 + 7, 45).toISOString()
        },
        {
            time: '13:45',
            value: new Date(2000, 1, 1, 13 + 7, 45).toISOString()
        },
        {
            time: '14:45',
            value: new Date(2000, 1, 1, 14 + 7, 45).toISOString()
        },
        {
            time: '15:45',
            value: new Date(2000, 1, 1, 15 + 7, 45).toISOString()
        },
        {
            time: '16:45',
            value: new Date(2000, 1, 1, 16 + 7, 45).toISOString()
        },
        {
            time: '17:45',
            value: new Date(2000, 1, 1, 17 + 7, 45).toISOString()
        },
        {
            time: '18:45',
            value: new Date(2000, 1, 1, 18 + 7, 45).toISOString()
        },
        {
            time: '19:45',
            value: new Date(2000, 1, 1, 19 + 7, 45).toISOString()
        },
        {
            time: '20:45',
            value: new Date(2000, 1, 1, 20 + 7, 45).toISOString()
        },
        {
            time: '21:45',
            value: new Date(2000, 1, 1, 21 + 7, 45).toISOString()
        },
        {
            time: '22:45',
            value: new Date(2000, 1, 1, 22 + 7, 45).toISOString()
        },
        {
            time: '23:45',
            value: new Date(2000, 1, 1, 23 + 7, 45).toISOString()
        }
    ];

    // console.log({ departureTime });
    const [loading1, setLoading1] = useState(false);

    const busRef = useRef(null);
    const busRouteRef = useRef(null);

    const [ingredients, setIngredients] = useState([]);

    const onIngredientsChange = (e) => {
        let _ingredients = [...ingredients];

        if (e.checked) _ingredients.push(e.value);
        else _ingredients.splice(_ingredients.indexOf(e.value), 1);

        // console.log(_ingredients);
        setIngredients(_ingredients);
    };

    // console.log({ ingredients });

    const save = async (exit = false) => {
        setLoading1(true);

        const data = {
            busRouteId: selectBusRouteValue.code,
            busId: selectBusValue.code,
            price: price,
            totalHours: totalTime,
            totalMinutes: totalTimeMinute,
            departureTimes: ingredients
        };

        // console.log(data);

        const response = await apiClient.put(updateBusRouteTrip, data);

        if (response.status == 200) {
            showSuccess();
        } else {
            alert('Có lỗi xảy ra');
        }
        setLoading1(false);
    };

    const handleChangeBusRouteOrBus = async () => {
        if (selectBusRouteValue && selectBusValue) {
            // console.log(selectBusRouteValue, selectBusValue);
            router.push(`/admin/bus-route-trips?busRouteId=${selectBusRouteValue.code}&busId=${selectBusValue.code}`);
            const response = await apiClient.get(getBusRouteTripApi(selectBusRouteValue.code, selectBusValue.code));
            // console.log(response.data.data);
            const data = response.data.data;
            if (data.length > 0) {
                setPrice(data[0].price);
                setTotalTime(data[0].totalHours);
                setTotalTimeMinute(data[0].totalMinutes);
                setIngredients(
                    data.map((item) => {
                        let date = new Date(item.departureTime);
                        date.setHours(date.getHours() + 7);
                        return date.toISOString();
                    })
                );
            } else {
                setTotalTime(1);
                setTotalTimeMinute(0);
                setIngredients([]);
                setPrice(busRouteValues.find((busRoute) => busRoute.code == selectBusRouteValue.code).price);
            }
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
        if (busRoute.length > 0) {
            if (busRouteId) {
                setSelectBusRouteValue(busRoute.find((bus) => bus.code == busRouteId));
                setPrice(busRoute.find((bus) => bus.code == busRouteId).price);
            } else {
                setSelectBusRouteValue(busRoute[0]);
                setPrice(response.data.data[0].price);
            }
        }
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
        if (buses.length > 0) {
            if (busId) {
                setSelectBusValue(buses.find((bus) => bus.code == busId));
            } else {
                setSelectBusValue(buses[0]);
            }
        }
    };

    useEffect(() => {
        handleChangeBusRouteOrBus();
    }, [selectBusRouteValue, selectBusValue]);

    useEffect(() => {
        getBusRoute();
        getBus();
    }, []);

    return (
        <div className="grid">
            <Toast ref={toast} />
            <div className="col-12">
                <div className="card">
                    <h5>Chuyến đi</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="bustype" className="text-lg">
                                Tuyến đường <span className="p-error">(*)</span>
                            </label>
                            <Dropdown ref={busRouteRef} filter value={selectBusRouteValue} onChange={(e) => setSelectBusRouteValue(e.value)} options={busRouteValues} optionLabel="name" placeholder="Chọn tuyến đường" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="bustype" className="text-lg">
                                Loại xe <span className="p-error">(*)</span>
                            </label>
                            <Dropdown ref={busRef} filter value={selectBusValue} onChange={(e) => setSelectBusValue(e.value)} options={busValues} optionLabel="name" placeholder="Chọn xe" />
                        </div>
                        <div className="field col-6 md:col-3">
                            <label htmlFor="seat" className="text-lg">
                                Tổng giờ đi dự kiến <span className="p-error">(*)</span>
                            </label>
                            <div className="p-inputgroup flex-1">
                                <InputNumber value={totalTime} onValueChange={(e) => setTotalTime(e.value ?? null)} min={0} max={20} mode="decimal"></InputNumber>
                                <span className="p-inputgroup-addon">giờ</span>
                            </div>
                        </div>
                        <div className="field col-6 md:col-3">
                            <label htmlFor="seat" className="text-lg">
                                <span className="p-error" style={{ opacity: 0 }}>
                                    {`o`}
                                </span>
                            </label>
                            <div className="p-inputgroup flex-1">
                                <InputNumber value={totalTimeMinute} onValueChange={(e) => setTotalTimeMinute(e.value ?? null)} min={0} max={59} mode="decimal"></InputNumber>
                                <span className="p-inputgroup-addon">phút</span>
                            </div>
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

                        <div className="field col-12">
                            <label htmlFor="bustype" className="text-lg">
                                Các giờ khởi hành <span className="p-error">(*)</span>
                            </label>
                            {ingredients && (
                                <Accordion activeIndex={0}>
                                    <AccordionTab
                                        header={`00' (${countElementsInArrayOptimized(
                                            departureTime.map((time) => time.value),
                                            ingredients
                                        )})`}
                                    >
                                        <div className="flex flex-wrap gap-3">
                                            {departureTime.map((time) => (
                                                <div className="flex align-items-center" key={time.time}>
                                                    <Checkbox inputId={`time-${time.time}`} name="departure_time" value={time.value} onChange={onIngredientsChange} checked={ingredients.includes(time.value)} />
                                                    <label htmlFor={`time-${time.time}`} className="ml-2">
                                                        {time.time}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionTab>
                                    <AccordionTab
                                        header={`15' (${countElementsInArrayOptimized(
                                            departureTime2.map((time) => time.value),
                                            ingredients
                                        )})`}
                                    >
                                        <div className="flex flex-wrap gap-3">
                                            {departureTime2.map((time) => (
                                                <div className="flex align-items-center" key={time.time}>
                                                    <Checkbox inputId={`time-${time.time}`} name="departure_time" value={time.value} onChange={onIngredientsChange} checked={ingredients.includes(time.value)} />
                                                    <label htmlFor={`time-${time.time}`} className="ml-2">
                                                        {time.time}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionTab>
                                    <AccordionTab
                                        header={`30' (${countElementsInArrayOptimized(
                                            departureTime3.map((time) => time.value),
                                            ingredients
                                        )})`}
                                    >
                                        <div className="flex flex-wrap gap-3">
                                            {departureTime3.map((time) => (
                                                <div className="flex align-items-center" key={time.time}>
                                                    <Checkbox inputId={`time-${time.time}`} name="departure_time" value={time.value} onChange={onIngredientsChange} checked={ingredients.includes(time.value)} />
                                                    <label htmlFor={`time-${time.time}`} className="ml-2">
                                                        {time.time}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionTab>
                                    <AccordionTab
                                        header={`45' (${countElementsInArrayOptimized(
                                            departureTime4.map((time) => time.value),
                                            ingredients
                                        )})`}
                                    >
                                        <div className="flex flex-wrap gap-3">
                                            {departureTime4.map((time) => (
                                                <div className="flex align-items-center" key={time.time}>
                                                    <Checkbox inputId={`time-${time.time}`} name="departure_time" value={time.value} onChange={onIngredientsChange} checked={ingredients.includes(time.value)} />
                                                    <label htmlFor={`time-${time.time}`} className="ml-2">
                                                        {time.time}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionTab>
                                </Accordion>
                            )}
                        </div>

                        <div className="field col-12">
                            <div className="grid mt-4 justify-content-end align-items-center gap-2">
                                <div className="col-12 md:col-6 lg:col-2">
                                    <Button label="Lưu" icon="pi pi-save" className="p-button-info" loading={loading1} onClick={() => save()} />
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
