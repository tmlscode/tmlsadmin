import React, { useState, useEffect } from 'react'
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
  CLabel,
  CSpinner,
  CSelect,
  CAlert,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, clearsuccessdata } from '../../store/actions/appactions';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {
  Typeahead,
} from 'react-bootstrap-typeahead';

const Modals = ({show, close}) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)
  const [brand, setBrand] = useState([]);
  const [packagename, setPackagename] = useState('');


  const onSubmit = () => {
    dispatch(createCategory(title, brand[0]?._id, packagename, app.user.token));
  }


  return (
            <CModal 
              show={show} 
              onClose={close}
            >
              <CModalHeader closeButton>
                <CModalTitle>Create Product catalog</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
              {app.error && app.error.type === 'categoryerror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successcategorymsg ? <CCol xs='12'>
                <CAlert color="success">
                 Product Catalog successfully created
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
          onChange={setBrand}
          options={app.clients}
          placeholder="Choose a product"
          selected={brand}
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
