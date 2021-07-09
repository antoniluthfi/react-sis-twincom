import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../../log/LogHelper';

const DataSalesHelper = () => {
    const { writeActivityLog } = LogHelper();
    const currentUser = useSelector(state => state.currentUser);
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const statusAkun = item => {
        switch (item) {
            case '0':
            case 0:
                return 'Tidak aktif'
            case '1':
            case 1:
                return 'Aktif'
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
            key: 'name',
            label: 'Nama',
            _style: { textAlign: 'center' },
        },
        {
            key: 'alamat',
            label: 'Alamat',
            _style: { textAlign: 'center' },
        },
        {
            key: 'email',
            label: 'Email',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nomorhp',
            label: 'Nomor HP',
            _style: { textAlign: 'center' },
        },
        {
            key: 'jabatan',
            label: 'Hak Akses',
            _style: { textAlign: 'center' },
        },
        {
            key: 'cab_penempatan',
            label: 'Cabang Penempatan',
            _style: { textAlign: 'center' },
        },
        {
            key: 'status_akun',
            label: 'Status',
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
    const [dataSales, setDataSales] = useState([]);
    const [loadDataCabang, setLoadDataCabang] = useState(true);
    const [dataCabang, setDataCabang] = useState({});
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentDataSales, setCurrentDataSales] = useState({});
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        name: '',
        alamat: '',
        email: '',
        nomorhp: '',
        jabatan: 'sales',
        cab_penempatan: 'Landasan Ulin',
        status_akun: '1',
        password: ''
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
        setTimeout(() => {
            setColor('success');
            setButtonVisibility('d-inline');
            setButtonSubmitName('Submit');
            setFormDisabled(false);
            setInput({
                name: '',
                alamat: '',
                email: '',
                nomorhp: '',
                jabatan: 'administrator',
                cab_penempatan: 'Landasan Ulin',
                status_akun: '1',
                password: ''
            });                
        }, 1000);
    }

    const changeHandler = event => {
        setInput({
            ...input, [event.target.name]:event.target.value
        });
    }

    const submitHandler = action => {
        if(action === 'Submit') {
            postDataSales();
        } else if(action === 'Update') {
            updateDataSales(currentDataSales.id);
        }
    }

    const getDataSales = async () => {
        await axios.get(`${baseUrl}/user/role/sales`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataSales(response.data.data);
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataSalesById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/user/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentDataSales(result);

            if(actionModal === 'update' || actionModal === 'view') {
                setInput({
                    name: result.name,
                    alamat: result.alamat,
                    email: result.email,
                    nomorhp: result.nomorhp,
                    jabatan: result.jabatan,
                    cab_penempatan: result.cab_penempatan,
                    status_akun: result.status_akun,
                });
            }
        })
        .catch(error => {
            console.log(error);
        })

        if(actionModal === 'view') {
            setModalTitle('View Data');
            setFormDisabled(true);
            setButtonVisibility('d-none');
            setColor('info');
            setSuccess(!success);
        } else if(actionModal === 'update') {
            setModalTitle('Update Data');
            setFormDisabled(false);
            setButtonVisibility('d-inline');
            setButtonSubmitName('Update');
            setColor('success');
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
                    deleteDataSales(id);
                }
            });
        }
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

    const postDataSales = async () => {
        let message = null;
        if(!input.name) message = 'Nama harus harus diisi!';
        else if(!input.alamat) message = 'Alamat harus diisi!';
        else if(!input.email) message = 'Email harus diisi!';
        else if(!input.nomorhp) message = 'Nomor hp harus diisi!';

        if(message) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.post(`${baseUrl}/user`, {
                name: input.name,
                alamat: input.alamat,
                email: input.email,
                nomorhp: input.nomorhp,
                jabatan: 'sales',
                cab_penempatan: input.cab_penempatan,
                status_akun: input.status_akun,
                password: input.name
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Sales', 'POST', `${currentUser.name} menambahkan ${response.data.data.name} sebagai data baru`);
                getDataSales();
                closeModalHandler();
            })
            .catch(error => {
                const err = error.response.data;
                let message = err.message;

                if(err.errors.email) message = err.errors.email[0];
                else if(err.errors.nomorhp) message = err.errors.nomorhp[0];

                Swal.fire(
                    'Gagal',
                    message,
                    'error'
                );
            });
        }
    }

    const updateDataSales = async id => {
        let message = null;
        if(!input.name) message = 'Nama harus harus diisi!';
        else if(!input.alamat) message = 'Alamat harus diisi!';
        else if(!input.email) message = 'Email harus diisi!';
        else if(!input.nomorhp) message = 'Nomor hp harus diisi!';

        if(message) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.put(`${baseUrl}/user/${id}`, {
                name: input.name,
                alamat: input.alamat,
                email: input.email,
                nomorhp: input.nomorhp,
                jabatan: 'sales',
                cab_penempatan: input.cab_penempatan,
                status_akun: input.status_akun,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Sales', 'UPDATE', `${currentUser.name} mengubah data ${currentDataSales.name}`);
                getDataSales();
                closeModalHandler();
            })
            .catch(error => {
                const err = error.response.data;
                let message = err.message;

                if(err.errors.email) message = err.errors.email[0];
                else if(err.errors.nomorhp) message = err.errors.nomorhp[0];

                Swal.fire(
                    'Gagal',
                    message,
                    'error'
                );
            });
        }
    }

    const deleteDataSales = async id => {
        await axios.delete(`${baseUrl}/user/${id}`, {
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Sales', 'DELETE', `${currentUser.name} menghapus data ${currentDataSales.name}`);
            getDataSales();
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
        statusAkun,
        fields,
        success, setSuccess,
        color,
        currentUser,
        isLoading,
        dataSales, setDataSales,
        loadDataCabang, setLoadDataCabang,
        dataCabang, setDataCabang,
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
        getDataSales,
        getDataSalesById,
        getDataCabang,
    }
}

export default DataSalesHelper;