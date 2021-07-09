import React, { useEffect, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import PenerimaanBarangHelper from '../modules/PenerimaanBarangHelper';
import 'fontsource-roboto';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
} from '@coreui/react';
import TablePenerimaanBarang from './TablePenerimaanBarang';
import ModalPenerimaanBarangService from './ModalPenerimaanBarangService';
import ModalPersiapanBarangBaru from './ModalPersiapanBarangBaru';
import ModalJasaLainLain from './ModalJasaLainLain';
import ModalCustomer from './ModalCustomer';
import ModalBarangJasa from './ModalBarangJasa';
import ModalMerek from './ModalMerek';
import ModalTipe from './ModalTipe';
import ModalProblem from './ModalProblem';
import ModalKondisi from './ModalKondisi';
import ModalKelengkapan from './ModalKelengkapan';
import ModalPengajuan from './ModalPengajuan';
import ModalTambahVideo from './ModalTambahVideo';
import ModalTontonVideo from './ModalTontonVideo';

const PenerimaanBarang = () => {
    const { 
        getCurrentUser, 
        getDataPelanggan, 
        kodeCabang, 
        fields,
        success, setSuccess,
        openPersiapanBarangBaruModal, setOpenPersiapanBarangBaruModal,
        openJasaLainlainModal, setOpenJasaLainlainModal,
        openModalPengajuan, setOpenModalPengajuan,
        openVideoModal, setOpenVideoModal,
        openWatchVideoModal, setOpenWatchVideoModal,
        openCustomerModal, setOpenCustomerModal,
        openBJModal, setOpenBJModal,
        openMerekModal, setOpenMerekModal,
        openTipeModal, setOpenTipeModal,
        openProblemModal, setOpenProblemModal,
        openKondisiModal, setOpenKondisiModal,
        openKelengkapanModal, setOpenKelengkapanModal,
        color,
        isLoading,
        dataPenerimaanBarang,
        loadCurrentPenerimaan, setLoadCurrentPenerimaan,
        dataMerek,
        loadDataMerek,
        dataRMA, 
        loadDataRMA,
        textBJ,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        modalTitle, 
        setFileVideo,
        loadVideo,
        input, setInput,
        inputPengajuan, 
        inputCustomer,
        inputBJ, 
        inputMerek,
        inputTipe,
        inputProblem,
        inputKondisi,
        inputKelengkapan,
        details,
        customerOptions, 
        currentCustomer, setCurrentCustomer,
        bjOptions, 
        currentBj, setCurrentBj,
        dataAdmin,
        dataSales,
        currentAdmin, setCurrentAdmin,
        dataCabang,
        loadDataCabang,
        tipeOptions, 
        problemOptions, 
        currentProblem, setCurrentProblem,
        kondisiOptions,
        currentKondisi, setCurrentKondisi,
        teknisiOptions,
        currentTeknisi, setCurrentTeknisi,
        kelengkapanOptions,
        currentKelengkapan, setCurrentKelengkapan,
        autocompleteDisabled,
        sisaGaransiVisibility,
        rmaVisibility,
        noFakturVisibility,
        playing,
        toggleDetails,
        openBJModalHandler,
        closeModalHandler,
        changeHandler,
        pengajuanChangeHandler,
        customerChangeHandler,
        bjChangeHandler,
        merekChangeHandler,
        additionalFormSubmitHandler,
        submitHandler,
        getDataPenerimaanBarangById,
        tipeChangeHandler, 
        openTipeModalHandler,
        problemChangeHandler, 
        getDataProblem,
        kondisiChangeHandler,
        getDataKondisi,
        getDataTeknisi,
        getDataKelengkapan,
        kelengkapanChangeHandler,
        jenisPenerimaanHandler,
        getDataMerek,
        getDataCabang,
        getDataAdmin,
        getDataSales,
        startVideo,
        stopVideo,
        uploadVideo,
        getDataRMA
    } = PenerimaanBarangHelper();

    const onDrop = useCallback(acceptedFiles => {
        setFileVideo(acceptedFiles[0]);
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const runFunction = () => {
        getCurrentUser();
        getDataAdmin();
        getDataSales();
        getDataCabang();
        getDataPelanggan();
        getDataProblem();
        getDataKondisi();
        getDataTeknisi();
        getDataKelengkapan();
        getDataRMA();
    }

    useEffect(() => {
        let mounted = true;
        runFunction();

        return function cleanup() {
            mounted = false;
        }
    }, []);

    const statusPengerjaan = item => {
        switch (item) {
            case '0':
            case 0:
            case '2':
            case 2:
                return 'Sedang Diproses';
            case '3':
            case 3:
                return 'Selesai';
            case '1':
            case 1: 
                return 'Batal';
            default:
                return '';
        }
    }

    return (
        <div>
            <ModalPenerimaanBarangService 
                success={success}
                closeModalHandler={closeModalHandler}
                color={color}
                loadCurrentPenerimaan={loadCurrentPenerimaan}
                modalTitle={modalTitle}
                dataAdmin={dataAdmin}
                currentAdmin={currentAdmin}
                setCurrentAdmin={setCurrentAdmin}
                setInput={setInput}
                input={input}
                changeHandler={changeHandler}
                formDisabled={formDisabled}
                loadDataCabang={loadDataCabang}
                dataCabang={dataCabang}
                setOpenCustomerModal={setOpenCustomerModal}
                openCustomerModal={openCustomerModal}
                autocompleteDisabled={autocompleteDisabled}
                customerOptions={customerOptions}
                currentCustomer={currentCustomer}
                setCurrentCustomer={setCurrentCustomer}
                openBJModalHandler={openBJModalHandler}
                bjOptions={bjOptions}
                currentBj={currentBj}
                setCurrentBj={setCurrentBj}
                getDataMerek={getDataMerek}
                setOpenMerekModal={setOpenMerekModal}
                openMerekModal={openMerekModal}
                loadDataMerek={loadDataMerek}
                dataMerek={dataMerek}
                openTipeModalHandler={openTipeModalHandler} 
                tipeOptions={tipeOptions}
                setOpenProblemModal={setOpenProblemModal}
                openProblemModal={openProblemModal}
                problemOptions={problemOptions}
                currentProblem={currentProblem}
                setCurrentProblem={setCurrentProblem}
                setOpenKondisiModal={setOpenKondisiModal}
                openKondisiModal={openKondisiModal}
                kondisiOptions={kondisiOptions}
                currentKondisi={currentKondisi}
                setCurrentKondisi={setCurrentKondisi}
                teknisiOptions={teknisiOptions} 
                currentTeknisi={currentTeknisi} 
                setCurrentTeknisi={setCurrentTeknisi}
                setOpenKelengkapanModal={setOpenKelengkapanModal}
                openKelengkapanModal={openKelengkapanModal}
                kelengkapanOptions={kelengkapanOptions}
                currentKelengkapan={currentKelengkapan}
                setCurrentKelengkapan={setCurrentKelengkapan}
                sisaGaransiVisibility={sisaGaransiVisibility}
                rmaVisibility={rmaVisibility}
                loadDataRMA={loadDataRMA}
                dataRMA={dataRMA}
                buttonVisibility={buttonVisibility} 
                buttonSubmitName={buttonSubmitName}
                submitHandler={submitHandler}        
            />

            <ModalPersiapanBarangBaru 
                setOpenPersiapanBarangBaruModal={setOpenPersiapanBarangBaruModal}
                openPersiapanBarangBaruModal={openPersiapanBarangBaruModal}
                closeModalHandler={closeModalHandler}
                color={color}
                loadCurrentPenerimaan={loadCurrentPenerimaan}
                modalTitle={modalTitle}
                dataSales={dataSales}
                currentAdmin={currentAdmin}
                setCurrentAdmin={setCurrentAdmin}
                setInput={setInput}
                input={input}
                setOpenMerekModal={setOpenMerekModal}
                openMerekModal={openMerekModal}
                changeHandler={changeHandler}
                formDisabled={formDisabled}
                loadDataCabang={loadDataCabang}
                dataCabang={dataCabang}
                setOpenCustomerModal={setOpenCustomerModal}
                openCustomerModal={openCustomerModal}
                autocompleteDisabled={autocompleteDisabled}
                customerOptions={customerOptions}
                currentCustomer={currentCustomer}
                setCurrentCustomer={setCurrentCustomer}
                openBJModalHandler={openBJModalHandler}
                bjOptions={bjOptions}
                currentBj={currentBj}
                setCurrentBj={setCurrentBj}
                getDataMerek={getDataMerek}
                loadDataMerek={loadDataMerek}
                dataMerek={dataMerek}
                openTipeModalHandler={openTipeModalHandler}
                tipeOptions={tipeOptions}
                teknisiOptions={teknisiOptions}
                setCurrentTeknisi={setCurrentTeknisi}
                currentTeknisi={currentTeknisi}
                setOpenKelengkapanModal={setOpenKelengkapanModal}
                openKelengkapanModal={openKelengkapanModal}
                kelengkapanOptions={kelengkapanOptions}
                currentKelengkapan={currentKelengkapan}
                setCurrentKelengkapan={setCurrentKelengkapan}
                buttonVisibility={buttonVisibility}
                buttonSubmitName={buttonSubmitName}
                submitHandler={submitHandler}
                noFakturVisibility={noFakturVisibility}
                rmaVisibility={rmaVisibility}
                loadDataRMA={loadDataRMA}
                dataRMA={dataRMA}
            />

            <ModalJasaLainLain 
                setOpenJasaLainlainModal={setOpenJasaLainlainModal}
                openJasaLainlainModal={openJasaLainlainModal}
                closeModalHandler={closeModalHandler}
                color={color}
                loadCurrentPenerimaan={loadCurrentPenerimaan}
                modalTitle={modalTitle}
                dataAdmin={dataAdmin}
                currentAdmin={currentAdmin}
                setCurrentAdmin={setCurrentAdmin}
                setInput={setInput}
                input={input}
                changeHandler={changeHandler} 
                formDisabled={formDisabled}
                loadDataCabang={loadDataCabang}
                dataCabang={dataCabang}
                setOpenCustomerModal={setOpenCustomerModal}
                openCustomerModal={openCustomerModal}
                autocompleteDisabled={autocompleteDisabled}
                customerOptions={customerOptions} 
                currentCustomer={currentCustomer} 
                setCurrentCustomer={setCurrentCustomer} 
                openBJModalHandler={openBJModalHandler}
                bjOptions={bjOptions}
                currentBj={currentBj} 
                setCurrentBj={setCurrentBj} 
                teknisiOptions={teknisiOptions}
                currentTeknisi={currentTeknisi} 
                setCurrentTeknisi={setCurrentTeknisi} 
                setOpenKelengkapanModal={setOpenKelengkapanModal}
                openKelengkapanModal={openKelengkapanModal}
                kelengkapanOptions={kelengkapanOptions}
                currentKelengkapan={currentKelengkapan}
                setCurrentKelengkapan={setCurrentKelengkapan}
                buttonVisibility={buttonVisibility}
                buttonSubmitName={buttonSubmitName}
                submitHandler={submitHandler}
            />

            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Penerimaan Barang</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                {/* <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton> */}
                                <CDropdown className="ml-3 mt-2">
                                    <CDropdownToggle color="secondary">
                                        Tambah Data
                                    </CDropdownToggle>
                                    <CDropdownMenu placement="right">
                                        <CDropdownItem onClick={() => jenisPenerimaanHandler('Penerimaan Barang Service')}>Penerimaan Barang Service</CDropdownItem>
                                        <CDropdownItem onClick={() => jenisPenerimaanHandler('Persiapan Barang Baru')}>Persiapan Barang & QC</CDropdownItem>
                                        <CDropdownItem onClick={() => jenisPenerimaanHandler('Jasa Lain-lain')}>Jasa Lain-lain</CDropdownItem>
                                        <CDropdownItem onClick={() => jenisPenerimaanHandler('Pengajuan Pembelian Barang Second')}>Pengajuan Pembelian Barang Second</CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                            </CCol>
                        </CRow>
                        <CCardBody>
                            <TablePenerimaanBarang 
                                dataPenerimaanBarang={dataPenerimaanBarang}
                                fields={fields}
                                isLoading={isLoading}
                                kodeCabang={kodeCabang}
                                toggleDetails={toggleDetails}
                                details={details}
                                statusPengerjaan={statusPengerjaan}
                                setSuccess={setSuccess}
                                success={success}
                                setOpenPersiapanBarangBaruModal={setOpenPersiapanBarangBaruModal}
                                openPersiapanBarangBaruModal={openPersiapanBarangBaruModal}
                                setOpenJasaLainlainModal={setOpenJasaLainlainModal}
                                openJasaLainlainModal={openJasaLainlainModal}
                                getDataPenerimaanBarangById={getDataPenerimaanBarangById}
                                setOpenWatchVideoModal={setOpenWatchVideoModal}
                                openWatchVideoModal={openWatchVideoModal}
                                setOpenVideoModal={setOpenVideoModal}
                                openVideoModal={openVideoModal}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <ModalCustomer 
                setOpenCustomerModal={setOpenCustomerModal}
                openCustomerModal={openCustomerModal}
                inputCustomer={inputCustomer}
                customerChangeHandler={customerChangeHandler}
                formDisabled={formDisabled}
                additionalFormSubmitHandler={additionalFormSubmitHandler}
            />

            <ModalBarangJasa 
                openBJModal={openBJModal}
                setOpenBJModal={setOpenBJModal}
                textBJ={textBJ}
                inputBJ={inputBJ}
                bjChangeHandler={bjChangeHandler}
                formDisabled={formDisabled}
                buttonVisibility={buttonVisibility}
                additionalFormSubmitHandler={additionalFormSubmitHandler}
            />

            <ModalMerek 
                openMerekModal={openMerekModal}
                setOpenMerekModal={setOpenMerekModal}
                inputMerek={inputMerek}
                merekChangeHandler={merekChangeHandler}
                formDisabled={formDisabled}
                additionalFormSubmitHandler={additionalFormSubmitHandler}
            />

            <ModalTipe 
                openTipeModal={openTipeModal}
                setOpenTipeModal={setOpenTipeModal}
                inputTipe={inputTipe}
                tipeChangeHandler={tipeChangeHandler}
                formDisabled={formDisabled}
                additionalFormSubmitHandler={additionalFormSubmitHandler}
            />

            <ModalProblem 
                openProblemModal={openProblemModal}
                setOpenProblemModal={setOpenProblemModal}
                inputProblem={inputProblem}
                problemChangeHandler={problemChangeHandler}
                formDisabled={formDisabled}
                additionalFormSubmitHandler={additionalFormSubmitHandler}
            />

            <ModalKondisi 
                openKondisiModal={openKondisiModal}
                setOpenKondisiModal={setOpenKondisiModal}
                inputKondisi={inputKondisi}
                kondisiChangeHandler={kondisiChangeHandler}
                formDisabled={formDisabled}
                additionalFormSubmitHandler={additionalFormSubmitHandler}
            />

            <ModalKelengkapan 
                openKelengkapanModal={openKelengkapanModal}
                setOpenKelengkapanModal={setOpenKelengkapanModal}
                inputKelengkapan={inputKelengkapan}
                kelengkapanChangeHandler={kelengkapanChangeHandler}
                formDisabled={formDisabled}
                additionalFormSubmitHandler={additionalFormSubmitHandler}
            />

            <ModalPengajuan 
                openModalPengajuan={openModalPengajuan}
                setOpenModalPengajuan={setOpenModalPengajuan}
                inputPengajuan={inputPengajuan}
                pengajuanChangeHandler={pengajuanChangeHandler}
                formDisabled={formDisabled}
                additionalFormSubmitHandler={additionalFormSubmitHandler}
            />

            <ModalTambahVideo 
                openVideoModal={openVideoModal}
                setOpenVideoModal={setOpenVideoModal}
                setLoadCurrentPenerimaan={setLoadCurrentPenerimaan}
                loadVideo={loadVideo}
                playing={playing}
                stopVideo={stopVideo}
                startVideo={startVideo}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
                uploadVideo={uploadVideo}
            />

            <ModalTontonVideo 
                openWatchVideoModal={openWatchVideoModal}
                setOpenWatchVideoModal={setOpenWatchVideoModal}
            />
        </div>
    )
}

export default PenerimaanBarang;