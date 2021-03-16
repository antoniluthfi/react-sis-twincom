import { lazy } from 'react';

const Dashboard = lazy(() => import('../views/customer/dashboard/DashboardCustomer'));

const customerRoutes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard-customer', name: 'Dashboard', component: Dashboard },
];

export default customerRoutes;