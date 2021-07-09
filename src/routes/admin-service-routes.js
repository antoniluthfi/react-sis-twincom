import React from 'react';

const DashboardAdminService = React.lazy(() => import('../views/admin-service/dashboard/DashboardAdminService'));
const DataBarang = React.lazy(() => import('../views/administrator/data-barang/barang-jasa/DataBarangJasa'));
const DataMerek = React.lazy(() => import('../views/administrator/data-barang/data-merek/DataMerek'));
const DataTipe = React.lazy(() => import('../views/administrator/data-barang/data-tipe/DataTipe'));
const DataKondisi = React.lazy(() => import('../views/administrator/data-barang/data-kondisi/DataKondisi'));
const DataProblem = React.lazy(() => import('../views/administrator/data-barang/data-problem/DataProblem'));
const DataKelengkapan = React.lazy(() => import('../views/administrator/data-barang/data-kelengkapan/DataKelengkapan'));
const DataRma = React.lazy(() => import('../views/administrator/data-barang/data-rma/DataRma'));
const DataAdministrator = React.lazy(() => import('../views/administrator/karyawan/data-administrator/DataAdministrator'));
const DataAdminService = React.lazy(() => import('../views/administrator/karyawan/data-admin-service/DataAdminService'));
const DataSales = React.lazy(() => import('../views/administrator/karyawan/data-sales/DataSales'));
const DataTeknisi = React.lazy(() => import('../views/administrator/karyawan/data-teknisi/DataTeknisi'));
const DataPelanggan = React.lazy(() => import('../views/administrator/pelanggan/data-pelanggan/DataPelanggan'));
const DataMember = React.lazy(() => import('../views/administrator/pelanggan/data-member/DataMember'));
const DataPartner = React.lazy(() => import('../views/administrator/partner/DataPartner'));
const DataStiker = React.lazy(() => import('../views/administrator/stiker/DataStiker'));
const DataCabang = React.lazy(() => import('../views/administrator/cabang/DataCabang'));
const DataRekening = React.lazy(() => import('../views/administrator/lain-lain/data-rekening/DataRekening'));
const SandiTransaksi = React.lazy(() => import('../views/administrator/lain-lain/sandi-transaksi/SandiTransaksi'));
const PenerimaanBarang = React.lazy(() => import('../views/admin-service/transaksi/penerimaan-barang/PenerimaanBarang'));
const PengembalianBarang = React.lazy(() => import('../views/admin-service/transaksi/pengembalian-barang/PengembalianBarang'));
const ArusKas = React.lazy(() => import('../views/admin-service/transaksi/arus-kas/ArusKas'));
const Pembayaran = React.lazy(() => import('../views/admin-service/pembayaran/Pembayaran'));
const PengirimanBarang = React.lazy(() => import('../views/admin-service/pengiriman/pengiriman-barang/PengirimanBarang'));
const PenerimaanBarangPartner = React.lazy(() => import('../views/admin-service/pengiriman/penerimaan-barang/PenerimaanBarangPartner'));
const TagihanPartner = React.lazy(() => import('../views/admin-service/pengiriman/tagihan-partner/TagihanPartner'));
const LogAktivitas = React.lazy(() => import('../views/admin-service/log-aktivitas/LogAktivitas'));

const adminRoutes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: DashboardAdminService },
    
    { path: '/master-data', name: 'Master Data', exact: true },
    { path: '/master-data/barang', name: 'Barang', exact: true },
    { path: '/master-data/barang/data-barang', name: 'Data Barang & Jasa', component: DataBarang },
    { path: '/master-data/barang/data-merek', name: 'Data Merek', component: DataMerek },
    { path: '/master-data/barang/data-tipe', name: 'Data Tipe', component: DataTipe },
    { path: '/master-data/barang/data-kondisi', name: 'Data Kondisi', component: DataKondisi },

    { path: '/master-data/karyawan', name: 'Karyawan', exact: true },
    { path: '/master-data/karyawan/data-administrator', name: 'Data Administrator', component: DataAdministrator },
    { path: '/master-data/karyawan/data-admin-service', name: 'Data Admin Service', component: DataAdminService },
    { path: '/master-data/karyawan/data-sales', name: 'Data Sales', component: DataSales },
    { path: '/master-data/karyawan/data-teknisi', name: 'Data Teknisi', component: DataTeknisi },
    
    { path: '/master-data/pelanggan', name: 'Pelanggan', exact: true},
    { path: '/master-data/pelanggan/data-pelanggan', name: 'Data Pelanggan', component: DataPelanggan },
    { path: '/master-data/pelanggan/data-member', name: 'Data Member', component: DataMember },

    { path: '/master-data/data-partner', name: 'Data Partner', component: DataPartner },
    { path: '/master-data/data-stiker', name: 'Data Stiker', component: DataStiker },
    { path: '/master-data/data-cabang', name: 'Data Cabang', component: DataCabang },

    { path: '/master-data/lain-lain', name: 'Lain-lain', exact: true },
    { path: '/master-data/lain-lain/data-problem', name: 'Data Problem', component: DataProblem },
    { path: '/master-data/lain-lain/data-rekening', name: 'Data Rekening', component: DataRekening },
    { path: '/master-data/lain-lain/data-kelengkapan', name: 'Data Kelengkapan', component: DataKelengkapan },
    { path: '/master-data/lain-lain/sandi-transaksi', name: 'Data Sandi Transaksi', component: SandiTransaksi },
    { path: '/master-data/lain-lain/rma', name: 'Data RMA', component: DataRma },

    { path: '/transaksi', name: 'Transaksi', exact: true },
    { path: '/transaksi/penerimaan-barang', name: 'Penerimaan Barang', component: PenerimaanBarang },
    { path: '/transaksi/pengembalian-barang', name: 'Pengembalian Barang', component: PengembalianBarang },
    { path: '/transaksi/arus-kas', name: 'Arus Kas', component: ArusKas },

    { path: '/pembayaran', name: 'Pembayaran', component: Pembayaran },

    { path: '/pengiriman', name: 'Pengiriman', exact: true },
    { path: '/pengiriman/pengiriman-barang', name: 'Pengiriman Barang', component: PengirimanBarang },
    { path: '/pengiriman/penerimaan-barang-partner', name: 'Penerimaan Barang Partner', component: PenerimaanBarangPartner },
    { path: '/pengiriman/tagihan-partner', name: 'Tagihan Partner', component: TagihanPartner },

    { path: '/log-aktifitas', name: 'Log Aktifitas', component: LogAktivitas },
];
  
  export default adminRoutes;