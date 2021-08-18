import React, { useEffect, useState } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
  CCol,
  CFormGroup,
  CAlert,
  CInput,
  CLabel,
  CTextarea,
  CSelect
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { editClient } from 'src/store/actions/appactions';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {
  Typeahead,
} from 'react-bootstrap-typeahead';

const Modals = ({show, close, brand}) => {
  const [title, setTitle] = useState('');
  const [productcategory, setProductcategory] = useState('');
  const [description, setDescription] = useState('');
  const [brands, setBrands] = useState([]);
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)

  const onSubmit = () => {
    dispatch(editClient(app.user.token, brand._id, title, productcategory, description, brands[0]?._id));
  }

  const setting = () => {
    setTitle(brand.title);
    setBrands([brand.brand]);
    setProductcategory(brand.productcategory._id);
    setDescription(brand.description);
  }

  return (
            <CModal 
              show={show} 
              onClose={close}
              onOpened={setting}
              id={brand._id}
            >
              <CModalHeader closeButton>
                <CModalTitle>Edit Product name</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
              {app.error && app.error.type === 'clientediterror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successedit ? <CCol xs='12'>
                <CAlert color="success">
                Pruduct name Edited successfully
              </CAlert>
                </CCol> : null}
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Title</CLabel>
                    <CInput id="name" required value={title} onChange={(e) => setTitle(e.target.value)} />
                  </CFormGroup>
                </CCol>
                <CCol>
                <CFormGroup>
                    <CLabel htmlFor="brand">Brand</CLabel>
                    <Typeahead
          id="basic-typeahead-single"
          labelKey="title"
          onChange={setBrands}
          options={app.brands}
          placeholder="Choose a brand"
          selected={brands}
        />
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
                <CButton color="primary" block onClick={onSubmit}>{app.loading ?  <CSpinner color="success" size="sm" /> : 'Edit'}</CButton>
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
