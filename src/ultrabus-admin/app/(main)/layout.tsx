'use client';
import { Metadata } from 'next';
import Layout from '../../layout/layout';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/functions';
import useSWR from 'swr';
import { profileApi } from '@/apis/auth-api';
import { useEffect } from 'react';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'UltraBus Admin',
    description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'PrimeReact SAKAI-REACT',
        url: 'https://sakai.primereact.org/',
        description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
        images: ['https://www.primefaces.org/static/social/sakai-react.png'],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    const router = useRouter();
    const { data, error } = useSWR(profileApi, fetcher);

    useEffect(() => {
        if (error) {
            router.push('/auth/login');
        }
    }, [data, error]);

    // if (!data) {
    //     return <Layout>Loading...</Layout>;
    // }

    // console.log('Profile data', data);

    return <Layout>{children}</Layout>;
}
