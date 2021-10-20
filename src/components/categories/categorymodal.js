import React, { useEffect, useState } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CCol,
  CFormGroup,
  CInput,
  CAlert,
  CLabel,
  CSpinner,
  CSelect,
  CTextarea
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { createClient, clearsuccessdata } from '../../store/actions/appactions';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {
  Typeahead,
} from 'react-bootstrap-typeahead';


const Modals = ({show, close}) => {
  const app = useSelector(state => state.app)
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState([]);
  const [productcategory, setProductcategory] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const onSubmit = () => {
    const brandlabel = app.brands.find(brands => brands._id === brand[0]?._id)
    const categorylabel = app.subcategories.find(brands => brands._id === productcategory)
    dispatch(createClient(title, brand[0]?._id, productcategory, description, brandlabel.title.toLowerCase(), categorylabel.title.toLowerCase(),  app.user.token));
  }

  useEffect(() => {
    if(app.successclient){
      setTitle('')
      dispatch(clearsuccessdata());
    }else{
      return null
    }
  })


  return (
            <CModal 
              show={show} 
              onClose={close}
            >
              <CModalHeader closeButton>
                <CModalTitle>Create Product name</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
              {app.error && app.error.type === 'clienterror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successclientmsg ? <CCol xs='12'>
                <CAlert color="success">
                Product name Created successfully
              </CAlert>
                </CCol> : null}
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Title</CLabel>
                    <CInput id="name" placeholder="Enter Title" required value={title} onChange={(e) => setTitle(e.target.value)} />
                  </CFormGroup>
                </CCol>
                <CCol xs="12">
                <CFormGroup>
                    <CLabel htmlFor="brand">Brand</CLabel>
                    <Typeahead
          id="basic-typeahead-single"
          labelKey="title"
          onChange={setBrand}
          options={app.brands}
          placeholder="Choose a brand"
          selected={brand}
        />
                    {/* <CSelect custom name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option disabled value=''>Enter Brand</option>
                     {app.brands ? app.brands.map(category => {
                       return (
                        <option value={category._id}>{category.title}</option>
                       )
                     }) : null}
                    </CSelect> */}
                  </CFormGroup>
                </CCol>
                <CCol xs="12">
                <CFormGroup>
                    <CLabel htmlFor="category">Category</CLabel>
                    <CSelect custom name="category" id="category" value={productcategory} onChange={(e) => setProductcategory(e.target.value)}>
                    <option disabled value=''>Enter Product name</option>
                     {app.subcategories ? app.subcategories.map(category => {
                       return (
                        <option value={category._id}>{category.title}</option>
                       )
                     }) : null}
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs='12' style={{marginBottom: 30}}>
                    <CLabel htmlFor="textarea-input">Description</CLabel>
                    <CTextarea 
                      name="description" 
                      value={description} 
                      rows="9"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description..." 
                    />
                    </CCol>
                <CCol xs='12'>
                <CButton  color="primary" block onClick={() => onSubmit()}>{app.loading ?  <CSpinner color="success" size="sm" /> : 'create'}</CButton>
                </CCol>
              </CRow>
              </CCol>
              </CModalBody>
              <CModalFooter>
              </CModalFooter>
            </CModal>
  )
}

export default Modals
