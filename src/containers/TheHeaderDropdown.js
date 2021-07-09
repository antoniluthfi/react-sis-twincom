import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
import AuthHelper from '../views/authentication/modules/AuthHelper'

const TheHeaderDropdown = () => {
  const { logout } = AuthHelper();

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src="https://drive.google.com/thumbnail?id=1_7XnKmMvFWy4lh9TuoQYwgKUhVclYddz"
            className="c-avatar-img"
            alt="user"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
