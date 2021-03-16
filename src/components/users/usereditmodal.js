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
  CAlert
} from '@coreui/react'
import { editUser } from '../../store/actions/appactions';
import { useDispatch, useSelector } from 'react-redux';

const Modals = ({show, close, brand}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const app = useSelector(state => state.app)
  const dispatch = useDispatch();


  const onSubmit = () => {
    dispatch(editUser(app.user.token, name, address, mobile, brand._id));
  }
  return (
            <CModal 
              show={show} 
              onClose={close}
            >
              <CModalHeader closeButton>
                <CModalTitle>Edit user</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
               {app.error && app.error.type === 'editadminerror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successedit ?  <CCol xs='12'>
                <CAlert color="success" closeButton>
                Admin Edited successfully
              </CAlert>
                </CCol> : null}
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Name</CLabel>
                    <CInput id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </CFormGroup>
                </CCol>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Address</CLabel>
                    <CInput id="name" placeholder="Enter adress" value={address} onChange={(e) => setAddress(e.target.value)} required />
                  </CFormGroup>
                </CCol>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Mobile</CLabel>
                    <CInput id="name" placeholder="Enter mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                  </CFormGroup>
                </CCol>
                {/* <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Password</CLabel>
                    <CInput id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </CFormGroup>
                </CCol> */}
                <CCol xs='12'>
                <CButton color="primary" block onClick={onSubmit}>{app.loading ? <CSpinner color="success" size="sm" /> : 'submit'}</CButton>
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
