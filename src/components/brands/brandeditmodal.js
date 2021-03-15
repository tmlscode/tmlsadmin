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
  CSpinner,
  CFormGroup,
  CInput,
  CLabel,
  CAlert
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { editBrand } from 'src/store/actions/appactions';

const Modals = ({show, close, brand}) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)

  const onSubmit = () => {
    dispatch(editBrand(app.user.token, brand._id, title));
  }

  return (
            <CModal 
              show={show} 
              onClose={close}
            >
              <CModalHeader closeButton>
                <CModalTitle>Edit {brand.title} Brand</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
              {app.error && app.error.type === 'brandediterror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successedit ?  <CCol xs='12'>
                <CAlert color="success" closeButton>
                Brand Edited successfully
              </CAlert>
                </CCol> : null}
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Title</CLabel>
                    <CInput id="title" placeholder="Enter title" required dafaultValue={title} onChange={(e) => setTitle(e.target.value)} />
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
