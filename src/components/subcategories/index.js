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
import Modal from './subcategoriesmodal';
import EditModal from './subcategorieseditmodal';
import { useDispatch, useSelector } from 'react-redux';
import { getSubcategories, getCategories } from '../../store/actions/appactions';

const fields = [{key: 'title'}, {key: 'category', label: 'Category'}, {key: 'Action'}]

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
    dispatch(getSubcategories());
    dispatch(getCategories());
  }, [dispatch]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/subcategory?page=${newPage}`)
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
                  Subategories
                </CCol>
                <CCol xs="1" className="mb-3 mb-xl-0" style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'row'}}>
                <CButton color="primary" onClick={() => setShow(true)}>Create</CButton>
                </CCol>
                </CRow>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={app.subcategories}
            fields={fields}
            hover
            striped
            alignItems='space-between'
            itemsPerPage={5}
            activePage={page}
            loading={app.loading}
            clickableRows
            onRowClick={(item) => setBrand({title: item._id, id: item.title})}
            scopedSlots = {{
              'category':
                (item)=>(
                  <td>
                   {item.category.title}
                  </td>
                ),
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
