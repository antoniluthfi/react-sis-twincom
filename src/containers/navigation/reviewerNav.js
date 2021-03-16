import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons'

const reviewerNav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard-review',
    icon: <FontAwesomeIcon icon={faTachometerAlt} className="mr-4 ml-2" />,
  },  
];

export default reviewerNav;