import React from 'react'
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
  CLabel
} from '@coreui/react'

const Modals = ({show, close}) => {
  return (
            <CModal 
              show={show} 
              onClose={close}
            >
              <CModalHeader closeButton>
                <CModalTitle>Create user</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Name</CLabel>
                    <CInput id="name" placeholder="Enter your name" required />
                  </CFormGroup>
                </CCol>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Password</CLabel>
                    <CInput id="name" placeholder="Enter your name" required />
                  </CFormGroup>
                </CCol>
                <CCol xs='12'>
                <CButton color="primary" block>Create</CButton>
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
