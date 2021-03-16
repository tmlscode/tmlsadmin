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
import Modal from './subcategoriesmodal';
import EditModal from './subcategorieseditmodal';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, clearSuccess } from '../../store/actions/appactions';
import moment from 'moment';

const fields = [{key: 'title'} , {key: 'since', label: 'Date'}, {key: 'Action'}]

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
    dispatch(getCategories());
    clearSuccess();
  }, [dispatch]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/subcategory?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const handleClose = () => {
      setShow(false);
      dispatch(getCategories());
      clearSuccess();
  }

  const handleClosedit = () => {
    setShowedit(false);
    dispatch(getCategories());
    clearSuccess();
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
                  Product Categories
                </CCol>
                <CCol xs="1" className="mb-3 mb-xl-0" style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'row'}}>
                <CButton color="primary" onClick={() => setShow(true)}>Create</CButton>
                </CCol>
                </CRow>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={app.categories}
            fields={fields}
            hover
            striped
            alignItems='space-between'
            itemsPerPage={5}
            activePage={page}
            loading={app.loading}
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
                   <a onClick={(e) => {setBrand(item); setShowedit(true)}}>
                Edit
              </a>
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
