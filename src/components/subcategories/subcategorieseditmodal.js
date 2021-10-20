import React, { useState } from 'react'
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
  CLabel
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { editCategory } from '../../store/actions/appactions';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {
  Typeahead,
} from 'react-bootstrap-typeahead';

const Modals = ({show, close, brand}) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)
  const [brands, setBrands] = useState([]);
  const [packagename, setPackagename] = useState('');

  const onSubmit = () => {
    dispatch(editCategory(app.user.token, brand._id, title, packagename, brands[0]._id,));
  }

  const setting = () => {
    setTitle(brand.catalognumber);
    setBrands([brand.client])
    setPackagename(brand.packagename)
  }
  
  return (
            <CModal 
              show={show} 
              onClose={close}
              onOpened={setting}
            >
              <CModalHeader closeButton>
                <CModalTitle>Edit Product Catalog</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
              {app.error && app.error.type === 'categoryediterror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successedit ? <CCol xs='12'>
                <CAlert color="success">
                Catalog Edited successfully
              </CAlert>
                </CCol> : null}
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Catalog number</CLabel>
                    <CInput id="name" placeholder="Enter catalog number" required value={title} onChange={(e) => setTitle(e.target.value)} />
                  </CFormGroup>
                </CCol>
                <CCol xs="12">
                <CFormGroup>
                    <CLabel htmlFor="brand">Product name</CLabel>
                    <Typeahead
          id="basic-typeahead-single"
          labelKey="title"
          onChange={setBrands}
          options={app.clients}
          placeholder="Choose a product"
          selected={brands}
        />
                  </CFormGroup>
                </CCol>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="package">Package</CLabel>
                    <CInput id="package" placeholder="Enter Package" required value={packagename} onChange={(e) => setPackagename(e.target.value)} />
                  </CFormGroup>
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
