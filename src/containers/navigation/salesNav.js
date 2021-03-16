import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTachometerAlt,
  faLongArrowAltRight,
  faBook,
  faRunning
} from '@fortawesome/free-solid-svg-icons'

const salesNav = [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard-sales',
        icon: <FontAwesomeIcon icon={faTachometerAlt} className="mr-4 ml-2" />,
        badge: {
            color: 'info',
            text: 'NEW',
        }
    },  
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Transaksi',
        to: '/transaksi',
        icon: <FontAwesomeIcon icon={faBook} className="mr-4 ml-2" />,
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Penerimaan Barang',
                icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2" />,
                to: '/transaksi/penerimaan-barang',
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

export default salesNav;