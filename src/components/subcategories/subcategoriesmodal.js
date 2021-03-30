import React, { useState } from 'react'
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
  CAlert,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../store/actions/appactions';

const Modals = ({show, close}) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)

  const onSubmit = () => {
    dispatch(createCategory(title, app.user.token));
  }
  return (
            <CModal 
              show={show} 
              onClose={close}
            >
              <CModalHeader closeButton>
                <CModalTitle>Create Product Category</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
              {app.error && app.error.type === 'categoryerror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successcategory ? <CCol xs='12'>
                <CAlert color="success">
                 Product Category successfully
              </CAlert>
                </CCol> : null}
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Title</CLabel>
                    <CInput id="name" placeholder="Enter Title" required value={title} onChange={(e) => setTitle(e.target.value)} />
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
