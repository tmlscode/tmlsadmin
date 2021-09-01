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
// import Modal from './createproductmodal';
import EditModal from './products';
import Deletemodal from './edit';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccess, getSpecialorders } from '../../store/actions/appactions';
import Lightbox from 'react-image-lightbox';
import moment from 'moment';
const fields = [{key: 'fullname', label: 'Fullname'}, {key: 'email'}, {key: 'subject', label: 'Subject'},{key: 'message'},{key: 'since', label: 'Date'}]

const Products = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [show, setShow] = useState(false);
  const [brand, setBrand] = useState('');
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)
  const [images, setImages] = useState([]);
  const [photoIndex, setPhotoindex] = useState(0);
  const [open, setOpen] = useState(false);
  const [deletes, setDeletes] = useState(false);
  const [showedit, setShowedit] = useState(false);

  useEffect(() => {
    // dispatch(sideBar(false))
    dispatch(getSpecialorders());
    dispatch(clearSuccess());
  }, [dispatch]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/messages?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const handleClose = () => {
      setShow(false);
      dispatch(getSpecialorders());
      dispatch(clearSuccess());
  }
  const onOpenmessage = (message) => {
    setBrand(message);
    setShowedit(true);
  }
  


  const onOpenphotos = (photos) => {
    setImages(photos);
    setOpen(true);
  }

  const handleClosedelete = () => {
    setDeletes(false);
    dispatch(getSpecialorders()); 
    dispatch(clearSuccess());
}

  const onDelete = (title) => {
    setBrand(title)
    setDeletes(true)
  }

  const handleClosedit = () => {
    setOpen(false);
    setShowedit(false)
    setImages('');
    dispatch(getSpecialorders());
    dispatch(clearSuccess());
  }

  return (
      <>
      {/* {open && (
           <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setOpen(false)}
            onMovePrevRequest={() =>
             setPhotoindex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoindex((photoIndex + 1) % images.length,)
            }
          />        
        )} */}
      {/* <Modal show={show} close={handleClose}/> */}
      <Deletemodal show={showedit} close={handleClosedit} brand={brand}/>
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
          <CRow>
                 <CCol xs="11"  className="mb-3 mb-xl-0">
                  Messages
                </CCol>
                {/* <CCol xs="1" className="mb-3 mb-xl-0" style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'row'}}>
                <CButton color="primary" onClick={() => setShow(true)}>Create</CButton>
                </CCol> */}
                </CRow>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={app.specialorders}
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
                   {moment(item?.since || null).format('L')}
                  </td>
                ),
                'message':
                (item)=>(
                  <td>
                   <a onClick={() => onOpenmessage(item.message)}>{item.message.length > 30 ? `${item.message.substring(0, 30)}...` : item.message}</a>
                  </td>
                ),
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={15}
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

export default Products
