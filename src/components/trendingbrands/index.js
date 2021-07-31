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
import Modal from './create';
import EditModal from './edit';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendingbrands, clearSuccess, getBrands } from '../../store/actions/appactions';
import moment from 'moment';
import Lightbox from 'react-image-lightbox';


const fields = [{key: 'title'}, {key: 'category'},{key: 'gender'},{key: 'photo'},{key: 'since', label: 'Date'}, {key: 'Action'}]

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

  useEffect(() => {
    dispatch(getTrendingbrands());
    dispatch(getBrands());
    dispatch(clearSuccess());
  }, [dispatch]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/trendingbrands?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const handleClose = () => {
      setShow(false);
      dispatch(getTrendingbrands());
      dispatch(clearSuccess());
  }

  const handleClosedit = () => {
    setShowedit(false);
    dispatch(getTrendingbrands());
    dispatch(clearSuccess());
  }

  const onOpenphotos = (photos) => {
    setImages([photos]);
    setOpen(true);
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
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
          <CRow>
                 <CCol xs="11"  className="mb-3 mb-xl-0">
                  Trending brands
                </CCol>
                <CCol xs="1" className="mb-3 mb-xl-0" style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'row'}}>
                <CButton color="primary" onClick={() => setShow(true)}>Create</CButton>
                </CCol>
                </CRow>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={app.trendingbrands}
            fields={fields}
            hover
            striped
            alignItems='space-between'
            itemsPerPage={5}
            activePage={page}
            loading={app.loading}
            clickableRows
            scopedSlots = {{
              'title':
                (item)=>(
                  <td>
                   {item.brand.title}
                  </td>
                ),
                'photo':
                (item)=>(
                  <td>
                   <span variant="ghost" color="transparent" onClick={() => onOpenphotos([item.photo])}>image</span>
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
                   <span onClick={(e) => {setBrand(item); setShowedit(true)}}>Delete</span>
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={app.trendingbrands ? parseInt(app.trendingbrands.length / 4) + 1 : 4}
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
