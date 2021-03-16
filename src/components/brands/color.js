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
import EditModal from './coloreditmodal';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccess, getColors } from 'src/store/actions/appactions';
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
    dispatch(getColors());
  }, [dispatch]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/productsetup?page=${newPage}`)
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
    dispatch(getColors());
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
    
                  <CDataTable
            items={app.colors}
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
         
    </>
  )
}

export default Users
