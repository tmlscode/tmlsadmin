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
  CSpinner
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { createBrand } from '../../store/actions/appactions';

const Modals = ({show, close}) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)

  const onSubmit = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNhYmMzNmQ4M2M3YTRlNDE0OTQwNGMiLCJuYW1lIjoia2VubnkiLCJhZGRyZXNzIjoiaWxhbGEiLCJpYXQiOjE2MTQ1NzYyNTIsImV4cCI6MTYxNzE2ODI1MiwiYXVkIjoiQ2xpZW50IiwiaXNzIjoiU3dhaGlsaXN3ZWF0c2hvcCIsInN1YiI6IkF1dGhvcml6ZSJ9.08HR0N6PncrkpLspAG5FBJzgJkjATKdBNvbDOLW3kns'
    dispatch(createBrand(title, token));
  }
  return (
            <CModal 
              show={show} 
              onClose={close}
            >
              <CModalHeader closeButton>
                <CModalTitle>Create Brand</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Title</CLabel>
                    <CInput id="name" placeholder="Enter your name" required value={title} onChange={(e) => setTitle(e.target.value)} />
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
