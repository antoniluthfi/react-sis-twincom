import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CCreateElement,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    CSidebarMinimizer,
    CSidebarNavDropdown,
    CSidebarNavItem,
    CLabel
} from '@coreui/react'
import axios from 'axios'

// sidebar nav config
import AdministratorNavigation from './navigation/administratorNav'
import AdminNavigation from './navigation/adminNav'
import TeknisiNavigation from './navigation/teknisiNav'
import SalesNavigation from './navigation/salesNav'
import CustomerNavigation from './navigation/customerNav';
import ReviewerNavigation from './navigation/reviewerNav';

const TheSidebar = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const [isLoggedAs, setIsLoggedAs] = useState('');
    const dispatch = useDispatch();
    const show = useSelector(state => state.sidebarShow);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        if(localStorage.getItem('sis-role') === 'user') {
        var url = `${baseUrl}/user/my/profile`;
        } else if(localStorage.getItem('sis-role') === 'customer') {
        var url = `${baseUrl}/customer/my/profile`;
        }

        await axios.get(url, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setIsLoggedAs(response.data.data.jabatan ? response.data.data.jabatan : 'customer');
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <CSidebar
            show={show}
            onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
        >
            <CSidebarBrand className="d-md-down-none" to="/" className="p-0">
                <img src="https://drive.google.com/thumbnail?id=12ubasd0uZrQ3LFlQ3Hw1mG4Q8ORLZ3Ao" alt="logo" height="35" width="35" />
                <CLabel className="ml-2 mt-2" style={{ fontSize: 18 }}>Sistem Informasi Service</CLabel>
            </CSidebarBrand>
            
            <CSidebarNav>
                <CCreateElement
                    items={isLoggedAs == 'administrator' ? AdministratorNavigation : isLoggedAs == 'teknisi' ? TeknisiNavigation : isLoggedAs == 'admin service' ? AdminNavigation : isLoggedAs == 'sales' ? SalesNavigation : isLoggedAs == 'customer' ? CustomerNavigation : isLoggedAs == 'reviewer' ? ReviewerNavigation : []}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle
                    }}
                />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none"/>
        </CSidebar>
    )
}

export default React.memo(TheSidebar)
