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
import CIcon from '@coreui/icons-react'
import Modal from './brandmodal';
import EditModal from './brandeditmodal';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from 'src/store/actions/appactions';

const fields = [{key: 'title', _style: { width: '50%'}}, {key: 'Action', _style: { width: '50%', displa: 'flex', alignItems: 'flex-end'}}]

const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [show, setShow] = useState(false);
  const [brand, setBrand] = useState('');
  const [close, setClose] = useState(false);
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
            onRowClick={(item) => setBrand({title: item._id, id: item.title})}
            scopedSlots = {{
              'Action':
                (item)=>(
                  <td>
                   <CButton variant="ghost" color="transparent" onClick={(e) => {setBrand(item); setShowedit(true)}}>
                <CIcon name="cil-lightbulb" />
              </CButton>
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
