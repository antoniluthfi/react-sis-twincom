import { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import LogHelper from '../../../log/LogHelper';

const PenerimaanBarangHelper = () => {
    const { writeActivityLog, createNotification } = LogHelper();
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'no_service_penerimaan',
            label: 'No Service',
            _style: { textAlign: 'center' },
        },
        {
            key: 'jenis_penerimaan',
            label: 'Jenis Penerimaan',
            _style: { textAlign: 'center' },
        },
        {
            key: 'id_cabang',
            label: 'Cabang',
            _style: { textAlign: 'center' },
        },
        {
            key: 'id_customer',
            label: 'Nama Pelanggan',
            _style: { textAlign: 'center' },
        },
        {
            key: 'id_bj',
            label: 'Barang/Jasa',
            _style: { textAlign: 'center' },
        },
        {
            key: 'merek',
            label: 'Merek',
            _style: { textAlign: 'center' },
        },
        {
            key: 'tipe',
            label: 'Tipe',
            _style: { textAlign: 'center' },
        },
        {
            key: 'sn',
            label: 'Serial Number',
            _style: { textAlign: 'center' },
        },
        {
            key: 'problem',
            label: 'Problem',
            _style: { textAlign: 'center' },
        },
        {
            key: 'kondisi',
            label: 'Kondisi',
            _style: { textAlign: 'center' },
        },
        {
            key: 'estimasi',
            label: 'Estimasi Penyelesaian',
            _style: { textAlign: 'center' },
        },
        {
            key: 'show_details',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
    ];    

    const kodeCabang = item => {
        switch (item) {
            case 'Banjarbaru':
            case '1':
            case 1:
                return 'S.BJB.'
            case 'Landasan Ulin':
            case '2':
            case 2:
                return 'S.LNU.'
            case 'Banjarmasin':
            case '3':
            case 3:
                return 'S.BJM.'    
            default:
                return ''
        }
    }    

    const [success, setSuccess] = useState(false);
    const [openPersiapanBarangBaruModal, setOpenPersiapanBarangBaruModal] = useState(false);
    const [openJasaLainlainModal, setOpenJasaLainlainModal] = useState(false);
    const [openModalPengajuan, setOpenModalPengajuan] = useState(false);
    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [openWatchVideoModal, setOpenWatchVideoModal] = useState(false);
    const [danger, setDanger] = useState(false);
    const [openCustomerModal, setOpenCustomerModal] = useState(false);
    const [openBJModal, setOpenBJModal] = useState(false);
    const [openMerekModal, setOpenMerekModal] = useState(false);
    const [openTipeModal, setOpenTipeModal] = useState(false);
    const [openProblemModal, setOpenProblemModal] = useState(false);
    const [openKondisiModal, setOpenKondisiModal] = useState(false);
    const [openKelengkapanModal, setOpenKelengkapanModal] = useState(false);
    const [color, setColor] = useState('success');
    const [isLoading, setIsLoading] = useState(true);
    const [dataPenerimaanBarang, setDataPenerimaanBarang] = useState([]);
    const [loadCurrentPenerimaan, setLoadCurrentPenerimaan] = useState(true);
    const [dataMerek, setDataMerek] = useState({});
    const [loadDataMerek, setLoadDataMerek] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    const [textBJ, setTextBJ] = useState('');
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentNoService, setCurrentNoService] = useState('');
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [customerOptions, setCustomerOptions] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState({
        nama: '',
        nomorhp: ''
    });
    const [bjOptions, setBjOptions] = useState([]);
    const [currentBj, setCurrentBj] = useState({
        nama_bj: '',
        jenis: ''
    });
    const [dataAdmin, setDataAdmin] = useState([]);
    const [loadDataAdmin, setLoadDataAdmin] = useState(true);
    const [dataCabang, setDataCabang] = useState([]);
    const [loadDataCabang, setLoadDataCabang] = useState(true);
    const [tipeOptions, setTipeOptions] = useState([]);
    const [problemOptions, setProblemOptions] = useState([]);
    const [currentProblem, setCurrentProblem] = useState([]);
    const [kondisiOptions, setKondisiOptions] = useState([]);
    const [currentKondisi, setCurrentKondisi] = useState([]);
    const [teknisiOptions, setTeknisiOptions] = useState([]);
    const [currentTeknisi, setCurrentTeknisi] = useState([]);
    const [kelengkapanOptions, setKelengkapanOptions] = useState([]);
    const [currentKelengkapan, setCurrentKelengkapan] = useState([]);
    const [autocompleteDisabled, setAutocompleteDisabled] = useState(false);
    const [sisaGaransiVisibility, setSisaGaransiVisibility] = useState('d-none');
    const [textDangerModal, setTextDangerModal] = useState('This data will be deleted parmanently. Are you sure wanna delete it anyway?');
    const [buttonDanger, setButtonDanger] = useState('Delete');
    const [playing, setPlaying] = useState(false);
    const [fileVideo, setFileVideo] = useState({});
    const [loadVideo, setLoadVideo] = useState(false);
    const [currentPartner, setCurrentPartner] = useState({});
    const [input, setInput] = useState({
        jenis_penerimaan: 'Penerimaan Barang Service',
        id_cabang: '',
        id_customer: '',
        bj: '',
        id_bj: '',
        id_admin: '',
        merek: '',
        tipe: '',
        sn: '',
        kelengkapan: '',
        problem: '',
        kondisi: '',
        data_penting: '1',
        cek_stiker: '0', // tidak ada
        permintaan: '',
        keterangan: '',
        mulai: '',
        sampai: '',
        satuan: 'Hari',
        layanan: '0', // reguler
        link_video: '',
        shift: '0', // shift 1
        id_teknisi: '',
        status_garansi: '0',
        sisa_garansi: '',
        rma: ''
    });
    const [inputPengajuan, setInputPengajuan] = useState({
        nama_toko_asal: '',
        tanggal_pembelian: '',
        harga_beli: '',
        pengajuan_harga: '',
        lama_pemakaian: '',
        alasan_menjual: '',
        keterangan: '',
        kode_jual: '0',
        segel_distri: ''
    });
    const [inputCustomer, setInputCustomer] = useState({
        nama: '',
        alamat: '',
        email: '',
        nomorhp: '',
        segmen: 'user',
        status_akun: '1',
        password: ''
    });
    const [inputBJ, setInputBJ] = useState({
        nama_bj: '',
        jenis: '1',
        form_data_penting: '1'
    });
    const [inputMerek, setInputMerek] = useState({
        merek: '',
        pc: '1',
        laptop: '1',
        cctv: '1',
        printer: '1'
    });
    const [inputTipe, setInputTipe] = useState({
        tipe: '',
        merek: 'Asus',
        kategori: 'Laptop'
    });
    const [inputProblem, setInputProblem] = useState({
        nama_problem: ''
    });
    const [inputKondisi, setInputKondisi] = useState({
        nama_kondisi: ''
    });
    const [inputKelengkapan, setInputKelengkapan] = useState({
        nama_kelengkapan: ''
    });
    const [currentAdmin, setCurrentAdmin] = useState({
        name: ''
    });
    const [details, setDetails] = useState([]);

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
        setDetails(newDetails)
    }

    const closeModalHandler = action => {
        if(action === 'Delete') {
            setDanger(!danger);
            setColor('success');
            setTimeout(() => {
                setColor('success');
                setInput({
                    jenis_penerimaan: 'Penerimaan Barang Service',
                    id_customer: '',
                    id_bj: '',
                    merek: '',
                    tipe: '',
                    sn: '',
                    kelengkapan: '',
                    problem: '',
                    kondisi: '',
                    data_penting: '1',
                    cek_stiker: '0', // tidak ada
                    permintaan: '',
                    keterangan: '',
                    mulai: '',
                    sampai: '',
                    satuan: 'Hari',
                    layanan: '0', // reguler
                    link_video: '',
                    shift: '0', // shift 1
                    id_teknisi: '',
                    status_garansi: '0',
                    sisa_garansi: '',
                    rma: ''
                });                
            }, 500);
        } else {
            if(input.jenis_penerimaan === 'Penerimaan Barang Service') {
                setSuccess(!success);
            } else if(input.jenis_penerimaan === 'Persiapan Barang Baru') {
                setOpenPersiapanBarangBaruModal(!openPersiapanBarangBaruModal);
            } else if(input.jenis_penerimaan === 'Jasa Lain-lain') {
                setOpenJasaLainlainModal(!openJasaLainlainModal);
            }

            setTimeout(() => {
                setColor('success');
                setAutocompleteDisabled(false);
                setButtonVisibility('d-inline');
                setButtonSubmitName('Submit');
                setFormDisabled(false);
                setInput({
                    jenis_penerimaan: 'Penerimaan Barang Service',
                    id_customer: '',
                    id_bj: '',
                    merek: '',
                    tipe: '',
                    sn: '',
                    kelengkapan: '',
                    problem: '',
                    kondisi: '',
                    data_penting: '1',
                    cek_stiker: '0', // tidak ada
                    permintaan: '',
                    keterangan: '',
                    mulai: '',
                    sampai: '',
                    satuan: 'Hari',
                    layanan: '0', // reguler
                    link_video: '',
                    shift: '0', // shift 1
                    id_teknisi: '',
                    status_garansi: '0',
                    sisa_garansi: '',           
                    rma: ''
                });  
                
                setCurrentCustomer({ nama: '', nomorhp: '' });
                setCurrentBj({ nama_bj: '', jenis: '' });
                setCurrentProblem([]);
                setCurrentKondisi([]);
                setCurrentTeknisi([]);
                setCurrentKelengkapan([]);
            }, 500);    
        }
        setLoadCurrentPenerimaan(true);
    }

    const getCurrentUser = async () => {
        await axios.get(`${baseUrl}/user/my/profile`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            getDataPartner(result.cab_penempatan);
            setCurrentUser(result);
            setInput({
                ...input, 
                id_admin: result.id,
                id_cabang: result.cabang.id,
            });
            getDataPenerimaanBarang(result.id);
        })
        .catch(error => {
            console.log(error);
        });
    } 

    const getDataPartner = async nama => {
        if(nama === 'Banjarbaru' || nama === 'Landasan Ulin' || nama === 'Banjarmasin') {
            nama = `TSC ${nama}`;
        }

        await axios.get(`${baseUrl}/partner/name/${nama}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentPartner(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getDataPenerimaanBarang = async id_admin => {
        await axios.get(`${baseUrl}/penerimaan-barang/user/${id_admin}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataPenerimaanBarang(response.data.data);
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const changeHandler = event => {
        if(event.target.name === 'bj') {
            setInput({
                ...input, merek: ''
            });
    
            // 1 = jasa | 0 = barang
            setTextBJ(event.target.value);
            if(event.target.value === 'Barang') {
                getDataBjByJenis(0);
            } else if(event.target.value === 'Jasa') {
                getDataBjByJenis(1);
            }    
        }

        if(event.target.name === 'merek') {
            getDataTipeByMerek(event.target.value);
        }

        if(event.target.name === 'status_garansi' && event.target.value === '1') {
            setSisaGaransiVisibility('d-block');
        } else if(event.target.name === 'status_garansi' && event.target.value === '0') {
            setSisaGaransiVisibility('d-none');
        }

        setInput({
            ...input, [event.target.name]:event.target.value
        });
    }

    const pengajuanChangeHandler = event => {
        setInputPengajuan({
            ...inputPengajuan, [event.target.name]: event.target.value
        });
    }

    const customerChangeHandler = event => {
        setInputCustomer({
            ...inputCustomer, [event.target.name]:event.target.value
        });
    }

    const bjChangeHandler = event => {
        setInputBJ({
            ...inputBJ, [event.target.name]:event.target.value
        });
    }

    const merekChangeHandler = event => {
        setInputMerek({
            ...inputMerek, [event.target.name]:event.target.value
        });
    }

    const tipeChangeHandler = event => {
        setInputTipe({
            ...inputTipe, [event.target.name]:event.target.value
        });
    }

    const problemChangeHandler = event => {
        setInputProblem({
            ...inputProblem, [event.target.name]:event.target.value
        })
    }

    const kondisiChangeHandler = event => {
        setInputKondisi({
            ...inputKondisi, [event.target.name]:event.target.value
        })
    }

    const kelengkapanChangeHandler = event => {
        setInputKelengkapan({
            ...inputKelengkapan, [event.target.name]:event.target.value
        })
    }

    const jenisPenerimaanHandler = jenis => {
        setCurrentCustomer({ nama: '', nomorhp: '' });
        setCurrentBj({ nama_bj: '', jenis: '' });
        setCurrentProblem([]);
        setCurrentKondisi([]);
        setCurrentTeknisi([]);
        setCurrentKelengkapan([]);

        setModalTitle('Tambah Data');
        setButtonSubmitName('Submit');
        setAutocompleteDisabled(false);
        setInput({
            ...input, jenis_penerimaan: jenis
        });
        setLoadCurrentPenerimaan(false);

        if(jenis === 'Penerimaan Barang Service') {
            setSuccess(!success);
            setBjOptions([]);
            getDataBjByJenis(0);
        } else if(jenis === 'Persiapan Barang Baru') {
            setOpenPersiapanBarangBaruModal(!openPersiapanBarangBaruModal);
            getDataBjByJenis(0);
        } else if(jenis === 'Jasa Lain-lain') {
            setOpenJasaLainlainModal(!openJasaLainlainModal);
            getDataBjByJenis(1);
        }
    }

    const submitHandler = action => {
        if(action === 'Submit') {
            if(input.jenis_penerimaan === 'Persiapan Barang Baru') {
                setInput({
                    ...input, layanan: '1'
                });
            }    

            postDataPenerimaanBarang();
        } else if(action === 'Update') {
            updateDataPenerimaanBarang(currentNoService);
        } else if(action === 'Delete') {
            deleteDataPenerimaanBarang(currentNoService);
        } else if(action === 'Batalkan') {
            cancelPengerjaan(currentNoService);
        } else if(action === 'upload-video') {
            uploadVideo(currentNoService);
        }
    }

    const additionalFormSubmitHandler = type => {
        switch (type) {
            case 'pelanggan':
                postDataPelanggan();
                break;
            case 'bj':
                postDataBJ();
                break;
            case 'merek': 
                postDataMerek();
                break;
            case 'tipe':
                postDataTipe();
                break;
            case 'problem':
                postDataProblem();
                break;
            case 'kondisi':
                postDataKondisi();
                break;
            case 'kelengkapan':
                postDataKelengkapan();
                break;
            default:
                return null;
        }
    }

    const getDataBjByJenis = async (jenis) => {
        await axios.get(`${baseUrl}/bj/jenis/${jenis}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            } 
        })
        .then(response => {
            let data = [];
            response.data.data.map(item => data.push(item));
            setBjOptions(data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const getDataPenerimaanBarangById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/penerimaan-barang/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentNoService(result.no_service_penerimaan);

            if(actionModal === 'update' || actionModal === 'view') {
                if(result.bj.jenis == '0') {
                    var jenis = 'Barang';
                } else {
                    var jenis = 'Jasa';
                }
    
                setTextBJ(jenis);
                getDataMerek(jenis, result.bj.nama_bj); 
                getDataTeknisiByNoService(result.no_service_penerimaan);
    
                if(result.estimasi.indexOf(" - ") > 0) {
                    var mulai = result.estimasi.split(" - ");
                    var sampai = mulai[1].split(" ");
                    var satuan = sampai[1];
                    mulai = mulai[0];
                    sampai = sampai[0];
                } else {
                    var mulai = result.estimasi.split(" ");
                    var sampai = mulai[0]
                    var satuan = mulai[1];
                    mulai = mulai[0];
                }
    
                setInput({
                    jenis_penerimaan: result.jenis_penerimaan,
                    id_cabang: result.id_cabang,
                    id_customer: result.id_customer,
                    bj: jenis,
                    id_bj: result.id_bj,
                    id_admin: result.id_admin,
                    merek: result.merek == null ? '' : result.merek,
                    tipe: result.tipe == null ? '' : result.tipe,
                    sn: result.sn == null ? '' : result.sn,
                    kelengkapan: result.kelengkapan,
                    problem: result.problem == null ? '' : result.problem,
                    kondisi: result.kondisi == null ? '' : result.kondisi,
                    data_penting: result.data_penting,
                    cek_stiker: result.cek_stiker,
                    permintaan: result.permintaan,
                    keterangan: result.keterangan,
                    mulai: mulai,
                    sampai: sampai,
                    satuan: satuan,
                    layanan: result.layanan,
                    shift: result.shift,
                    status_garansi: result.status_garansi,
                    sisa_garansi: result.sisa_garansi,
                    rma: result.rma
                });
    
                setCurrentAdmin({
                    name: result.admin.name
                });
    
                setCurrentCustomer({
                    nama: result.customer.nama,
                    nomorhp: result.customer.nomorhp
                });
    
                setCurrentBj({
                    nama_bj: result.bj.nama_bj,
                    jenis: jenis
                });
    
                if(result.problem !== null) {
                    let data = result.problem.split(',');
                    data = data.map(item => ({nama_problem: item}));
                    setCurrentProblem(data);
                }
    
                if(result.kondisi !== null) {
                    let data = result.kondisi.split(',');
                    data = data.map(item => ({nama_kondisi: item}));
                    setCurrentKondisi(data);
                }
    
                if(result.kelengkapan !== null) {
                    let data = result.kelengkapan.split(',');
                    data = data.map(item => ({nama_kelengkapan: item}));
                    setCurrentKelengkapan(data);
                }
            }

            if(actionModal === 'watch') {
                let video = document.getElementById('watch-video');
                let source = document.createElement('source');
                source.setAttribute('src', `${process.env.REACT_APP_PUBLIC_URL}/video/${result.link_video}`);
                video.appendChild(source);
            }
            
            getDataBjByJenis(result.bj.jenis);
        })
        .catch(error => {
            console.log(error);
        });

        if(actionModal === 'view') {
            setAutocompleteDisabled(true);
            setModalTitle('View Data');
            setFormDisabled(true);
            setButtonVisibility('d-none');
            setColor('info');
        } else if(actionModal === 'update') {
            setAutocompleteDisabled(false);
            setColor('success');
            setModalTitle('Update Data');
            setFormDisabled(false);
            setButtonVisibility('d-inline');
            setButtonSubmitName('Update');
        } else if(actionModal === 'delete') {
            setTextDangerModal('This data will be deleted parmanently. Are you sure wanna delete it anyway?');
            setButtonDanger('Delete');
        } else if(actionModal === 'cancel') {
            setTextDangerModal('Pengerjaan akan dibatalkan melalui anda. Apakah anda yakin?');
            setButtonDanger('Batalkan');
        } else if(actionModal === 'record') {
            const camera = document.getElementById('cameraOptions');
            const audio = document.getElementById('audioOptions');
    
            if(navigator.mediaDevices === undefined) {
                navigator.mediaDevices = {};
                navigator.mediaDevices.getUserMedia = constraintObj => {
                    let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                    if(!getUserMedia) {
                        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                    }
    
                    return new Promise((resolve, reject) => {
                        getUserMedia.call(navigator, constraintObj, resolve, reject);
                    });
                }
            } else {
                navigator.mediaDevices.enumerateDevices()
                    .then(devices => {
                        devices.forEach(device => {
                            console.log(device.kind.toUpperCase(), device.label);
    
                            const option = document.createElement('option');
                            option.value = device.deviceId;
    
                            if(device.kind === 'audioinput') {
                                option.text = device.label || 'microphone' + (audio.length + 1);
                                audio.appendChild(option);
                            } else if(device.kind === 'videoinput') {
                                option.text = device.label || 'camera' + (camera.length + 1);
                                camera.appendChild(option);
                            } else {
                                console.log(`found another kind of devices ${devices}`);
                            }
                        });
                    })
                    .catch(error => {
                        console.error('Error', error);
                    });
            }    
        }

        setLoadCurrentPenerimaan(false);
    }

    const postDataPenerimaanBarang = async () => {
        if(input.mulai == input.sampai) {
            var estimasi = input.sampai;
        } else {
            var estimasi = `${input.mulai} - ${input.sampai}`;
        }

        await axios.post(`${baseUrl}/penerimaan-barang`, {
            jenis_penerimaan: input.jenis_penerimaan,
            id_cabang: currentUser.cabang.id,
            id_customer: input.id_customer,
            id_bj: input.id_bj,
            id_admin: currentUser.id,
            merek: input.merek,
            tipe: input.tipe,
            sn: input.sn,
            kelengkapan: input.kelengkapan,
            problem: input.problem,
            kondisi: input.kondisi,
            data_penting: input.data_penting,
            cek_stiker: input.cek_stiker,
            permintaan: input.permintaan,
            keterangan: input.keterangan,
            estimasi: `${estimasi} ${input.satuan}`,
            layanan: input.layanan,
            shift: input.shift,
            status_garansi: input.status_garansi,
            sisa_garansi: input.status_garansi == '0' ? '' : input.sisa_garansi,
            rma: input.rma
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            postDataPengerjaan(response.data.data.no_service_penerimaan);
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Penerimaan Barang', 'POST', `${currentUser.name} menambahkan nomor service ${kodeCabang(response.data.data.id_cabang)}${response.data.data.no_service_penerimaan} sebagai data baru`);
            createNotification(input.id_teknisi, 'teknisi', 'memiliki 1 pendingan baru!');            
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        closeModalHandler('Not Delete');
    }

    const postDataPengerjaan = async no_service => {
        await axios.post(`${baseUrl}/pengerjaan`, {
            no_service: no_service,
            id_partner: currentPartner.id
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }        
        })
        .then(response => {
            postDataTeknisipj(response.data.data.no_service);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });
    }

    const postDataTeknisipj = async no_service => {
        await axios.post(`${baseUrl}/teknisi-pj`, {
            no_service: no_service,
            id_teknisi: input.id_teknisi
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }        
        })        
        .then(response => {
            if(input.kelengkapan != null || input.kelengkapan != '') {
                postListKelengkapan(no_service);
            } else {
                Swal.fire(
                    'Berhasil',
                    response.data.message,
                    'success'
                );    
            }
        })
        .catch(error => {
            if(input.kelengkapan != null || input.kelengkapan != '') {
                postListKelengkapan(no_service);
            } else {
                Swal.fire(
                    'Berhasil',
                    'Data berhasil ditambahkan',
                    'success'
                );    
            }
        });

        getDataPenerimaanBarang(currentUser.id);
    }

    const postListKelengkapan = async no_service => {
        await axios.post(`${baseUrl}/list-kelengkapan-penerimaan-barang`, {
            no_service: no_service,
            kelengkapan: input.kelengkapan
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            postListRating(no_service)
        })
        .catch(error => {
            postListRating(no_service)
        });
    }

    const postListRating = async no_service => {
        await axios.post(`${baseUrl}/review-kepuasan-pelanggan`, {
            no_service: no_service,
            user_id: `${input.id_teknisi},${currentUser.name}`,
            cabang: currentUser.cab_penempatan
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
        })
        .catch(error => {
            Swal.fire(
                'Berhasil',
                'Data berhasil ditambahkan',
                'success'
            );
        });
    }

    const updateDataPenerimaanBarang = async id => {
        if(input.mulai == input.sampai) {
            var estimasi = input.sampai;
        } else {
            var estimasi = `${input.mulai} - ${input.sampai}`;
        }

        await axios.put(`${baseUrl}/penerimaan-barang/${id}`, {
            jenis_penerimaan: input.jenis_penerimaan,
            id_cabang: currentUser.cabang.id,
            id_customer: input.id_customer,
            id_bj: input.id_bj,
            id_admin: currentUser.id,
            merek: input.merek,
            tipe: input.tipe,
            sn: input.sn,
            kelengkapan: input.kelengkapan,
            problem: input.problem,
            kondisi: input.kondisi,
            data_penting: input.data_penting,
            cek_stiker: input.cek_stiker,
            permintaan: input.permintaan,
            keterangan: input.keterangan,
            estimasi: `${estimasi} ${input.satuan}`,
            layanan: input.layanan,
            shift: input.shift,
            status_garansi: input.status_garansi,
            sisa_garansi: input.status_garansi == '0' ? '' : input.sisa_garansi,
            rma: input.rma
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            deleteListKelengkapan(id);
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Penerimaan Barang', 'UPDATE', `${currentUser.name} mengubah data ${kodeCabang(currentUser.cab_penempatan)}${currentNoService}`);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        })

        closeModalHandler('Not Delete');
    }

    const deleteListKelengkapan = async no_service => {
        await axios.delete(`${baseUrl}/list-kelengkapan-penerimaan-barang/${no_service}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            postListKelengkapan(no_service);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        })
    }

    const deleteDataPenerimaanBarang = async id => {
        await axios.delete(`${baseUrl}/penerimaan-barang/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            getDataPenerimaanBarang(currentUser.id);
            deleteDataPengerjaan(id);
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Penerimaan Barang', 'DELETE', `${currentUser.name} menghapus data ${kodeCabang(currentUser.cab_penempatan)}${currentNoService}`);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        })

        closeModalHandler('Delete');
    }

    const deleteDataPengerjaan = async no_service => {
        await axios.delete(`${baseUrl}/pengerjaan/${no_service}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            deleteTeknisipj(no_service);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });
    }

    const deleteTeknisipj = async no_service => {
        await axios.delete(`${baseUrl}/teknisi-pj/${no_service}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            deleteDetailPengerjaan(no_service);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                'Data berhasil dihapus',
                'error'
            );
        });
    }

    const deleteDetailPengerjaan = async no_service => {
        await axios.delete(`${baseUrl}/detail-pengerjaan/${no_service}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            getDataPengembalian(no_service);
        })
        .catch(error => {
            getDataPengembalian(no_service);
        });
    }

    const getDataPengembalian = async no_service => {
        await axios.get(`${baseUrl}/pengembalian/no-service/${no_service}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            deleteDataPengembalian(no_service);
        })
        .catch(error => {
            Swal.fire(
                'Berhasil',
                'Data Berhasil Dihapus',
                'success'
            );
        });
    }

    const deleteDataPengembalian = async no_service => {
        await axios.delete(`${baseUrl}/pengembalian/no-service/${no_service}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                'Data Berhasil Dihapus',
                'success'
            );
        })
        .catch(error => {
            Swal.fire(
                'Berhasil',
                'Data Berhasil Dihapus',
                'success'
            );
        });
    }

    const getDataPelanggan = async () => {
        await axios.get(`${baseUrl}/customer`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            let data = [];
            response.data.data.map(item => data.push(item));
            console.log(data);
            setCustomerOptions(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const postDataPelanggan = async () => {
        await axios.post(`${baseUrl}/customer`, {
            nama: inputCustomer.nama,
            alamat: inputCustomer.alamat,
            email: inputCustomer.email,
            nomorhp: inputCustomer.nomorhp,
            segmen: inputCustomer.segmen,
            status_akun: inputCustomer.status_akun,
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
            getDataPelanggan();
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Penerimaan Barang', 'POST', `${currentUser.name} menambahkan ${response.data.data.nama} sebagai data baru`);

            setInput({
                ...input, id_customer: response.data.data.id_customer 
            });

            setInputCustomer({
                nama: '',
                alamat: '',
                email: '',
                nomorhp: '',
                segmen: 'user',
                status_akun: '1',        
            });
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        })

        setOpenCustomerModal(!openCustomerModal);
    }

    const openBJModalHandler = bj => {
        setOpenBJModal(!openBJModal);
        setTextBJ(bj);

        if(bj === 'Barang') {
            setInputBJ({
                ...inputBJ, jenis: '0'
            });
        } else if(bj === 'Jasa') {
            setInputBJ({
                ...inputBJ, jenis: '1'
            });
        }
    }

    const postDataBJ = async () => {
        await axios.post(`${baseUrl}/bj`, {
            nama_bj: inputBJ.nama_bj,
            jenis: inputBJ.jenis,
            form_data_penting: inputBJ.form_data_penting
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );

            if(input.jenis_penerimaan == 'Penerimaan Barang Service' || input.jenis_penerimaan == 'Persiapan Barang Baru') {
                getDataBjByJenis(0);
            } else if(input.jenis_penerimaan == 'Jasa Lain-lain') {
                getDataBjByJenis(1);
            }

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Penerimaan Barang', 'POST', `${currentUser.name} menambahkan ${response.data.data.nama_bj} sebagai data baru`);

            setInputBJ({
                nama_bj: '',
                jenis: '1',
                form_data_penting: '1'
            });
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        setOpenBJModal(!openBJModal);
    }

    const getDataMerek = async (jenisbj, kategori) => {
        let url;
        if(jenisbj === 'Jasa') {
            url = `${baseUrl}/merek`;
        } else if(jenisbj === 'Barang') {
            url = `${baseUrl}/merek/kategori/${kategori}`;
        }
        
        await axios.get(url, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }
        })
        .then(response => {
            setDataMerek(response.data.data);
        })
        .catch(error => {
            console.log(error);
        })

        setLoadDataMerek(false);
    }

    const getDataTipeByMerek = async (merek) => {
        await axios.get(`${baseUrl}/tipe/merek/${merek}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }
        })
        .then(response => {
            let data = [];
            response.data.data.map(item => data.push(item));
            setTipeOptions(data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const postDataMerek = async () => {
        await axios.post(`${baseUrl}/merek`, {
            merek: inputMerek.merek,
            pc: inputMerek.pc,
            laptop: inputMerek.laptop,
            cctv: inputMerek.cctv,
            printer: inputMerek.printer
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );

            if(input.jenis_penerimaan == 'Penerimaan Barang Service' || input.jenis_penerimaan == 'Persiapan Barang Baru') {
                getDataMerek('Barang', currentBj.nama_bj);
            } else if(input.jenis_penerimaan == 'Jasa Lain-lain') {
                getDataMerek('Jasa', currentBj.nama_bj);
            }

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Penerimaan Barang', 'POST', `${currentUser.name} menambahkan ${response.data.data.merek} sebagai data baru`);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        setOpenMerekModal(!openMerekModal);
    }

    const openTipeModalHandler = merek => {
        setInputTipe({
            ...inputTipe, merek: merek
        });

        setOpenTipeModal(!openTipeModal);
    }

    const postDataTipe = async () => {
        await axios.post(`${baseUrl}/tipe`, {
            tipe: inputTipe.tipe,
            merek: inputTipe.merek,
            kategori: inputTipe.kategori
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
            getDataTipeByMerek(inputTipe.merek);
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Penerimaan Barang', 'POST', `${currentUser.name} menambahkan ${response.data.data.tipe} sebagai data baru`);

            setInputTipe({
                tipe: '',
                merek: 'Asus',
                kategori: ''        
            });
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        setOpenTipeModal(!openTipeModal);
    }

    const getDataProblem = async () => {
        await axios.get(`${baseUrl}/problem`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }
        })
        .then(response => {
            let data = [];
            response.data.data.map(item => data.push(item));
            setProblemOptions(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const postDataProblem = async () => {
        await axios.post(`${baseUrl}/problem`, {
            nama_problem: inputProblem.nama_problem
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
            getDataProblem();
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Penerimaan Barang', 'POST', `${currentUser.name} menambahkan ${response.data.data.nama_problem} sebagai data baru`);

            setInputProblem({
                nama_problem: ''
            });

            getDataProblem();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        setOpenProblemModal(!openProblemModal);
    }

    const getDataKondisi = async () => {
        await axios.get(`${baseUrl}/kondisi`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }
        })
        .then(response => {
            let data = [];
            response.data.data.map(item => data.push(item));
            setKondisiOptions(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const postDataKondisi = async () => {
        await axios.post(`${baseUrl}/kondisi`, {
            nama_kondisi: inputKondisi.nama_kondisi
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
            getDataKondisi();
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Penerimaan Barang', 'POST', `${currentUser.name} menambahkan ${response.data.data.nama_kondisi} sebagai data baru`);

            setInputKondisi({
                nama_kondisi: ''
            });
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        setOpenKondisiModal(!openKondisiModal);
    }

    const getDataTeknisi = async () => {
        await axios.get(`${baseUrl}/user/role/teknisi`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }
        })
        .then(response => {
            let data = [];
            response.data.data.map(item => data.push(item));
            setTeknisiOptions(data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const getDataTeknisiByNoService = async (no_service) => {
        await axios.get(`${baseUrl}/teknisi-pj/${no_service}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }
        })
        .then(response => {
            let data = response.data.data.map(item => ({ name: item.teknisi.name }));
            setCurrentTeknisi(data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const getDataKelengkapan = async () => {
        await axios.get(`${baseUrl}/kelengkapan`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }
        })
        .then(response => {
            let data = [];
            response.data.data.map(item => data.push(item));
            setKelengkapanOptions(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const postDataKelengkapan = async () => {
        await axios.post(`${baseUrl}/kelengkapan`, {
            nama_kelengkapan: inputKelengkapan.nama_kelengkapan
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Penerimaan Barang', 'POST', `${currentUser.name} menambahkan ${response.data.data.nama_kelengkapan} sebagai data baru`);

            getDataKelengkapan();
            setInputKelengkapan({
                nama_kelengkapan: ''
            });
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        setOpenKelengkapanModal(!openKelengkapanModal);
    }

    const getDataCabang = async () => {
        await axios.get(`${baseUrl}/cabang`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }  
        })
        .then(response => {
            setDataCabang(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataCabang(false);
    }

    const getDataAdmin = async () => {
        await axios.get(`${baseUrl}/user/role/admin service`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }  
        })
        .then(response => {
            setDataAdmin(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataAdmin(false);
    }

    const cancelPengerjaan = async no_service => {
        await axios.put(`${baseUrl}/pengerjaan/no-service/${no_service}`, {
            status_pengerjaan: 1
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }  
        })
        .then(response => {
            postDataPengembalian(no_service);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        setDanger(!danger);
    }

    const postDataPengembalian = async no_service => {
        await axios.post(`${baseUrl}/pengembalian`, {
            no_service: no_service,
            status_pengerjaan: 1,
            cabang: currentUser.cab_penempatan,
            status_pembayaran: 1,
            status_pengembalian: 0
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }  
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });
    }

    const startVideo = () => {
        setPlaying(true);
        const camera = document.getElementById('cameraOptions');
        const audio = document.getElementById('audioOptions');
        const video = document.getElementById('show-video');

        navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: { exact: audio.value }
            },
            video: {
                facingMode: 'environment',
                deviceId: { exact: camera.value }
            },
        })
        .then(stream => {
            if ("srcObject" in video) {
                video.srcObject = stream;
            } else {
                //old version
                video.src = URL.createObjectURL(stream);
            }
            
            video.onloadedmetadata = function(ev) {
                //show in the video element what is being captured by the webcam
                video.play();
            };
                
            //add listeners for saving video/audio
            let vidSave = document.getElementById('prev-video');
            let mediaRecorder = new MediaRecorder(stream);
            let chunks = [];
                        
            mediaRecorder.start();

            mediaRecorder.ondataavailable = function(ev) {
                chunks.push(ev.data);
            }
    
            mediaRecorder.onstop = (ev) => {
                let blob = new Blob(chunks, { 'type' : 'video/mp4;codecs=h264' });
                chunks = [];
                let videoURL = window.URL.createObjectURL(blob);
                vidSave.src = videoURL;
    
                let a = document.getElementById("btn-download");
                a.setAttribute("href", videoURL);
                a.setAttribute("download", `${kodeCabang(currentUser.cab_penempatan)}${currentNoService}.mp4`);
            }
        })
        .catch(error => {
            console.error('Error', error);
        });
    }

    const stopVideo = () => {
        setPlaying(false);
        let video = document.getElementById('show-video');
        video.srcObject.getTracks()[0].stop();
    }

    const uploadVideo = async () => {
        setLoadVideo(true);
        let formData = new FormData();
        formData.append('file', fileVideo);

        await axios({
            method: 'post',
            url: `${baseUrl}/penerimaan-barang/upload-video/${currentNoService}`,
            data: formData,
            headers: {
                'Accept': 'Application/json',
                'Content-type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`,
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                'Video berhasil diupload',
                'success',
            );

            getDataPenerimaanBarang(currentUser.id);
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Penerimaan Barang', 'UPDATE', `${currentUser.name} upload video untuk data ${kodeCabang(currentUser.cab_penempatan)}${currentNoService}`);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                'Video gagal diupload',
                'error',
            )
        });

        setLoadVideo(false);
        setOpenVideoModal(!openVideoModal);
    }

    return {
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
        danger, setDanger,
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
        textBJ,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        modalTitle, 
        fileVideo, setFileVideo,
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
        currentUser,
        customerOptions, 
        currentCustomer, setCurrentCustomer,
        bjOptions, 
        currentBj, setCurrentBj,
        dataAdmin,
        loadDataAdmin,
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
        textDangerModal,
        buttonDanger,
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
        startVideo,
        stopVideo,
        uploadVideo
    };
}

export default PenerimaanBarangHelper;