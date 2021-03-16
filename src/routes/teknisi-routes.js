import { lazy } from 'react';

const DashboardTeknisi = lazy(() => import('../views/teknisi/dashboard/DashboardTeknisi'));
const Pengerjaan = lazy(() => import('../views/teknisi/pengerjaan/Pengerjaan'));
const PembelianBarangSecond = lazy(() => import('../views/teknisi/pengerjaan/PembelianBarangSecond'));
const LogAktivitas = lazy(() => import('../views/admin-service/log-aktivitas/LogAktivitas'));
const PengirimanBarang = lazy(() => import('../views/teknisi/pengiriman/PengirimanBarang'));
const PenerimaanBarangPartner = lazy(() => import('../views/teknisi/pengiriman/PenerimaanBarangPartner'));

const teknisiRoutes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard-teknisi', name: 'Dashboard', component: DashboardTeknisi },
    { path: '/pengerjaan', name: 'Pengerjaan', exact: true },
    { path: '/pengerjaan/barang-jasa', name: 'Barang Jasa', component: Pengerjaan },
    { path: '/pengerjaan/pembelian-barang-second', name: 'Pembelian Barang Second', component: PembelianBarangSecond },
    { path: '/pengiriman', name: 'Pengiriman', exact: true },
    { path: '/pengiriman/pengiriman-barang', name: 'Pengiriman Barang', component: PengirimanBarang },
    { path: '/pengiriman/penerimaan-barang-partner', name: 'Penerimaan Barang Partner', component: PenerimaanBarangPartner },
    { path: '/log-aktifitas', name: 'Log Aktifitas', component: LogAktivitas },
];

export default teknisiRoutes;