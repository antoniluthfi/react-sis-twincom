import React, { lazy } from 'react'

const WidgetsLaporan = lazy(() => import('./widgets/WidgetsLaporan'));
const WidgetsRating = lazy(() => import('./widgets/WidgetsRating'));

const DashboardAdminService = () => {
    return (
        <div>
            <WidgetsRating />
            <WidgetsLaporan />
        </div>
    )
}

export default DashboardAdminService;
