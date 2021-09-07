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
import Modal from './categorymodal';
import EditModal from './categoryeditmodal';
import { useDispatch, useSelector } from 'react-redux';
import { getClients, clearSuccess, getSubcategories, getBrands } from '../../store/actions/appactions';
import moment from 'moment';
import Detailsmodal from './details';
import Delete from './delete';

const fields = [{key: 'title'},{key: 'brand'},{key: 'productcategory', label: "category"}, {key: 'description'}, {key: 'since', label: 'Date'},{key: 'Action'}]

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
  const [details, setDetails] = useState(false);
  const [deletes, setDeletes] = useState(false);

  useEffect(() => {
    dispatch(getClients());
    dispatch(getSubcategories());
    dispatch(getBrands());
    dispatch(clearSuccess());
  }, [dispatch]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/productnamesetup?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const handleClose = () => {
      setShow(false);
      dispatch(getClients());
      dispatch(clearSuccess());
  }

  const handleClosedit = () => {
    setShowedit(false);
    dispatch(getClients());
    dispatch(clearSuccess());
  }

  const onOpenmessage = (title) => {
    setBrand(title);
    setDetails(true);
  }


  const onOpendelete = (title) => {
    setBrand(title);
    setDeletes(true);
  }

  const closedetails = () => {
    setBrand('');
    setDetails(false);
  }

  const closeDelete = () => {
    setBrand('');
    setDeletes(false);
    dispatch(getClients());
    dispatch(clearSuccess());
  }


  return (
      <>
      <Modal show={show} close={handleClose}/>
      <EditModal show={showedit} close={handleClosedit} brand={brand}/>
      <Detailsmodal show={details} close={closedetails} brand={brand}/>
      <Delete show={deletes} close={closeDelete} brand={brand}/>
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
          <CRow>
                 <CCol xs="11"  className="mb-3 mb-xl-0">
                  Product name setup
                </CCol>
                <CCol xs="1" className="mb-3 mb-xl-0" style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'row'}}>
                <CButton color="primary" onClick={() => setShow(true)}>Create</CButton>
                </CCol>
                </CRow>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={app.clients}
            fields={fields}
            hover
            striped
            alignItems='space-between'
            itemsPerPage={5}
            activePage={page}
            loading={app.loading}
            clickableRows
            scopedSlots = {{
              'brand':
              (item)=>(
                <td>
               <span>{item?.brand?.title}</span>
                </td>
              ),
              'productcategory':
              (item)=>(
                <td>
               <span>{item?.productcategory?.title}</span>
                </td>
              ),
              'description':
              (item)=>(
                <td>
                 <a onClick={() => onOpenmessage(item?.description)}>{item?.description?.length > 30 ? `${item?.description?.substring(0, 30)}...` : item?.description}</a>
                </td>
              ),
              'since':
              (item)=>(
                <td>
               {moment(item.since).format('DD/MM/YY')}
                </td>
              ),
              'Action':
                (item)=>(
                  <td>
                   <span onClick={(e) => {setBrand(item); setShowedit(true)}}>edit</span> | <span onClick={(e) => {onOpendelete(item)}}>delete</span>
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={app.clients ? parseInt(app.clients.length / 4) + 1 : 4}
            doubleArrows={false} 
            align="center"
            limit={16}
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  )
}

export default Users
