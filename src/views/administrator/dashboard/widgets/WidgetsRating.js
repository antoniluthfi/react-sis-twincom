import React, { useState, useEffect } from 'react'
import {
    CWidgetDropdown,
    CRow,
    CCol,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../../../charts/ChartLineSimple'
import axios from 'axios';

const WidgetsRating = () => {
    const [loadData, setLoadData] = useState(true);
    const [ratingBanjarbaru, setRatingBanjarbaru] = useState(0);
    const [ratingLandasanUlin, setRatingLandasanUlin] = useState(0);
    const [ratingBanjarmasin, setRatingBanjarmasin] = useState(0);

    const getDataRatingByCabang = async () => {
        await axios.get(`${process.env.REACT_APP_LARAVEL_URL}/review-kepuasan-pelanggan/cabang/all`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }      
        })
        .then(response => {
            response.data.data.map(itemRating => {
                if(itemRating.cabang == 'Banjarbaru') {
                    setRatingBanjarbaru(itemRating.average);
                } else if(itemRating.cabang == 'Landasan Ulin') {
                    setRatingLandasanUlin(itemRating.average);
                } else if(itemRating.cabang == 'Banjarmasin') {
                    setRatingBanjarmasin(itemRating.average);
                }
            });
        })
        .catch(error => {
            console.log(error);
        });

        setLoadData(false);
    }

    useEffect(() => {
        getDataRatingByCabang();
    }, []); 

    // render
    return (
        <div>
            <h4>Rating Pelayanan</h4>
            <CRow>
                <CCol sm="6" lg="4">
                    <CWidgetDropdown
                        color="gradient-primary"
                        header={loadData ? "Belum ada penilaian" : ratingBanjarbaru == 0 || ratingBanjarbaru == null ? "Belum ada penilaian" : `Rata-rata ${ratingBanjarbaru.slice(0, 3)} Bintang`}
                        text="Rating Pelayanan Cabang Banjarbaru"
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
                        <CDropdown>
                            <CDropdownToggle color="transparent">
                                <CIcon name="cil-settings"/>
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="bottom-end">
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </CWidgetDropdown>
                </CCol>

                <CCol sm="6" lg="4">
                    <CWidgetDropdown
                        color="gradient-info"
                        header={loadData ? "Belum ada penilaian" : ratingLandasanUlin == 0 || ratingLandasanUlin == null ? "Belum ada penilaian" : `Rata-rata ${ratingLandasanUlin.slice(0, 3)} Bintang`}
                        text="Rating Pelayanan Cabang Landasan Ulin"
                        footerSlot={
                            <ChartLineSimple
                                pointed
                                className="mt-3 mx-3"
                                style={{height: '70px'}}
                                // dataPoints={[1, 18, 9, 17, 34, 22, 11]}
                                pointHoverBackgroundColor="info"
                                options={{ elements: { line: { tension: 0.00001 }}}}
                                label="Members"
                                labels="months"
                            />
                        }
                    >
                        <CDropdown>
                            <CDropdownToggle color="transparent">
                                <CIcon name="cil-settings"/>
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="bottom-end">
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </CWidgetDropdown>
                </CCol>

                <CCol sm="6" lg="4">
                    <CWidgetDropdown
                        color="gradient-warning"
                        header={loadData ? "Belum ada penilaian" : ratingBanjarmasin == 0 || ratingBanjarmasin == null ? "Belum ada penilaian" : `Rata-rata ${ratingBanjarmasin.slice(0, 3)} Bintang`}
                        text="Rating Pelayanan Cabang Banjarmasin"
                        footerSlot={
                            <ChartLineSimple
                                pointed
                                className="mt-3"
                                style={{height: '70px'}}
                                // dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                                pointHoverBackgroundColor="warning"
                                options={{ elements: { line: { tension: 0.00001 }}}}
                                label="Members"
                                labels="months"
                            />
                        }
                    >
                        <CDropdown>
                            <CDropdownToggle color="transparent">
                                <CIcon name="cil-settings"/>
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="bottom-end">
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </CWidgetDropdown>
                </CCol>
            </CRow>
        </div>
    )
}

export default WidgetsRating
