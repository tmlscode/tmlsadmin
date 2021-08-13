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
import { clearSuccess, getPayments } from '../../store/actions/appactions';
import Lightbox from 'react-image-lightbox';
import moment from 'moment';
const fields = [{key: 'user', label: 'Username'},{key: 'products'}, {key: 'state'}, {key: 'details'},
// {key: 'brand'},{key: 'client', label: 'Product Client'}, {key: 'category', label: 'Product Category'},{key: 'subcategory', label: 'Product Type'},{key: 'size'},{key: 'color'},{key: 'gallery'},{key: 'image'},
{key: 'since', label: 'Date'}, {key: 'Action'}]

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
    dispatch(getPayments());
    dispatch(clearSuccess());
  }, [dispatch]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/payment?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const handleClose = () => {
      setShow(false);
      dispatch(getPayments());
      dispatch(clearSuccess());
  }
  const onOpen = (title) => {
    setBrand(title);
    setShowedit(true);
  }


  const onOpenphotos = (photos) => {
    setImages(photos);
    setOpen(true);
  }

  const handleClosedelete = () => {
    setDeletes(false);
    dispatch(getPayments()); 
    dispatch(clearSuccess());
}

  const onDelete = (title) => {
    setBrand(title)
    setDeletes(true)
  }

  const handleClosedit = () => {
    setOpen(false);
    setImages('');
    dispatch(getPayments());
    dispatch(clearSuccess());
  }

  console.log(app.payments);
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
    <EditModal show={open} close={handleClosedit} purchases={images} />
      <Deletemodal show={deletes} close={handleClosedelete} brand={brand}/>
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
          <CRow>
                 <CCol xs="11"  className="mb-3 mb-xl-0">
                  Products
                </CCol>
                {/* <CCol xs="1" className="mb-3 mb-xl-0" style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'row'}}>
                <CButton color="primary" onClick={() => setShow(true)}>Create</CButton>
                </CCol> */}
                </CRow>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={app.payments}
            fields={fields}
            hover
            striped
            loading={app.loading}
            alignItems='space-between'
            itemsPerPage={5}
            activePage={page}
            clickableRows
            scopedSlots = {{
              'user':
              (item)=>(
                <td>
                 {item?.fullname}
                </td>
              ),
                'products':
                (item)=>(
                  <td>
                   <span variant="ghost" color="transparent" onClick={() => onOpenphotos(item.products)}>
                {item?.products?.length} product(s)
              </span>
                  </td>
                ),
            //     'image':
            //     (item)=>(
            //       <td>
            //        <span variant="ghost" color="transparent" onClick={() => onOpenphotos([item.image])}>image</span>
            //       </td>
            //     ),
                'since':
                (item)=>(
                  <td>
                   {moment(item.since).format('L')}
                  </td>
                ),
              'Action':
                (item)=>(
                  <td>
                 {item.state === 'paid' ?   <span onClick={() => onDelete(item)}>change status</span> : '---'}
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={app.payments ? parseInt(app.payments.length / 4) + 1 : 4}
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
