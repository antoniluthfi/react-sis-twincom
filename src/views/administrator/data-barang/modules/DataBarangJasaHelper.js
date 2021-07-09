import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const DataBarangJasaHelper = () => {
    const { writeActivityLog } = LogHelper();
    const currentUser = useSelector(state => state.currentUser);
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const jenis = item => {
        switch (item) {
            case 0:
            case '0':
                return 'Barang'
            case 1:
            case '1':
                return 'Jasa'
            default:
                return ''
        }
    }
    
    const inputForm = item => {
        switch (item) {
            case 0:
            case '0':
                return 'Disembunyikan'
            case 1:
            case '1':
                return 'Ditampilkan'
            default:
                return ''
        }
    }
    
    const fields = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nama_bj',
            label: 'Nama Barang / Jasa',
            _style: { textAlign: 'center' },
        },
        {
            key: 'jenis',
            label: 'Jenis',
            _style: { textAlign: 'center' },
        },
        {
            key: 'form_data_penting',
            label: 'Input Data Penting',
            _style: { textAlign: 'center' },
        },
        {
            key: 'merek_dan_tipe',
            label: 'Merek dan Tipe',
            _style: { textAlign: 'center' },
        },
        {
            key: 'sn',
            label: 'Serial Number',
            _style: { textAlign: 'center' },
        },
        {
            key: 'stiker',
            label: 'Stiker',
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
    
    const [success, setSuccess] = useState(false);
    const [color, setColor] = useState('success');
    const [isLoading, setIsLoading] = useState(true);
    const [dataBarang, setDataBarang] = useState([]);
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentDataBarang, setCurrentDataBarang] = useState('');
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        nama_bj: '',
        jenis: '1',
        form_data_penting: '0',
        merek_dan_tipe: '0',
        sn: '0',
        stiker: '0',
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

    const closeModalHandler = () => {
        setSuccess(!success);
        setColor('success');
        setButtonVisibility('d-inline');
        setButtonSubmitName('Submit');
        setFormDisabled(false);
        setModalTitle('Tambah Data');
        setInput({
            nama_bj: '',
            jenis: '1',
            form_data_penting: '1',
            merek_dan_tipe: '0',
            sn: '0',
            stiker: '0',            
        });                
    }

    const changeHandler = event => {
        setInput({
            ...input, [event.target.name]:event.target.value
        });
    }

    const submitHandler = action => {
        if(action === 'Submit') {
            postDataBarang();
        } else if(action === 'Update') {
            updateDataBarang(currentDataBarang.id);
        }
    }

    const getCurrentUser = () => {
        getDataBarang();
    }

    const getDataBarang = async () => {
        await axios.get(`${baseUrl}/bj`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataBarang(response.data.data);
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataBarangById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/bj/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentDataBarang(result);

            if(actionModal === 'update' || actionModal === 'view') {
                setInput({
                    nama_bj: result.nama_bj,
                    jenis: result.jenis,
                    form_data_penting: result.form_data_penting,
                    merek_dan_tipe: result.merek_dan_tipe,
                    sn: result.sn,
                    stiker: result.stiker,        
                });
            }
        })
        .catch(error => {
            console.log(error);
        })

        if(actionModal === 'view') {
            setColor('info');
            setModalTitle('View Data');
            setFormDisabled(true);
            setButtonVisibility('d-none');
            setSuccess(!success);
        } else if(actionModal === 'update') {
            setColor('success');
            setModalTitle('Update Data');
            setFormDisabled(false);
            setButtonVisibility('d-inline');
            setButtonSubmitName('Update');
            setSuccess(!success);
        } else if(actionModal === 'delete') {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteDataBarang(id);
                }
            });
        }
    }

    const postDataBarang = async () => {
        let message = null;
        if(!input.nama_bj) message = 'Nama barang harus diisi!';
        else if(!input.jenis) message = 'Jenis harus diisi!';
        else if(!input.form_data_penting) message = 'Form data penting harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.post(`${baseUrl}/bj`, {
                nama_bj: input.nama_bj,
                jenis: input.jenis,
                form_data_penting: input.form_data_penting,
                merek_dan_tipe: input.merek_dan_tipe,
                sn: input.sn,
                stiker: input.stiker,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Barang', 'POST', `${currentUser.name} menambahkan ${response.data.data.nama_bj} sebagai data baru`);
                getDataBarang();
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    error.response.data.message,
                    'error'
                );
            })
    
            closeModalHandler();
        }
    }

    const updateDataBarang = async id => {
        let message = null;
        if(!input.nama_bj) message = 'Nama barang harus diisi!';
        else if(!input.jenis) message = 'Jenis harus diisi!';
        else if(!input.form_data_penting) message = 'Form data penting harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.put(`${baseUrl}/bj/${id}`, {
                nama_bj: input.nama_bj,
                jenis: input.jenis,
                form_data_penting: input.form_data_penting,
                merek_dan_tipe: input.merek_dan_tipe,
                sn: input.sn,
                stiker: input.stiker,    
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Barang', 'UPDATE', `${currentUser.name} mengubah data ${currentDataBarang.nama_bj} menjadi ${response.data.data.nama_bj}`);
                getDataBarang();
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    error.response.data.message,
                    'error'
                );
            });
    
            closeModalHandler();
        }
    }

    const deleteDataBarang = async id => {
        await axios.delete(`${baseUrl}/bj/${id}`, {
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Barang', 'DELETE', `${currentUser.name} menghapus data ${currentDataBarang.nama_bj}`);
            getDataBarang();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });
    }

    return {
        jenis, 
        inputForm, 
        fields,
        success, setSuccess,
        color, 
        currentUser,
        isLoading,
        dataBarang,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        modalTitle,
        input,
        details,
        toggleDetails,
        closeModalHandler,
        changeHandler,
        submitHandler,
        getCurrentUser,
        getDataBarangById,
    }
}

export default DataBarangJasaHelper;