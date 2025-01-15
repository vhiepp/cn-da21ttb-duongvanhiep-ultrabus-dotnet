/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { fetcher } from '@/functions';
import useSWR from 'swr';
import { profileApi } from '@/apis/auth-api';
import { AppMenuItem } from '@/types';

interface AppMenuItemCustom extends AppMenuItem {
    permission?: string;
}

const AppMenu = () => {
    // const { layoutConfig } = useContext(LayoutContext);
    const { data, error } = useSWR(profileApi, fetcher);

    const model = [
        {
            label: 'Home',
            items: [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-fw pi-home',
                    to: '/'
                }
            ]
        },
        {
            label: 'Super Admin',
            is_superadmin: true,
            permission: 'SuperAdmin',
            items: [
                {
                    label: 'Nhóm quyền',
                    icon: 'pi pi-fw pi-lock',
                    items: [
                        { label: 'Danh sách quyền', icon: 'pi pi-fw pi-list', to: '/admin/role-groups' },
                        { label: 'Thêm mới quyền', icon: 'pi pi-fw pi-plus', to: '/admin/role-groups/create' }
                    ]
                },
                {
                    label: 'User quản trị',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        { label: 'Danh sách quản trị', icon: 'pi pi-fw pi-list', to: '/admin/user-admin' },
                        { label: 'Thêm mới quản trị', icon: 'pi pi-fw pi-plus', to: '/admin/user-admin/create' }
                    ]
                }
            ]
        },
        {
            label: 'Hệ thống',
            items: [
                {
                    label: 'Xe khách',
                    icon: 'pi pi-fw pi-car',
                    permission: 'CarManager',
                    items: [
                        { label: 'Danh sách xe', icon: 'pi pi-fw pi-list', to: '/admin/bus' },
                        { label: 'Thêm mới xe', icon: 'pi pi-fw pi-plus', to: '/admin/bus/create' }
                    ]
                },
                {
                    label: 'Trạm dừng',
                    icon: 'pi pi-fw pi-map-marker',
                    permission: 'StationManager',
                    items: [
                        { label: 'Danh sách trạm dừng', icon: 'pi pi-fw pi-list', to: '/admin/bus-stations' },
                        { label: 'Thêm mới trạm dừng', icon: 'pi pi-fw pi-plus', to: '/admin/bus-stations/create' }
                    ]
                },
                {
                    label: 'Tuyến đường',
                    icon: 'pi pi-fw pi-share-alt',
                    permission: 'RouteManager',
                    items: [
                        { label: 'Danh sách tuyến đường', icon: 'pi pi-fw pi-list', to: '/admin/bus-routes' },
                        { label: 'Thêm mới tuyến đường', icon: 'pi pi-fw pi-plus', to: '/admin/bus-routes/create' }
                    ]
                },
                {
                    label: 'Chuyến đi',
                    icon: 'pi pi-fw pi-map',
                    permission: 'TripManager',
                    to: '/admin/bus-route-trips'
                }
            ]
        },
        {
            label: 'Khách hàng',
            items: [
                {
                    label: 'Vé đặt chỗ',
                    icon: 'pi pi-fw pi-ticket',
                    permission: 'TicketManager',
                    items: [
                        { label: 'Vé đã đặt', icon: 'pi pi-fw pi-list', to: '/admin/tickets' }
                        // { label: 'Thêm mới vé xe', icon: 'pi pi-fw pi-plus', to: '' }
                    ]
                },
                {
                    label: 'Khách hàng',
                    icon: 'pi pi-fw pi-users',
                    permission: 'CustomerManager',
                    items: [
                        { label: 'Danh sách khách hàng', icon: 'pi pi-fw pi-list', to: '' },
                        { label: 'Thêm mới khách hàng', icon: 'pi pi-fw pi-plus', to: '' }
                    ]
                },
                {
                    label: 'Đánh giá phản hồi',
                    icon: 'pi pi-fw pi-comments',
                    permission: 'FeedbackManager',
                    items: [{ label: 'Danh sách phản hồi', icon: 'pi pi-fw pi-list', to: '' }]
                }
            ]
        }
        // {
        //     label: 'UI Components',
        //     is_superadmin: true,
        //     items: [
        //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
        //         { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
        //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
        //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
        //         { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
        //         { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
        //         { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
        //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
        //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
        //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
        //         { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
        //         { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
        //         { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
        //         { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
        //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
        //         { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        //     ]
        // },
        // {
        //     label: 'Prime Blocks',
        //     is_superadmin: true,
        //     items: [
        //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
        //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
        //     ]
        // },
        // {
        //     label: 'Utilities',
        //     is_superadmin: true,
        //     items: [
        //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
        //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://primeflex.org/', target: '_blank' }
        //     ]
        // },
        // {
        //     label: 'Pages',
        //     icon: 'pi pi-fw pi-briefcase',
        //     to: '/pages',
        //     is_superadmin: true,
        //     items: [
        //         {
        //             label: 'Landing',
        //             icon: 'pi pi-fw pi-globe',
        //             to: '/landing'
        //         },
        //         {
        //             label: 'Auth',
        //             icon: 'pi pi-fw pi-user',
        //             items: [
        //                 {
        //                     label: 'Login',
        //                     icon: 'pi pi-fw pi-sign-in',
        //                     to: '/auth/login'
        //                 },
        //                 {
        //                     label: 'Error',
        //                     icon: 'pi pi-fw pi-times-circle',
        //                     to: '/auth/error'
        //                 },
        //                 {
        //                     label: 'Access Denied',
        //                     icon: 'pi pi-fw pi-lock',
        //                     to: '/auth/access'
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Crud',
        //             icon: 'pi pi-fw pi-pencil',
        //             to: '/pages/crud'
        //         },
        //         {
        //             label: 'Timeline',
        //             icon: 'pi pi-fw pi-calendar',
        //             to: '/pages/timeline'
        //         },
        //         {
        //             label: 'Not Found',
        //             icon: 'pi pi-fw pi-exclamation-circle',
        //             to: '/pages/notfound'
        //         },
        //         {
        //             label: 'Empty',
        //             icon: 'pi pi-fw pi-circle-off',
        //             to: '/pages/empty'
        //         }
        //     ]
        // },
        // {
        //     label: 'Hierarchy',
        //     is_superadmin: true,
        //     items: [
        //         {
        //             label: 'Submenu 1',
        //             icon: 'pi pi-fw pi-bookmark',
        //             items: [
        //                 {
        //                     label: 'Submenu 1.1',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 1.2',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Submenu 2',
        //             icon: 'pi pi-fw pi-bookmark',
        //             items: [
        //                 {
        //                     label: 'Submenu 2.1',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 2.2',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     label: 'Get Started',
        //     is_superadmin: true,
        //     items: [
        //         {
        //             label: 'Documentation',
        //             icon: 'pi pi-fw pi-question',
        //             to: '/documentation'
        //         },
        //         {
        //             label: 'Figma',
        //             url: 'https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/sakai-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0',
        //             icon: 'pi pi-fw pi-pencil',
        //             target: '_blank'
        //         },
        //         {
        //             label: 'View Source',
        //             icon: 'pi pi-fw pi-search',
        //             url: 'https://github.com/primefaces/sakai-react',
        //             target: '_blank'
        //         }
        //     ]
        // }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {data &&
                    model.map((item, i) => {
                        // @ts-ignore
                        return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                    })}
            </ul>
            {!data && (
                <div className="h-full">
                    <div style={{ height: '48%' }}></div>
                    <div className="flex justify-content-center">
                        <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
                    </div>
                </div>
            )}
        </MenuProvider>
    );
};

export default AppMenu;
