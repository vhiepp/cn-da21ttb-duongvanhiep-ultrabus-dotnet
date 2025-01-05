import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css'; // CSS của Mapbox
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGhpZXAyMzA3IiwiYSI6ImNtNDRpeDFtejBuNzkycHB6bXp6eWZ1MTQifQ.169cDiC_Q2YWzRBdIxxgPg'; // Thay thế bằng Access Token của bạn

const Mapbox = ({ clickLocation }) => {
    const mapContainer = useRef(null); // Ref để gắn vào container của bản đồ
    const map = useRef(null); // Ref để lưu trữ instance của Mapbox
    const markerRef = useRef(null); // Ref để lưu trữ instance của marker
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        // Sử dụng Geolocation API để lấy vị trí người dùng
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([longitude, latitude]); // Lưu vị trí hiện tại
                },
                (error) => {
                    console.error('Lỗi khi lấy vị trí:', error);
                    //   alert('Không thể lấy vị trí hiện tại của bạn. Vui lòng kiểm tra cài đặt vị trí.');
                }
            );
        } else {
            //   alert('Trình duyệt của bạn không hỗ trợ Geolocation.');
        }
    }, []);

    useEffect(() => {
        // console.log('userLocation', userLocation);
        if (!mapContainer.current || !userLocation) return;
        if (map.current) return; // Nếu bản đồ đã được khởi tạo, không làm gì thêm

        // Khởi tạo Mapbox
        map.current = new mapboxgl.Map({
            container: mapContainer.current, // Gắn vào phần tử DOM
            style: 'mapbox://styles/dhiep2307/cm44mghvy011l01sd5cci6k20', // Style của bản đồ
            center: userLocation, // Tọa độ trung tâm (Hà Nội)
            zoom: 10 // Mức zoom ban đầu
        });

        // Thêm Geocoder (Thanh tìm kiếm)
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken, // Access Token của Mapbox
            // @ts-ignore
            mapboxgl: mapboxgl, // Tham chiếu đến Mapbox GL JS
            marker: true, // Tự động thêm marker vào vị trí tìm kiếm
            placeholder: 'Tìm kiếm địa điểm...' // Placeholder trong ô tìm kiếm
        });

        // Gắn thanh tìm kiếm vào map
        map.current.addControl(geocoder);
        // Tùy chọn: Thêm điều khiển zoom và điều khiển xoay
        map.current.addControl(new mapboxgl.NavigationControl());

        map.current.on('click', (e) => {
            const { lng, lat } = e.lngLat;

            // Kiểm tra marker cũ và xóa nó
            if (markerRef.current) {
                markerRef.current.remove();
            }

            // Thêm marker mới tại vị trí click
            markerRef.current = new mapboxgl.Marker({
                color: 'red' // Đặt màu đỏ cho marker
            })
                .setLngLat([lng, lat])
                .addTo(map.current);

            // Log tọa độ hoặc hiển thị thông báo
            // console.log(`Marker được đặt tại: Kinh độ ${lng}, Vĩ độ ${lat}`);
            clickLocation({ lat, lng });
            // alert(`Marker được đặt tại: Kinh độ ${lng}, Vĩ độ ${lat}`);
        });

        // Cleanup khi component bị tháo gỡ
        return () => {
            map.current.remove();
        };
    }, [userLocation]);

    return (
        <div
            ref={mapContainer}
            style={{
                width: '100%',
                height: '500px'
            }}
        />
    );
};

export default Mapbox;
