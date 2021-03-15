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
import Modal from './brandmodal';
import EditModal from './brandeditmodal';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccess, getBrands } from 'src/store/actions/appactions';
import moment from 'moment';

const fields = [{key: 'title'}, {key: 'since'}, {key: 'Action'}]

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

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/brands?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const handleClose = () => {
      setShow(false);
    
  }

  const handleClosedit = () => {
    setShowedit(false);
    setBrand('');  
    dispatch(getBrands());
    dispatch(clearSuccess());
  }

  const onOpen = (title) => {
    setBrand(title)
    setShowedit(true)
  }



  return (
      <>
      <Modal show={show} close={handleClose}/>
      <EditModal show={showedit} close={handleClosedit} brand={brand}/>
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
          <CRow>
                 <CCol xs="11"  className="mb-3 mb-xl-0">
                  Brands
                </CCol>
                <CCol xs="1" className="mb-3 mb-xl-0" style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'row'}}>
                <CButton color="primary" onClick={() => setShow(true)}>Create</CButton>
                </CCol>
                </CRow>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={app.brands}
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
                   <a onClick={() => onOpen(item)}>edit</a>
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={4}
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
