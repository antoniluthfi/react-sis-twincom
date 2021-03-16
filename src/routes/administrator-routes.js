import React from 'react';

const DashboardAdministrator = React.lazy(() => import('../views/administrator/dashboard/DashboardAdministrator'));
const DataBarang = React.lazy(() => import('../views/administrator/data-barang/DataBarang'));
const DataMerek = React.lazy(() => import('../views/administrator/data-barang/DataMerek'));
const DataTipe = React.lazy(() => import('../views/administrator/data-barang/DataTipe'));
const DataKondisi = React.lazy(() => import('../views/administrator/data-barang/DataKondisi'));
const DataAdministrator = React.lazy(() => import('../views/administrator/karyawan/DataAdministrator'));
const DataAdminService = React.lazy(() => import('../views/administrator/karyawan/DataAdminService'));
const DataSales = React.lazy(() => import('../views/administrator/karyawan/DataSales'));
const DataTeknisi = React.lazy(() => import('../views/administrator/karyawan/DataTeknisi'));
const DataPelanggan = React.lazy(() => import('../views/administrator/pelanggan/DataPelanggan'));
const DataPartner = React.lazy(() => import('../views/administrator/partner/DataPartner'));
const DataStiker = React.lazy(() => import('../views/administrator/stiker/DataStiker'));
const DataCabang = React.lazy(() => import('../views/administrator/cabang/DataCabang'));
const DataProblem = React.lazy(() => import('../views/administrator/lain-lain/DataProblem'));
const DataRekening = React.lazy(() => import('../views/administrator/lain-lain/DataRekening'));
const DataKelengkapan = React.lazy(() => import('../views/administrator/lain-lain/DataKelengkapan'));
const SandiTransaksi = React.lazy(() => import('../views/administrator/lain-lain/SandiTransaksi'));
const PenerimaanBarang = React.lazy(() => import('../views/administrator/transaksi/PenerimaanBarang'));
const PengembalianBarang = React.lazy(() => import('../views/administrator/transaksi/PengembalianBarang'));
const ArusKas = React.lazy(() => import('../views/administrator/transaksi/ArusKas'));
const Pembayaran = React.lazy(() => import('../views/administrator/pembayaran/Pembayaran'));
const PengirimanBarang = React.lazy(() => import('../views/administrator/pengiriman/PengirimanBarang'));
const PenerimaanBarangPartner = React.lazy(() => import('../views/administrator/pengiriman/PenerimaanBarangPartner'));
const TagihanPartner = React.lazy(() => import('../views/administrator/pengiriman/TagihanPartner'));
const Pengerjaan = React.lazy(() => import('../views/administrator/pengerjaan/Pengerjaan'));
const PembelianBarangSecond = React.lazy(() => import('../views/administrator/pengajuan/PembelianBarangSecond')); // pengajuan
const PembelianBarangSecond2 = React.lazy(() => import('../views/administrator/pengerjaan/PembelianBarangSecond')); // pengerjaan
const LogAktivitas = React.lazy(() => import('../views/administrator/log-aktivitas/LogAktivitas'));

const administratorRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard-administrator', name: 'Dashboard', component: DashboardAdministrator },
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
  { path: '/master-data/data-pelanggan', name: 'Data Pelanggan', component: DataPelanggan },
  { path: '/master-data/data-partner', name: 'Data Partner', component: DataPartner },
  { path: '/master-data/data-stiker', name: 'Data Stiker', component: DataStiker },
  { path: '/master-data/data-cabang', name: 'Data Cabang', component: DataCabang },
  { path: '/master-data/lain-lain', name: 'Lain-lain', exact: true },
  { path: '/master-data/lain-lain/data-problem', name: 'Data Problem', component: DataProblem },
  { path: '/master-data/lain-lain/data-rekening', name: 'Data Rekening', component: DataRekening },
  { path: '/master-data/lain-lain/data-kelengkapan', name: 'Data Kelengkapan', component: DataKelengkapan },
  { path: '/master-data/lain-lain/sandi-transaksi', name: 'Data Sandi Transaksi', component: SandiTransaksi },
  { path: '/transaksi', name: 'Transaksi', exact: true },
  { path: '/transaksi/penerimaan-barang', name: 'Penerimaan Barang', component: PenerimaanBarang },
  { path: '/transaksi/pengembalian-barang', name: 'Pengembalian Barang', component: PengembalianBarang },
  { path: '/transaksi/arus-kas', name: 'Arus Kas', component: ArusKas },
  { path: '/pembayaran', name: 'Pembayaran', component: Pembayaran },
  { path: '/pengiriman', name: 'Pengiriman', exact: true },
  { path: '/pengiriman/pengiriman-barang', name: 'Pengiriman Barang', component: PengirimanBarang },
  { path: '/pengiriman/penerimaan-barang-partner', name: 'Penerimaan Barang Partner', component: PenerimaanBarangPartner },
  { path: '/pengiriman/tagihan-partner', name: 'Tagihan Partner', component: TagihanPartner },
  { path: '/pengerjaan', name: 'Pengerjaan', exact: true },
  { path: '/pengerjaan/barang-jasa', name: 'Barang & Jasa', component: Pengerjaan },
  { path: '/pengerjaan/pembelian-barang-second', name: 'Pembelian Barang Second', component: PembelianBarangSecond2 },
  { path: '/pengajuan', name: 'Pengajuan', exact: true },
  { path: '/pengajuan/pembelian-barang-second', name: 'Pembelian Barang Second', component: PembelianBarangSecond },
  { path: '/log-aktifitas', name: 'Log Aktifitas', component: LogAktivitas },
];

export default administratorRoutes;