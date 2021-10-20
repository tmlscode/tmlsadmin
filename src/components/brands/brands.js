import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CDataTable,
  CPagination,
} from '@coreui/react'
import Modal from './brandmodal';
import EditModal from './brandeditmodal';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccess, getBrands } from 'src/store/actions/appactions';
import moment from 'moment';
import Delete from './deletebrand';

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
  const [deletes, setDeletes] = useState(false);

  useEffect(() => {
    dispatch(getBrands());
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
    dispatch(getBrands());
    dispatch(clearSuccess());
  }

  const onOpen = (title) => {
    setBrand(title)
    setShowedit(true)
  }

  const onOpendelete = (title) => {
    setBrand(title);
    setDeletes(true);
  }


  const closeDelete = () => {
    setBrand('');
    setDeletes(false);
    dispatch(getBrands());
    dispatch(clearSuccess());
  }



  return (
      <>
      <Modal show={show} close={handleClose}/>
      <Delete show={deletes} close={closeDelete} brand={brand}/>
      <EditModal show={showedit} close={handleClosedit} brand={brand}/>
    
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
                   <span onClick={() => onOpen(item)}>edit</span> |  <span onClick={() => onOpendelete(item)}>delete</span>
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={app.brands ? parseInt(app.brands.length / 4) + 1 : 4}
            doubleArrows={false} 
            align="center"
          />
         
    </>
  )
}

export default Users
