import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LogHelper from '../../../log/LogHelper';

const DataMerekHelper = () => {
    const { writeActivityLog } = LogHelper();
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const pc = item => {
        switch (item) {
            case '0':
            case 0:
                return 'Disembunyikan'
            case '1':
            case 1:
                return 'Ditampilkan'
            default:
                return ''
        }
    }
    
    const laptop = item => {
        switch (item) {
            case '0':
            case 0:
                return 'Disembunyikan'
            case '1':
            case 1:
                return 'Ditampilkan'
            default:
                return ''
        }
    }
    
    const cctv = item => {
        switch (item) {
            case '0':
            case 0:
                return 'Disembunyikan'
            case '1':
            case 1:
                return 'Ditampilkan'
            default:
                return ''
        }
    }
    
    const printer = item => {
        switch (item) {
            case '0':
            case 0:
                return 'Disembunyikan'
            case '1':
            case 1:
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
            key: 'merek',
            label: 'Merek',
            _style: { textAlign: 'center' },
        },
        {
            key: 'pc',
            label: 'Input PC',
            _style: { textAlign: 'center' },
        },
        {
            key: 'laptop',
            label: 'Input Laptop',
            _style: { textAlign: 'center' },
        },
        {
            key: 'cctv',
            label: 'Input CCTV',
            _style: { textAlign: 'center' },
        },
        {
            key: 'printer',
            label: 'Input Printer',
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
    const [danger, setDanger] = useState(false);
    const [color, setColor] = useState('success');
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState('');
    const [dataMerek, setDataMerek] = useState([]);
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [currentDataMerek, setCurrentDataMerek] = useState('');
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        merek: '',
        pc: '1',
        laptop: '1',
        cctv: '1',
        printer: '1'
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
                    merek: '',
                    pc: '1',
                    laptop: '1',
                    cctv: '1',
                    printer: '1'
                });                
            }, 1000);
        } else {
            setSuccess(!success);
            setTimeout(() => {
                setColor('success');
                setButtonVisibility('d-inline');
                setButtonSubmitName('Submit');
                setFormDisabled(false);
                setInput({
                    merek: '',
                    pc: '1',
                    laptop: '1',
                    cctv: '1',
                    printer: '1'
                });                
            }, 1000);
        }
    }

    const changeHandler = event => {
        setInput({
            ...input, [event.target.name]:event.target.value
        });
    }

    const submitHandler = action => {
        if(action === 'Submit') {
            postDataMerek();
        } else if(action === 'Update') {
            updateDataMerek(currentDataMerek.id);
        } else if(action === 'Delete') {
            deleteDataMerek(currentDataMerek.id);
        }
    }

    const getCurrentUser = async () => {
        await axios.get(`${baseUrl}/user/my/profile`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentUser(response.data.data);
            setRole(response.data.data.jabatan);
            getDataMerek();
        })
        .catch(error => {
            console.log('DataCabang.js line 61', error);
        });
    }

    const getDataMerek = async () => {
        await axios.get(`${baseUrl}/merek`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            if(response.status === 200) {
                setDataMerek(response.data.data);
            }
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataMerekById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/merek/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentDataMerek(response.data.data);
            setInput({
                merek: response.data.data.merek,
                pc: response.data.data.pc,
                laptop: response.data.data.laptop,
                cctv: response.data.data.cctv,
                printer: response.data.data.printer
            });
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
            setColor('success');
            setModalTitle('Update Data');
            setFormDisabled(false);
            setButtonVisibility('d-inline');
            setButtonSubmitName('Update');
            setSuccess(!success);
        } else if(actionModal === 'delete') {
            setDanger(!danger);
        }
    }

    const postDataMerek = async () => {
        let message = null;
        if(input.merek == '') message = 'Merek harus diisi!';

        await axios.post(`${baseUrl}/merek`, {
            merek: input.merek,
            pc: input.pc,
            laptop: input.laptop,
            cctv: input.cctv,
            printer: input.printer
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

            writeActivityLog(currentUser.id, role, 'Data Merek', 'POST', `${currentUser.name} menambahkan ${response.data.data.merek} sebagai data baru`);
            getDataMerek();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                message != null ? message : error.response.data.message,
                'error'
            );
        })

        closeModalHandler('Not Delete');
    }

    const updateDataMerek = async id => {
        let message = null;
        if(input.merek == '') message = 'Merek harus diisi!';

        await axios.put(`${baseUrl}/merek/${id}`, {
            merek: input.merek,
            pc: input.pc,
            laptop: input.laptop,
            cctv: input.cctv,
            printer: input.printer
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

            writeActivityLog(currentUser.id, role, 'Data Merek', 'UPDATE', `${currentUser.name} mengubah data ${currentDataMerek.merek} menjadi ${response.data.data.merek}`);
            getDataMerek(); 
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                message != null ? message : error.response.data.message,
                'error'
            );
        })

        closeModalHandler('Not Delete');
    }

    const deleteDataMerek = async id => {
        await axios.delete(`${baseUrl}/merek/${id}`, {
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

            writeActivityLog(currentUser.id, role, 'Data Merek', 'DELETE', `${currentUser.name} menghapus data ${currentDataMerek.merek}`);
            getDataMerek();
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

    return {
        pc,
        laptop,
        cctv,
        printer,
        fields,
        success, setSuccess,
        danger,
        color,
        isLoading,
        dataMerek,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        modalTitle,
        input,
        role,
        details,
        toggleDetails,
        closeModalHandler,
        changeHandler,
        submitHandler,
        getCurrentUser,
        getDataMerekById,
    }
}

export default DataMerekHelper;