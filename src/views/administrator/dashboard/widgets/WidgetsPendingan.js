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
// import ChartBarSimple from '../charts/ChartBarSimple'

const WidgetsPendingan = () => {
    const [loadData, setLoadData] = useState(true);
    const [pendinganBanjarbaru, setPendinganBanjarbaru] = useState(0);
    const [pendinganLandasanUlin, setPendinganLandasanUlin] = useState(0);
    const [pendinganBanjarmasin, setPendinganBanjarmasin] = useState(0);

    const getPendinganTeknisi = async () => {
        await axios.get(`${process.env.REACT_APP_LARAVEL_URL}/pengerjaan`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            let count = 0;
            response.data.data.map(item => {
                if(item.penerimaan.cabang.nama_cabang === 'Banjarbaru') {
                    if(item.status_pengerjaan === 0 || item.status_pengerjaan === 2) {
                        setPendinganBanjarbaru(count + 1);
                    }
                } else if(item.penerimaan.cabang.nama_cabang === 'Landasan Ulin') {
                    if(item.status_pengerjaan === 0 || item.status_pengerjaan === 2) {
                        setPendinganLandasanUlin(count + 1);
                    }
                } else if(item.penerimaan.cabang.nama_cabang === 'Banjarmasin') {
                    if(item.status_pengerjaan === 0 || item.status_pengerjaan === 2) {
                        setPendinganBanjarmasin(count + 1);
                    }
                }
            });
        })
        .catch(error => {
            console.log(error);
        });

        setLoadData(false);
    }

    useEffect(() => {
        getPendinganTeknisi();
    }, []); 

    // render
    return (
        <div>
            <h4>Pendingan Teknisi</h4>
            <CRow>
                <CCol sm="6" lg="4">
                    <CWidgetDropdown
                        color="gradient-primary"
                        header={loadData ? "Tidak Ada" : pendinganBanjarbaru === 0 ? "Tidak Ada" : pendinganBanjarbaru}
                        text="Pendingan Teknisi Cabang Banjarbaru"
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
                        header={loadData ? "Tidak Ada" : pendinganLandasanUlin === 0 ? "Tidak Ada" : pendinganLandasanUlin}
                        text="Pendingan Teknisi Cabang Landasan Ulin"
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
                        header={loadData ? "Tidak Ada" : pendinganBanjarmasin === 0 ? "Tidak Ada" : pendinganBanjarmasin}
                        text="Pendingan Teknisi Cabang Banjarmasin"
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

export default WidgetsPendingan
