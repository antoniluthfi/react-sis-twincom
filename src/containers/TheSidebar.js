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

// sidebar nav config
import AdministratorNavigation from './navigation/administratorNav'
import AdminNavigation from './navigation/adminNav'
import TeknisiNavigation from './navigation/teknisiNav'
import SalesNavigation from './navigation/salesNav'
import CustomerNavigation from './navigation/customerNav';
import ReviewerNavigation from './navigation/reviewerNav';

const TheSidebar = () => {
    const [navigation, setNavigation] = useState([]);
    const [minimized, setMinimized] = useState(true);
    const dispatch = useDispatch();
    const show = useSelector(state => state.sidebarShow.sidebarShow);
    const user = useSelector(state => state.currentUser);
    const { jabatan } = user;

    const getRoute = () => {
        if(jabatan === 'administrator') setNavigation(AdministratorNavigation);
        else if(jabatan === 'admin service') setNavigation(AdminNavigation);
        else if(jabatan === 'teknisi') setNavigation(TeknisiNavigation);
        else if(jabatan === 'sales') setNavigation(SalesNavigation);
        else if(jabatan === 'reviewer') setNavigation(ReviewerNavigation);
        else setNavigation(CustomerNavigation);
    }

    useEffect(() => {
        getRoute();
    }, []);

    return (
        <CSidebar
            show={show}
            onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
            onMinimizeChange={(val) => setMinimized(val)}
        >
            <CSidebarBrand className="d-md-down-none p-0" to="/">
                <img src="https://drive.google.com/thumbnail?id=12ubasd0uZrQ3LFlQ3Hw1mG4Q8ORLZ3Ao" alt="logo" height="35" width="35" />
                {minimized ? <CLabel className="ml-2 mt-2" style={{ fontSize: 18 }}>Sistem Informasi Service</CLabel> : null}
            </CSidebarBrand>
            
            <CSidebarNav>
                <CCreateElement
                    items={navigation}
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
