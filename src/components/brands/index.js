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
  CTabs,
  CNav,
  CNavLink,
  CNavItem,
  CTabContent,
  CTabPane,
  CButton,
} from '@coreui/react'
import Modal from './brandmodal';
import EditModal from './brandeditmodal';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccess, getBrands, getColors, getSubcategories, getSizes} from 'src/store/actions/appactions';
import moment from 'moment';
import Colors from './color';
import Brandtable from './brands';
import Sizes from './sizes';
import Producttype from './producttype';

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
    clearSuccess();
  }, [dispatch]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/brands?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const handleClose = () => {
      setShow(false);
      dispatch(getBrands());
      dispatch(getSubcategories());
      dispatch(getSizes());
      dispatch(getColors());
      clearSuccess();
    
  }

  const handleClosedit = () => {
    setShowedit(false);
    setBrand('');  
    dispatch(getBrands());
    dispatch(clearSuccess());
    clearSuccess();
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
                  Products SETUP Entries
                </CCol>
                <CCol xs="1" className="mb-3 mb-xl-0" style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'row'}}>
                <CButton color="primary" onClick={() => setShow(true)}>Create</CButton>
                </CCol>
                </CRow>
          </CCardHeader>
          <CCardBody>
          <CTabs activeTab="brands">
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="brands">
                    Brands
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="type">
                    Product Type
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="size">
                    Product Size
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="color">
                    Product Color
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="brands">
                  <Brandtable/>
                </CTabPane>
                <CTabPane data-tab="type">
                 <Producttype/>
                </CTabPane>
                <CTabPane data-tab="size">
                  <Sizes/>
                </CTabPane>
                <CTabPane data-tab="color">
                  <Colors/>
                </CTabPane>
              </CTabContent>
            </CTabs>
          
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  )
}

export default Users
