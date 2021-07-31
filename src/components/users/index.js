import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
} from '@coreui/react'
import Modal from './usermodal';
import EditModal from './usereditmodal';
import Deletemodal from './userdeletemodal';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccess, getUsers } from 'src/store/actions/appactions';

const fields = [{key: 'name'}, {key: 'mobile'},{key: 'address'},{key: 'since', label: 'Date'},{key: 'Action'}]

const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [show, setShow] = useState(false);
  const [brand, setBrand] = useState('');
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)
  const [showedit, setShowedit] = useState(false);
  const [deletes, setDeletes] = useState(false);

  useEffect(() => {
    dispatch(getUsers(app.user.token, app.user._id));
    dispatch(clearSuccess());
  }, [dispatch, app.user.token, app.user._id]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const handleClose = () => {
      setShow(false);
      dispatch(getUsers(app.user.token, app.user._id)); 
      dispatch(clearSuccess());
  }

  const handleClosedelete = () => {
    setDeletes(false);
    dispatch(getUsers(app.user.token, app.user._id)); 
    dispatch(clearSuccess());
}

  const handleClosedit = () => {
    setShowedit(false);
    setBrand('');  
    dispatch(getUsers(app.user.token, app.user._id));
    dispatch(clearSuccess());
  }

  const onOpen = (title) => {
    setBrand(title)
    setShowedit(true)
  }

  const onDelete = (title) => {
    setBrand(title)
    setDeletes(true)
  }

const users = app.users ? app.users.filter(user => user.role !== 'root') : [];

  return (
      <>
      <Modal show={show} close={handleClose}/>
      <EditModal show={showedit} close={handleClosedit} brand={brand}/>
      <Deletemodal show={deletes} close={handleClosedelete} brand={brand}/>
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
          <CRow>
                 <CCol xs="11"  className="mb-3 mb-xl-0">
                  Users
                </CCol>
                <CCol xs="1" className="mb-3 mb-xl-0" style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'row'}}>
                <CButton color="primary" onClick={() => setShow(true)}>Create</CButton>
                </CCol>
                </CRow>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={users}
            fields={fields}
            hover
            striped
            loading={app.loading}
            alignItems='space-between'
            itemsPerPage={5}
            activePage={page}
            clickableRows
            scopedSlots = {{
              'since':
              (item)=>(
                <td>
                {moment(item.since).format('DD/MM/YY')}
                </td>
              ),
              'Action':
                (item)=>(
                  <td>
                   <span onClick={() => onOpen(item)}>edit</span> | <span onClick={() => onDelete(item)}>delete</span>
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={users ? parseInt(users.length / 4) + 1 : 4}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  )
}

export default Users
