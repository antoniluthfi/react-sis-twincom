import React, { useState, useEffect } from 'react'
import {
    CWidgetDropdown,
    CRow,
    CCol,
} from '@coreui/react'
import ChartLineSimple from '../../../charts/ChartLineSimple'
import WidgetsHelper from './WidgetsHelper';

const WidgetsRating = () => {
    const {
        loadData, 
        currentUser,
        ratingCabang,
        ourRating,
        getCurrentUser,
    } = WidgetsHelper();

    useEffect(() => {
        let mounted = true;
        getCurrentUser();

        return function cleanup() {
            mounted = false;
        }
    }, []);

    // render
    return (
        <div>
            <h4>Rating Pelayanan Cabang {currentUser.cab_penempatan}</h4>
            <CRow>
                <CCol sm="6" lg="6">
                    <CWidgetDropdown
                        color="gradient-primary"
                        header={loadData ? 0 : ourRating === 0 ? "Belum ada penilaian" : `Rata-rata ${ourRating} Bintang`} 
                        text={`Rating Pelayanan anda ${currentUser.name}`} 
                        footerSlot={
                            <ChartLineSimple
                                pointed
                                className="c-chart-wrapper mt-3 mx-3"
                                style={{height: '70px'}}
                                // dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                                pointHoverBackgroundColor="primary"
                                label="Members"
                                labels="months"
                            />
                        }
                    >
                    </CWidgetDropdown>
                </CCol>

                <CCol sm="6" lg="6">
                    <CWidgetDropdown
                        color="gradient-info"
                        header={loadData ? 0 : ratingCabang === 0 ? "Belum ada penilaian" : `Rata-rata ${ratingCabang} Bintang`} 
                        text={`Rating Pelayanan cabang ${currentUser.cab_penempatan}`} 
                        footerSlot={
                            <ChartLineSimple
                                pointed
                                className="c-chart-wrapper mt-3 mx-3"
                                style={{height: '70px'}}
                                // dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                                pointHoverBackgroundColor="primary"
                                label="Members"
                                labels="months"
                            />
                        }
                    >
                    </CWidgetDropdown>
                </CCol>
            </CRow>
        </div>
    )
}

export default WidgetsRating
