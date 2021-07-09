import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableMember = props => {
    let {
        dataMember,
        fields,
        isLoading,
        details,
        toggleDetails,
        currentUser,
        getDataMemberById
    } = props;

    return (
        <CDataTable
            items={dataMember}
            fields={fields}
            striped
            sorter
            hover
            columnFilter
            noItemsView={isLoading ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
            loading={isLoading}    
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            scopedSlots = {{
                'id': 
                ((item, i) => (
                    <td className="text-center">
                        {i + 1}
                    </td>
                )),
                'name': 
                (item => <td>{item.user.name}</td>),
                'email':
                (item => <td>{item.user.email}</td>),
                'nomorhp':
                (item => <td className="text-center">{item.user.nomorhp}</td>),
                'poin':
                (item => <td className="text-center">{item.poin}</td>),
                'diskon':
                (item => <td className="text-center">{item.diskon}</td>),
                'show_details':
                (item, index)=>{
                    return (
                    <td className="py-2">
                        <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={()=>{toggleDetails(index)}}
                        >
                            {details.includes(index) ? 'Hide' : 'Show'}
                        </CButton>
                    </td>
                    )
                },
                'details':
                    (item, index)=>{
                    return (
                    <CCollapse show={details.includes(index)}>
                        <CCardBody>
                            <CButton size="sm" color="info" onClick={() => getDataMemberById(item.id, 'view')}>
                                View Details
                            </CButton>
                            {currentUser.jabatan === 'admin service' ? null :
                                <div>
                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataMemberById(item.id, 'update')}>
                                    Update
                                </CButton>
                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataMemberById(item.id, 'delete')}>
                                    Delete
                                </CButton>         
                                </div>                                           
                            }
                        </CCardBody>
                    </CCollapse>
                    )
                }
            }}
        />
    )
}

export default TableMember;