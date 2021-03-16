import React from 'react'
// import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTachometerAlt,
    faLongArrowAltRight,
    faRunning,
    faWrench,
    faShippingFast,
} from '@fortawesome/free-solid-svg-icons'

const teknisiNav = [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard-teknisi',
        icon: <FontAwesomeIcon icon={faTachometerAlt} className="mr-4 ml-2" />,
        badge: {
            color: 'info',
            text: 'NEW',
        }
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
        ]
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Log Aktifitas',
        to: '/log-aktifitas',
        icon: <FontAwesomeIcon icon={faRunning} className="mr-4 ml-2" />,
    },         
];

export default teknisiNav;