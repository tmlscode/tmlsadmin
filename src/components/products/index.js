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
import Modal from './createproductmodal';
import EditModal from './editproductmodal';
import Deletemodal from './deleteproductmodal';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccess, getProducts, getCategories, getSubcategories } from '../../store/actions/appactions';
import Lightbox from 'react-image-lightbox';
import moment from 'moment';
import he from 'he';
const fields = [{key: 'title'},{key: 'brand'},{key: 'category'},{key: 'subcategory'},{key: 'size'},{key: 'color'},{key: 'gallery'},{key: 'since', label: 'Date'}, {key: 'Action'}]

const Products = () => {
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
  const [editorwords, setEditorwords] = useState('');

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getSubcategories());
  }, [dispatch]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/products?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const handleClose = () => {
      setShow(false);
      dispatch(getProducts());
  }

  const handleClosedit = () => {
    setShowedit(false);
    setBrand('');  
    dispatch(getProducts());
    dispatch(clearSuccess());
  }

  const onOpen = (title) => {
    const words = he.decode(title.about);
    console.log(words);
    setBrand(title)
    setEditorwords(words);
    setShowedit(true)
  }


  const onOpenphotos = (photos) => {
    setImages(photos);
    setOpen(true);
  }

  const handleClosedelete = () => {
    setDeletes(false);
    dispatch(getProducts()); 
}

  const onDelete = (title) => {
    setBrand(title)
    setDeletes(true)
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
      <EditModal show={showedit} close={handleClosedit} brand={brand} editorwords={editorwords}/>
      <Deletemodal show={deletes} close={handleClosedelete} brand={brand}/>
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
          <CRow>
                 <CCol xs="11"  className="mb-3 mb-xl-0">
                  Products
                </CCol>
                <CCol xs="1" className="mb-3 mb-xl-0" style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'row'}}>
                <CButton color="primary" onClick={() => setShow(true)}>Create</CButton>
                </CCol>
                </CRow>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={app.products}
            fields={fields}
            hover
            striped
            loading={app.loading}
            alignItems='space-between'
            itemsPerPage={5}
            activePage={page}
            clickableRows
            scopedSlots = {{
              'brand':
                (item)=>(
                  <td>
                   {item.brand.title}
                  </td>
                ),
              'category':
                (item)=>(
                  <td>
                   {item.category.title}
                  </td>
                ),
                'subcategory':
                (item)=>(
                  <td>
                     {item.subcategory.title}
              {/* <a variant="ghost" color="transparent" onClick={() => onOpenphotos(item.gallery)}>
                {item.gallery.length} photos
              </a> */}
                  </td>
                ),
                'size':
                (item)=>(
                  <td>
                    { item.size.toString()}
                  </td>
                ),
                'color':
                (item)=>(
                  <td>
                    { item.color.toString()}
                  </td>
                ),
                'gallery':
                (item)=>(
                  <td>
                   <a variant="ghost" color="transparent" onClick={() => onOpenphotos(item.gallery)}>
                {item.gallery.length} photos
              </a>
                  </td>
                ),
                'since':
                (item)=>(
                  <td>
                   {moment(item.since).format('L')}
                  </td>
                ),
              'Action':
                (item)=>(
                  <td>
                   <a onClick={() => onOpen(item)}>edit</a> | {item.isActive ? <a onClick={() => onDelete(item)}>deactivate</a> : <a onClick={() => onDelete(item)}>activate</a>}
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

export default Products
