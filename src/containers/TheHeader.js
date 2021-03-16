import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CLabel
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

// routes config
import routes from '../routes/administrator-routes'

import { 
  TheHeaderDropdown,
}  from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)
  const [currentUser, setCurrentUser] = useState({});

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const getCurrentUser = async () => {
    await axios.get(`${process.env.REACT_APP_LARAVEL_URL}/user/my/profile`, {
      headers: {
        'Accept': 'Application/json',
        'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
      }
    })
    .then(response => {
      setCurrentUser(response.data.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    getCurrentUser();
  }, []); 

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <img src="https://drive.google.com/thumbnail?id=12ubasd0uZrQ3LFlQ3Hw1mG4Q8ORLZ3Ao" alt="logo" height="35" width="35" />
        <CLabel className="ml-2 mt-2" style={{ fontSize: 18 }}>Sistem Informasi Service</CLabel>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <span>{localStorage.getItem('sis-role') == 'customer' ? 'Customer' : currentUser == null ? null : `${currentUser.name} as ${currentUser.jabatan}`}</span>
        <TheHeaderDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link"href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink>
          <CLink 
            className="c-subheader-nav-link" 
            aria-current="page" 
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
          </CLink>
        </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
