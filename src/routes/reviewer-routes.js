import { lazy } from 'react';

const Dashboard = lazy(() => import('../views/reviewer/dashboard/DashboardReviewer'));

const customerRoutes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard-review', name: 'Dashboard', component: Dashboard },
];

export default customerRoutes;