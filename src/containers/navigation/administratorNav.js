import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faFolder, 
    faTachometerAlt,
    faAddressCard,
    faPeopleArrows,
    faFileAlt,
    faSmile,
    faLongArrowAltRight,
    faCodeBranch,
    faStickyNote,
    faDotCircle,
    faBook,
    faMoneyCheck,
    faShippingFast,
    faWrench,
    faClipboardList,
    faRunning
} from '@fortawesome/free-solid-svg-icons'

const administratorNav =  [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard-administrator',
        icon: <FontAwesomeIcon icon={faTachometerAlt} className="mr-4 ml-2" />,
        badge: {
        color: 'info',
        text: 'NEW',
        }
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Master Data',
        route: '/master-data',
        icon: <FontAwesomeIcon icon={faFolder} className="mr-4 ml-2" />,
        _children: [
            {
                _tag: 'CSidebarNavDropdown',
                name: 'Barang & Data',
                icon: <FontAwesomeIcon icon={faFileAlt} className="mr-2" />,
                route: '/master-data/barang',
                _children: [
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Barang Jasa',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/barang/data-barang',
                    },    
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Merek',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/barang/data-merek',
                    },    
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Tipe',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/barang/data-tipe',
                    },    
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Kondisi',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/barang/data-kondisi',
                    },    
                ]
            },
            {
                _tag: 'CSidebarNavDropdown',
                name: 'Karyawan',
                icon: <FontAwesomeIcon icon={faAddressCard} className="mr-2" />,
                route: '/master-data/karyawan',
                _children: [
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Administrator',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/karyawan/data-administrator',
                    },    
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Admin Service',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/karyawan/data-admin-service',
                    },    
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Sales',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/karyawan/data-sales',
                    },    
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Teknisi',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/karyawan/data-teknisi',
                    },    
                ]
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Pelanggan',
                icon: <FontAwesomeIcon icon={faSmile} className="mr-2" />,
                to: '/master-data/data-pelanggan',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Partner',
                icon: <FontAwesomeIcon icon={faPeopleArrows} className="mr-2" />,
                to: '/master-data/data-partner',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Stiker',
                icon: <FontAwesomeIcon icon={faStickyNote} className="mr-2" />,
                to: '/master-data/data-stiker',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Cabang',
                icon: <FontAwesomeIcon icon={faCodeBranch} className="mr-2" />,
                to: '/master-data/data-cabang',
            },
            {
                _tag: 'CSidebarNavDropdown',
                name: 'Lain-lain',
                icon: <FontAwesomeIcon icon={faDotCircle} className="mr-2" />,
                to: '/master-data/lain-lain/',
                _children: [
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Data Problem',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/lain-lain/data-problem',
                    },
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Data Rekening',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/lain-lain/data-rekening',
                    },
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Data Kelengkapan',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/lain-lain/data-kelengkapan',
                    },
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Sandi Transaksi',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/lain-lain/sandi-transaksi',
                    },
                ]
            }
        ],
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Transaksi',
        to: '/transaksi',
        icon: <FontAwesomeIcon icon={faBook} className="mr-4 ml-2" />,
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Penerimaan',
                icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2" />,
                to: '/transaksi/penerimaan-barang',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Pengembalian',
                icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2" />,
                to: '/transaksi/pengembalian-barang',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Arus Kas',
                icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2" />,
                to: '/transaksi/arus-kas',
            },
        ]
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Pembayaran',
        to: '/pembayaran',
        icon: <FontAwesomeIcon icon={faMoneyCheck} className="mr-4 ml-2" />,
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Pengiriman',
        to: '/pengiriman',
        icon: <FontAwesomeIcon icon={faShippingFast} className="mr-4 ml-2" />,
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Pengiriman Barang',
                icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2" />,
                to: '/pengiriman/pengiriman-barang',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Penerimaan Barang',
                icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2" />,
                to: '/pengiriman/penerimaan-barang-partner',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Tagihan Partner',
                icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2" />,
                to: '/pengiriman/tagihan-partner',
            },
        ]
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Pengerjaan',
        to: '/pengerjaan',
        icon: <FontAwesomeIcon icon={faWrench} className="mr-4 ml-2" />,
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Barang Jasa',
                icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2" />,
                to: '/pengerjaan/barang-jasa',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Pembelian Barang Second',
                icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2" />,
                to: '/pengerjaan/pembelian-barang-second',
            },
        ]
    },      
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Pengajuan',
        to: '/pengajuan',
        icon: <FontAwesomeIcon icon={faClipboardList} className="mr-4 ml-2" />,
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Pembelian Barang Second',
                icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2" />,
                to: '/pengajuan/pembelian-barang-second',
            },
        ]
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Log Aktifitas',
        to: '/log-aktifitas',
        icon: <FontAwesomeIcon icon={faRunning} className="mr-4 ml-2" />,
    },
]

export default administratorNav