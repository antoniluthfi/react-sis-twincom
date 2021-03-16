import React, { lazy } from 'react'

const WidgetsLaporan = lazy(() => import('./widgets/WidgetsLaporan'));
const WidgetsRating = lazy(() => import('./widgets/WidgetsRating'));

const DashboardAdminService = () => {
    return (
        <>
            <WidgetsRating />
            <WidgetsLaporan />
        </>
    )
}

export default DashboardAdminService;
