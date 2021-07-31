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
import Modal from './photomodal';
import EditModal from './photoeditmodal';
import Deletemodal from './photodeletemodal';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccess, getPhotos, setPhoto } from 'src/store/actions/appactions';
import Lightbox from 'react-image-lightbox';
import moment from 'moment';

const fields = [{key: 'title'},{key: 'about'},{key: 'venue'},{key: 'votes'},{key: 'url', title: 'photo'},{key: 'date'}, {key: 'Action'}]

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
  const [images, setImages] = useState([]);
  const [photoIndex, setPhotoindex] = useState(0);
  const [open, setOpen] = useState(false);
  const [deletes, setDeletes] = useState(false);

  useEffect(() => {
    dispatch(getPhotos());
    dispatch(clearSuccess());
  }, [dispatch]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/photos?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const handleClose = () => {
      setShow(false);
      dispatch(getPhotos());
  }

  const handleClosedit = () => {
    setShowedit(false);
    setBrand('');  
    dispatch(getPhotos());
    dispatch(clearSuccess());
  }

  const onOpen = (e, title) => {
    e.preventDefault();
    dispatch(setPhoto(title));
    setBrand(title)
    setShowedit(true)
  }


  const onOpenphotos = (photos) => {
    setImages(photos);
    setOpen(true);
  }

  const onDelete = (title) => {
    setBrand(title)
    setDeletes(true)
  }

  const handleClosedelete = () => {
    setDeletes(false);
    dispatch(getPhotos()); 
    dispatch(clearSuccess());
}


  return (
      <>
      {open && (
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
        )}
      <Modal show={show} close={handleClose}/>
   <EditModal show={showedit} close={handleClosedit} brand={brand}/>
   <Deletemodal show={deletes} close={handleClosedelete} brand={brand}/>
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
          <CRow>
                 <CCol xs="11"  className="mb-3 mb-xl-0">
                  PHOTOS
                </CCol>
                <CCol xs="1" className="mb-3 mb-xl-0" style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'row'}}>
                <CButton color="primary" onClick={() => setShow(true)}>Create</CButton>
                </CCol>
                </CRow>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={app.photos}
            fields={fields}
            hover
            striped
            loading={app.loading}
            alignItems='space-between'
            itemsPerPage={5}
            activePage={page}
            clickableRows
            scopedSlots = {{
              'about':
                (item)=>(
                  <td>
                   {item.about.substring(0,10)}...
                  </td>
                ),
                'url':
                (item)=>(
                  <td>
              <span variant="ghost" color="transparent" onClick={() => onOpenphotos([item.url])}>
               photo
              </span>
                  </td>
                ),
                'date':
                (item)=>(
                  <td>
                   {moment(item.date).format('L')}
                  </td>
                ),
              'Action':
                (item)=>(
                  <td>
                   <span onClick={(e) => onOpen(e, item)}>edit</span> | {item.state === 'active' ? <span onClick={(e) => onDelete(item)}>deactivate</span> : <span onClick={(e) => onDelete(item)}>activate</span>}
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={app.photos ? parseInt(app.photos.length / 4) + 1 : 4}
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
