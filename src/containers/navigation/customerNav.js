import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons'

const customerNav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard-customer',
    icon: <FontAwesomeIcon icon={faTachometerAlt} className="mr-4 ml-2" />,
  },  
];

export default customerNav;