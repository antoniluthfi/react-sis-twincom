import { lazy } from 'react';

const Dashboard = lazy(() => import('../views/admin-service/dashboard/DashboardAdminService'));
const PenerimaanBarang = lazy(() => import('../views/admin-service/transaksi/penerimaan-barang/PenerimaanBarang'));
const LogAktivitas = lazy(() => import('../views/admin-service/log-aktivitas/LogAktivitas'));

const salesRoutes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/transaksi', name: 'Transaksi', exact: true },
    { path: '/transaksi/penerimaan-barang', name: 'Penerimaan Barang', component: PenerimaanBarang },
    { path: '/log-aktifitas', name: 'Log Aktifitas', component: LogAktivitas }
];

export default salesRoutes;