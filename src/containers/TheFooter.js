import React from 'react'
import { CFooter, CLink } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <CLink to="/" rel="noopener noreferrer">Twincom Service Center</CLink>
        <span className="ml-1">&copy; 2021.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Sistem Informasi Service</span>
        <CLink to="/" rel="noopener noreferrer">Twincom</CLink>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
