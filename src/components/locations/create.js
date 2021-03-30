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
  CAlert,
  CLabel,
  CSpinner
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { createLocation } from '../../store/actions/appactions';

const Modals = ({show, close}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)

  const onSubmit = () => {
    dispatch(createLocation(app.user.token, title, price, ));
  }
  return (
            <CModal 
              show={show} 
              onClose={close}
            >
              <CModalHeader closeButton>
                <CModalTitle>Create Location</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
              {app.error && app.error.type === 'locationserror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successlocation ? <CCol xs='12'>
                <CAlert color="success">
                Location Created successfully
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
                    <CLabel htmlFor="price">Price</CLabel>
                    <CInput id="price" type='number' placeholder="Enter Price" required value={price} onChange={(e) => setPrice(e.target.value)} />
                  </CFormGroup>
                </CCol>
                <CCol xs='12'>
                <CButton  color="primary" block onClick={() => onSubmit()}>{app.loading ?  <CSpinner color="white" size="sm" /> : 'create'}</CButton>
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
