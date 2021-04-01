import React, { useState, useEffect} from 'react'
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
import { createUser, clearsuccessdata} from '../../store/actions/appactions';
import { useDispatch, useSelector } from 'react-redux';

const Modals = ({show, close}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const app = useSelector(state => state.app)
  const dispatch = useDispatch();

  useEffect(() => {
    if(app.successadmin){
      setName('')
      setPassword('');
      setAddress('');
      setMobile('');
      dispatch(clearsuccessdata());
    }else{
      return null
    }
  })

  const onSubmit = () => {
    dispatch(createUser(app.user.token, name, address, mobile, password));
  }
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
               {app.error && app.error.type === 'createadminerror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successadminmsg ?  <CCol xs='12'>
                <CAlert color="success" closeButton>
                Admin created successfully
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
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Password</CLabel>
                    <CInput id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </CFormGroup>
                </CCol>
                <CCol xs='12'>
                <CButton color="primary" block onClick={onSubmit}>{app.loading ? <CSpinner color="success" size="sm" /> : 'create'}</CButton>
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
