'use client'

import React from 'react';
import { usePathname } from "next/navigation";
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

function ClientLayout({ children,}: {children: React.ReactNode;}) {
    const pathname = usePathname();
    const Layout = pathname?.startsWith("/dashboard") ? DashboardLayout : PublicLayout;

    return <Layout>{children}</Layout>
}

export default ClientLayout;